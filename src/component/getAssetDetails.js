// import react component classes
import React, { Component } from 'react';
import './css/getAssetDetails.css';

// contract things
import Automobile_Contract from '../auto_mobile';
import web3 from '../web3';

export default class AssetDetails extends Component {
    constructor(){
        super();

        // defines the state for class        
        this.state = {
            searchDetails:'',
            assetDetails:[]
        };

        // binds the function to the submit button        
        this.getSpecificAsset = this.getSpecificAsset.bind(this);
    }

    async getSpecificAsset(e) {
        e.preventDefault();

        // deconstructs the state for searchDetails
        const {searchDetails} = this.state;

        // gets the specific asset required
        await Automobile_Contract.methods.getSpecificCar( parseInt(searchDetails)).call()
            .then( (result) => {
                
                //updates the result in state
                this.setState({
                    assetDetails: result
                })
            });
            console.log(this.state.assetDetails)
    }

    render() {
        // deconstructs the state for asset details
        const {assetDetails} = this.state;

        return (
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Get Details Of Asset {this.state.manufacturer_name}</h5>
                        <input type="text" name="detais" className="form-control" onChange={(e) => this.setState({searchDetails: e.target.value})}/>                
                        <button onClick={this.getSpecificAsset} className="btn btn-primary">Submit</button>
                        <h6>
                            Lot Number:
                            <span className="lotNumber">
                                {assetDetails[0]}
                            </span>
                        </h6> 
                        <h6>
                            Color: 
                            <span className="colorClass">
                                {assetDetails[1]}
                            </span>
                        </h6>
                        <h6>
                            Engine Type: 
                            <span className="engineType">
                                {assetDetails[2]}
                            </span>
                        </h6> 
                        <h6>
                            Date of Manufacture: 
                            <span className="dateOfManufacturer">
                                {assetDetails[3]}
                            </span>
                        </h6> 
                        <h6>
                            Manufacturing Origin: 
                            <span className="mOrigin">
                                {assetDetails[4]}
                            </span>
                        </h6> 

                    </div>
                </div>
            </div>
        )
    }
}