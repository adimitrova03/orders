const INITIAL_STATE = {
  translations: []
}

const translateReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case 'GET_TRANSLATIONS': {
      return {
        ...state,
        translations: action.payload
      }
    }
    
    default: return state;
  }
}

export default translateReducer;