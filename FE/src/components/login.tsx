import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mt-5">
      <h1 style={{ color: "#52ab98" }}>Team Task Tracker </h1>
      <div
        style={{ width: "580px", height: "450px" }}
        className="mx-auto card p-5 mt-5 shadow round"
      >
        <h3 className="mb-4" style={{ color: "#2b6777" }}>
          Login
        </h3>
        <form>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control"
          ></input>
          {/* <span style={{ color: "red" }}>
              {check.touched.username && check.errors.username}
            </span> */}
          <input
            type="password"
            placeholder="Enter Password"
            className="form-control mt-4"
          ></input>
          {/* <span style={{ color: "red" }}>
              {check.touched.password && check.errors.password}
            </span> */}
          <br />
          <button
            className="btn mb-3 mt-1"
            style={{ backgroundColor: "#2b6777", color: "white" }}
          >
            Login
          </button>
          <br />
          <span>Don't Have an Account? </span>
          <Link to="/register">Register</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
