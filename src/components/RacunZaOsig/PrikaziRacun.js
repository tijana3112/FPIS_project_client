import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createRacun, getRacun } from "../../actions/racunActions";
import { getNaciniPlacanja } from "../../actions/nacinPlacanjaActions";
import { getOvlascenjaLica } from "../../actions/ovlascenoLiceActions";
import { deleteStavka } from "../../actions/stavkeActions";
import DatePicker from "react-datepicker";
import classnames from "classnames";
import { adjustTimezoneDifference, dateFromBackendToJsDate } from "../../utils";
import { Link } from "react-router-dom";
import ComboBox from "../ComboBox";
import ModalZaUgovor from "../UgovorOOsiguranju/ModalZaUgovor";
import StavkaTable from "../StavkaRacuna/StavkaTable";
import ModalZaStavku from "../StavkaRacuna/ModalZaStavku";
import StavkaTableShow from "../StavkaRacuna/StavkaTableShow";

class PrikaziRacun extends Component {
  constructor() {
    super();
    this.state = {
      brojRacuna: "",
      datum: "",
      iznos: 0,
      pozivNaBroj: "",
      ugovorOOsiguranju: {
        brojUgovora: 0,
        zahtevZaOsiguranje: {
            sifraZahteva: 0,
        },
      },
      nacinPlacanja: {
        idNacinaPlacanja: 0,
      },
      ovlascenoLiceOsiguravajuceKuce: {
        sifraOL: 0,
      },
      stavke: [],
      status: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    const {brojRacuna,
      datum,
      iznos,
      pozivNaBroj,
      stavke,
      ugovorOOsiguranju,
      nacinPlacanja,
      ovlascenoLiceOsiguravajuceKuce,
      status} = nextProps.racun;

    this.setState({
      brojRacuna,
      datum: dateFromBackendToJsDate(datum),
      iznos,
      pozivNaBroj,
      stavke,
      ugovorOOsiguranju,
      nacinPlacanja,
      ovlascenoLiceOsiguravajuceKuce,
      status
    });
  }
  componentDidMount() {
    const { brojRacuna } = this.props.match.params;
    this.props.getRacun(brojRacuna, this.props.history);
  }

  render() {
    if(this.props.racun == undefined){
      return;
    }
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto">
                <h4 className="text-center">Prikaz racuna za osiguranje</h4>
                <hr />
                <form>
                <div className="form-group">
                <label className=" font-weight-bold">Broj racuna:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Broj racuna"
                      name="brojRacuna"
                      value={this.state.brojRacuna}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                  <label className=" font-weight-bold">Datum:</label>
                  <div className="position-sticky">
                    <DatePicker
                      showYearDropdown
                      yearDropdownItemNumber={30}
                      scrollableYearDropdown
                      className="form-control "
                      dateFormat="dd.MM.yyyy"
                      selected={this.state.datum}
                      placeholderText="Datum"
                      readOnly
                    />
                    </div>
                  </div>
                  <div className="form-group">
                  <label className=" font-weight-bold">Poziv na broj:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Poziv na broj"
                      name="pozivNaBroj"
                      value={this.state.pozivNaBroj}
                      readOnly
                    />
                  </div>
                    <div className="form-group">
                    <label className=" font-weight-bold">Broj ugovora:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Broj ugovora"
                      name="brojUgovora"
                      value={this.state.ugovorOOsiguranju != undefined ? this.state.ugovorOOsiguranju.brojUgovora : ""}
                      readOnly
                    />
                    </div>
                    <div className="form-group">
                    <label className=" font-weight-bold">Sifra zahteva za osiguranje:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Sifra zahteva"
                      name="sifraZahteva"
                      value={this.state.ugovorOOsiguranju != undefined ? this.state.ugovorOOsiguranju.zahtevZaOsiguranje.sifraZahteva : ""}
                      readOnly
                    />
                    </div>
                    <div className="form-group">
                    <label className=" font-weight-bold">Stavke racuna:</label>
                    <StavkaTableShow stavke={this.state.stavke} obrisiStavku={this.obrisiStavku} izmeniStavku={this.izmeniStavku}></StavkaTableShow>
                    </div>
                    <div className="form-group">
                    <label className=" font-weight-bold">Ukupan iznos racuna:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ukupan iznos"
                      name="iznos"
                      value={this.state.iznos + " din"}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                  <label className=" font-weight-bold">Nacin placanja:</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Nacin placanja"
                      name="opisNacinaPlacanja"
                      value={this.state.nacinPlacanja.opisNacinaPlacanja}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                  <label className=" font-weight-bold">Ovlasceno lice osiguravajuce kuce:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ovlasceno lice"
                        name="imePrezime"
                        value={this.state.ovlascenoLiceOsiguravajuceKuce.imePrezime}
                        readOnly
                    />
                  </div>
                  <div className="form-group">
                    <p className="font-weight-bold">Status:</p>
                    <input type="radio" id="status" name="status" value="Formiran" checked={this.state.status === "Formiran"} readOnly/>&nbsp;
                    <label for="status">Formiran</label>
                    <input className="ml-5" type="radio" id="status" name="status" value="Izmenjen" checked={this.state.status === "Izmenjen"} readOnly/>&nbsp;
                    <label for="status">Izmenjen</label>
                    <input className="ml-5" type="radio" id="status" name="status" value="Obradjen" checked={this.state.status === "Obradjen"} readOnly/>&nbsp;
                    <label for="status">Obradjen</label><br></br>
                  </div>

                  <Link to={`/racunList`}>
                  <i className="fa fa-arrow-circle-left fa-3x fa-pull-left text-danger" />
                  </Link>
                  </form>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    racun: state.racun.racun,
  });

export default connect(mapStateToProps, { getRacun })(PrikaziRacun);