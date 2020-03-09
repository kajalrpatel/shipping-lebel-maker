import React from 'react';
import StepZilla from 'react-stepzilla';
import PropTypes from 'prop-types';
import GetSenderAddress from '../../../features/shipping-label-maker/steps/get_sender_address';
import GetReceiverAddress from '../../../features/shipping-label-maker/steps/get_receiver_address';
import GetWeight from '../../../features/shipping-label-maker/steps/get_weight';
import GetShippingOption from '../../../features/shipping-label-maker/steps/get_shipping_option';
import Confirm from '../../../features/shipping-label-maker/steps/confirm';

const Wizard = (props) => {
    const WizardAction = {
        prev: 1,
        next: 2,
        end: 3
    };
    const checkEnd = (event) => {
        if(event.target.value === WizardAction.end.toString()){
            console.log("value" +event.target.value);
            props.onComplete(props.wizardContext);
        }
    }
    const RenderHeader = () =>{
        return(
            <div> {props.header} </div>
        )
    }
    const steps =
    [
      {name: props.steps[0].step_1.title, component: <GetSenderAddress wizardContext={props.wizardContext} onAction={checkEnd} /> },
      {name: props.steps[0].step_2.title, component: <GetReceiverAddress wizardContext={props.wizardContext} onAction={checkEnd} /> },
      {name: props.steps[0].step_3.title, component: <GetWeight wizardContext={props.wizardContext} onAction={checkEnd} /> },
      {name: props.steps[0].step_4.title, component: <GetShippingOption wizardContext={props.wizardContext} onAction={checkEnd} /> },
      {name: props.steps[0].step_5.title, component: <Confirm wizardContext={props.wizardContext} onAction={checkEnd} /> }
    ]
    return(
        <div className='container'>
            <RenderHeader />
             <div className='step-progress'>
                    <StepZilla showNavigation={true} showSteps={true} steps={steps} />
                </div>
        </div>
    );
}
Wizard.propTypes = {
    header: PropTypes.func.isRequired,
    steps: PropTypes.array.isRequired,
    wizardContext: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired
  }; 
export default Wizard;