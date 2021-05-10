import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getObavestenja,
  getObavestenjeBySvrha,
} from "../../actions/obavestenjeActions";
import PropTypes from "prop-types";

import ObavestenjeTable from "./ObavestenjeTable";
import { Link } from "react-router-dom";

class ObavestenjeList extends Component {
    constructor() {
        super();
    
        this.state = {
          svrhaObavestenja: "",
        };
    
        this.onChange = this.onChange.bind(this);
        this.getAllObavestenja = this.getAllObavestenja.bind(this);
        this.getObavestenjaBySvrha = this.getObavestenjaBySvrha.bind(this);
      }

  componentDidMount() {
    this.props.getObavestenja();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getObavestenjaBySvrha() {
    this.props.getObavestenjeBySvrha(this.state.svrhaObavestenja, this.props.history);
  }

  getAllObavestenja() {
    this.props.getObavestenja();
  }

  render() {
    const { obavestenja } = this.props.obavestenje;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 m-auto">
            <div className="card text-left mb-3">
              <div className="card-header text-white">
                <h3>Obavestenja o izvrsenoj uplati osiguranja</h3>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter po svrsi obavestenja"
                  name="svrhaObavestenja"
                  value={this.state.svrhaObavestenja}
                  onChange={this.onChange}
                ></input>
                
                <button
                  className="btn btn-large btn-danger float-right mt-2"
                  onClick={this.getAllObavestenja}
                >
                  Ponisti filter
                </button>
                <button
                  className="btn btn-large btn-success float-right mt-2 mr-3"
                  onClick={this.getObavestenjaBySvrha}
                >
                  Primeni filter
                </button>
                <br />
                <Link to="/addObavestenje">
                <button className="btn btn-large btn-success mt-2"><i className="fa fa-plus fa-1x" />&nbsp;
                 Dodaj novo obavestenje
                </button>
                </Link>                                 
              </div>
              <div className="card-body">
                <ObavestenjeTable obavestenja={obavestenja} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ObavestenjeList.propTypes = {
  obavestenje: PropTypes.object.isRequired,
  getObavestenja: PropTypes.func.isRequired,
  getObavestenjeBySvrha: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  obavestenje: state.obavestenje,
});

export default connect(mapStateToProps, {
  getObavestenja,
  getObavestenjeBySvrha,
})(ObavestenjeList);