import OpenLogin from "@toruslabs/openlogin";
import Web3 from "web3";

const INFURA_NODE_URL = "https://mainnet.infura.io/v3/73d0b3b9a4b2499da81c71a2b2a473a9";

class OpenLoginHandler {
  constructor() {
    this.sdkInstance = new OpenLogin({ clientId: "random_id", iframeUrl: "https://beta.openlogin.com" });
  }

  async _onConnection() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(INFURA_NODE_URL));
  }

  async connectWeb3() {
    try {
      if (!this.sdkInstance.provider.initialized) {
        await this.sdkInstance.init();
      }
    } catch (error) {
      console.log("error", error);
      const isIgnoreable = typeof error === "object" && error.message === "already initialized";
      if (!isIgnoreable) {
        throw error;
      }
    }
    if (this.sdkInstance.privKey) {
      await this._onConnection();
    }
  }

  async login(email) {
    await this.sdkInstance.login({
      extraLoginOptions: {
        login_hint: email,
      },
      loginProvider: "email_passwordless",
      redirectUrl: `${window.origin}/dashboard`,
    });
  }

  async getUserInfo() {
    const account = this.web3.eth.accounts.privateKeyToAccount(this.sdkInstance.privKey);
    const publicAddress = account.address;
    const balance = await this.web3.eth.getBalance(publicAddress);
    return { publicAddress, balance };
  }

  async logout(fastLogin = false) {
    await this.sdkInstance.logout({ fastLogin });
  }
}

export default OpenLoginHandler;
