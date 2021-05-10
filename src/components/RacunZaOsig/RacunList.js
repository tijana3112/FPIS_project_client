import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getRacuni,
  getRacunById,
} from "../../actions/racunActions";
import PropTypes from "prop-types";
import RacunTable from "./RacunTable";
import { Link } from "react-router-dom";

class RacunList extends Component {
    constructor() {
        super();
    
        this.state = {
          brojRacuna: "",
        };
    
        this.onChange = this.onChange.bind(this);
        this.getRacuni = this.getRacuni.bind(this);
        this.getRacunById = this.getRacunById.bind(this);
      }

  componentDidMount() {
    this.props.getRacuni();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getRacunById() {
    this.props.getRacunById(this.state.brojRacuna, this.props.history);
  }

  getRacuni() {
    this.props.getRacuni();
  }

  render() {
    const { racuni } = this.props.racun;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 m-auto">
            <div className="card text-left mb-3">
              <div className="card-header text-white">
                <h3>Racuni za osiguranje</h3>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter po broju racuna"
                  name="brojRacuna"
                  value={this.state.brojRacuna}
                  onChange={this.onChange}
                ></input>
                
                <button
                  className="btn btn-large btn-danger float-right mt-2"
                  onClick={this.getRacuni}
                >
                  Ponisti filter
                </button>
                <button
                  className="btn btn-large btn-success float-right mt-2 mr-3"
                  onClick={this.getRacunById}
                >
                  Primeni filter
                </button>
                <br />
                <Link to="/addRacun">
                <button className="btn btn-large btn-success mt-2"><i className="fa fa-plus fa-1x" />&nbsp;
                Dodaj novi racun
                </button>
                </Link>                                 
              </div>
              <div className="card-body">
                <RacunTable racuni={racuni} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RacunList.propTypes = {
  racun: PropTypes.object.isRequired,
  getRacuni: PropTypes.func.isRequired,
  getRacunById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  racun: state.racun,
});

export default connect(mapStateToProps, {
  getRacuni,
  getRacunById,
})(RacunList);