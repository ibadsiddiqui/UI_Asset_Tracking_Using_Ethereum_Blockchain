import React, { Component } from 'react';
import '../App.css';

import Automobile_Contract from '../auto_mobile';
import web3 from '../web3';

let accounts;

export default class GetAsset extends Component {
    constructor() {
        super();
        this.state = {
            list_of_asset:[],
            manufacturer_name:"",
        };
        this.getAsset = this.getAsset.bind(this);
    }


    async componentDidMount(){
        const manufacturer_details = await Automobile_Contract.methods.getManufacturerName().call();
        this.setState({
          manufacturer_name : manufacturer_details[0],
        });
        accounts = await web3.eth.getAccounts();
        console.log(accounts);
    }

    async getAsset(e){
        // e.preventDefault();
        let assets = [];
        await Automobile_Contract.methods.getListOfAssetsOwnedByManufacturer().call()
          .then( (result) =>{
            this.setState({
              list_of_asset: [...result]
            });
          })
        console.log(this.state.list_of_asset);  
    }
    render(){
        const {list_of_asset} = this.state;
        const list = list_of_asset.map((value) => <li className="list-group-item" key={value.toString()}>{value}</li>)
        return (
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Assets Manufactured By {this.state.manufacturer_name}</h5>
                        <button onClick={this.getAsset} className="btn btn-primary">Submit</button>
                        <ul className="list-group">
                        {list}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
