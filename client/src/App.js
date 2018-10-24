import React, { Component } from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost } from "@fortawesome/free-solid-svg-icons";

library.add(faGhost);

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Devboard</h1>
        <button className="btn btn-primary">btsns</button>
        <FontAwesomeIcon icon="ghost" />
      </div>
    );
  }
}

export default App;
