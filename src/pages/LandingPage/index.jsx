import { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory, useLocation } from 'react-router-dom';
import {
  useUserDispatch,
  loginUser,
} from '../../components/context/UserContext';
import Header from './Header';
import HeroHome from './HeroHome';

import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';
import '../../css/style.scss';

const GOOGLE_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_CLIENT_ID ||
  '86145416008-2ns2quak8ilnuk8vihpc17h4jv6l09dg.apps.googleusercontent.com';

const AuthComponent = () => {
  const userDispatch = useUserDispatch();
  const history = useHistory();
  const { state } = useLocation();

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      theme="dark"
      buttonText="Sign In with Google"
      className="bg-blue-600 hover:bg-blue-700"
      onSuccess={(response) => {
        // setLoginLoading(true);
        loginUser(userDispatch, history, response, state);
      }}
      onFailure={(err) => {
        console.log(err);
        // setLoginLoading(false);
      }}
    />
  );
};

function LandingPage() {
  const { pathname } = useLocation();
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
    focusHandling('outline');
  }, [pathname]);
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header AuthComponent={AuthComponent} />
        <main className="flex-grow">
          <HeroHome AuthComponent={AuthComponent} />
        </main>
      </div>
    </>
  );
}

export default LandingPage;
