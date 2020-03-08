import React from 'react';
import StepZilla from 'react-stepzilla';
import PropTypes from 'prop-types';
import GetSenderAddress from '../../../features/shipping-label-maker/steps/get_sender_address';
import GetReceiverAddress from '../../../features/shipping-label-maker/steps/get_receiver_address';
import GetWeight from '../../../features/shipping-label-maker/steps/get_weight';
import GetShippingOption from '../../../features/shipping-label-maker/steps/get_shipping_option';
import Confirm from '../../../features/shipping-label-maker/steps/confirm';

const Wizard = (props) => {
    const steps =
    [
      {name: 'Sender Address', component: <GetSenderAddress wizardContext={props.wizardContext} /> },
      {name: 'Receiver Address', component: <GetReceiverAddress wizardContext={props.wizardContext} /> },
      {name: 'Weight', component: <GetWeight wizardContext={props.wizardContext} /> },
      {name: 'Shipping option', component: <GetShippingOption wizardContext={props.wizardContext} /> },
      {name: 'Confirm', component: <Confirm wizardContext={props.wizardContext} /> }
    ]
    return(
        <div className='container'>
             <div className='step-progress'>
                    <StepZilla showNavigation={true} showSteps={true} steps={steps} />
                </div>
        </div>
    );
}
/*Wizard.propTypes = {
    header: PropTypes.func.isRequired,
    steps: PropTypes.array.isRequired,
    wizardContext: PropTypes.object.isRequired,
    onComplete: PropTypes.func.isRequired
  }; */
export default Wizard;