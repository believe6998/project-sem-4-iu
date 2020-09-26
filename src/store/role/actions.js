import { httpClient } from 'src/api/http';

export async function loadRoles({ commit }) {
  commit('fetchRolesBegin')
  try {
    const response = await httpClient.post('/role')
    commit('fetchRolesSuccess', {
      roles: response.data
    })

    if(response.roles && response.roles.length > 0) {
      return response.roles
    } else {
      return null
    }
  } catch (error) {
    commit('fetchRolesError', error)
    return null
  }
}

export async function loadRole({commit, dispatch}, roleId) {
  try {
    commit('fetchRoleBegin')
    const response = await httpClient.post(`/role/find/${roleId}`)
    commit('fetchRoleSuccess', {
      role: response.data
    })

  } catch (error) {
    commit('fetchRoleError', {
      error
    })
  }
}

export async function saveRole({commit}, role) {
  commit('saveRoleBegin')

  try {
    if (role.id) {
      await httpClient.post(`/role/update${role.id}`, data)
    } else {
      await httpClient.post('/role/create', data)
    }

    commit('saveRoleSuccess')
  } catch (error) {
    commit('saveRoleError', error)
  }
}

export async function deleteRole({commit}, roleId) {
  commit('deleteRoleBegin')

  try {
    await httpClient.post(`/role/delete/${roleId.id}`)

    commit('deleteRoleSuccess')
  } catch (error) {
    commit('deleteRoleError', error)
  }
}
