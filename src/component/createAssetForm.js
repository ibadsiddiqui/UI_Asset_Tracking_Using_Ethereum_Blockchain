// get the react components classes
import React, { Component } from 'react';
import '../App.css';

// imports the contract address and ABI 
import Automobile_Contract from '../auto_mobile';
// access the web3 materials for accounts and others
import web3 from '../web3';

// for saving the list of accounts from web3
let accounts;

class AssetForm extends Component {
    constructor(){
        super();

        // state of class
        this.state = {};

        // binds the function to submit button for creating asset
        this.submitAsset = this.submitAsset.bind(this);
    }

    async componentDidMount(){

        // gets the details of the manufacturer (the one who deployed the contract) 
        const manufacturer_details = await Automobile_Contract.methods.getManufacturerName().call();
        
        // updates the state
        this.setState({
          manufacturer_name : manufacturer_details[0],
          manufacturer_origin : manufacturer_details[1],
        });

        // gets the accounts list using web3
        accounts = await web3.eth.getAccounts();
        console.log(accounts);
    }

    async submitAsset(e){
        e.preventDefault();

        // decontructs the values from the state of the class
        const {VIN, color, engineType, location,date} = this.state;
        
        // checks if the asset already exist for creation or not
        let assetChecker = false;    
        const listOfCars = await Automobile_Contract.methods.getListOfAssetsOwnedByManufacturer().call();
        
        // checks if it is in the list or not
        for (var i = 0; i < 5; i++) {
            console.log("checking if the asset already exist or not...");
            if(listOfCars[i] == VIN ){
                assetChecker = true;
            }
        }

        // if yes then quit
        if(assetChecker){
            alert('Asset Already there');
            return;
        }
        else{

            //  if not then see if the values entered 
            //  are corrected and are not empty
            if(VIN !== "" && color !== "" && engineType !== "" && location !== "" && date !== ""){
                alert('please enter data in the missing fields')                                
            } else{
                // commits a new transaction for creating the asset
                alert ("New asset");
                console.log('commiting transaction');

                // wait for the transaction to be completed
                await Automobile_Contract.methods.createAsset(VIN, color, engineType, location, date).send({
                    from: accounts[0],
                    gas: '3000000'
                })
                console.log('transaction completed');
            }
        }

    }

    render(){
        return (
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
        )
    }
}

export default AssetForm;