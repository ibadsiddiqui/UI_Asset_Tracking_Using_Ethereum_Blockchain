// import react components
import React, { Component } from 'react';
import './App.css';

// components added to the site
import AssetForm from './component/createAssetForm';
import GetAsset from './component/getAssetComponent';
import AssetDetails from './component/getAssetDetails';
import GetCurrentOwner from './component/getCurrentOwner';


// imports the contract's ABI and address
import Automobile_Contract from './auto_mobile';

// accesses the web3 providers and accounts
import web3 from './web3';


class App extends Component {
  constructor(){
    super();

    // defines the states required for the class to change data on the contract
    this.state = {
      assetSenderAddress: '',
      assetRecieverAddress: '',
      assetRecieverName:'',
      assetVIN:'',
      assetRecievers_Location:''
    };

    // binds the function of the submit button
    this.submitAsset = this.submitAsset.bind(this)
  }

  // function for the submit button
  async submitAsset() {
    // decontructs the values from the state of the class
    const {
      assetRecieverName, 
      assetRecieverAddress, 
      assetRecievers_Location, 
      assetSenderAddress, 
      assetVIN
    } = this.state;

    // transfers the asset to other owner
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
