import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteObavestenje } from "../../actions/obavestenjeActions";
import moment from "moment";

class ObavestenjeRow extends Component {
  onDeleteClick = (idObavestenja) => {
    this.props.deleteObavestenje(idObavestenja);
  };

  render() {
    return (
      <tr>
        <td>{this.props.obavestenje.idObavestenja}</td>
        <td>{this.props.obavestenje.svrhaObavestenja}</td>
        <td>
          {this.props.obavestenje.datum !== null
            ? moment(this.props.obavestenje.datum).format("DD.MM.yyyy")
            : ""}
        </td>
        <td>
          {this.props.obavestenje.uplatnica != null
            ? "Svrha uplate: "+this.props.obavestenje.uplatnica.svrhaUplate+", iznos: "+this.props.obavestenje.uplatnica.iznos+" din"
            : ""}
        </td>
        <td>
          {this.props.obavestenje.radnik != null
            ? this.props.obavestenje.radnik.imePrezime
            : ""}
        </td>
        <td>
          {this.props.obavestenje.osiguravajucaKuca != null
            ? this.props.obavestenje.osiguravajucaKuca.nazivOsigKuce
            : ""}
        </td>
        <td width="5%" className="text-center">
          <Link to={`/updateObavestenje/${this.props.obavestenje.idObavestenja}`}>
            <i className="fa fa-pencil fa-2x text-success" />
          </Link>
        </td>
        <td width="5%" className="text-center">
          <Link
            to="/obavestenjeList"
            id="deleteObavestenje"
            onClick={this.onDeleteClick.bind(this, this.props.obavestenje.idObavestenja)}
          >
            <i className="fa fa-trash fa-2x text-danger" />
          </Link>
        </td>
      </tr>
    );
  }
}

ObavestenjeRow.propTypes = {
  deleteObavestenje: PropTypes.func.isRequired,
};

export default connect(null, { deleteObavestenje })(
    ObavestenjeRow
);
