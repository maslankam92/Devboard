import React from "react";
import PropTypes from "prop-types";
import Link from "react-router-dom/es/Link";
import { connect } from "react-redux";
import classnames from "classnames";

import { registerUser } from "../../actions/authActions";
import { clearError } from "../../actions/errorActions";

import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  onChangeInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmitRegisterForm = e => {
    e.preventDefault();
    const { registerUser, history } = this.props;
    const newUser = { ...this.state };
    registerUser(newUser, history);
  };

  onFocusInput = e => {
    const { name } = e.target;
    this.props.clearError(name);
  };

  render() {
    const { name, email, password, confirmPassword, errors } = this.state;

    const getClassName = el => {
      const additionalClass = errors && errors[el] ? "is-invalid" : "";
      return classnames("form-control", additionalClass);
    };

    const getInvalidFeedback = el => {
      if (!errors && !errors[el]) return null;
      return <div className="invalid-feedback">{errors && errors[el]}</div>;
    };

    return (
      <div className="Register">
        <div className="container">
          <div className="row">
            <div className="form-container bg-light col-md-5 m-auto">
              <h1 className="display-4 text-center">Welcome</h1>
              <p className="lead text-center">
                Join DevBoard community and create an account
              </p>
              <form noValidate onSubmit={this.onSubmitRegisterForm}>
                <div className="form-group">
                  <input
                    value={name}
                    onChange={this.onChangeInput}
                    onFocus={this.onFocusInput}
                    type="text"
                    name="name"
                    className={getClassName("name")}
                    placeholder="Name"
                    autoComplete="newName"
                  />
                  {getInvalidFeedback("name")}
                </div>
                <div className="form-group">
                  <input
                    value={email}
                    onChange={this.onChangeInput}
                    onFocus={this.onFocusInput}
                    type="email"
                    name="email"
                    className={getClassName("email")}
                    placeholder="Email"
                    autoComplete="newEmail"
                  />
                  {getInvalidFeedback("email")}
                </div>
                <div className="form-group">
                  <input
                    value={password}
                    onChange={this.onChangeInput}
                    onFocus={this.onFocusInput}
                    type="password"
                    name="password"
                    className={getClassName("password")}
                    placeholder="Password"
                    autoComplete="newPassword"
                  />
                  {getInvalidFeedback("password")}
                </div>
                <div className="form-group">
                  <input
                    value={confirmPassword}
                    onChange={this.onChangeInput}
                    onFocus={this.onFocusInput}
                    type="password"
                    name="confirmPassword"
                    className={getClassName("confirmPassword")}
                    placeholder="Confirm Password"
                  />
                  {getInvalidFeedback("confirmPassword")}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, error }) => ({
  auth,
  errors: error
});

export default connect(
  mapStateToProps,
  { registerUser, clearError }
)(Register);
