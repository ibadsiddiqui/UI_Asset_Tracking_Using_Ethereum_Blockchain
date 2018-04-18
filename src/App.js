import React, { Component } from 'react';
import './App.css';

// components
import AssetForm from './component/createAssetForm';
import GetAsset from './component/getAssetComponent';
import AssetDetails from './component/getAssetDetails';
import GetCurrentOwner from './component/getCurrentOwner';


import Automobile_Contract from './auto_mobile';
import web3 from './web3';


// let assets
class App extends Component {
  constructor(){
    super();
    this.state = {
      assetSenderAddress: '',
      assetRecieverAddress: '',
      assetRecieverName:'',
      assetVIN:'',
      assetRecievers_Location:''
    };
    this.submitAsset = this.submitAsset.bind(this)
  }

  async submitAsset() {
    const {
      assetRecieverName, 
      assetRecieverAddress, 
      assetRecievers_Location, 
      assetSenderAddress, 
      assetVIN
    } = this.state;

    console.log('Transfering asset...')
    await Automobile_Contract.methods.
      transferToOwner(assetSenderAddress.toString(), assetRecieverAddress.toString(), assetRecieverName, parseInt(assetVIN), assetRecievers_Location)
      .send({
        from: assetSenderAddress.toString(),
        gas: '3000000'
      }).then(console.log);
    console.log('Asset transfer complete!')
  }


  render() {

    return (
      <div className="App">
        {/* Header form for asset creation  */}
        <header>
          <AssetForm/>
        </header>  

        {/* Main components form for asset info retrieval  */}

        <main className = "row trimmed">
          <GetAsset/>
          <AssetDetails/>
          <GetCurrentOwner/>
        </main>

        {/* form for transfering of asset */}
        <div className="row transferForm" >
         <div className="card">
            <div className="card-body">
              <h5 className="card-title">Transfering Asset Form:</h5>
                            
              <div className="row">
                <div className="col">
                  <label htmlFor="VIN">Enter Name of  Reciever: </label>
                  <input type="text" name="VIN" className="form-control" onChange={(e) => this.setState({assetRecieverName: e.target.value})}/>
                </div>
                <div className="col">
                  <label htmlFor="VIN">Enter Address of  Reciever: </label>
                  <input type="text" name="VIN" className="form-control" onChange={(e) => this.setState({assetRecieverAddress: e.target.value})}/>
                </div>
                <div className="col">
                  <label htmlFor="color">Enter Address of Sender:</label>
                  <input type="text" name="color" className="form-control" onChange={(e) => this.setState({assetSenderAddress: e.target.value})}/>
                </div>
                <div className="col">
                  <label htmlFor="AssetVIN">Enter Asset VIN:</label>
                  <input type="text" name="AssetVIN" className="form-control" onChange={(e) => this.setState({assetVIN: e.target.value})}/>
                </div>
                <div className="col">
                  <label htmlFor="location">Location to be transfered:</label>
                  <input type="text" name="location" className="form-control" onChange={(e) => this.setState({assetRecievers_Location: e.target.value})}/>
                </div>
              </div>
              <button onClick={this.submitAsset} className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
