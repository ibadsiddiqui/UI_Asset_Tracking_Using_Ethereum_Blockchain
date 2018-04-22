// import react component classes
import React, { Component } from 'react';
import '../App.css';

// component
import PreviousOwners from './getPreviousOwner';

// contract things
import Automobile_Contract from '../auto_mobile';
import web3 from '../web3';

// for saving accounts from web3
let accounts;

export default class GetAsset extends Component {
    constructor() {
        super();

        // defines the state for class
        this.state = {
            list_of_asset:[],
            manufacturer_name:"",
        };

        // binds the function to the submit button
        this.getAsset = this.getAsset.bind(this);
    }


    async componentDidMount(){
        // gets the details of manufacturer
        const manufacturer_details = await Automobile_Contract.methods.getManufacturerName().call();

        // updates the state
        this.setState({
          manufacturer_name : manufacturer_details[0],
        });

        // gets the account from the web3 service
        accounts = await web3.eth.getAccounts();
        console.log(accounts);
    }

    async getAsset(e){
        e.preventDefault();

        // gets the list of manufactured assets by the manufacturer
        await Automobile_Contract.methods.getListOfAssetsOwnedByManufacturer().call()
        .then( (result) =>{
            
            // updates the list
            this.setState({
              list_of_asset: [...result]
            });
          
        })
        console.log(this.state.list_of_asset);  
    }
    render(){
        // deconstruct the list from the state
        const {list_of_asset} = this.state;

        // maps the list to li-tags
        const list = list_of_asset.map((value) => <li className="list-group-item" key={value.toString()}>{value}</li>)

        return (
            <div className="col">
                <div className="card difference">
                    <div className="card-body">
                        <h5 className="card-title">Assets Manufactured By {this.state.manufacturer_name}</h5>
                        <button onClick={this.getAsset} className="btn btn-primary">Submit</button>
                        <ul className="list-group">
                            {list}
                        </ul>
                    </div>
                </div>
                <PreviousOwners/>
            </div>
        )
    }
}
