// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./InsurancePolicyContract.sol"; // Import the InsurancePolicyContract
import "./VehicleContract.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ClaimContract is Ownable {  
    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _newclaimId;
    address public conowner;

    enum ClaimStatus {
        Submitted,
        Accepted,
        Rejected
    }

    struct Claim {
        uint256 claimId;
        uint256 policyId;
        address payable claimant;
        string description;
        ClaimStatus status;
    }

    mapping(uint256 => Claim) private claims;
    uint256 private nextClaimId = 1;
    InsurancePolicyContract private insurancePolicyContract; // Add a reference to the InsurancePolicyContract
    VehicleContract private vehicleContract;
    
    event ClaimSubmitted(
        uint256 indexed claimId,
        uint256 indexed policyId,
        address indexed claimant,
        string description
    );
    event ClaimStatusUpdated(uint256 indexed claimId, ClaimStatus status);

    constructor(address _insurancePolicyContractAddress, address _vehicleContract) {
        insurancePolicyContract = InsurancePolicyContract(
            _insurancePolicyContractAddress
        );

        vehicleContract = VehicleContract(
            _vehicleContract
        );
        conowner = msg.sender;
        transferOwnership(msg.sender);
    }
    
    function checkOwnership() public view returns (bool){
       return conowner == msg.sender;
    }

    function submitClaim(uint256 index, uint256 _policyId, string memory _description) public {
        _newclaimId.increment();
        require(_policyId >= 0, "Invalid policy ID");
        require(bytes(_description).length > 0, "Description cannot be empty");
        uint256 newClaimId = _newclaimId.current();
        
        require(insurancePolicyContract.policyExists(_policyId), "Policy doesn't exist"); // Check if policy exists
        require(vehicleContract.checkVehicle(index, _policyId), "You haven't registered for these policy, You can not claim");
        //require(owner() == msg.sender, "Only contract owner can submit claims");

        claims[newClaimId] = Claim(
            newClaimId,
            _policyId,
            payable(msg.sender),
            _description,
            ClaimStatus.Submitted
        );
        emit ClaimSubmitted(newClaimId, _policyId, msg.sender, _description);

        insurancePolicyContract.associateClaim(_policyId, newClaimId); // Associate the claim with the policy

    }

    function getClaim(
        uint256 _claimId
    )
        public
        view
        returns (
            uint256 policyId,
            address claimant,
            string memory description,
            ClaimStatus status
        )
    {
        Claim storage claim = claims[_claimId];
        require(claim.claimant != address(0), "Claim does not exist");

        return (
            claim.policyId,
            claim.claimant,
            claim.description,
            claim.status
        );
    }

    function updateClaimStatus(
        uint256 _claimId,
        ClaimStatus _status
    ) public onlyOwner {
        Claim storage claim = claims[_claimId];
        require(claim.claimant != address(0), "Claim does not exist");

        claim.status = _status;
        emit ClaimStatusUpdated(_claimId, _status);
    }
    
    function claimPaid(uint index, address _claimerAddress) public payable onlyOwner{
        require(msg.value > 0, "Ether amount must be greater than zero");
        require(claims[index].claimant == _claimerAddress, "Incorrect claimant address");
        require(claims[index].status == ClaimStatus.Accepted, "Claimant has to be first accepted");
        payable(_claimerAddress).transfer(msg.value);
    }

   function listAllClaims() public view returns (Claim[] memory) {
        uint Count = _newclaimId.current();
        Claim[] memory  lists = new Claim[](Count);
        uint currentIndex = 0;
        uint currentId;

        for(uint i=0; i<Count; i++)
        {
            currentId = i + 1;
            Claim storage currentItem = claims[currentId];
            lists[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return lists;
    }

    function getMyClaim() public view returns (Claim[] memory) {
        uint totalItemCount =  _newclaimId.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;

        for(uint i=0; i < totalItemCount; i++)
        {
            if(claims[i+1].claimant == msg.sender){
                itemCount += 1;
            }
        }

        Claim[] memory items = new Claim[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
            if(claims[i+1].claimant == msg.sender) {
                currentId = i+1;
                Claim storage currentItem = claims[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
   
 }