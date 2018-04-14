import React, { Component } from 'react';
import '../App.css';
import Automobile_Contract from '../auto_mobile';
import web3 from '../web3';

let accounts;

class AssetForm extends Component {
    constructor(){
        super();

        this.state = {};
        this.submitAsset = this.submitAsset.bind(this);
    }

    async componentDidMount(){
        const manufacturer_details = await Automobile_Contract.methods.getManufacturerName().call();
        this.setState({
          manufacturer_name : manufacturer_details[0],
          manufacturer_origin : manufacturer_details[1],
        });
        accounts = await web3.eth.getAccounts();
        console.log(accounts);
    }

    async submitAsset(e){
        e.preventDefault();
        const {VIN, color, engineType, location,date} = this.state;
        console.log('commiting transaction')
        await Automobile_Contract.methods.createAsset(VIN, color, engineType, location, date).send({
          from: accounts[0],
          gas: '3000000'
        })
        console.log('transaction completed');
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