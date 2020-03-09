import React, { Fragment,useState } from 'react';
import Wizard from '../../core/components/wizard/wizard';
import ShippingInfo  from '../shipping_info';
import Steps from '../steps';
import ShippingLabel from './shipping-label';
import {Navbar,NavbarBrand} from 'reactstrap';

const ShippingLabelMaker = () => {
    const [shippingDetails, setDetails] = useState();
    const onComplete = (wizardContext) =>{
        setDetails(wizardContext);
    }
    const Header = () => {
        return(
            <Navbar dark expand='md'>
                <div className="container">
                    <NavbarBrand className='mr-auto'>
                        <h1>Shipping Label Maker</h1>
                    </NavbarBrand>
                </div>
            </Navbar>
        )
    }
    const Printsection = () =>{
        if(shippingDetails != null){
           return( <ShippingLabel printInfo={shippingDetails} /> );
        }else{
            return <div></div>
        }
    }
    return(
            <Fragment>
                <Header />
                <Wizard wizardContext={ShippingInfo} onComplete={onComplete} header={Header} steps={Steps} />
                <Printsection />
            </Fragment>
    );
}

export default ShippingLabelMaker;