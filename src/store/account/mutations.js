export function fetchAccountsBegin(state) {
  state.accounts = []
  state.error = null
  state.isLoading = true

}

export function fetchAccountsSuccess(state, {accounts}) {
  state.accounts = accounts
  state.error = null
  state.isLoading = false
}

export function fetchAccountsError(state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchAccountBegin (state) {
    state.account = {}
    state.isLoading = true
    state.error = null
}

export function fetchAccountSuccess (state, account) {
  state.account = account
  state.error = null
  state.isLoading = false
}

export function fetchAccountError(state, error) {
  state.error = error
  state.isLoading = false
}

export function saveAccountBegin (state) {
  state.error = null
  state.isSaved = false
  state.account = null
  state.isSaving = true
}

export function saveAccountSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveAccountError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deleteAccountBegin (state) {
  state.error = null
  state.isDeleted = false
  state.account = null
  state.isDeleting = true
}

export function deleteAccountSuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deleteAccountError (state, error) {
  state.error = error
  state.isDeleted = false
  state.isDeleting = false
}
