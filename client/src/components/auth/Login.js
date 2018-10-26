import React from "react";

import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onChangeInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmitLoginForm = e => {
    e.preventDefault();
    const loggedUser = { ...this.state };
    console.log(loggedUser);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="Login">
        <div className="container">
          <div className="row">
            <div className="form-container bg-light col-md-5 m-auto">
              <h1 className="display-4 text-center">Welcome</h1>
              <p className="lead text-center">Glad you are back with us</p>
              <form onSubmit={this.onSubmitLoginForm}>
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
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  value="Login"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
