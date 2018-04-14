import React, { Component } from 'react';
import './css/getAssetDetails.css';


import Automobile_Contract from '../auto_mobile';
import web3 from '../web3';

export default class AssetDetails extends Component {
    constructor(){
        super();
        this.state = {
            searchDetails:'',
            assetDetails:[]
        };
        this.getSpecificAsset = this.getSpecificAsset.bind(this);
    }

    async getSpecificAsset(e) {
        e.preventDefault();
        const {searchDetails} = this.state;
        await Automobile_Contract.methods.getSpecificCar( parseInt(searchDetails)).call()
            .then( (result) => {
                this.setState({
                    assetDetails: result
                })
            });
            console.log(this.state.assetDetails)
    }

    render() {
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