import Artifacts from "./artifact/artifacts";

function Page({artifacts, addArtifact, setOverlay}) {

    return (
        <div className="page">
            <Artifacts artifacts={artifacts} addArtifact={addArtifact} setOverlay={setOverlay}/>
            
            
        </div>
    );
}

export default Page;