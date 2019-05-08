import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';

// import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
// const client = SwiftypeAppSearch.createClient({
//   hostIdentifier: process.env.REACT_APP_HOST_IDENTIFIER,
//   apiKey: process.env.REACT_APP_SEARCH_KEY,
//   engineName: "node-modules"
// });
// We can query for anything -- <code>foo</code> is our example.
// const query = "foo";
// const options = {};
// client.search(query, options)
//   .then(resultList => console.log(resultList))
//   .catch(error => console.log(error))

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
