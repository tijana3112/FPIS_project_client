import React, { Component } from "react";
import RacunRow from "./RacunRow";

class RacunTable extends Component {
  render() {
    let racuni = this.props.racuni.map((racun) => (
      <RacunRow key={racun.brojRacuna} racun={racun} />
    ));
    return (
      <div className="table-responsive tableHeight">
        <table
          id="example"
          className="table table-sm table-striped table-bordered"
        >
          <thead>
            <tr>
              <th>Broj racuna</th>
              <th>Datum</th>
              <th>Poziv na broj</th>
              <th>Iznos</th>
              <th>Broj ugovora</th>
              <th>Nacin placanja</th>
              <th>Osiguravajuca kuca</th>
              <th>Ovlasceno lice</th>
              <th className="text-center">Izmena</th>
              <th className="text-center">Brisanje</th>
              <th className="text-center">Prikazi</th>
            </tr>
          </thead>
          <tbody>{racuni}</tbody>
        </table>
      </div>
    );
  }
}

export default RacunTable;