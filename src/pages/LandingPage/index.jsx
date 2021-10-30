import { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory, useLocation } from 'react-router-dom';
import {
  useUserDispatch,
  loginUser,
} from '../../components/context/UserContext';
import Header from './Header'
import HeroHome from './HeroHome';

import '../../css/style.scss';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

function LandingPage() {
  let userDispatch = useUserDispatch();
  let history = useHistory();
  let { state } = useLocation();

  return (
    <>
      <div>Welcome to Velomcity!!</div>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Sign In with Google"
        onSuccess={(response) => {
          // setLoginLoading(true);
          loginUser(userDispatch, history, response, state);
        }}
        onFailure={(err) => {
          console.log(err);
          // setLoginLoading(false);
        }}
      />

      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <main className="flex-grow">
          <HeroHome />
        </main>
      </div>

    </>
  );
}

export default LandingPage;
