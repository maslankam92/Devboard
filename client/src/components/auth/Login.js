import React from "react";
import { connect } from "react-redux";

import { loginUser } from "../../actions/authActions";
import { clearError } from "../../actions/errorActions";

import "./Login.css";
import classnames from "classnames";
import PropTypes from "prop-types";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
  }

  componentDidMount() {
    const { auth, history } = this.props;
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }

  onChangeInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmitLoginForm = e => {
    const { loginUser, history } = this.props;
    e.preventDefault();
    const loggedUser = { ...this.state };
    loginUser(loggedUser, history);
  };

  onFocusInput = e => {
    const { name } = e.target;
    this.props.clearError(name);
  };

  render() {
    const { email, password, errors } = this.state;

    const getClassName = el => {
      const additionalClass = errors && errors[el] ? "is-invalid" : "";
      return classnames("form-control", additionalClass);
    };

    const getInvalidFeedback = el => {
      if (!errors && !errors[el]) return null;
      return <div className="invalid-feedback">{errors && errors[el]}</div>;
    };

    return (
      <div className="Login">
        <div className="container">
          <div className="row">
            <div className="form-container bg-light col-md-5 m-auto">
              <h1 className="display-4 text-center">Welcome</h1>
              <p className="lead text-center">Glad you are back with us</p>
              <form onSubmit={this.onSubmitLoginForm} noValidate>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
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
  { loginUser, clearError }
)(Login);
