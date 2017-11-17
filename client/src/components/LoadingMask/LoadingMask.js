import React, {Component} from "react";
import cssModules from "react-css-modules";
import styles from "./LoadingMask.module.scss";
import {Auth} from "j-toker";

class LoadingMask extends Component {
  render() {
    return (
      <div/>
    )
  }
}

export default cssModules(LoadingMask, styles);
