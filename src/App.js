import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.APPID = 'c9312c18ec2fb0b9e3750efb67831070';
  }

  handleChange(event) {
    this.setState({ value: $('#pincode').val() });
    if ($('#pincode').val().length === 6) {
      $('#pincode').prop('disabled', true);
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${$('#pincode').val()},in&APPID=${this.APPID}`)
        .then(res => res.json())
        .then(
          (result) => {
            $('#pincode').prop('disabled', false);
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            $('#pincode').prop('disabled', false);
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
        
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <input type="text" value={this.state.value} name="pincode" id="pincode" placeholder="Enter ZipCode.." maxLength="6"
          onChange={this.handleChange}
        />
        <table id="weather-report" className="table table-striped table-bordered" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Area</th>
              <th>Co-ordinates</th>
              <th>Main Temp</th>
              <th>Humidity</th>
              <th>Pressure</th>
              <th>Temp-min</th>
              <th>Temp-Max</th>
              <th>Wind Speed</th>
            </tr>
          </thead>

          {(this.state.items && !this.state.items.message) ?
            <tbody>
              <tr>
                <td>
                  {this.state.items.name}
                </td>
                <td>
                  {this.state.items.coord.lon}
                  {this.state.items.coord.lat}
                </td>
                <td>
                  {this.state.items.main.temp}

                </td>
                <td>
                  {this.state.items.main.humidity}

                </td>
                <td>
                  {this.state.items.main.pressure}

                </td>
                <td>
                  {this.state.items.main.temp_min}
                </td>
                <td>
                  {this.state.items.main.temp_max}
                </td>
                <td>
                  {this.state.items.wind.speed}
                  {this.state.items.wind.deg}</td>

              </tr>


            </tbody>
            :
            (this.state.items && this.state.items.message) ?
              <div>{this.state.items.message}</div>
              :
              ''
          }
        </table>

      </div>
    );
  }
}

export default App;
