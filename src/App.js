import React from 'react';
import Editor from './components/Editor';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ContentBuilder from './pages/ContentBuilder';
import Dashboard from './pages/Dashboard';
import CourseLodaingPage from './pages/CourseLoading';
import { useUserState } from './components/context/UserContext';

function App() {
  const { isAuthenticated } = useUserState();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/editor" component={Editor} />
        <Route exact path="/course/:courseId" component={CourseLodaingPage} />
        <Route
          exact
          path="/course/:courseId/lesson/:lessonId"
          component={ContentBuilder}
        />
        {/* <Route path="/dashboard" component={OldDashboard} /> */}
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: '/', // Redirect to login path if un-authenticated
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}

export default App;
