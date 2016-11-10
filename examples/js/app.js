"use strict";

import react from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory, IndexRoute, IndexRedirect } from "react-router";
import WizardExample  from "./WizardExample";


render((
    <Router history={hashHistory}>
      <Route path="/" component={WizardExample}/>
    </Router>
  ), document.getElementById("wizardexample"));

