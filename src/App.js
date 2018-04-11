import React, { Component } from 'react';
import './App.css';

import Automobile_Contract from './auto_mobile';
import web3 from './web3';

let accounts;
let assets
class App extends Component {
  constructor(){
    super();
    this.state = {};
    this.submitAsset = this.submitAsset.bind(this);
    this.getAsset = this.getAsset.bind(this);
  }
  async componentDidMount(){
    const manufacturer_details = await Automobile_Contract.methods.getManufacturerName().call();
    this.setState({
      manufacturer_name : manufacturer_details[0],
      manufacturer_origin : manufacturer_details[1],
    });
  }

  async submitAsset(){
    accounts = await web3.eth.getAccounts();
    
  }
  async getAsset(){
    // assets = await  
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">manufacturer: {this.state.manufacturer_name}, origin: {this.state.manufacturer_origin}</h1>
          <form>
            <div className="row">
              <div className="col">
                <label htmlFor="VIN">Enter VIN:</label>
                <input type="text" name="VIN" className="form-control" onChange={(e) => this.setState({VIN: e.target.value})}/>
              </div>
              <div className="col">
                <label htmlFor="color">Enter Color:</label>
                <input type="text" name="color" className="form-control" onChange={(e) => this.setState({color: e.target.value})}/>
              </div>
              <div className="col">
                <label htmlFor="enginetype">Enter Engine Type:</label>
                <input type="text" name="enginetype" className="form-control" onChange={(e) => this.setState({engineType: e.target.value})}/>
              </div>
              <div className="col">
                <label htmlFor="location">Enter Location:</label>
                <input type="text" name="location" className="form-control" onChange={(e) => this.setState({location: e.target.value})}/>
              </div>
              <div className="col">
                <label htmlFor="date">Enter Date:</label>
                <input type="text" name="date" className="form-control" onChange={(e) => this.setState({date: e.target.value})}/>
              </div>
            </div>
            <button onClick={this.submitAsset} className="btn btn-primary">Submit</button>
          </form>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
