import { useMachine } from "@xstate/react";
import { episodesMachine } from "machines/episodesMachine";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { interpret } from "xstate";
import Home from "../components/Home";
import "./App.css";
import EpisodesContainer from "./EpisodesContainer";

const App: React.FC = () => {
  const episodesService = interpret(episodesMachine).onTransition((state) =>
    console.log(state.value)
  );

  episodesService.start();

  return (
    <div className="App">
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
          <EpisodesContainer episodesService={episodesService} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
