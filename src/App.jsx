import "./App.css";

import { Route, Switch } from "react-router-dom";

import Home from "./containers/home";
import Login from "./containers/login";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/dashboard" exact>
          <Home />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
