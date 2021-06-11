import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import App from "app/App";
import { DevTools, loadServer } from "typezilla-mockserver";
import { AppProviders } from "contexts";
import reportWebVitals from "reportWebVitals";
import "antd/dist/antd.less";

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

reportWebVitals();
