import React,{useRef, useState,useEffect} from "react";
import ReactToPrint from "react-to-print";
import {Table,Modal,ModalBody,Button} from 'reactstrap';

class ComponentToPrint extends React.Component {
  render() {
    const shipDetails = this.props.printInfo;
    if(shipDetails != null){
    const shippingCost = Number(shipDetails.weight * (0.40) * (shipDetails.shippingOption === '1' ? 1 : 1.5)).toFixed(2);
    const shipOptionToDisplay = shipDetails.shippingOption === '1' ? "Ground" : "Priority";
    return (
      <div className='print-source'>
        <Table bordered>
          <thead>
            <tr>
                <th></th>
              <th>Sender's Address</th>
              <th>Reciever's Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Name</strong></td>
              <td>{shipDetails.from.name}</td>
              <td>{shipDetails.to.name}</td>
            </tr>
            <tr>
              <td><strong>Street</strong></td>
              <td>{shipDetails.from.street}</td>
              <td>{shipDetails.to.street}</td>
            </tr>
            <tr>
              <td><strong>City</strong></td>
              <td>{shipDetails.from.city}</td>
              <td>{shipDetails.to.city}</td>
            </tr>
            <tr>
              <td><strong>State</strong></td>
              <td>{shipDetails.from.state}</td>
              <td>{shipDetails.to.state}</td>
            </tr>
            <tr>
              <td><strong>Zip</strong></td>
              <td>{shipDetails.from.zip}</td>
              <td>{shipDetails.to.zip}</td>
            </tr>
          </tbody>
        </Table>
        <Table bordered>
          <thead>
            <tr>
                <th>Weight</th>
              <th>Shipping Option</th>
              <th>Shipping Cost</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>{shipDetails.weight} lbs</td>
              <td>{shipOptionToDisplay}</td>
              <td>${shippingCost}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
    }else{
        return <div></div>
    }
  }
}

const ShippingLabel =(props)=> {
    const componentRef = useRef();
    const [isOpen,openModel] = useState(false);
    useEffect(() => { openModel(true)  });
    return (
      <div className='container'>
          <div className='row'>
             <Modal isOpen={isOpen} >
                    <ModalBody>
                    <ReactToPrint
                                trigger={() => <Button type='button' color='primary'>Print Label</Button>}
                                content={() => componentRef.current}
                                />
                    <Button type='button' className='pull-right' onClick={()=>openModel(false)} color='primary'>Cancel</Button>
                    </ModalBody>
            </Modal>
            <div className='col-12'>
                <ComponentToPrint ref={componentRef} printInfo={props.printInfo} />
            </div>
        </div>
      </div>
    );
}

export default ShippingLabel;
