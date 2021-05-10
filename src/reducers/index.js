import { combineReducers } from "redux";
import obavestenjeReducer from "./obavestenjeReducer";
import osigKucaReducer from "./osigKucaReducer";
import radnikReducer from "./radnikReducer";
import uplatnicaReducer from "./uplatnicaReducer";
import nacinPlacanjaReducer from "./nacinPlacanjaReducer";
import ovlascenoLiceReducer from "./ovlascenoLiceReducer";
import racunReducer from "./racunReducer";
import ugovorReducer from "./ugovorReducer";
import errorReducer from "./errorReducer";
import stavkeReducer from "./stavkeReducer";

export default combineReducers({
    obavestenje: obavestenjeReducer,
    uplatnica: uplatnicaReducer,
    radnik: radnikReducer,
    osigKuca: osigKucaReducer,
    nacinPlacanja: nacinPlacanjaReducer,
    ovlLice: ovlascenoLiceReducer,
    racun: racunReducer,
    ugovor: ugovorReducer,
    errors: errorReducer,
    stavka: stavkeReducer
});