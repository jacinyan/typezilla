import React from "react";
import ReactDOM from "react-dom";
import App from "app/App";
import reportWebVitals from "reportWebVitals";
import { loadDevTools } from "typezilla-mockserver";
import { AppProviders } from "contexts";
import "index.css";
//override loadDevTools
import "antd/dist/antd.less";

loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
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
