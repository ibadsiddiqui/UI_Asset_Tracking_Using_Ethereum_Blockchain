import React, { Component } from 'react';

import Automobile_Contract from '../auto_mobile';
import web3 from '../web3';

export default class PreviousOwners extends Component {
    constructor(){
        super();
        this.state = {
            assetVIN:'',
            PreviousOwnersInfo:{},
        };

        this.getPreviousOwner = this.getPreviousOwner.bind(this)
    }
    async getPreviousOwner() {
        const {assetVIN} = this.state
        await Automobile_Contract.methods.getPreviousOwnerOfAsset(parseInt(assetVIN))
            .call()
            .then( result => 
                this.setState({
                    PreviousOwnersInfo: result
                })
                );
    }
    render(){
        const {PreviousOwnersInfo} = this.state;

        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Previous Owners Of: {this.state.assetVIN}</h5>
                    <input type="text" name="AssetVIN" placeholder="Enter VIN here:" className="form-control" onChange={(e) => this.setState({assetVIN: e.target.value})}/>
                    <button onClick={this.getPreviousOwner} className="btn btn-primary">Submit</button>
                    <ul className="list-group">            
                        <li className="list-group-item"> Name: {PreviousOwnersInfo[0]}</li>
                     <li className="list-group-item"> Location: {PreviousOwnersInfo[1]}</li>
                     <li className="list-group-item"> Name: {PreviousOwnersInfo[2]}</li>
                     <li className="list-group-item"> Location: {PreviousOwnersInfo[3]}</li>
                    </ul>
                </div>
            </div>
        )
    }
}