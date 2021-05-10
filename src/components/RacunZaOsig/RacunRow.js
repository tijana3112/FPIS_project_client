import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteRacun } from "../../actions/racunActions";
import moment from "moment";

class RacunRow extends Component {
  onDeleteClick = (brojRacuna) => {
    this.props.deleteRacun(brojRacuna);
  };

  render() {
    return (
      <tr>
        <td>{this.props.racun.brojRacuna}</td>
        <td>
          {this.props.racun.datum !== null
            ? moment(this.props.racun.datum).format("DD.MM.yyyy")
            : ""}
        </td>
        <td>{this.props.racun.pozivNaBroj}</td>
        <td>{this.props.racun.iznos} din</td>
        <td>
          {this.props.racun.ugovorOOsiguranju != null
            ? this.props.racun.ugovorOOsiguranju.brojUgovora
            : ""}
        </td>
        <td>
          {this.props.racun.nacinPlacanja != null
            ? this.props.racun.nacinPlacanja.opisNacinaPlacanja
            : ""}
        </td>
        <td>
          {this.props.racun.osiguravajucaKuca != null
            ? this.props.racun.osiguravajucaKuca.nazivOsigKuce
            : ""}
        </td>
        <td>
          {this.props.racun.ovlascenoLiceOsiguravajuceKuce != null
            ? this.props.racun.ovlascenoLiceOsiguravajuceKuce.imePrezime
            : ""}
        </td>
        <td width="5%" className="text-center">
        {this.props.racun.status === "Obradjen"
          ? ""
          : <Link to={`/updateRacun/${this.props.racun.brojRacuna}`}>
          <i className="fa fa-pencil fa-2x text-success" />
        </Link>}
        </td>
        <td width="5%" className="text-center">
          <Link
            to="/racunList"
            id="deleteRacun"
            onClick={this.onDeleteClick.bind(this, this.props.racun.brojRacuna)}
          >
            <i className="fa fa-trash fa-2x text-danger" />
          </Link>
        </td>
        <td width="5%" className="text-center">
        <Link to={`/prikaziRacun/${this.props.racun.brojRacuna}`}>
          <i className="fa fa-eye fa-2x text-success" />
        </Link>
      </td>
      </tr>
    );
  }
}

RacunRow.propTypes = {
  deleteRacun: PropTypes.func.isRequired,
};

export default connect(null, { deleteRacun })(
    RacunRow
);
