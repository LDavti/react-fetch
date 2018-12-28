import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this._header = ["title", "director", "producer", "description"];
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch("https://ghibliapi.herokuapp.com/films").then(res => res.json()).then(json => this.setState({data: json}));
  }

  render() {
    const {data} = this.state;
    return (
      <div className="App">
        {
          data === null ? "Loading..." : (
            <table>
              <thead>
                <tr>
                {
                  this._header.map(key => (
                    <th key={key}>
                      {key}
                    </th>
                  ))
                }
                </tr>
              </thead>
              <tbody>
                {
                  data.map(film => (
                    <tr key={film.id}>
                      {
                        this._header.map((key, i) => (
                          <td key={i}>
                            <div style={{maxWidth: 400, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}} title={film[key]}>{film[key] || "N/A"}</div>
                          </td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
    );
  }
}

export default App;
