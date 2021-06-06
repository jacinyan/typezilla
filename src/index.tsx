import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import App from "app/App";
import { DevTools, loadServer } from "typezilla-mockserver";
import { AppProviders } from "contexts";
import reportWebVitals from "reportWebVitals";
// have loadServer and DevTools override antd default styles
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
