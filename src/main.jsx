import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { configureStore } from "@reduxjs/toolkit";
import { ToastContainer } from "react-toastify";

import reducer from "@/reducers/index.js";
import App from "./App";

import "../public/css/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

const customTheme = {
  dialog: {
    styles: {
      sizes: {
        md: {
          width: "w-3/4 md:3/5 xl:w-2/5 2xl:w-1/3",
          minWidth:
            "min-w-[75%] md:min-w-[60%] xl:min-w-[40%] 2xl:min-w-[33.3%]",
          maxWidth:
            "max-w-[75%] md:max-w-[60%] xl:max-w-[40%] 2xl:max-w-[33.3%]",
        },
      },
    },
  },
};

const store = configureStore({
  reducer,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider value={customTheme}>
        <MaterialTailwindControllerProvider>
          <App />
          <ToastContainer />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
