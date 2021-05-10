import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getUgovori, getUgovorById
} from "../../actions/ugovorActions";
import PropTypes from "prop-types";
import UgovorTable from "./UgovorTable";
import { Link } from "react-router-dom";


class UgovorList extends Component {
    constructor() {
        super();
    
        this.state = {
            brojUgovora: "",
        };
    
        this.onChange = this.onChange.bind(this);
        this.getAllUgovori = this.getAllUgovori.bind(this);
        this.getUgovorById = this.getUgovorById.bind(this);
      }

  componentDidMount() {
    this.props.getUgovori();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getUgovorById() {
    this.props.getUgovorById(this.state.brojUgovora, this.props.history);
  }

  getAllUgovori() {
    this.props.getUgovori();
  }

  render() {
    const { ugovori } = this.props.ugovor;
    console.log(ugovori);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 m-auto">
            <div className="card text-left mb-3">
              <div className="card-header text-white">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Broj ugovora"
                  name="brojUgovora"
                  value={this.state.brojUgovora}
                  onChange={this.onChange}
                ></input>
                <button
                  className="btn btn-large btn-danger float-right mt-2"
                  onClick={this.getAllUgovori}
                >
                  Ponisti filter
                </button>
                <button
                  className="btn btn-large btn-success float-right mt-2 mr-3"
                  onClick={this.getUgovorById}
                >
                  Primeni filter
                </button>
                <br />                                
              </div>
              <div className="card-body">
                <UgovorTable ugovori={ugovori} chosenUgovor={this.props.chosenUgovor} />
              </div>                                
              </div>
            </div>
          </div>
        </div>
    );
  }
}

UgovorList.propTypes = {
  ugovor: PropTypes.object.isRequired,
  getUgovori: PropTypes.func.isRequired,
  getUgovorById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ugovor: state.ugovor,
});

export default connect(mapStateToProps, {
  getUgovori,
  getUgovorById,
})(UgovorList);