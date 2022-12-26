import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Decentragram from "../abis/Decentragram.json";
import "font-awesome/css/font-awesome.min.css";
import Navbar from "./Navbar";
import Main from "./Main";
import axios from "axios";
const FormData = require("form-data");

require("dotenv").config();

const key = process.env.REACT_APP_PINATA_API_KEY;
const secret = process.env.REACT_APP_PINATA_API_SECRET;

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = Decentragram.networks[networkId];
    if (networkData) {
      const decentragram = web3.eth.Contract(
        Decentragram.abi,
        networkData.address
      );

      this.setState({ decentragram: decentragram });
      const imageCount = await decentragram.methods.imageCount().call();
      this.setState({ imageCount });

      //load images
      for (var i = 1; i <= imageCount; i++) {
        const image = await decentragram.methods.images(i).call();
        this.setState({
          images: [...this.state.images, image],
        });
      }

      //sort images. Show highest tipped images first
      this.setState({
        images: this.state.images.sort((a, b) => b.tipAmount - a.tipAmount),
      });

      this.setState({ loading: false });
    } else {
      window.alert("Peer Pix contract not deployed to detected network.");
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  captureFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  uploadImage = (description) => {
    console.log("Submitting file to ipfs...");
    new Promise(async (resolve, reject) => {
      try {
        const blob = new Blob([this.state.buffer], {
          type: "image/png",
        });
        let data = new FormData();

        data.append("file", blob, "image.png");

        await axios
          .post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
              pinata_api_key: key,
              pinata_secret_api_key: secret,
            },
          })
          .then((result) => {
            this.setState({ loading: true });
            this.state.decentragram.methods
              .uploadImage(result.data.IpfsHash, description)
              .send({ from: this.state.account })
              .on("transactionHash", (hash) => {
                this.setState({ loading: false });
              })
              .then(() => this.forceUpdate())
              .catch((err) => console.log(err));
            resolve();
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  tipImageOwner = (id, tipAmount) => {
    this.setState({ loading: true });
    this.state.decentragram.methods
      .tipImageOwner(id)
      .send({ from: this.state.account, value: tipAmount })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  showModal = () => {
    this.setState({ showModalState: !this.state.showModalState });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      decentragram: null,
      images: [],
      loading: true,
      showModalState: false,
    };
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} showModal={this.showModal} />
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <Main
            images={this.state.images}
            captureFile={this.captureFile}
            uploadImage={this.uploadImage}
            tipImageOwner={this.tipImageOwner}
            showModalState={this.state.showModalState}
            // Code...
          />
        )}
      </div>
    );
  }
}

export default App;
