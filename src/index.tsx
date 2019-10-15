import * as Sentry from "@sentry/browser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.REACT_APP_COMMIT_ID
});

ReactDOM.render(<App />, document.getElementById("root"));
