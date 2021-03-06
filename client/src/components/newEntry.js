import React, { useEffect, useState } from "react";
import Navbar from "./navbar"
import Map from "./newEntryMap"
import FormatTimestamp from "./formatTimestamp";
import Noty from 'noty';
import './map.css';
import "../../node_modules/noty/lib/themes/bootstrap-v4.css";
import "../../node_modules/noty/lib/noty.css";


export default function NewEntry() {
  const [sightings, setSightings] = useState([]); 
  const [error, setError] = useState(null);
  const [newSighting, setNewSighting] = useState({timestamp: FormatTimestamp(new Date()), latitude: 41.414, longitude: 2.12533, adults: 0, piglets: 0, humanInteraction: 0, comments: ""})
  const {timestamp, latitude, longitude, adults, piglets, humanInteraction, comments } = newSighting;
  
// LOADS DB INFO INTO sightings ARRAY
  useEffect(() => {
    fetch("/sightings")
      .then(res => res.json())
      .then(json => {
        setSightings(json);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []); 


// GETS USER INPUTS INTO newSighting OBJECT
  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewSighting(state => ({...state, [name]: value})) 
  }

// GETS GEOLOC INPUTS INTO newSighting OBJECT
  const handleCoordinates = (lat, long) => {
    setNewSighting(state => ({...state, latitude: lat, longitude: long})) 
  }

// COMPLETES newSighting OBJECT AND CALLS addSighting
  const handleSubmit = (e) => {
    e.preventDefault();
    addSighting(newSighting); // function that 'pushes' newSighting to DB
    setNewSighting(state => ({...state, adults: 0, piglets: 0, humanInteraction: 0, comments: " "})) 
  }

// ADDS SIGHTING INFO TO DB
  const addSighting = async () => {
    try {
      const res = await fetch("/sightings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSighting),
      });
      const data = await res.json();
      setSightings(data); // sightings array gets updated as well (so I do not need to reload page)
      new Noty({
        theme: 'bootstrap-v4',
        type: 'success',
        layout: 'topRight',
        text: 'Your sighting has been added correctly!',
        timeout: 2000
      }).show();

    } catch (err) {
      setError(err);
      new Noty({
        theme: 'bootstrap-v4',
        type: 'error',
        layout: 'topRight',
        text: 'Ouch! Something went wrong. Try again!',
        timeout: 2000
      }).show();
    }
  };

// HTML TEMPLATE
  return (
    <div>
      <Navbar />

    <div className="container mt-5">
        <h3 className="display-4 mb-5">New sighting</h3>
        <div className="row d-flex">
    {/* USER INPUT FORM */} 
          <div className="col-sm">
            <div className="mb-3"><h5>Add <b>information</b> about the sighting</h5></div>
            <form onSubmit={handleSubmit}>
            <div className="row d-flex">
              <div className="col-sm form-group mb-3">
                <label>How many <b>adults</b>?</label>
                <input name="adults" value={+adults} type="number" min="0" onChange={handleChange} className="form-control shadow"/>
              </div>

              <div className="col-sm form-group mb-3">
                <label>How many <b>piglets</b>?</label>
                <input name="piglets" value={+piglets} type="number" min="0" onChange={handleChange} className="form-control shadow"/>
              </div>
            </div>
              <div className="col-sm form-group mb-3">
                <label>Are they <b>interacting</b> with people and/or urban food sources?</label>
                  <select name="humanInteraction" value={humanInteraction}  onChange={handleChange} className="form-select form-select shadow" aria-label=".form-select-sm example">
                    <option value="0">NO</option>
                    <option value="1">YES</option>
                  </select>
              </div>

              <div className="form-group mb-3">
                <label>Is there any other <b>relevant information</b>?</label>
                  <textarea name="comments" value={comments} onChange={handleChange} className="form-control shadow" rows="3" placeholder="Any comments?"></textarea>
              </div>
              <button className="btn btn-dark mb-3 my-2" disabled={(latitude === 0)}>Submit</button>
            </form>
          </div>


        {/* MAP RENDER */}
          <div className="col-sm">
              <Map getMarkerCoordinates={(lat, long)=> handleCoordinates(lat, long)}/>
            <p className="text-muted">Latitude: {latitude}. Longitude: {longitude}</p>
          </div>
        </div>
      </div>

      <div className="row d-flex mt-5">
      <div className="text-center mt-5">
        <img src="https://emojigraph.org/media/softbank/boar_1f417.png" width="60" alt="boar emoji"/>
        <img src="https://emojigraph.org/media/softbank/boar_1f417.png" width="60" alt="boar emoji"/>
        <img src="https://emojigraph.org/media/softbank/boar_1f417.png" width="60" alt="boar emoji"/>
      </div>
      </div>

  </div>
  );
}