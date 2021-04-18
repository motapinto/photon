import React from "react";
import '../css/App.css';
import AppRouter from "./AppRouter";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}
