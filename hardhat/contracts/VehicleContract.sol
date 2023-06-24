// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/access/Ownable.sol";
import "./InsurancePolicyContract.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VehicleContract {
    using Counters for Counters.Counter;
    Counters.Counter private _newvehicleId;
    address public conowner;

    struct VehicleInfo {
        uint256 vehicleId;
        address vehicleOwnerAddress;
        string vehicledata;
        string licensePlate;
        uint256 policyId;
    }

    mapping(uint256 => VehicleInfo) private vehicles;
    address[] private vehicleAddresses;
    InsurancePolicyContract private insurancePolicyContract; // Add a reference to the InsurancePolicyContract
   

    event VehicleCreated(address indexed owner, string licensePlate, string vehicledata);

    constructor(address _insurancePolicyContractAddress) {
        insurancePolicyContract = InsurancePolicyContract(
            _insurancePolicyContractAddress
        );
        conowner = msg.sender;
    }

    function checkOwnership() public view returns (bool){
       return conowner == msg.sender;
    }

    function findyourPaymentId() public view returns(uint256){
        return insurancePolicyContract.userpaymentId(msg.sender);
    }

    function createVehicle(string memory _licensePlate, uint256 policyId, string memory vehicledata) public {
        require(
            bytes(_licensePlate).length > 0,
            "License plate cannot be empty"
        );
        require(insurancePolicyContract.policyExists(policyId), "Policy doesn't exist");
        _newvehicleId.increment();
        uint256 newVehicleId = _newvehicleId.current();

        vehicles[newVehicleId]= VehicleInfo(
            newVehicleId,
            msg.sender, 
            vehicledata, 
            _licensePlate, 
            policyId);
   
        vehicleAddresses.push(msg.sender);

        emit VehicleCreated(msg.sender, _licensePlate, vehicledata);
    }

    function getVehicle(uint256 index) public view returns (string memory) {
        return vehicles[index].licensePlate;
    }

    function checkVehicle(uint256 index, uint256 policyId) public view returns (bool) {
        return vehicles[index].policyId == policyId;
    }

    function updateLicensePlate(uint256 index, string memory _licensePlate) public {
        require(
            bytes(_licensePlate).length > 0,
            "License plate cannot be empty"
        );
        require(vehicleExists(index), "Vehicle does not exist");

        vehicles[index].licensePlate = _licensePlate;
    }

    function vehicleExists(uint256 index) public view returns (bool) {
        return bytes(vehicles[index].licensePlate).length > 0;
    }

    function getAllVehicles() public view returns (VehicleInfo[] memory) {
        uint nftCount = _newvehicleId.current();
        VehicleInfo[] memory lists = new VehicleInfo[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            VehicleInfo storage currentItem = vehicles[currentId];
            lists[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return lists;
    }

    function getMyVehicles() public view returns (VehicleInfo[] memory) {
        uint totalItemCount =  _newvehicleId.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;

        for(uint i=0; i < totalItemCount; i++)
        {
            if(vehicles[i+1].vehicleOwnerAddress == msg.sender){
                itemCount += 1;
            }
        }

        VehicleInfo[] memory items = new VehicleInfo[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(vehicles[i+1].vehicleOwnerAddress == msg.sender) {
                currentId = i+1;
                VehicleInfo storage currentItem = vehicles[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
    
    function getPolicyVehicles(uint256 _policyId) public view returns (VehicleInfo[] memory) {
        uint totalItemCount =  _newvehicleId.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;

        for(uint i=0; i < totalItemCount; i++)
        {
            if(vehicles[i+1].policyId == _policyId){
                itemCount += 1;
            }
        }

        VehicleInfo[] memory items = new VehicleInfo[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(vehicles[i+1].policyId == _policyId) {
                currentId = i+1;
                VehicleInfo storage currentItem = vehicles[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}