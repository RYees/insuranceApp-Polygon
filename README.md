# Vehicle-Insurance-App-Aurora

An intellectual property (IP) right for a technical invention. It allows to prevent others from using once's invention and decide who is allowed to produce, sell or import your invention in those countries in which you own a valid patent. Right now this right  of ownership is given through patent and trademark offices based on different countries law. However, NFT tokens of blockchain technology functionality also allow users to prove their ownership of any piece of content, which is not possible with traditional IP rights tools like trademarks and copyrights.

# Table of content
* [Overview](#overview)
* [Usage implementing the project on Blockchain](#usage implementing the project on blockchain)
* [Workflow](#workflow)
* [Installion](#installation)

## Overview
This project is about creating a vehicle insurance system on the Aurora network, using the use cases of blockchain we aim to create the system on the blockchain tecnology and do every necessary trasaction with low fee on the aurora network. The project includes three sections:
Vehicle and Policy Verification:
The decentralized insurance system can be utilized for vehicle and policy verification by external entities such as regulatory authorities or financial institutions. The API allows these entities to query the system using specific parameters, such as owner addresses or policy IDs, to verify the existence and status of vehicles and insurance policies. This use-case enhances trust and transparency, enabling regulatory compliance and facilitating secure transactions, such as vehicle financing or cross-border travel with insurance coverage.

Policy Management:
Insurance companies can leverage the decentralized system to manage policies effectively. Through the API, insurers can create new policies, specify premium amounts, and update policy statuses as needed. The use of smart contracts ensures accurate and tamper-proof policy data, reducing the risk of fraud or data manipulation. Insurers can also retrieve policy information and associated claims easily, providing a comprehensive view of the policy lifecycle. This use-case simplifies policy administration, enhances data integrity, and enables insurers to offer better customer service.

Claims Processing:
The decentralized insurance system offers a use-case where policyholders can submit claims directly through the API, providing all the necessary details and supporting documentation. The smart contracts automatically validate the claim and initiate the review process. Claims adjusters can access the system to evaluate claims efficiently, reducing manual paperwork and streamlining the overall process. This use-case improves transparency and accelerates claims processing, ensuring policyholders receive timely and fair settlements.

## Usage implementing the project on Blockchain
1-Increased Security and Privacy: By leveraging crypto wallets for user identification and authorization, the decentralized insurance system ensures enhanced security and privacy. Traditional username/password authentication is replaced with the cryptographic security of crypto wallets, reducing the risk of unauthorized access and identity theft.

2-Transparent and Immutable Records: The utilization of blockchain technology eliminates the need for a centralized database. Instead, the system leverages the blockchain as a transparent and immutable ledger, recording vehicle registrations, insurance policies, and claim submissions. This provides a tamper-proof and auditable record of all interactions within the system.

3-Streamlined Claims Processing: With the decentralized insurance system, claims processing becomes streamlined and efficient. Through the integration of smart contracts, claims adjusters can quickly access claim information and documents, accelerating the assessment and decision-making process. This results in faster claim settlements and a smoother experience for policyholders.

4-User-Centric Experience: The integration of Alchemy's Create-Web3-Dapp package on the frontend enables a user-centric experience. Users like Angela can seamlessly interact with the system using their preferred crypto wallet, eliminating the need for separate login credentials and providing a familiar and secure environment.

5-Scalability and Reliability: Alchemy's infrastructure, used as the provider for the smart contracts, ensures scalability and reliability of the decentralized insurance system. With Alchemy's robust infrastructure, the system can handle a large number of users and transactions, providing a seamless experience even during peak periods.

6-Future Innovations: The decentralized insurance system opens the door for future innovations in the insurance industry. The use of blockchain technology allows for the exploration of new insurance models, such as peer-to-peer insurance or parametric insurance, providing opportunities for increased efficiency and cost-effectiveness.

## Workflow
Steps to do the project:
* Developing smart contract. 
   * With solidity programming
   * Deployed on the Aurora Network
* Building frontend web dapp
   * Designing the user interface with Reactjs and tailwind css

## Installation
    git clone https://github.com/RYees/insuranceApp-Polygon.git
cd hardhat
    npm install
create .env file and put aurora testnet account private key, infura api url for aurora
    npx hardhat compile
    npx hardhat run scripts/deploy.ts --network aurora_testnet
    
cd insuranceApp-ui
    npm install
replace the json files on the artifact under hardhat folder and the deployed contract address on the utils folder under the insuranceApp-ui > src folder
    npm start

You have to use two accounts to see the admin dashboard and user dashboard separately, the admin account has to be used to deploy the contracts 
