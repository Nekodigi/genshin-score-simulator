//import { useState, Component } from "react";
import { Artifact } from "../../structure/class/artifact";
import { Status } from "../../structure/class/status";
import ArtifactR from "./artifact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


function AddArtifact({setOverlay}){
    return( 
        <button className="add_artifact" onClick={() => setOverlay({enable:true, id:-1})}>
            <h2>Add Artifact</h2>
            <FontAwesomeIcon className="add" icon={faPlus}/>
        </button>);
}

function Artifacts({artifacts, addArtifact, setOverlay}){
    
    
    function add(){
        addArtifact(new Artifact([new Status("HP ", 256), new Status("HP%", 5.3), new Status("CrD", 2.6), new Status("ElM", 25)], 5, true));
    //artifacts.push();
    }

    return (
        <div className="artifacts">
            
            {artifacts.map((artifact, i) => <ArtifactR key={i} id={i} artifact={artifact} setOverlay={setOverlay}/>)}
            {/* <button onClick={add} >ADD TEST</button> */}
            <AddArtifact addArtifact={addArtifact} setOverlay={setOverlay}/>
            
        </div>
    );
}

export default Artifacts;
