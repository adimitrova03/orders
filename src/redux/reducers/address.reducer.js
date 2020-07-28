const INITIAL_STATE = {
  address: ''
}
const addressReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case 'ADD_ADDRESS': {
      return {
        ...state,
        address: action.payload
      }
    }
    
    default: return state;
  }
}

export default addressReducer;