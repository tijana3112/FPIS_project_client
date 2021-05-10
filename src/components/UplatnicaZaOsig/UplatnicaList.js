import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getUplatnice, getUplatniceByIdSvrha, getUplatniceById, getUplatniceBySvrha
} from "../../actions/uplatnicaAction";
import PropTypes from "prop-types";

import UplatnicaTable from "./UplatnicaTable";
import { Link } from "react-router-dom";


class UplatnicaList extends Component {
    constructor() {
        super();
    
        this.state = {
            idUplatnice: "",
            svrhaUplate: "",
        };
    
        this.onChange = this.onChange.bind(this);
        this.getAllUplatnice = this.getAllUplatnice.bind(this);
        this.getUplatniceBy = this.getUplatniceBy.bind(this);
      }

  componentDidMount() {
    this.props.getUplatnice();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getUplatniceBy() {
    if(this.state.idUplatnice === "" && this.state.svrhaUplate !== ""){
      this.props.getUplatniceBySvrha(this.state.svrhaUplate, this.props.history);
    } else if (this.state.idUplatnice != "" && this.state.svrhaUplate == "") {
      this.props.getUplatniceById(this.state.idUplatnice, this.props.history);
    } else {
      this.props.getUplatniceByIdSvrha(this.state.idUplatnice, this.state.svrhaUplate, this.props.history);
    }
    
  }

  getAllUplatnice() {
    this.props.getUplatnice();
  }

  render() {
    const { uplatnice } = this.props.uplatnica;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 m-auto">
            <div className="card text-left mb-3">
              <div className="card-header text-white">
              <div className="row">
                <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ID uplatnice"
                  name="idUplatnice"
                  value={this.state.idUplatnice}
                  onChange={this.onChange}
                ></input>
                </div>
                <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Svrha uplate"
                  name="svrhaUplate"
                  value={this.state.svrhaUplate}
                  onChange={this.onChange}
                ></input>
                </div>
                </div>
                <button
                  className="btn btn-large btn-danger float-right mt-2"
                  onClick={this.getAllUplatnice}
                >
                  Ponisti filter
                </button>
                <button
                  className="btn btn-large btn-success float-right mt-2 mr-3"
                  onClick={this.getUplatniceBy}
                >
                  Primeni filter
                </button>
                <br />                                
              </div>
              <div className="card-body">
                <UplatnicaTable uplatnice={uplatnice} chosenUplatnica={this.props.chosenUplatnica} />
              </div>                                
              </div>
            </div>
          </div>
        </div>
    );
  }
}

UplatnicaList.propTypes = {
  uplatnica: PropTypes.object.isRequired,
  getUplatnice: PropTypes.func.isRequired,
  getUplatniceByIdSvrha: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  uplatnica: state.uplatnica,
});

export default connect(mapStateToProps, {
  getUplatnice,
  getUplatniceByIdSvrha,
  getUplatniceById, getUplatniceBySvrha
})(UplatnicaList);