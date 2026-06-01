import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../api/auth";
import { routes } from "../constant/routes";

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const { confirmPassword, ...registerData } = values;
      await register(registerData);
      navigate(routes.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <Field
                name="firstName"
                type="text"
                className="form-control"
                placeholder="First Name"
                onChange={handleChange}
                value={values.firstName}
              ></Field>
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-danger"
              />
              <Field
                name="lastName"
                type="text"
                className="form-control mt-3"
                placeholder="Last Name"
                onChange={handleChange}
                value={values.lastName}
              ></Field>
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-danger"
              />
              <Field
                name="email"
                type="email"
                placeholder="Enter Email "
                className="form-control mt-3"
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
                placeholder="Password "
                className="form-control mt-3"
                onChange={handleChange}
                value={values.password}
              ></Field>
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm-Password "
                className="form-control mt-3"
                onChange={handleChange}
                value={values.confirmPassword}
              ></Field>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
              <br />
              <button
                type="submit"
                className="mb-4 btn"
                style={{ backgroundColor: "#2b6777", color: "white" }}
              >
                Register
              </button>
              <br />
              <span>Already Have an Account? </span>
              <Link to="/">Login</Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
