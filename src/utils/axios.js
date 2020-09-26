export function decorateLogoutWhenExpiredInterceptor(axios) {
  axios.interceptors.response.use(
    response => response,
    async error => {
      if (error && error.response && error.response.status === 401) {
        const {response: {config: {unAuthorizedCallback}}} = error
        if (unAuthorizedCallback){
          await unAuthorizedCallback()
        }
        logout()
      }

      return Promise.reject(error)
    }
  )
}

function logout () {
  window.location.href = '/logout'
}
