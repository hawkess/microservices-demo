import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      Router.push("/");
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  const invalidFields = errors
    ? new Map(errors.map((err) => Object.values(err).reverse()))
    : new Map();

  const emailValid = !invalidFields.has("email") ? "is-valid" : "is-invalid";
  const passwordValid = !invalidFields.has("password")
    ? "is-valid"
    : "is-invalid";

  const errMap = errors ? (
    <div className="alert alert-danger">
      <ul>
        {errors.map((err) => (
          <li>{err.message}</li>
        ))}
      </ul>
    </div>
  ) : (
    []
  );

  return (
    <div className="container">
      <form className="row g-3" onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="col-md-6 has-validation">
          <label className="form-label">Email</label>
          <input
            type="text"
            id="validationEmail"
            className={`form-control ${emailValid}`}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailFeedback"
            value={email}
          />
          <div id="emailFeedback" className="invalid-feedback">
            {invalidFields.get("email")}
          </div>
        </div>
        <div className="col-md-6 has-validation">
          <label className="form-label">Password</label>
          <input
            id="validationPasssword"
            type="password"
            className={`form-control ${passwordValid}`}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="passwordFeedback"
            value={password}
          />
          <div id="passwordFeedback" className="invalid-feedback">
            {invalidFields.get("password")}
          </div>
        </div>
        {passwordValid === "is-invalid" ||
          emailValid === "is-invalid" ||
          errMap}
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
