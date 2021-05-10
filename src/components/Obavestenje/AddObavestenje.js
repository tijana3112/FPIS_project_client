import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createObavestenje } from "../../actions/obavestenjeActions";
import { getRadnici } from "../../actions/radnikActions";
import { getOsigKuce } from "../../actions/osigKucaActions";
import DatePicker from "react-datepicker";
import classnames from "classnames";
import { adjustTimezoneDifference, setMessage } from "../../utils";
import { Link } from "react-router-dom";
import ComboBox from "../ComboBox";
import ModalZaUplatnicu from "../UplatnicaZaOsig/ModalZaUplatnicu";

class AddObavestenje extends Component {
  constructor() {
    super();
    this.state = {
      svrhaObavestenja: "",
      datum: "",
      uplatnica: {
        idUplatnice: 0,
        svrhaUplate: "",
        iznos: 0
      },
      radnik: {
        sifraRadnika: 0,
      },
      osiguravajucaKuca: {
        idOsigKuce: 0,
      },
      show: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors })
}

  componentDidMount() {
    this.props.getOsigKuce();
    this.props.getRadnici();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDateChange(date) {
    this.setState({ datum: date });
  }

  handleValidation = () => {
    let error = false;

    if (this.state.svrhaObavestenja == "") {
      this.props.setMessage("Morate uneti svrhu obavestenja!", "#svrhaObavestenja", "#msg1");
      error = true;
    }

    if (this.state.uplatnica.idUplatnice == 0) {
      this.props.setMessage("Morate izabrati uplatnicu!", "#idUplatnice", "#msg2");
      error = true;
    }

    if (this.state.radnik.sifraRadnika == 0) {
      this.props.setMessage("Morate izabrati radnika!", "#radnik", "#msg3");
      error = true;
    }

    if (this.state.osiguravajucaKuca.idOsigKuce == 0) {
      this.props.setMessage("Morate izabrati osiguravajucu kucu!", "#osiguravajucaKuca", "#msg4");
      error = true;
    }

    return error;
  };

  onSubmit(e) {
    e.preventDefault();

    if (this.handleValidation() == true) {
      return;
    }

    const newObavestenje = {
      svrhaObavestenja: this.state.svrhaObavestenja,
      datum: adjustTimezoneDifference(this.state.datum),
      uplatnica: {
        idUplatnice: this.state.uplatnica.idUplatnice
      },
      radnik: {
        sifraRadnika: this.state.radnik.sifraRadnika,
      },
      osiguravajucaKuca: {
        idOsigKuce: this.state.osiguravajucaKuca.idOsigKuce,
      },
    };
    console.log(newObavestenje);
    this.props.createObavestenje(
      newObavestenje,
      this.props.history,
    );
  }

  updateIdOfRadnik(object) {
    return (e) => {
      this.setState({ [object]: { sifraRadnika: e.target.value } });
    };
  }

  updateIdOfOsigKuca(object) {
    return (e) => {
      this.setState({ [object]: { idOsigKuce: e.target.value } });
    };
  }

  showModal = e => {
    this.setState({
      show: true
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  chosenUplatnica = (uplatnica) => {
    this.setState({
      uplatnica: {
        idUplatnice: uplatnica.idUplatnice,
        svrhaUplate: uplatnica.svrhaUplate,
        iznos: uplatnica.iznos
      },
      show: false
    });
}


  render() {
    const { radnici } = this.props.radnik;
    const { osigKuce } = this.props.osigKuca;
    const { errors } = this.state;
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto">
                <h4 className="text-center">Unos novog obavestenja o izvrsenoj uplati osiguranja</h4>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      id="svrhaObavestenja"
                      className={classnames("form-control", {
                        "is-invalid": errors.svrhaObavestenja
                    })}
                      placeholder="Svrha obavestenja"
                      name="svrhaObavestenja"
                      value={this.state.svrhaObavestenja}
                      onChange={this.onChange}
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
                  <button type="button" className="btn btn-large btn-warning float-right" onClick={e => {
                    this.showModal();
                    }}><i className="fa fa-search" />&nbsp;Pretraga uplatnica</button>
                    <ModalZaUplatnicu
                    show={this.state.show}
                    handleClose={this.handleClose}
                    chosenUplatnica={this.chosenUplatnica}
                    />
                    </div>
                    <div className="form-group">
                    <input
                      id="idUplatnice"
                      type="text"
                      className="form-control"
                      placeholder="ID uplatnice"
                      name="idUplatnice"
                      value={this.state.uplatnica.idUplatnice}
                      readOnly
                    />
                    </div>
                    <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Svrha uplate"
                      name="svrhaUplate"
                      value={this.state.uplatnica.svrhaUplate}
                      readOnly
                    />
                    </div>
                    <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Iznos"
                      name="iznos"
                      value={this.state.uplatnica.iznos+" din"}
                      readOnly
                    />
                    <div id="msg2" />
                  </div>
                  <div className="form-group">
                    <ComboBox
                      option={radnici.map((radnik) => (
                        <option key={radnik.sifraRadnika} value={radnik.sifraRadnika}>
                          {radnik.imePrezime}
                        </option>
                      ))}
                      onChange={this.updateIdOfRadnik("radnik")}
                      id="radnik"
                      text="Izaberite radnika"
                    />
                    <div id="msg3" />
                  </div>
                  <div className="form-group">
                    <ComboBox
                      option={osigKuce.map((osigKuca) => (
                        <option key={osigKuca.idOsigKuce} value={osigKuca.idOsigKuce}>
                          {osigKuca.nazivOsigKuce}
                        </option>
                      ))}
                      onChange={this.updateIdOfOsigKuca("osiguravajucaKuca")}
                      id="osiguravajucaKuca"
                      text="Izaberite osiguravajucu kucu"
                    />
                    <div id="msg4" />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-large btn-success float-right mb-3"
                  >
                    <i className="fa fa-check fa-1x" /> Sacuvaj
                  </button>

                  <Link to={`/obavestenjeList`}>
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
    radnik: state.radnik,
    osigKuca: state.osigKuca,
    errors: state.errors
  });

export default connect(mapStateToProps, { setMessage, createObavestenje, getRadnici, getOsigKuce })(AddObavestenje);