import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createRacun, getRacun } from "../../actions/racunActions";
import { getNaciniPlacanja } from "../../actions/nacinPlacanjaActions";
import { getOvlascenjaLica } from "../../actions/ovlascenoLiceActions";
import { deleteStavka, createStavka } from "../../actions/stavkeActions";
import DatePicker from "react-datepicker";
import classnames from "classnames";
import { adjustTimezoneDifference, dateFromBackendToJsDate, setMessage } from "../../utils";
import { Link } from "react-router-dom";
import ComboBox from "../ComboBox";
import ModalZaUgovor from "../UgovorOOsiguranju/ModalZaUgovor";
import StavkaTable from "../StavkaRacuna/StavkaTable";
import ModalZaStavku from "../StavkaRacuna/ModalZaStavku";

class UpdateRacun extends Component {
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
      showU: false,
      showS: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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
    this.props.getOvlascenjaLica();
    this.props.getNaciniPlacanja();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange(date) {
    this.setState({ datum: date });
  }

  handleValidation = () => {
    let error = false;

    if (this.state.brojRacuna == "") {
      this.props.setMessage("Morate uneti broj racuna!", "#brojRacuna", "#msg1");
      error = true;
    }

    if (this.state.pozivNaBroj == "") {
      this.props.setMessage("Morate uneti poziv na broj!", "#pozivNaBroj", "#msg2");
      error = true;
    }

    if (this.state.ugovorOOsiguranju.brojUgovora == 0) {
      this.props.setMessage("Morate izabrati ugovor!", "#brojUgovora", "#msg3");
      error = true;
    }

    if (this.state.stavke.length === 0) {
      this.props.setMessage("Morate dodati bar jednu stavku racuna!", "#stavkaTable", "#msg4");
      error = true;
    }

    if (this.state.iznos == 0) {
      this.props.setMessage("Morate izracunati ukupan iznos!", "#iznos", "#msg5");
      error = true;
    }

    if (this.state.nacinPlacanja.idNacinaPlacanja == 0) {
      this.props.setMessage("Morate izabrati nacin placanja!", "#nacinPlacanja", "#msg6");
      error = true;
    }

    if (this.state.ovlascenoLiceOsiguravajuceKuce.sifraOL == 0) {
      this.props.setMessage("Morate izabrati ovlasceno lice!", "#ovlascenoLiceOsiguravajuceKuce", "#msg7");
      error = true;
    }

    return error;
  };


  onSubmit(e) {
    e.preventDefault();

    if (this.handleValidation() == true) {
      return;
    }

    const updatedRacun = {
      brojRacuna: this.state.brojRacuna,
      datum: adjustTimezoneDifference(this.state.datum),
      iznos: this.state.iznos,
      pozivNaBroj: this.state.pozivNaBroj,
      ugovorOOsiguranju: this.state.ugovorOOsiguranju,
      nacinPlacanja: this.state.nacinPlacanja,
      ovlascenoLiceOsiguravajuceKuce: this.state.ovlascenoLiceOsiguravajuceKuce,
      stavke: this.state.stavke,
      status: this.state.status
    };
    console.log(updatedRacun);
    this.props.createRacun(
      updatedRacun,
      this.props.history,
    );
  }

  updateIdOfNacinPlacanja(object) {
    return (e) => {
      this.setState({ [object]: { idNacinaPlacanja: e.target.value } });
    };
  }

  updateIdOfOvLice(object) {
    return (e) => {
      this.setState({ [object]: { sifraOL: e.target.value } });
    };
  }

  showModalU = e => {
    this.setState({
      showU: true
    });
  };

  showModalS = e => {
    this.setState({
      showS: true
    });
  };

  handleClose = () => {
    this.setState({
      showU: false,
      showS: false,
    });
  };

  chosenUgovor = (ugovor) => {
    this.setState(() => ({
      ugovorOOsiguranju: {
        brojUgovora: ugovor.brojUgovora,
        zahtevZaOsiguranje: {
            sifraZahteva: ugovor.zahtevZaOsiguranje.sifraZahteva,
        },
      },
      showU: false
    }));
}

addStavka = (stavka) => {
    this.props.createStavka(stavka);
    console.log(this.state.stavke);
    const { brojRacuna } = this.props.match.params;
    this.props.getRacun(brojRacuna, this.props.history);
    this.setState({
      showS: false,
    });
    
}

calcIznos() {
    let stavke = this.state.stavke;
    var iznos = 0;
    for (let index = 0; index < stavke.length; index++) {
        iznos = iznos + parseFloat(stavke[index].cena);  
    }
    this.setState({
        iznos: iznos
    });
}

obrisiStavku = (stavka) => {
    let stavke = this.state.stavke;
    const index = stavke.indexOf(stavka);
    if (window.confirm("Da li zaista zelite da obrisete izabranu stavku?")) {
    if (index > -1) {
        stavke.splice(index, 1);
        this.setState({
            stavke: stavke
        }); 
    }
    if(stavka.sifraStavke !== ""){
    this.props.deleteStavka(stavka.sifraStavke);
    }
  }
}
izmeniStavku = (stavka,izmenjenaStavka) => {
  let stavke = this.state.stavke;
  const index = stavke.indexOf(stavka);
  if (index > -1) {
      stavke.splice(index, 1, izmenjenaStavka);
      this.setState({
          stavke: stavke
      }); 
  }
}


  render() {
    if(this.props.racun == undefined){
      return;
    }
    const { naciniPlacanja } = this.props.nacinPlacanja;
    const { ovlLica } = this.props.ovlLice;
    console.log(this.state.stavke);
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto">
                <h4 className="text-center">Izmena racuna za osiguranje</h4>
                <hr />
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input
                      type="text"
                      id="brojRacuna"
                      className="form-control"
                      placeholder="Broj racuna"
                      name="brojRacuna"
                      value={this.state.brojRacuna}
                      onChange={this.onChange}
                      readOnly
                    />
                    <div id="msg1" />
                  </div>
                  <div className="form-group float-left">
                    <DatePicker
                      showYearDropdown
                      yearDropdownItemNumber={30}
                      scrollableYearDropdown
                      className="input form-control"
                      dateFormat="dd.MM.yyyy"
                      selected={this.state.datum}
                      onChange={this.handleDateChange}
                      placeholderText="Datum"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="pozivNaBroj"
                      className="form-control"
                      placeholder="Poziv na broj"
                      name="pozivNaBroj"
                      value={this.state.pozivNaBroj}
                      onChange={this.onChange}
                    />
                    <div id="msg2" />
                  </div>
                  <div className="form-group">
                  <button type="button" className="btn btn-large btn-warning float-right mb-3" onClick={e => {
                    this.showModalU();
                    }}><i className="fa fa-search" />&nbsp;Pretraga ugovora</button>
                    <ModalZaUgovor
                    show={this.state.showU}
                    handleClose={this.handleClose}
                    chosenUgovor={this.chosenUgovor}
                    />
                    </div>
                    <div className="form-group">
                    <input
                      type="text"
                      id="brojUgovora"
                      className="form-control"
                      placeholder="Broj ugovora"
                      name="brojUgovora"
                      value={this.state.ugovorOOsiguranju != undefined ? this.state.ugovorOOsiguranju.brojUgovora : ""}
                      readOnly
                    />
                    </div>
                    <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Sifra zahteva"
                      name="sifraZahteva"
                      value={this.state.ugovorOOsiguranju != undefined ? this.state.ugovorOOsiguranju.zahtevZaOsiguranje.sifraZahteva : ""}
                      readOnly
                    />
                    <div id="msg3" />
                    </div>
                    <div className="form-group">
                    <h5>Stavke racuna</h5>
                    <div className="form-group">
                    <button type="button" className="btn btn-large btn-warning float-right mb-3" onClick={e => {
                        this.showModalS();
                        }}><i className="fa fa-plus" />&nbsp;Dodaj stavku</button>
                        <ModalZaStavku
                        show={this.state.showS}
                        handleClose={this.handleClose}
                        addStavka={this.addStavka}
                        calcIznos={this.calcIznos}
                        brojRacuna={this.state.brojRacuna}
                        />
                    </div>
                    <div className="form-group" id="stavkaTable">
                    <StavkaTable stavke={this.state.stavke} obrisiStavku={this.obrisiStavku} izmeniStavku={this.izmeniStavku}></StavkaTable>
                    <div id="msg4" />
                    </div>
                    </div>
                    <div className="form-group">
                    <button type="button" className="btn btn-large btn-warning float-right mb-3" onClick={e => {
                        this.calcIznos();
                        }}><i className="fa fa-calculator" />&nbsp;Izracunaj ukupan iznos</button>
                    <input
                      type="text"
                      id="iznos"
                      className="form-control"
                      placeholder="Ukupan iznos"
                      name="iznos"
                      value={this.state.iznos+" din"}
                      onChange={this.onChange}
                      readOnly
                    />
                    <div id="msg5" />
                  </div>
                  <div className="form-group">
                    <ComboBox
                      option={naciniPlacanja.map((nacinPlacanja) => (
                        <option key={nacinPlacanja.idNacinaPlacanja} value={nacinPlacanja.idNacinaPlacanja}>
                        {nacinPlacanja.opisNacinaPlacanja}
                        </option>
                      ))}
                      onChange={this.updateIdOfNacinPlacanja("nacinPlacanja")}
                      id="nacinPlacanja"
                      text="Izaberite nacin placanja"
                      ID={
                        this.state.nacinPlacanja != null
                          ? this.state.nacinPlacanja.idNacinaPlacanja
                          : 0
                      }
                    />
                    <div id="msg6" />
                  </div>
                  <div className="form-group">
                    <ComboBox
                      option={ovlLica.map((ovlLice) => (
                        <option key={ovlLice.sifraOL} value={ovlLice.sifraOL}>
                          {ovlLice.imePrezime}
                        </option>
                      ))}
                      onChange={this.updateIdOfOvLice("ovlascenoLiceOsiguravajuceKuce")}
                      id="ovlascenoLiceOsiguravajuceKuce"
                      text="Izaberite ovlasceno lice"
                      ID={
                        this.state.ovlascenoLiceOsiguravajuceKuce != null
                          ? this.state.ovlascenoLiceOsiguravajuceKuce.sifraOL
                          : 0
                      }
                    />
                    <div id="msg7" />
                  </div>
                  <div className="form-group">
                    <p>Izaberi status:</p>
                    <input type="radio" id="status" name="status" value="Izmenjen" onChange={this.onChange} checked={this.state.status === "Izmenjen"}/>&nbsp;
                    <label for="status">Izmenjen</label>
                    <input className="ml-5" type="radio" id="status" name="status" value="Obradjen" onChange={this.onChange} checked={this.state.status === "Obradjen"}/>&nbsp;
                    <label for="status">Obradjen</label><br></br>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-large btn-success float-right mt-1 mb-3"
                  >
                  <i className="fa fa-check fa-1x" /> Sacuvaj
                  </button>

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
    nacinPlacanja: state.nacinPlacanja,
    ovlLice: state.ovlLice,
    stavka: state.stavka.stavka
  });

export default connect(mapStateToProps, { createRacun, getRacun, getOvlascenjaLica, getNaciniPlacanja, deleteStavka, setMessage, createStavka })(UpdateRacun);