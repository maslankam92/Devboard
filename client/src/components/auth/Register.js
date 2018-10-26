import React from "react";
import Link from "react-router-dom/es/Link";

import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Register">
        <div className="container">
          <div className="row">
            <div className="form-container bg-light col-md-5 m-auto">
              <h1 className="display-4 text-center">Welcome</h1>
              <p className="lead text-center">
                Join Devboard community and create an account
              </p>
              <form action="create-profile.html">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    autoComplete="newName"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email"
                    autoComplete="newEmail"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    autoComplete="newPassword"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="password2"
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  value="Sign Up"
                />
                <small className="form-text text-muted text-center">
                  If you have an account go to
                  <Link to="/login"> login</Link> page
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
