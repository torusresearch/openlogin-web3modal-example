import "./style.css";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import Loader from "../../components/Loader/loader";
import OpenloginLogout from "../../components/Logout/Openlogin";
import Web3Logout from "../../components/Logout/Web3";
import CreateLoginHandler from "../../modules/handlerFactory";

function Home() {
  const [currentLoginHandler, setLoginHandler] = useState(null);
  const [loginMethod, setLoginMethod] = useState(null);
  const [isLoading, setLoadingStatus] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function initializedUser() {
      setLoadingStatus(true);
      const currentLoginMethod = localStorage.getItem("LOGIN_METHOD");
      if (!currentLoginMethod) {
        history.push("/");
        return;
      }
      setLoginMethod(currentLoginMethod);
      const loginHandler = CreateLoginHandler(currentLoginMethod);
      await loginHandler.connectWeb3();
      setLoginHandler(loginHandler);
      if (loginHandler.web3) {
        const info = await loginHandler.getUserInfo();
        setUserInfo(info);
      } else {
        localStorage.removeItem("LOGIN_METHOD");
        history.push("/");
      }
      setLoadingStatus(false);
    }
    initializedUser();
  }, [history]);

  const web3Disconnect = async () => {
    setLoadingStatus(true);
    await currentLoginHandler.logout();
    setTimeout(() => {
      setLoadingStatus(false);
      localStorage.removeItem("LOGIN_METHOD");
      history.push("/");
    }, 500);
  };

  const openloginDisconnect = async (fastLogin) => {
    setLoadingStatus(true);
    await currentLoginHandler.logout(fastLogin);
    setTimeout(() => {
      setLoadingStatus(false);
      localStorage.removeItem("LOGIN_METHOD");
      history.push("/");
    }, 500);
  };

  return isLoading ? (
    <Loader isDone={isLoading} />
  ) : (
    <div className="content-center">
      <div className="info-container">
        <h2>User Info</h2>

        {Object.keys(userInfo).map((key) => {
          return key === "profileImage" ? (
            <img src={userInfo[key]} width={50} height={50} alt="profile" />
          ) : (
            <div className="row" key={key}>
              <p>{`${key}`}</p>
              <div style={{ marginRight: 10, marginLeft: 10 }}>:</div>
              <i>{userInfo[key]}</i>
            </div>
          );
        })}
        {loginMethod === "OPENLOGIN" && (
          <OpenloginLogout hardLogout={() => openloginDisconnect(false)} softLogout={() => openloginDisconnect(true)} />
        )}
        {loginMethod === "WEB3_MODAL" && <Web3Logout logout={web3Disconnect} />}
      </div>
    </div>
  );
}

export default Home;
