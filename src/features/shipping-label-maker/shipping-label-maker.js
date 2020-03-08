import React from 'react';
import Wizard from '../../core/components/wizard/wizard';
import ShippingInfo  from '../shipping_info';

const ShippingLabelMaker = () => {
    return(
            <Wizard wizardContext={ShippingInfo} />
    );
}

export default ShippingLabelMaker;