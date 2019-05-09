import React, { Component } from 'react';
import './App.css';
import './index.css';
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
import { debounce } from "lodash"; // Import debounce


const client = SwiftypeAppSearch.createClient({
  hostIdentifier: process.env.REACT_APP_HOST_IDENTIFIER,
  apiKey: process.env.REACT_APP_API_KEY,
  engineName: "node-modules"
});

// const query = "foo";
// const options = {};
// client.search(query, options)
//   .then(resultList => console.log(resultList))
//   .catch(error => console.log(error))

class App extends Component {
  state = {
    // updated via updateQuery()
    queryString: "",
    // updated via performQuery()
    response: null
  };
  componentDidMount() {
  // execute search
    this.performQuery(this.state.queryString);
  }
  updateQuery= e => {
    const queryString = e.target.value;
    // save the user-entered string
    this.setState(
      { queryString },
      () => {
        // trigger new search
        this.performQuery(queryString);
      }
    )
  }
  // query method 
  performQuery = debounce(queryString => {
    client.search(queryString, {})
      .then(
        response => {
          // console.log(response);
          this.setState({ response });
        },
        error => {
          console.log(`error: ${error}`);
        }
      );
      //Debounce: wait 200ms before update/perform query
  }, 300);

  render() {
    const {response, queryString} = this.state;
    if (!response) return null; 
  
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Node Module Search
            </h1>
          </header>
           {/* search input box */}
          <input
          className="App-search-box"
          type="text"
          placeholder="Search for node modules"
          value={queryString}
          onChange={this.updateQuery}
        />
          {/* total count of results */}
          <h2>
          {response.info.meta.page.total_results} Results
          </h2>
          {/* map results for name and disc */}
          {response.results.map(result => (
            <div className="result-single" key={result.getRaw("id")}>
              <p>Name: {result.getRaw("name")}</p>
              {result.getRaw("description") &&
                <p>Description: {result.getRaw("description")}</p>
              }
              {result.getRaw("homepage") &&
                <p>Website: {result.getRaw("homepage")}</p> 
              }
              {result.getRaw("license") &&
                <p>License: {result.getRaw("license")}</p>
              }
            </div>
          ))}
        </div>
      );

  }
}

export default App;
