import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { routes } from "../constant/routes";

const Login = () => {
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleLogin = async (values: any) => {
    try {
      const res = await login(values);
      console.log("login res", res);
      const accessToken = res.data?.data?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      const refreshToken = res.data?.data?.refreshToken;
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
      navigate(routes.HOME);
    } catch (err) {
      console.log(err);
    }
  };
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
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ values, errors, handleChange }) => (
            <Form>
              <Field
                name="email"
                type="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={handleChange}
                value={values.email}
              ></Field>
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
              <Field
                name="password"
                type="password"
                placeholder="Enter Password"
                className="form-control mt-4"
                onChange={handleChange}
                value={values.password}
              ></Field>
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
