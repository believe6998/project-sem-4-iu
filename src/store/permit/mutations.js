export function fetchPermitsBegin(state) {
  state.permits = []
  state.error = null
  state.isLoading = true

}

export function fetchPermitsSuccess(state, {permits}) {
  state.permits = permits
  state.error = null
  state.isLoading = false
}

export function fetchPermitsError(state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchPermitBegin (state) {
    state.permit = {}
    state.isLoading = true
    state.error = null
}

export function fetchPermitSuccess (state, {permit}) {
  state.permit = permit
  state.error = null
  state.isLoading = false
}

export function fetchPermitError(state, error) {
  state.error = error
  state.isLoading = false
}

export function savePermitBegin (state) {
  state.error = null
  state.isSaved = false
  state.permit = null
  state.isSaving = true
}

export function savePermitSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function savePermitError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deletePermitBegin (state) {
  state.error = null
  state.isDeleted = false
  state.permit = null
  state.isDeleting = true
}

export function deletePermitSuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deletePermitError (state, error) {
  state.error = error
  state.isDeleted = false
  state.isDeleting = false
}
