import PropTypes from "prop-types";

const Logout = ({ hardLogout, softLogout }) => {
  return (
    <>
      <div style={{ display: "flex", direction: "row", padding: 20 }}>
        <button onClick={hardLogout} type="button" className="btn-solid">
          Hard Logout
        </button>
        <button onClick={softLogout} type="button" className="btn-solid">
          Soft Logout
        </button>
      </div>
    </>
  );
};

Logout.propTypes = {
  hardLogout: PropTypes.func.isRequired,
  softLogout: PropTypes.func.isRequired,
};

export default Logout;
