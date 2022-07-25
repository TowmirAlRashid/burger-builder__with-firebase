import React, { Component } from 'react'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import { auth } from '../redux/actionCreators'
import { Alert } from 'reactstrap'

import Spinner from '../spinner/Spinner'

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, mode) => dispatch(auth(email, password, mode))
  }
}

const mapStateToProps = state => {
  return {
    authLoading: state.authLoading,
    authFailedMsg: state.authFailedMsg,
  }
}

class Auth extends Component {
  state = {
    mode: 'Sign Up'
  }

  switchModeHandler = () => {
    this.setState({
      mode: this.state.mode === "Sign Up" ? "Log In" : "Sign Up",
    });
  }

  render() {
    let error = null;

    if (this.props.authFailedMsg !== null) {
      error = (
        <Alert color='danger'>{this.props.authFailedMsg}</Alert>
      )
    }
    let form = null;

    if (this.props.authLoading) {
      form = (
        <Spinner />
      )
    } else {
      form = (
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) =>
            this.props.auth(values.email, values.password, this.state.mode)
          }
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Required!";
            } else if (
              !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)
            ) {
              errors.email = "Invalid email input!";
            }

            if (!values.password) {
              errors.password = "Required!";
            } else if (values.password.length < 4) {
              errors.password = "Must be 4 characters long at least!";
            }

            if (this.state.mode === "Sign Up") {
              if (!values.confirmPassword) {
                errors.confirmPassword = "Required!";
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword =
                  "Doesn't match with the password input!";
              }
            }

            return errors;
          }}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <div
              style={{
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "20px",
                boxShadow: "5px 5px rgba(0, 0, 0, 0.25)",
              }}
            >
              <button
                className="btn btn-lg btn-info mb-4"
                style={{
                  width: "100%",
                }}
                onClick={this.switchModeHandler}
              >
                Switch to {this.state.mode === "Sign Up" ? "Log In" : "Sign Up"}
              </button>
              <br />
              <form onSubmit={handleSubmit}>
                <input
                  name="email"
                  placeholder="Enter your Email"
                  className="form-control"
                  value={values.email}
                  onChange={handleChange}
                />
                <span
                  style={{
                    color: "red",
                  }}
                >
                  {errors.email}
                </span>
                <br />
                <input
                  name="password"
                  placeholder="Enter your Password"
                  className="form-control"
                  value={values.password}
                  onChange={handleChange}
                />
                <span
                  style={{
                    color: "red",
                  }}
                >
                  {errors.password}
                </span>
                <br />
                {this.state.mode === "Sign Up" ? (
                  <div>
                    <input
                      name="confirmPassword"
                      placeholder="Confirm your Password"
                      className="form-control"
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                    <span
                      style={{
                        color: "red",
                      }}
                    >
                      {errors.confirmPassword}
                    </span>
                    <br />
                  </div>
                ) : null}
                <button type="submit" className="btn btn-success">
                  {this.state.mode === "Sign Up" ? "Sign Up" : "Log In"}
                </button>
              </form>
            </div>
          )}
        </Formik>
      );
    }
    return (
      <div>
        {error}
        {form}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)