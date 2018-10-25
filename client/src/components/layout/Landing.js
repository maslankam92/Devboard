import React from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Landing">
        <div className="dark-overlay text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center p-5">
                <h1 className="display-3 mb-4">Developers Board</h1>
                <p>Write code, share projects, get help and meet people.</p>
                <Link to="/login" className="btn btn-lg btn-primary">
                  Login
                </Link>
                <Link to="register" className="btn btn-lg btn-light">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
