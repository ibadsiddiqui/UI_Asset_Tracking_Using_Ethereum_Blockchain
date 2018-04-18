// import react component classes
import React, { Component } from 'react';
import './css/getCurrentOwner.css';

// contract things
import Automobile_Contract from '../auto_mobile';
import web3 from '../web3';

export default class GetCurrentOwner extends Component {
    constructor(){
        super();

        // defines the state for class
        this.state = {}

        // binds the function to the submit button        
        this.getCurrentOwner = this.getCurrentOwner.bind(this);
    }

    async getCurrentOwner(e) {
        e.preventDefault();

        // deconstructs the state object for VIN of asset
        const {VINNumber} = this.state;

        // gets the current owner of the asset
        await Automobile_Contract.methods.getCurrentOwnerOfAsset(parseInt(VINNumber)).call()
            .then(result => {
                
                // updates the state
                this.setState({
                    OwnerName: result[0],
                    OwnerLocation: result[1]
                })
            });    
    }

    render() {
        return (
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Get Current Owner Of Asset: {this.state.VINNumber}</h5>
                        <input type="text" name="detais" className="form-control" onChange={(e) => this.setState({VINNumber: e.target.value})}/>                
                        <button onClick={this.getCurrentOwner} className="btn btn-primary">Submit</button>
                        <h6>
                            Current Owner: 
                            <span className="currentOwner">
                                {this.state.OwnerName}
                            </span>
                        </h6> 
                        <h6>
                            Current Owner's Location: 
                            <span className="currentLocation">
                                {this.state.OwnerLocation}
                            </span>
                        </h6> 

                    </div>
                </div>
            </div>
        )
    }
}