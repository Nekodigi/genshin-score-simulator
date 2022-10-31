import { useEffect } from 'react';
import { useState } from 'react';
import { Artifact } from '../../structure/class/artifact';
import '../../style/component/editor/editor.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleExclamation, faPlus, faSave, faCancel, faDeleteLeft, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";


import Substatus from './substatus';

function Editor({artifacts, deleteArtifact, setArtifactP, addArtifact, overlay, setOverlay}) {
    const notEnoughSubstatErr = <p><FontAwesomeIcon icon={faCircleExclamation}/>&nbsp;&nbsp;4 sub-stats are required to estimate 5 star artifact score.</p>;
    //console.log(artifacts[overlay.id]);
    var [artifact, setArtifact_] = useState({d:new Artifact(), state:0});//not good idea
    const [err, setErr] = useState(notEnoughSubstatErr);
    const [minS, setMinS] = useState("0.0");
    const [avgS, setAvgS] = useState("0.0");
    const [maxS, setMaxS] = useState("0.0");
    const [ready, setReady] = useState(false);

    const setArtifact = (artifact_) => {
        setArtifact_({d:artifact_, state:(artifact.state+1)%10});
    }

    useEffect(() => {
        //
        artifact.d = overlay.id !== -1 ? artifacts[overlay.id] : new Artifact();
        setArtifact(artifact.d);

        updateStatus();
    }, [overlay]);

    const levelChange = e => {
        setLevel(e.target.value);
    }

    const setLevel = (value) => {
        value = Math.max(0, Math.min(20, value));
        artifact.d.level = value;
        setArtifact(artifact.d);
        updateStatus();
    }

    const updateStatus = () => {
        //console.log(artifact.toString());
        if(artifact.d.evalReady()){
            console.log("good");
            setErr("");
            setReady(true);
         }else{
            setErr(notEnoughSubstatErr);
            setReady(false);
         }
        const res = artifact.d.eval();
        //console.log(res);
        setMinS(res.min.score());
        setAvgS(res.avg.score());
        setMaxS(res.max.score());
        //console.log(artifact.printEval());
        //console.log("UPDATED STATUS");
    }

    const reset = () => {
        setArtifact(new Artifact());
        setOverlay({id:-1, enable:false});
        updateStatus();
    }

    const delete_ = () => {
        deleteArtifact(overlay.id);
        reset();
    }

    const add = () => {
        overlay.id === -1 ? addArtifact(artifact.d) : setArtifactP(overlay.id, artifact.d);
        reset();
    }

    return (
        <div className="editor">
            <div className="heading">
                <h2>{overlay.id === -1 ? "Add Artifact" : "Edit Artifact"}</h2>
                <button onClick={() => setOverlay({enable:false, id:-1})}>{/*must use ()=>*/}
                    <FontAwesomeIcon className="add" icon={faXmark}/>
                </button>
                    
            </div>
            <div className='level_input'>
                <input 
                    type="text"//number input cannot indentify 01 and 1
                    placeholder="Level"
                    value={artifact.d.level}
                    onChange={levelChange}
                    onKeyPress={(event) => {//accept only number
                        if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                        }
                    }}
                    min={0}
                    max={20}
                    step={1}
                />
                <label>Level</label>
            </div>
            <Substatus id={0} artifact={artifact} setArtifact={setArtifact} updateStatus={updateStatus}/>
            <Substatus id={1} artifact={artifact} setArtifact={setArtifact} updateStatus={updateStatus}/>
            <Substatus id={2} artifact={artifact} setArtifact={setArtifact} updateStatus={updateStatus}/>
            <Substatus id={3} artifact={artifact} setArtifact={setArtifact} updateStatus={updateStatus}/>
            {err !== "" ? <div className='error'>{err}</div> : null}
            <h3>Estimated Score at (+20)</h3>
            <div className="score">
                <p>MIN : {minS}</p>
                <p>AVG : {avgS}</p>
                <p>MAX : {maxS}</p>
            </div>
            <div className="conclude">
                <button className='no' onClick={overlay.id === -1 ? () => reset() : () => delete_()} >{overlay.id === -1 ? <p><FontAwesomeIcon icon={faCancel} />&nbsp;&nbsp;Cancel</p> : <p><FontAwesomeIcon icon={faTrashCan} />&nbsp;&nbsp;Delete</p>}</button>
                <button className='yes' disabled={!ready} onClick={() => add()}>{overlay.id === -1 ? <p><FontAwesomeIcon icon={faPlus} />&nbsp;&nbsp;Add</p> : <p><FontAwesomeIcon icon={faSave} />&nbsp;&nbsp;Save</p>}</button>
            </div> 
        </div>
    );
}

export default Editor;