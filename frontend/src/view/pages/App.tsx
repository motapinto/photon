import React from "react";
import '../css/App.css';
import AppRouter from "./AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(): JSX.Element {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}
