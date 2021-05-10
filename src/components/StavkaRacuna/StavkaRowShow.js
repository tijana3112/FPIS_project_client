import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import ModalZaStavkuUpdate from "./ModalZaStavkuUpdate";

class StavkaRowShow extends Component {
  render() {
    return (
      <tr>
      <td>{this.props.stavka.sifraStavke}</td>
        <td>{this.props.stavka.nazivVrsteOsig}</td>
        <td>{this.props.stavka.cena} din</td>
      </tr>
    );
  }
}

export default (
    StavkaRowShow
);
