import React, { Component } from 'react';
import './App.css';
import './index.css';
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";

const client = SwiftypeAppSearch.createClient({
  hostIdentifier: process.env.REACT_APP_HOST_IDENTIFIER,
  apiKey: process.env.REACT_APP_API_KEY,
  engineName: "node-modules"
});

const query = "foo";
const options = {};
client.search(query, options)
  .then(resultList => console.log(resultList))
  .catch(error => console.log(error))

class App extends Component {
  state = {
    response: null
  };
  componentWillMount() {
    this.performQuery("foo");
  }
  // query method 
  performQuery = queryString => {
    client.search(queryString, {})
      .then(
        response => {
          console.log(response);
          this.setState({ response });
        },
        error => {
          console.log(`error: ${error}`);
        }
      );
  };

  render() {
    const {response} = this.state;
    if (!response) return null; 
  
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Node Module Search
            </h1>
          </header>
          {/* total count of results */}
          <h2>
          {response.info.meta.page.total_results} Results
          </h2>
          {/* map results for name and disc */}
          {response.results.map(result => (
            <div key={result.getRaw("id")}>
              <p>Name: {result.getRaw("name")}</p>
              <p>Description: {result.getRaw("description")}</p>
            </div>
          ))}
        </div>
      );

  }
}

export default App;
