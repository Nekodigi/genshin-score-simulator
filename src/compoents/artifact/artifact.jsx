import '../../style/component/artifact.scss';

function Artifact({id, artifact, setOverlay}) {
    artifact.eval();

    return (
        <button className="artifact" onClick={() => setOverlay({enable:true, id:id})}>
            <h2>#{id+1}</h2>
            <div className="score">
                <p>AVG : {artifact.avg.score()}</p>
                <div className="score_sub">
                    <p>MIN : {artifact.min.score()}</p>
                    <p>MAX : {artifact.max.score()}</p>
                </div>
            </div>
            <div className="border"></div>
            <div className="status">
                <p>+{artifact.level}</p>
                <div className="status_sub">
                    <p>{artifact.ss[0].render()}</p>
                    <p>{artifact.ss[1].render()}</p>
                    <p>{artifact.ss[2].render()}</p>
                    <p>{artifact.ss[3].render()}</p>
                </div>
            </div>
        </button>
    );
}

export default Artifact;