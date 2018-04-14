import React, { Component } from 'react';
import '../App.css';

import Automobile_Contract from '../auto_mobile';
import web3 from '../web3';

export default class GetCurrentOwner extends Component {
    state = {}
    constructor(){
        super();
        this.getCurrentOwner = this.getCurrentOwner.bind(this);
    }

    async getCurrentOwner(e) {
        e.preventDefault();
        const {VINNumber} = this.state;

        await Automobile_Contract.methods.getCurrentOwnerOfAsset(VINNumber).call().then(console.log);
    
    }

    render() {
        return (
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Get Details Of Asset: {this.state.VINNumber}</h5>
                        <input type="text" name="detais" className="form-control" onChange={(e) => this.setState({VINNumber: e.target.value})}/>                
                        <button onClick={this.getCurrentOwner} className="btn btn-primary">Submit</button>
                        {/* <p>{this.state.list_of_asset[0]}</p> */}
                    </div>
                </div>
            </div>
        )
    }
}