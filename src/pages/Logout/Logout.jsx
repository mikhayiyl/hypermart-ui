import { Component } from "react";

export default class Logout extends Component {
  componentDidMount() {
    // logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}
