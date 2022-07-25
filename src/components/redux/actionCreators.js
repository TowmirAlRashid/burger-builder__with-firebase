import axios from 'axios'
import * as actionTypes from './actionTypes'

const API_KEY = "AIzaSyB9W5h6kWUII-kQMap0ZVkQSIl4xY2CSrg";

export const addIngredient = type => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: type
  }
}

export const removeIngredient = type => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: type
  }
}

export const updatePurchasable = () => {
  return {
    type: actionTypes.UPDATE_PURCHASABLE
  }
}

export const resetIngredients = () => {
  return {
    type: actionTypes.RESET_INGREDIENTS
  }
}

export const loadOrders = orders => {
  return {
    type: actionTypes.LOAD_ORDERS,
    payload: orders
  }
}

export const orderLoadFailed = () => {
  return {
    type: actionTypes.ORDER_LOAD_FAILED
  }
}

export const fetchOrders = (token, userId) => dispatch => {
  const queryParams = '&orderBy="userId"&equalTo="' + userId + '"'
  axios
    .get('https://burger-builder-7ad92-default-rtdb.firebaseio.com/orders.json?auth=' + token + queryParams)
    .then((response) => dispatch(loadOrders(response.data)))
    .catch(error => dispatch(orderLoadFailed()));
}

//auth actions below
export const auth = (email, password, mode) => dispatch => {
  dispatch(authLoading(true))
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  let authUrl = null;

  if (mode === 'Sign Up') {
    authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }

  axios.post(authUrl + API_KEY, authData)
  .then(response => {
    dispatch(authLoading(false))
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('userId', response.data.localId);
    const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
    localStorage.setItem('expirationTime', expirationTime)
    dispatch(authSuccess(response.data.idToken,  response.data.localId))
  })
  .catch(error => {
    dispatch(authLoading(false))
    dispatch(authFailed(error.response.data.error.message));
  })
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token,
      userId: userId
    },
  };
}

export const authCheck = () => dispatch => {
  const token = localStorage.getItem('token')
  if (!token) {
    //logout
    dispatch(logout())
  } else {
    const expirationTime = new Date(localStorage.getItem('expirationTime'))
    if (expirationTime <= new Date()) {
      //logout
      dispatch(logout())
    } else {
      const userId = localStorage.getItem('userId')
      dispatch(authSuccess(token, userId))
    }
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationTime')
  localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authLoading = isLoading => {
  return {
    type: actionTypes.AUTH_LOADING,
    payload: isLoading
  }
}

export const authFailed = errorMessage => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: errorMessage
  }
}