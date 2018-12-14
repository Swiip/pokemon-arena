import React, { Component } from "react";

class ErrorHandler extends Component {
  constructor() {
    super();
    this.state = { error: false };
  }

  componentDidCatch(...args) {
    console.log("catch error", args);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error === false) {
      return this.props.children;
    } else {
      return <p>There has been an error</p>;
    }
  }
}

export default ErrorHandler;
