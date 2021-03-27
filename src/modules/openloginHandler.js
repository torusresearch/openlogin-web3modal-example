import OpenLogin from "@toruslabs/openlogin";
import Web3 from "web3";

const INFURA_NODE_URL = "https://mainnet.infura.io/v3/73d0b3b9a4b2499da81c71a2b2a473a9";

class OpenLoginHandler {
  constructor() {
    this.sdkInstance = new OpenLogin({ clientId: "random_id", iframeUrl: "http://localhost:3000" });
  }

  async _onConnection() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(INFURA_NODE_URL));
  }

  async connectWeb3() {
    await this.sdkInstance.init();
    if (this.sdkInstance.privKey) {
      await this._onConnection();
    }
  }

  async login(email) {
    await this.sdkInstance.login({
      loginProvider: "torus_passwordless",
      _loginHint: email,
      redirectUrl: `${window.origin}/dashboard`,
    });
  }

  async getUserInfo() {
    const account = this.web3.eth.accounts.privateKeyToAccount(this.sdkInstance.privKey);
    const publicAddress = account.address;
    const balance = await this.web3.eth.getBalance(publicAddress);
    return { publicAddress, balance };
  }

  async logout() {
    await this.sdkInstance.logout();
    // todo: redirect to login page
  }
}

export default OpenLoginHandler;
