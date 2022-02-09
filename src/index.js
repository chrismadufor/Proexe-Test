import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import configureAppStore from "./store/configureStore";
import * as actions from "./store/users";

const store = configureAppStore();
store.subscribe(() => {});
// store.dispatch(actions.deleteUser({ id: 2 }));
store.dispatch({
  type: "apiCallBegan",
  payload: {
    url: "/data",
    method: "get",
    data: {},
    onSuccess: "usersFetched",
    onError: "usersFetchedFailed",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
