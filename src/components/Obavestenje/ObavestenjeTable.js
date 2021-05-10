import React, { Component } from "react";
import ObavestenjeRow from "./ObavestenjeRow";

class ObavestenjeTable extends Component {
  render() {
    let obavestenja = this.props.obavestenja.map((obavestenje) => (
      <ObavestenjeRow key={obavestenje.idObavestenja} obavestenje={obavestenje} />
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
              <th>Svrha obavestenja</th>
              <th>Datum</th>
              <th>Uplatnica</th>
              <th>Radnik</th>
              <th>Osiguravajuca kuca</th>
              <th className="text-center">Izmena</th>
              <th className="text-center">Brisanje</th>
            </tr>
          </thead>
          <tbody>{obavestenja}</tbody>
        </table>
      </div>
    );
  }
}

export default ObavestenjeTable;