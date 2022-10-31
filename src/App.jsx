
import './style/App.css';
import Header from './compoents/header';
import Page from './compoents/page';
import Overlay from './compoents/overlay/overlay';
import { useState } from 'react';
import { Artifact } from './structure/class/artifact';
import { Status } from './structure/class/status';

function App() {
  const [overlay, setOverlay] = useState({enable:true, id:-1});
  const [artifacts, setArtifacts] = useState([new Artifact([new Status("HP ", 256), new Status("HP%", 5.3), new Status("CrD", 5.6), new Status("ElM", 25)], 5, true)]);

  const addArtifact = (artifact) => {//arrow function wrapped, auto desc sorted.
    setArtifacts(() => [...artifacts, artifact].sort((a, b) => b.avg.score()-a.avg.score()));
  }

  const deleteArtifact = (i_) => {
    setArtifacts(artifacts.filter((a, i) => i !== i_));
  }

  const setArtifact = (id, artifact) => {
    const artifacts_ = Array.from(artifacts);
    artifacts_[id] = artifact;
    setArtifacts(artifacts_.sort((a, b) => b.avg.score()-a.avg.score()));
  }

  return (
    <div className="App">
      {overlay.enable ? <Overlay artifacts={artifacts} deleteArtifact={deleteArtifact} setArtifact={setArtifact} addArtifact={addArtifact} overlay={overlay} setOverlay={setOverlay}/> : null}
      <Header />
      <Page artifacts={artifacts} addArtifact={addArtifact} setOverlay={setOverlay}/>
    </div>
  );
}

export default App;