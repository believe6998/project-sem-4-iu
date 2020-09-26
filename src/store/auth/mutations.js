export function authBegin(state) {
  state.status = 'loading'
  state.user = {}

}

export function authSuccess(state, token) {
  state.status = 'success'
  state.token = token
}

export function authError(state) {
  state.status = 'error'
}

export function authLogout(state) {
  state.user = {}
  state.status = ''
  state.token = ''
}

