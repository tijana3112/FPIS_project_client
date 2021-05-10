import React, { Component } from "react";
import StavkaRowShow from "./StavkaRowShow";

class StavkaTableShow extends Component {
  render() {
    if(this.props.stavke == undefined){
      return null;
    }
      console.log(this.props.stavke);
    let stavke = this.props.stavke.map((stavka) => (
        <StavkaRowShow key={stavka.sifraStavke} stavka={stavka} />
        ));
        
    return (
      <div className="table-responsive tableHeight">
        <table
          id="example"
          className="table table-sm table-striped table-bordered"
        >
          <thead>
            <tr>
            <th>Sifra stavke</th>
              <th>Naziv vrste osiguranja</th>
              <th>Cena</th>
            </tr>
          </thead>
          <tbody>{stavke}</tbody>
        </table>
      </div>
    );
  }
}

export default StavkaTableShow;