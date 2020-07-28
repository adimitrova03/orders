export const ADD_ADDRESS = 'ADD_ADDRESS';

export function getAddress(payload) {
  return {
        type: ADD_ADDRESS, 
        payload
    }
}

