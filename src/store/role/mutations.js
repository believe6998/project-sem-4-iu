export function fetchRolesBegin(state) {
  state.roles = []
  state.error = null
  state.isLoading = true

}

export function fetchRolesSuccess(state, {roles}) {
  state.roles = roles
  state.error = null
  state.isLoading = false
}

export function fetchRolesError(state, error) {
  state.error = error
  state.isLoading = false
}

export function fetchRoleBegin (state) {
    state.role = {}
    state.isLoading = true
    state.error = null
}

export function fetchRoleSuccess (state, {role}) {
  state.role = role
  state.error = null
  state.isLoading = false
}

export function fetchRoleError(state, error) {
  state.error = error
  state.isLoading = false
}

export function saveRoleBegin (state) {
  state.error = null
  state.isSaved = false
  state.role = null
  state.isSaving = true
}

export function saveRoleSuccess (state) {
  state.isSaved = true
  state.isSaving = false
}

export function saveRoleError (state, error) {
  state.error = error
  state.isSaved = false
  state.isSaving = false
}

export function deleteRoleBegin (state) {
  state.error = null
  state.isDeleted = false
  state.role = null
  state.isDeleting = true
}

export function deleteRoleSuccess (state) {
  state.isDeleted = true
  state.isDeleting = false
}

export function deleteRoleError (state, error) {
  state.error = error
  state.isDeleted = false
  state.isDeleting = false
}
