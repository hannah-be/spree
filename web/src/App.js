import React, { Component } from "react";
import SignInForm from "./components/SignInForm";
import "./App.css";
import { Header } from "./components/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SignInForm />
      </div>
    );
  }
}

export default App;
