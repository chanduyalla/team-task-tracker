import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="mt-5">
      <h1 style={{ color: "#52ab98" }}>Team Task Tracker </h1>
      <div
        style={{ width: "550px" }}
        className="mx-auto card m-5 p-5 shadow round"
      >
        <h3 className="mb-4" style={{ color: "#2b6777" }}>
          Registration
        </h3>
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            //   {...details.getFieldProps("firstname")}
          ></input>
          <span style={{ color: "red" }}>
            {/* {details.touched.firstname && details.errors.firstname} */}
          </span>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Last Name"
            //   {...details.getFieldProps("lastname")}
          ></input>
          <span style={{ color: "red" }}>
            {/* {details.touched.lastname && details.errors.lastname} */}
          </span>
          <span style={{ color: "red" }}>
            {/* {details.touched.username && details.errors.username} */}
          </span>
          <input
            type="email"
            placeholder="Enter Email "
            className="form-control mt-3"
            //   {...details.getFieldProps("email")}
          ></input>
          <span style={{ color: "red" }}>
            {/* {details.touched.email && details.errors.email} */}
          </span>
          <input
            type="password"
            placeholder="Password "
            className="form-control mt-3"
            //   {...details.getFieldProps("password")}
          ></input>
          <span style={{ color: "red" }}>
            {/* {details.touched.password && details.errors.password} */}
          </span>
          <input
            type="password"
            placeholder="Confirm-Password "
            className="form-control mt-3"
            //   {...details.getFieldProps("confirmpassword")}
          ></input>
          <span style={{ color: "red" }}>
            {/* {details.touched.confirmpassword && details.errors.confirmpassword} */}
          </span>
          <br />
          <button
            className="mb-4 btn"
            style={{ backgroundColor: "#2b6777", color: "white" }}
          >
            Register
          </button>
          <br />
          <span>Already Have an Account? </span>
          <Link to="/">Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
