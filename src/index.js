/* React */
import React from "react";
import ReactDOM from "react-dom";

/* Redux */
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "library/common/reducers";

/* Misc */
import App from "./App";

const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
