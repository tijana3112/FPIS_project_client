import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { getUplatnice } from "../../actions/uplatnicaAction";
import UplatnicaList from "./UplatnicaList";

class ModalZaUplatnicu extends Component {
  constructor(props) {
    super();

    this.state = {
      ...props.uplatnica,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.props.getUplatnice();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      idUplatnice,
      svrhaUplate,
      iznos
    } = nextProps.uplatnica;

    this.setState({
        idUplatnice,
        svrhaUplate,
        iznos
    });
  }

  handleClose() {
    this.props.handleClose();
  }
  chosenUplatnica(uplatnica) {
      this.props.chosenUplatnica(uplatnica);
      this.props.handleClose();
  }

  render() {
    console.log(this.props.uplatnica);
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
        <Modal.Title>Uplatnica za osiguranje
        </Modal.Title>
        </Modal.Header>
          <Modal.Body>
              <UplatnicaList chosenUplatnica={this.props.chosenUplatnica}/>
          </Modal.Body>
          
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  uplatnica: state.uplatnica,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getUplatnice,
})(ModalZaUplatnicu);
