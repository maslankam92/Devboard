import React from "react";
import Link from "react-router-dom/es/Link";

import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  onChangeInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmitRegisterForm = e => {
    e.preventDefault();
    const newUser = { ...this.state };
    console.log(newUser);
  };

  render() {
    const { name, email, password, confirmPassword } = this.state;
    return (
      <div className="Login">
        <div className="container">
          <div className="row">
            <div className="form-container bg-light col-md-5 m-auto">
              <h1 className="display-4 text-center">Welcome</h1>
              <p className="lead text-center">
                Join Devboard community and create an account
              </p>
              <form onSubmit={this.onSubmitRegisterForm}>
                <div className="form-group">
                  <input
                    value={name}
                    onChange={this.onChangeInput}
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    autoComplete="newName"
                  />
                </div>
                <div className="form-group">
                  <input
                    value={email}
                    onChange={this.onChangeInput}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    autoComplete="newEmail"
                  />
                </div>
                <div className="form-group">
                  <input
                    value={password}
                    onChange={this.onChangeInput}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="newPassword"
                  />
                </div>
                <div className="form-group">
                  <input
                    value={confirmPassword}
                    onChange={this.onChangeInput}
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
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
