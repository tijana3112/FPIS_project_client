import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { getUgovori } from "../../actions/ugovorActions";
import UgovorList from "./UgovorList";

class ModalZaUgovor extends Component {
  constructor(props) {
    super();

    this.state = {
      ...props.ugovor,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.getUgovori();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      brojUgovora,
      zahtevZaOsiguranje
    } = nextProps.ugovor;

    this.setState({
        brojUgovora,
        zahtevZaOsiguranje
    });
  }

  handleClose() {
    this.props.handleClose();
  }
  chosenUgovor(ugovor) {
      this.props.chosenUgovor(ugovor);
      this.props.handleClose();
  }

  render() {
    console.log(this.props.ugovor);
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
        <Modal.Title>Ugovor o osiguranju
        </Modal.Title>
        </Modal.Header>
          <Modal.Body>
              <UgovorList chosenUgovor={this.props.chosenUgovor}/>
          </Modal.Body>
          
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  ugovor: state.ugovor,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getUgovori,
})(ModalZaUgovor);
