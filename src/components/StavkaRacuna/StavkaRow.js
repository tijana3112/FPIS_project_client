import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import ModalZaStavkuUpdate from "./ModalZaStavkuUpdate";

class StavkaRow extends Component {
  constructor() {
    super();
    this.state = {
      showS: false,
    };
    this.unesiStavku = this.unesiStavku.bind(this);
  }

  unesiStavku(izmenjenaStavka){
    this.props.izmeniStavku(this.props.stavka, izmenjenaStavka);
    this.handleClose();
  }

  showModalS = e => {
    this.setState({
      showS: true
    });
  };

  handleClose = () => {
    this.setState({
      showS: false,
    });
  };


  render() {
    return (
      <tr>
        <td>{this.props.stavka.nazivVrsteOsig}</td>
        <td>{this.props.stavka.cena} din</td>
        <td width="22%" className="text-center">
        <Link onClick={e => {
          this.showModalS();
          }}><i className="fa fa-pencil fa-2x text-success" /></Link>
          <ModalZaStavkuUpdate
          show={this.state.showS}
          handleClose={this.handleClose}
          stavka={this.props.stavka}
          unesiStavku={this.unesiStavku}
          />
        </td>
        <td width="22%" className="text-center">
        <Link onClick={this.props.obrisiStavku.bind(null, this.props.stavka)}>
            <i className="fa fa-trash fa-2x text-danger" />
        </Link>
        </td>
      </tr>
    );
  }
}


export default (
    StavkaRow
);
