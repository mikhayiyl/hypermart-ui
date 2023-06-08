import React, { Component } from "react";
import Advert from "../Forms/Advert";
import FormExtension from "../Forms/FormExtention";
import "./style.css";
import { Link } from "react-router-dom";

export default class Register extends FormExtension {
  render() {
    return (
      <div className="con">
        <Advert />
        <form className="wrapper">
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input type="text" className="form-control" />
            <small className="text">
              We'll never share your name with anyone else
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input type="text" className="form-control" />
            <small>We'll never share your name with anyone else</small>
          </div>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input type="text" className="form-control" />
            <small>We'll never share your name with anyone else</small>
          </div>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input type="text" className="form-control" />
            <small>We'll never share your name with anyone else</small>
          </div>
          <Link className="link" to="/login">
            <button disabled={false} className="button">
              Login
            </button>
          </Link>

          <Link className="link" to="/signup">
            <button disabled={false} className="button success">
              Sign up
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
