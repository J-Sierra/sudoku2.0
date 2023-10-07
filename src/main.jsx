import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SudokuProvider } from "./Context/SudokuContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SudokuProvider>
      <App />
    </SudokuProvider>
  </React.StrictMode>,
);
