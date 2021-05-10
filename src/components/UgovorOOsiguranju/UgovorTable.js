import React, { Component } from "react";
import UgovorRow from "./UgovorRow";

class UgovorTable extends Component {
  render() {
    let ugovori = this.props.ugovori.map((ugovor) => (
      <UgovorRow key={ugovor.brojUgovora} ugovor={ugovor} chosenUgovor={this.props.chosenUgovor} />
    )); 
    return (
      <div className="table-responsive tableHeight">
        <table
          id="example"
          className="table table-sm table-striped table-bordered"
        >
          <thead>
            <tr>
              <th>Broj ugovora</th>
              <th>Datum</th>
              <th>Potpisao</th>
              <th>Drzava</th>
              <th>Sifra zahteva</th>
              <th>Radnik</th>
              <th className="text-center">Izaberi</th>
            </tr>
          </thead>
          <tbody>
          {ugovori}</tbody>
        </table>
      </div>
    );
  }
}

export default UgovorTable;