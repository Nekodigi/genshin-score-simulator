import '../../style/component/overlay.scss';
import Editor from "./editor";


function Overlay ({artifacts, setArtifact, deleteArtifact, addArtifact, overlay, setOverlay}) {
    

    return (
        
        <div className="overlay">
            <Editor artifacts={artifacts} deleteArtifact={deleteArtifact} setArtifactP={setArtifact} addArtifact={addArtifact} overlay={overlay} setOverlay={setOverlay}/>
        </div>
    );
}

export default Overlay;