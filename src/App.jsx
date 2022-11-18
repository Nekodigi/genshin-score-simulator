
import './style/App.scss';
import Header from './compoents/header';
import Page from './compoents/page';
import Overlay from './compoents/overlay/overlay';
import { useState, useRef } from 'react';


function App() {
  const [overlay, setOverlay] = useState({enable:false, id:-1});
  const [artifacts, setArtifacts] = useState([]);

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
