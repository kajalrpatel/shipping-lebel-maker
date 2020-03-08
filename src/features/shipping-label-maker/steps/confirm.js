import React from 'react';
import { Media } from'reactstrap';

function RenderSenderRecInfo({wizardContext}) {
    if(wizardContext != null){
        return(
            <div className="col-5 m-2">
                <Media tag="li">
                    <Media body className="ml-5">
                        
                        <p> <strong>Name: </strong> {wizardContext.name}</p>
                        <p> <strong>Street: </strong>{wizardContext.street}</p>
                        <p> <strong>City: </strong>{wizardContext.city}</p>
                        <p> <strong>State: </strong>{wizardContext.state}</p>
                        <p> <strong>Zip: </strong>{wizardContext.zip}</p>
                    </Media>
                </Media>
            </div>
        );
    }else{
        return( <div></div> );
    }

}

const Confirm = (props) =>{
    return(
        <div className="step step5">
            <div className="row">
                 <h1>Step 5: Confirm the details below</h1>
             </div>
             <div className="row">
                <RenderSenderRecInfo wizardContext={props.wizardContext.from}  />
                <RenderSenderRecInfo wizardContext={props.wizardContext.to} />
            </div>
        </div>
       
    )
}

export default Confirm;
