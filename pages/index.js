import React, { Component } from "react";
import Layout from "../components/Layout";


class Medium extends Component {
  componentDidMount(){
    document.title = "Medium 2.0"
  }
  render() {
    return <Layout />;
  }
}
export default Medium;
