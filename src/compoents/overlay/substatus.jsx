import { field } from '../../structure/const/field'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Substatus = ({id, artifact, setArtifact,}) =>{

    const setValue = (raw) => {
        artifact.d.ss[id].setValueByStr(raw);
        setArtifact(artifact.d);
    }

    const setF = (value) => {
        //status.field = value;
        artifact.d.ss[id].field = value;
        setArtifact(artifact.d);
    }

    const valueChange = e => {
        setValue(e.target.value);
    }

    const fieldChange = e => {
        setF(e.target.value);
        
    }

    const dropdownIndicatorStyles = (base, state) => {
        let changes = {
          // all your override styles
          //backgroundColor: 'blue';
        };//Object.assign(base, changes);
        return <h1>TEST</h1>;
      };

    return (
        <div className="substat">
            <div className="select_w">
                <select 
                className='field'
                value={artifact.d.ss[id].field}
                onChange={fieldChange}
                styles={{dropdownIndicator: dropdownIndicatorStyles}}
                >
                <option value="HP ">{field["HP "].name}</option>
                <option value="ATK">{field["ATK"].name}</option>
                <option value="DEF">{field["DEF"].name}</option>
                <option value="HP%">{field["HP%"].name}</option>
                <option value="AT%">{field["AT%"].name}</option>
                <option value="DE%">{field["DE%"].name}</option>
                <option value="ElM">{field["ElM"].name}</option>
                <option value="EnR">{field["EnR"].name}</option>
                <option value="CRR">{field["CRR"].name}</option>
                <option value="CRD">{field["CRD"].name}</option>
                <option value="ERR">{field["ERR"].name}</option>
                
            </select>
            <FontAwesomeIcon className="arrow" icon={faAngleDown}/>
            </div>
                
                <input
                    type="text"
                    value={artifact.d.ss[id].preValue}
                    min={0}
                    onChange={valueChange}
                    className="substat1"
                    placeholder="0"
                    onKeyPress={(event) => {//accept only number
                        if (!/[\d.]/.test(event.key)) {
                            console.log(event.key);
                          event.preventDefault();
                        }
                      }}
                />
            </div>
    );
};

export default Substatus;