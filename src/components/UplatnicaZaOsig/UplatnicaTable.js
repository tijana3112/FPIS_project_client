import React, { Component } from "react";
import UplatnicaRow from "./UplatnicaRow";

class UplatnicaTable extends Component {
  render() {
    let uplatnice = this.props.uplatnice.map((uplatnica) => (
      <UplatnicaRow key={uplatnica.idUplatnice} uplatnica={uplatnica} chosenUplatnica={this.props.chosenUplatnica} />
    )); 
    return (
      <div className="table-responsive tableHeight">
        <table
          id="example"
          className="table table-sm table-striped table-bordered"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Svrha uplate</th>
              <th>Iznos</th>
              <th>Broj racuna</th>
              <th>ID modela</th>
              <th>ID valute</th>
              <th className="text-center">Izaberi</th>
            </tr>
          </thead>
          <tbody>
          {uplatnice}</tbody>
        </table>
      </div>
    );
  }
}

export default UplatnicaTable;