import axios from 'axios'

export async function authRequest({commit, dispatch}, user) {
  return new Promise((resolve, reject) => { // The Promise used for router redirect in login
    commit('authBegin')
    axios({
      url: process.env.API_URL + '/auth',
      data: user,
      method: 'POST'
    })
      .then(resp => {
        const token = resp.data.data.token
        const user = resp.data.data.account_full.account.username
        const role = resp.data.data.account_full.role_name
        let navs = resp.data.data.account_full.navs
        navs = JSON.stringify(navs)
        localStorage.setItem('user-token', token)
        localStorage.setItem('user', user)
        localStorage.setItem('role', role)
        localStorage.setItem('navs', navs)
        commit('authSuccess', token)
        resolve(resp)
      })
      .catch(err => {
        commit('authError', err)
        localStorage.removeItem('user-token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        reject(err)
      })
  })
}


export async function logout({commit}) {
  return new Promise((resolve, reject) => {
    commit('authLogout')
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('navs')
    resolve()
  })
}
