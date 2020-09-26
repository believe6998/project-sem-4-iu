import { httpClient } from 'src/api/http';

export async function loadPermits({ commit }) {
  commit('fetchPermitsBegin')
  try {
    const response = await httpClient.post('/permit')
    commit('fetchPermitsSuccess', {
      permits: response.data
    })

    if(response.permits && response.permits.length > 0) {
      return response.permits
    } else {
      return null
    }
  } catch (error) {
    commit('fetchPermitsError', error)
    return null
  }
}

export async function loadPermit({commit, dispatch}, roleId) {
  try {
    commit('fetchPermitBegin')
    const permit = await httpClient.post(`/permit/find/${roleId}`)

    commit('fetchPermitSuccess', permit)

  } catch (error) {
    commit('fetchPermitError', {
      error
    })
  }
}

export async function savePermit({commit}, permit) {
  commit('savePermitBegin')

  try {
    if (permit.id) {
      await httpClient.post(`/permit/update${permit.id}`, data)
    } else {
      await httpClient.post('/permit/create', data)
    }

    commit('savePermitSuccess')
  } catch (error) {
    commit('savePermitError', error)
  }
}

export async function deletePermit({commit}, roleId) {
  commit('deletePermitBegin')

  try {
    await httpClient.post(`/permit/delete/${roleId}`)

    commit('deletePermitSuccess')
  } catch (error) {
    commit('deletePermitError', error)
  }
}
