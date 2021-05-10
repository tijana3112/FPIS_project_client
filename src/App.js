import React from "react";
import "./App.css";
import MenuBar from "./components/MenuBar/MenuBar";
import Dashboard from "./components/Dashboard/Dashboard";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import 'font-awesome/css/font-awesome.min.css';
import ObavestenjeList from "./components/Obavestenje/ObavestenjeList";
import AddObavestenje from "./components/Obavestenje/AddObavestenje";
import RacunList from "./components/RacunZaOsig/RacunList";
import AddRacun from "./components/RacunZaOsig/AddRacun";
import Pocetna from "./components/Dashboard/Pocetna";
import UpdateObavestenje from "./components/Obavestenje/UpdateObavestenje";
import UpdateRacun from "./components/RacunZaOsig/UpdateRacun";
import PrikaziRacun from "./components/RacunZaOsig/PrikaziRacun";



function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">        
          <Dashboard />
          <MenuBar />
          <Route exact path="/" component={Pocetna} />
          <Route exact path="/obavestenjeList" component={ObavestenjeList} />
          <Route exact path="/addObavestenje" component={AddObavestenje} />
          <Route exact path="/racunList" component={RacunList} />
          <Route exact path="/addRacun" component={AddRacun} />
          <Route exact path="/updateObavestenje/:idObavestenja" component={UpdateObavestenje} />
          <Route exact path="/updateRacun/:brojRacuna" component={UpdateRacun} />
          <Route exact path="/prikaziRacun/:brojRacuna" component={PrikaziRacun} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
