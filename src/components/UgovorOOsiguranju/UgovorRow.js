import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

class UgovorRow extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.ugovor.brojUgovora}</td>
        <td>
          {this.props.ugovor.datum !== null
            ? moment(this.props.ugovor.datum).format("DD.MM.yyyy")
            : ""}
        </td>
        <td>{this.props.ugovor.potpisao}</td>
        <td>
          {this.props.ugovor.drzava != null
            ? this.props.ugovor.drzava.nazivDrzave
            : ""}
        </td>
        <td>
          {this.props.ugovor.zahtevZaOsiguranje != null
            ? this.props.ugovor.zahtevZaOsiguranje.sifraZahteva
            : ""}
        </td>
        <td>
          {this.props.ugovor.radnik != null
            ? this.props.ugovor.radnik.imePrezime
            : ""}
        </td>
        <td width="10%" className="text-center">
          <button onClick={this.props.chosenUgovor.bind(null, this.props.ugovor)} className="btn btn-large btn-success">
            Izaberi
            </button>
        </td>
      </tr>
    );
  }
}


export default (
    UgovorRow
);
