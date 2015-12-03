
const CAT_NAME_CHANGE = 'CAT_NAME_CHANGE'
const STATUS_CHANGE = 'STATUS_CHANGE'

export function changeCatName (catId, name) {
  return {
    type: CAT_NAME_CHANGE,
    catId,
    name
  }
}

export function setStatus (status) {
  return {
    type: STATUS_CHANGE,
    status
  }
}

export function setStatusAsync (status) {
  return dispatch => {
    setTimeout(dispatch(setStatus(status)), 200)
  }
}
