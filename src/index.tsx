import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import App from "app/App";

import { DevTools, loadServer } from "typezilla-mockserver";

import { AppProviders } from "contexts";
import reportWebVitals from "reportWebVitals";
import "antd/dist/antd.less";
import { Profiler } from "app/components/common/Profiler";
//

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Profiler id={"App"} phases={["mount"]}>
        <AppProviders>
          <DevTools />
          <App />
        </AppProviders>
      </Profiler>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

reportWebVitals();
