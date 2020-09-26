import { httpClient } from 'src/api/http';
import axios from "axios";

export async function loadAccounts({ commit }) {
  commit('fetchAccountsBegin')
  console.log(axios.defaults)
  try {
    const response = await httpClient.post('/account')
    commit('fetchAccountsSuccess', {
      accounts: response.data
    })

    if(response.accounts && response.accounts.length > 0) {
      return response.accounts
    } else {
      return null
    }
  } catch (error) {
    commit('fetchAccountsError', error)
    return null
  }
}

export async function loadAccount({commit, dispatch}, accountId) {
  try {
    commit('fetchAccountBegin')
    console.log(accountId)
    const student = await httpClient.post(`/account/find/${accountId}`)

    commit('fetchAccountSuccess', student)

  } catch (error) {
    commit('fetchAccountError', {
      error
    })
  }
}

export async function saveAccount({commit}, account) {
  commit('saveAccountBegin')
  console.log(account)
  try {
    if (account.id) {
      await httpClient.post(`/account/update${account.id}`, data)
    } else {
      await httpClient.post('/account/create', data)
    }

    commit('saveAccountSuccess')
  } catch (error) {
    commit('saveAccountError', error)
  }
}

export async function deleteAccount({commit}, accountId) {
  commit('deleteAccountBegin')

  try {
    await httpClient.post(`/account/delete/${accountId}`)

    commit('deleteAccountSuccess')
  } catch (error) {
    commit('deleteAccountError', error)
  }
}
