import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    </React.StrictMode>
);
