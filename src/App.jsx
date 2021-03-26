import "./App.css";

import Torus from "@toruslabs/torus-embed";
// import { useEffect } from "react";
// import Web3 from "web3";
import Web3Modal from "web3modal";

function App() {
  // useEffect(() => {
  //     }, []);

  async function initializeWeb3modal() {
    const providerOptions = {
      /* See Provider Options Section */
      torus: {
        package: Torus, // required
      },
    };

    const web3Modal = new Web3Modal({
      // disableInjectedProvider: true,
      cacheProvider: true,
      providerOptions, // required
    });
    const provider = await web3Modal.connect();

    // eslint-disable-next-line no-unused-vars
    // const web3 = new Web3(provider);
    const userInfo = await provider.torus.getUserInfo();
    const publicAddress = await provider.torus.getPublicAddress({
      verifierId: userInfo.verifierId,
      verifier: userInfo.verifier,
    });
    console.log("user ifnor", userInfo, publicAddress);
  }
  return (
    <div className="App">
      <button type="button" onClick={initializeWeb3modal}>
        Signin with wallet
      </button>
    </div>
  );
}

export default App;
