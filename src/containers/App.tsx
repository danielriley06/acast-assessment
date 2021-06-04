import { useMachine } from "@xstate/react";
import { episodesMachine } from "machines/episodesMachine";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { interpret } from "xstate";
import Toolbar from "@material-ui/core/Toolbar";
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
      <AppBar position="static">
        <Toolbar>
          <Link to="/episodes" style={{ color: "#FFFFFF", textDecoration: "none" }}>
            Episodes
          </Link>
        </Toolbar>
      </AppBar>

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
