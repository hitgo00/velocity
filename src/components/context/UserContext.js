import React from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        name: localStorage.name,
        email: localStorage.email,
      };
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem('google_token'),
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

function loginUser(dispatch, history, response, routerState) {
  localStorage.setItem('google_token', response.tokenId);
  localStorage.setItem('name', response.profileObj.name);
  localStorage.setItem('email', response.profileObj.email);

  // console.log(response.tokenId);
  console.log(response.profileObj.name);
  console.log(response.profileObj.email);

  axios
    .post(`${SERVER_URL}login/`, {
      name: response.profileObj.name,
      email: response.profileObj.email,
    })
    .then((result) => {
      console.log(result.data);
      localStorage.setItem('courses_created', result.data.coursesCreated);
      dispatch({ type: 'LOGIN_SUCCESS' });
      const link = (routerState && routerState.from) || '/dashboard'; // Redirect to /editor or the history-url user came from
      history.replace(link);
    })
    .catch((err) => {
      console.log(err);
    });
}

function signOut(dispatch, history) {
  deleteUserDataLocalStorage();
  dispatch({ type: 'SIGN_OUT_SUCCESS' });
  history.push('/');
}

function deleteUserDataLocalStorage() {
  localStorage.removeItem('google_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_username');
  localStorage.removeItem('user_email');
}
