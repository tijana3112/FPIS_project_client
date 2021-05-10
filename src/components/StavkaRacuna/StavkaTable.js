import React, { Component } from "react";
import StavkaRow from "./StavkaRow";

class StavkaTable extends Component {
  render() {
    if(this.props.stavke == undefined){
      return null;
    }
      console.log(this.props.stavke);
    let stavke = this.props.stavke.map((stavka) => (
        <StavkaRow key={stavka.sifraStavke} stavka={stavka} obrisiStavku={this.props.obrisiStavku} izmeniStavku={this.props.izmeniStavku} />
        ));
        
    return (
      <div className="table-responsive tableHeight">
        <table
          id="example"
          className="table table-sm table-striped table-bordered"
        >
          <thead>
            <tr>
              <th>Naziv vrste osiguranja</th>
              <th>Cena</th>
              <th>Izmeni stavku</th>
              <th>Obrisi stavku</th>
            </tr>
          </thead>
          <tbody>{stavke}</tbody>
        </table>
      </div>
    );
  }
}

export default StavkaTable;