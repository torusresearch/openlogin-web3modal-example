import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import Web3Modal from "web3modal";

class Web3ModalHandler {
  constructor() {
    this.provider = null;
    this.web3 = null;
    const providerOptions = {
      /* See Provider Options Section */
      torus: {
        package: Torus, // required
      },
    };
    this.web3Modal = new Web3Modal({
      network: "rinkeby",
      cacheProvider: true,
      providerOptions,
    });
  }

  async _onConnection() {
    const provider = await this.web3Modal.connect();
    this.provider = provider;
    this.web3 = new Web3(provider);
  }

  async connectWeb3() {
    if (this.web3Modal.cachedProvider) {
      await this._onConnection();
    }
  }

  async login() {
    this._onConnection();
  }

  async getUserInfo() {
    const accounts = await this.web3.eth.getAccounts();
    const balance = await this.web3.eth.getBalance(accounts[0]);
    let userInfo = {};
    if (this.provider.cachedProvider === "torus") {
      userInfo = await this.provider.torus.getUserInfo();
    }
    return { ...userInfo, publicAddress: accounts[0], balance };
  }

  async logout() {
    this.web3Modal.clearCachedProvider();
    this.provider = null;
    this.web3 = null;
  }
}

export default Web3ModalHandler;
