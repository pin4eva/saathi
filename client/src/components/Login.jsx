import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LoginComp = ({ setView }) => {
  return (
    <Wrapper className="">
      <div className="content">
        <div className="wrapper">
          <div className="intro">
            <h5 className="font-weight-bold">Welcome Back</h5>
            <p className="font-smaller text-muted m-0">
              SIgn in to your account by filling the form bellow.
            </p>
          </div>
          <form className="mt-3">
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" />
            </div>

            <div className="mt-5">
              <NavLink
                to="/dashboard"
                className="btn btn-block text-center btn-primary"
              >
                SIGN IN
              </NavLink>
            </div>
            <p className="mt-3  text-center">
              Don't have an account yet ?{" "}
              <a href="#!" className="c-hand" onClick={setView}>
                Sign Up
              </a>
            </p>

            <div className="mt-4 text-center">
              <small>
                Or <br /> Sign in with
              </small>

              <div className="d-flex justify-content-center mt-3">
                <img
                  src="/images/facebook-circle.svg"
                  alt=""
                  className="mx-3"
                />
                <img src="/images/google-circle.svg" alt="" className="mx-3" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginComp;

const Wrapper = styled.div`
  height: inherit;
  .content {
 
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .wrapper {
      width: 100%;
      max-width: 500px;
      background-color: #fff;
      padding: 2rem;
        line-height: 1.625rem;
      }
    }
  }
`;
