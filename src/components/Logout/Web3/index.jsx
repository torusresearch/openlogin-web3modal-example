import PropTypes from "prop-types";

const Logout = ({ logout }) => {
  return (
    <>
      <div style={{ display: "flex", direction: "row", padding: 20 }}>
        <button onClick={logout} type="button" className="btn-solid">
          Logout
        </button>
      </div>
    </>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Logout;
