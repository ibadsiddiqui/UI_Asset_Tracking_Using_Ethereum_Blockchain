import React, { Component } from 'react';
import '../App.css';

import Automobile_Contract from '../auto_mobile';
import web3 from '../web3';

export default class AssetDetails extends Component {
    constructor(){
        super();
        this.state = {};
        this.getCurrentOnwer = this.getCurrentOwner.bind(this);
    }

    async getSpecificAsset() {
        let specificAsset = {};
        // const {searchDetails} = this.state
        await Automobile_Contract.methods.getSpecificCar( parseInt(this.state.searchDetails)).call().then(console.log)
    }

    render() {
        return (
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Get Details Of Asset {this.state.manufacturer_name}</h5>
                        <input type="text" name="detais" className="form-control" onChange={(e) => this.setState({searchDetails: e.target.value})}/>                
                        <button onClick={this.getSpecificAsset} className="btn btn-primary">Submit</button>
                        {/* <p>{this.state.list_of_asset[0]}</p> */}
                    </div>
                </div>
            </div>
        )
    }
}