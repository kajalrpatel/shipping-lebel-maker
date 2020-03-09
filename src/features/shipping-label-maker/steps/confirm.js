import React from 'react';
import { Media, Button } from'reactstrap';
import PropTypes from 'prop-types';

function RenderSenderRecInfo({shippingDetail,title}) {
    if(shippingDetail !== null){
        return(
            <div className="col-5 m-2">
                <Media tag="li">
                    <Media body className="ml-5">
                        <Media heading>{title}</Media>
                        {
                            Object.keys(shippingDetail).map((detail)=>{
                                return(<p> <strong> {detail} : </strong>{shippingDetail[detail]}</p>)
                            })
                        }
                       
                    </Media>
                </Media>
            </div>
        );
    }else{
        return( <div></div> );
    }
}

const RenderCostInfo = ({shippingCost,shipOptionToDisplay,weight}) =>{
    if(shippingCost !== null || shipOptionToDisplay !== null || weight !== null){
        return(
            <div className="col-10 m-2">
                <Media tag="li">
                    <Media body className="ml-5">
                        <p> <strong>Shipping option: </strong>{shipOptionToDisplay}</p>
                        <p> <strong>Weight: </strong>{weight} <span>lbs</span></p>
                        <p> <strong>Total Shipping Cost: </strong> <span>$</span>{shippingCost}</p>
                    </Media>
                </Media>
            </div>
        );
    }else{
        return( <div></div> );
    }
}
const Confirm = (props) =>{
    
    const ShippingOption = {
        ground: 1,
        priority: 2
    }
    const shippingRate = 0.40;
    const shippingCost = Number(props.wizardContext.weight * shippingRate * (props.wizardContext.shippingOption == ShippingOption.ground ? 1 : 1.5)).toFixed(2);
    const shipOptionToDisplay = props.wizardContext.shippingOption == ShippingOption.ground ? "Ground" : "Priority";
    return(
        <div className="step step5">
        <div className="row">
           <div className="card">
              <h5 className="card-header">Step 5: Confirm the details below</h5>
              <div className="card-body">
                  <form id="Form" className="form-horizontal">
                    <div className="row">
                        <RenderSenderRecInfo shippingDetail={props.wizardContext.from}  title = "Sender's Detail" />
                        <RenderSenderRecInfo shippingDetail={props.wizardContext.to} title = "Reciever's Detail" />
                        <RenderCostInfo shippingCost ={shippingCost} shipOptionToDisplay={shipOptionToDisplay} weight = {props.wizardContext.weight} />
                    </div>
                    <div className="row">
                        <Button type="button" className='pull-right' color="primary" onClick={props.onAction} value='3'> Confirm Details </Button>
                    </div>
                  </form>
              </div>
          </div>
        </div>
      </div>
    )
}
Confirm.propTypes = {
    wizardContext: PropTypes.object.isRequired,
    onAction: PropTypes.func.isRequired
    };
export default Confirm;
