import web3 from './web3';

// address where the contract is deployed
const address = "0x3c1E9D9E31D11F62C9EEee33833B46AaEf194f5D"

// ABI of the contract
const abi =[{"constant":true,"inputs":[{"name":"_VIN","type":"uint256"}],"name":"getPreviousOwnerOfAsset","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getManufacturerName","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"owner","outputs":[{"name":"name","type":"string"},{"name":"geolocation","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_AssetSender","type":"address"},{"name":"_AssetReciever","type":"address"},{"name":"_NewOwnerName","type":"string"},{"name":"_VIN","type":"uint256"},{"name":"_geolocation","type":"string"}],"name":"transferToOwner","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_VIN","type":"uint256"},{"name":"_color","type":"string"},{"name":"_EngineType","type":"string"},{"name":"_geolocation","type":"string"},{"name":"_date","type":"string"}],"name":"createAsset","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getListOfAssetsOwnedByManufacturer","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_VIN","type":"uint256"}],"name":"getCurrentOwnerOfAsset","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_vinNumber","type":"uint256"}],"name":"getSpecificCar","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_mName","type":"string"},{"name":"_origin","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"},{"indexed":false,"name":"VIN","type":"uint256"},{"indexed":false,"name":"message","type":"string"}],"name":"AssetCreate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"},{"indexed":false,"name":"VIN","type":"uint256"},{"indexed":false,"name":"message","type":"string"}],"name":"RejectCreate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"AssetDoesNotExist","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ownerAdd","type":"address"},{"indexed":false,"name":"message","type":"string"}],"name":"AcceptOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ownerAdd","type":"address"},{"indexed":false,"name":"message","type":"string"}],"name":"RejectOwnership","type":"event"}];

// exports the contracts info on where it is deployed on the net
const Automobile_Contract =  new web3.eth.Contract(abi, address) 
export default Automobile_Contract;