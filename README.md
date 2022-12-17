Decentragram

https://dinsta.vercel.app/ 

Decentragram is a decentralized Instagram clone built on Ethereum. It is a simple dApp that allows users to upload images to the blockchain and view them on the front-end.

The dApp is built using the Truffle framework and React.js. The front-end is built using React.js and the back-end is built using Solidity.

The dApp is deployed on the Goerli testnet.

Features

Users can upload images to the blockchain

Users can view images uploaded by other users

Users can tip other users for their images

Users can view the total number of tips an image has received


Getting Started

Create a .env file in the root directory and add the following:

```shell
GOERLI_URL = YOUR_GOERLI_URL
ALCHEMY_API_KEY = YOUR_ALCHEMY_API_KEY
MNEMONIC = Wallet mnemonic
REACT_APP_PINATA_API_KEY = YOUR_PINATA_API_KEY
REACT_APP_PINATA_API_SECRET = YOUR_PINATA_API_SECRET
REACT_APP_PINATA_API_JWT = YOUR_PINATA_API_JWT
```

Install dependencies

```shell
npm install
```

Start the development blockchain

```shell
truffle develop
```

Compile and migrate the smart contracts

```shell

truffle(develop)> compile

truffle(develop)> migrate
```

In a separate terminal window, start the React app

```shell
npm run start
```

Deployed Contracts

The Decentragram dApp is deployed on the Goerli testnet. The contract addresses are as follows:


```shell
Network: goerli (id: 5)

Decentragram : 0xC70cdaF1945dd547407A5961118679be5A41f3D5

Migrations : 0xa784554Fc1B3875AF8CB6bbbeAb0a4503bEF5aCa
```

<!-- OLD CONTRACTS -->
<!-- # Decentragram: 0xF71D30cb0d73D15177a585C9fB073cf07f62Cf11 -->
<!-- # Migrations: 0xD74c85d3286034192904DC6B553654AAAb31ef60 -->


