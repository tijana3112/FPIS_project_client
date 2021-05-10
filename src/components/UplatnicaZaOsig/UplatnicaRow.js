import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

class UplatnicaRow extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.uplatnica.idUplatnice}</td>
        <td>{this.props.uplatnica.svrhaUplate}</td>
        <td>
          {this.props.uplatnica.iznos} din</td>
        <td>
          {this.props.uplatnica.racunOsiguranja != null
            ? this.props.uplatnica.racunOsiguranja.brojRacuna
            : ""}
        </td>
        <td>
          {this.props.uplatnica.model != null
            ? this.props.uplatnica.model.idModela
            : ""}
        </td>
        <td>
          {this.props.uplatnica.valuta != null
            ? this.props.uplatnica.valuta.idValute + " : " + this.props.uplatnica.valuta.nazivValute
            : ""}
        </td>
        <td width="10%" className="text-center">
          <button onClick={this.props.chosenUplatnica.bind(null, this.props.uplatnica)} className="btn btn-large btn-success">
            Izaberi
            </button>
        </td>
      </tr>
    );
  }
}


export default (
    UplatnicaRow
);
