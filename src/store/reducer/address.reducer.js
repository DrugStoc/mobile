import {ADD_ADDRESS, SET_DEFAULT_ADDRESS} from '../../utils/action.types';

const initialState = {
  defaultAddress: {
    name: 'Billings Way, Ikeja, Nigeria',
    withLagos: true,
  },

  address: [
    {
        id: 2,
      name: 'Billings Way, Ikeja, Nigeria',
      withLagos: true,
    },
    {
        id: 2,
      name: 'Iwo Road shopping complex, Ibadan, Nigeria',
      withLagos: false,
    },
  ],
};

function unique(array, payload) {
  return array.concat(payload);
}

const edit = (arr, payload) => {
  console.log(payload);
  let newArr = [...arr];
  console.log(newArr[payload], payload.quantity);
  newArr[payload].withLagos = payload.withLagos;
  return newArr;
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS:
      return {
        ...state,
        address: unique(state.address, action.payload),
      };
    case SET_DEFAULT_ADDRESS:
      return {
        ...state,
        defaultAddress: action.payload,
      };
    default:
      return state;
  }
};
