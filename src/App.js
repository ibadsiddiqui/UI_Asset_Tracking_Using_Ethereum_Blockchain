import React, { Component } from 'react';
import './App.css';

import AssetForm from './component/createAssetForm';
import GetAsset from './component/getAssetComponent';
import AssetDetails from './component/getAssetDetails';

import Automobile_Contract from './auto_mobile';
import web3 from './web3';


// let assets
class App extends Component {
  constructor(){
    super();
  }



  render() {

    return (
      <div className="App">
        <header>
          <AssetForm/>
        </header>  

        <main className = "row">
          <GetAsset/>
          
          <AssetDetails/>
        </main>


      </div>
    );
  }
}

export default App;
