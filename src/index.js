/**
 * Action type
 */

const EFFECT_SESSIONSTORAGE = 'EFFECT_SESSIONSTORAGE'

/**
 * redux-effects-sessionStorage
 */

function storage (sessionStorage) {
  return api => next => action =>
    action.type === EFFECT_SESSIONSTORAGE
      ? execute(action.payload)
      : next(action)

  function execute ({type, key, value, n}) {
    switch (type) {
      case 'key':
        return Promise.resolve(sessionStorage.key(n))
      case 'getItem':
        return Promise.resolve(sessionStorage.getItem(key))
      case 'setItem':
        return Promise.resolve(sessionStorage.setItem(key, value))
      case 'removeItem':
        return Promise.resolve(sessionStorage.removeItem(key, value))
      case 'clear':
        return Promise.resolve(sessionStorage.clear())
      case 'length':
        return Promise.resolve(sessionStorage.length)
      default:
        throw new Error('redux-effects-sessionStorage unknown sessionStorage action type')
    }
  }
}

/**
 * Action creator
 */

function createAction (payload) {
  return {
    type: EFFECT_SESSIONSTORAGE,
    payload
  }
}

function key (n) {
  return createAction({type: 'key', n})
}

function getItem (key) {
  return createAction({type: 'getItem', key})
}

function setItem (key, value) {
  return createAction({type: 'setItem', key, value})
}

function removeItem (key) {
  return createAction({type: 'removeItem', key})
}

function clear () {
  return createAction({type: 'clear'})
}

function getLength () {
  return createAction({type: 'length'})
}

/**
 * Exports
 */

export default storage
export {
  key,
  getItem,
  setItem,
  removeItem,
  clear,
  getLength
}
