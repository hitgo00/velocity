import Editor from "./components/Editor";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/editor" component={Editor} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
