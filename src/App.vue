<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  created() {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch('auth/logout')
          // you can also redirect to /login if needed !
        }
        throw err;
      });
    });
  }
}
</script>
