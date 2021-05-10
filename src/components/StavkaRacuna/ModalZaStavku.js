import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { Link } from "react-router-dom";
import { setMessage } from "../../utils";

class ModalZaStavku extends Component {
  constructor(props) {
    super();

    this.state = {
      nazivVrsteOsig: "",
      cena: "",
      racunOsiguranja: {
        brojRacuna: ""
      } 
    };
    this.onChange = this.onChange.bind(this);
    this.dodajStavku = this.dodajStavku.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount(){
    
  }

  dodajStavku() {
    if (this.handleValidation() == true) {
      return;
    }
    const newStavka = {
      nazivVrsteOsig: this.state.nazivVrsteOsig,
      cena: this.state.cena,
      racunOsiguranja: {
        brojRacuna: this.props.brojRacuna
      }
    };
    console.log(newStavka);
    this.props.addStavka(newStavka);
    this.setState({nazivVrsteOsig: "",
    cena: ""});
  }

  handleClose() {
    this.props.handleClose();
    this.setState({nazivVrsteOsig: "",
    cena: ""});
  }

  handleDateChange(date) {
    this.setState({ datum: date });
  }

  handleValidation = () => {
    let error = false;

    if (this.state.nazivVrsteOsig == "") {
      this.props.setMessage("Morate uneti naziv vrste osiguranja!", "#nazivM", "#m1");
      error = true;
    }

    if (this.state.cena == "") {
      this.props.setMessage("Morate uneti cenu!", "#cenaM", "#m2");
      error = true;
    }

    if (parseInt(this.state.cena) <= 0) {
      this.props.setMessage("Cena mora biti veca od 0!", "#cenaM", "#m3");
      error = true;
    }

    return error;
  };

  render() {
    console.log(this.state);
    if(!this.props.show){
        return null;
    }
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleClose}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
        <Modal.Title>Unos stavke racuna za osiguranje
        </Modal.Title>
        </Modal.Header>
          <Modal.Body>
          <div>
          <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-6 m-auto">
                  <hr />
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        id="nazivM"
                        className="form-control"
                        placeholder="Naziv vrste osiguranja"
                        name="nazivVrsteOsig"
                        value={this.state.nazivVrsteOsig}
                        onChange={this.onChange}
                      />
                      <div id="m1" />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        id="cenaM"
                        className="form-control"
                        placeholder="Cena"
                        name="cena"
                        value={this.state.cena}
                        onChange={this.onChange}
                      />
                      <div id="m2" />
                      <div id="m3" />
                    </div>
                    
                    <button
                      type="button"
                      className="btn btn-large btn-success float-right mb-3"
                      onClick={this.dodajStavku}
                    >
                      <i className="fa fa-check" /> Dodaj stavku
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
          </Modal.Body>
          
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { setMessage})(ModalZaStavku);
