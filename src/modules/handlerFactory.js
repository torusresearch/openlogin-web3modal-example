import OpenLoginHandler from "./openloginHandler";
import Web3ModalHandler from "./web3ModalHandler";

export default function createLoginHandler(uxMethod) {
  switch (uxMethod) {
    case "WEB3_MODAL":
      return new Web3ModalHandler();
    case "OPENLOGIN":
      return new OpenLoginHandler();
    default:
      throw new Error("Invalid walletMethod");
  }
}
