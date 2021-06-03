import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

import "./index.css";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { history } from "./utils/historyUtils";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#fff",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
