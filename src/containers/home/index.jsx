import "./style.css";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import Loader from "../../components/Loader/loader";
import CreateLoginHandler from "../../modules/handlerFactory";

function Home() {
  const [currentLoginHandler, setLoginHandler] = useState(null);
  const [isLoading, setLoadingStatus] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function initializedUser() {
      setLoadingStatus(true);
      const loginMethod = sessionStorage.getItem("LOGIN_METHOD");
      const loginHandler = CreateLoginHandler(loginMethod);
      await loginHandler.connectWeb3();
      setLoginHandler(loginHandler);
      if (loginHandler.web3) {
        const info = await loginHandler.getUserInfo();
        setUserInfo(info);
      } else {
        history.push("/");
      }
      setLoadingStatus(false);
    }
    initializedUser();
  }, [history]);

  const logout = async () => {
    setLoadingStatus(true);
    await currentLoginHandler.logout();
    setTimeout(() => {
      setLoadingStatus(false);
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

        <button onClick={logout} type="button" className="btn-solid">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
