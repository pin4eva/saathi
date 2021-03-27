import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import { SIGNUP } from "../apollo/queries/UserQuery";

const RegisterComp = ({ setView }) => {
  const [signup, { loading }] = useMutation(SIGNUP);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { password2, ...rest } = info;
    if (password2 !== rest.password) return alert("Passwords do not match");
    try {
      const { data } = await signup({ variables: { input: rest } });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper className="">
      <div className="content">
        <div className="wrapper">
          <div className="intro">
            <h5 className="font-weight-bold">
              Welcome to <br /> Saathi ToDo App
            </h5>
            <p className="font-smaller text-muted">
              SIgn up an account by filling the form bellow.
            </p>
          </div>
          <form className="mt-3" onSubmit={submit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={handleChange}
              />
            </div>

            <div className="form-group ">
              <div className="d-flex align-items-baseline mt-4">
                <input type="checkbox" name="" id="" />
                <p className="m-0 ml-4">
                  By clicking sign up, you hereby are in agreement with our{" "}
                  <b>Terms & Conditions and Disclaimer</b>{" "}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <button className="btn btn-block text-center btn-primary">
                SIGN UP
              </button>
            </div>
            <p className="mt-3  text-center">
              Already have an account ?
              <a href="#!" className="c-hand" onClick={setView}>
                Login
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

export default RegisterComp;

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
