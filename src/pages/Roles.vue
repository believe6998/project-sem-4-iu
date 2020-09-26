<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Change Request"
        :data="roles"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode=='grid'"
        :filter="filter"
        :pagination.sync="pagination"
      >
        <template v-slot:top-right="props">
          <q-btn v-if="roleName === 'admin' || roleName === 'sp'" @click="showData()" outline color="primary" label="Add New" class="q-mr-xs"/>

          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
            v-if="!props.inFullscreen"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{ mode === 'grid' ? 'List' : 'Grid' }}
            </q-tooltip>
          </q-btn>

          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:body-cell-action="props"
                  v-if="roleName === 'admin' || roleName === 'sp'">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn dense color="primary" icon="edit" @click="showData(props.row.id)"/>
              <q-btn dense color="red" icon="delete" @click="confirm(props.row.id)"/>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="dialog">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Role Details</div>
        </q-card-section>

        <q-form @submit="onSubmit" class="q-gutter-md q-pa-md">
          <q-input
            outlined
            v-model="currentRole.name"
            label="Username"
          />

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="Submit" type="submit"/>
            <q-btn flat label="Close" v-close-popup/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {exportFile} from "quasar";
import {mapActions, mapState} from "vuex";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  data() {
    return {
      dialog: false,
      filter: "",
      currentRole: {},
      mode: "list",
      roleName: '',
      columns: [
        {
          name: "id",
          align: "left",
          label: "ID",
          field: "id",
          sortable: true
        },
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "action",
          align: "left",
          label: "Action",
          field: "action"
        }
      ],
      optionsNotification: {
        color: "green-4",
        textColor: "white",
        icon: "cloud_done"
      },
      pagination: {
        rowsPerPage: 10
      },
    };
  },
  computed: {
    ...mapState('role', ['roles', 'isLoading', 'role']),
  },
  created() {
    this.loadRoles()
    this.roleName = localStorage.getItem('role')
  },
  methods: {
    ...mapActions({
      loadRoles: 'role/loadRoles',
      loadRole: 'role/loadRole',
      saveRole: 'role/saveRole',
      deleteRole: 'role/deleteRole',
    }),
    async onSubmit() {
      await this.saveRole(this.currentRole)
      if (this.currentAccount.id) {
        this.$q.notify({
          ...this.optionsNotification,
          message: "Update successful"
        });
      } else {
        this.$q.notify({
          ...this.optionsNotification,
          message: "Add successful"
        });
      }
      this.dialog = false
      await this.loadRoles()
    },
    async showData(roleId = null) {
      this.currentAccount = {}
      if (roleId) {
        await this.loadRole(roleId)
        this.currentRole = this.role
      }
      this.dialog = true;
    },
    confirm(roleId) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          await this.deleteAccount(roleId);
          this.$q.notify({
            ...this.optionsNotification,
            message: "Delete successful"
          });
          await this.loadRoles()
        });
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("change-request.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    }
  }
};
</script>
<style>
.q-chip__content {
  display: block;
  text-align: center;
}
</style>
