import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import "./App.css";
import EpisodesContainer from "./EpisodesContainer";

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/episodes">Episodes</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/episodes">
            <EpisodesContainer />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
