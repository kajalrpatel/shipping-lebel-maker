import React,{ Component } from 'react';

class GetReceiverAddress extends Component {
    constructor(props) {
      super(props);
      this.state ={};
      this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
      this.validationCheck = this.validationCheck.bind(this);
      this.isValidated = this.isValidated.bind(this);
    }
    isValidated() {
        const receiverDetail = this.props.wizardContext.to;
        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
        let isDataValid = false;
        if (Object.keys(validateNewInput).every((toData) => { return validateNewInput[toData] === true })) {
            Object.keys(receiverDetail).map((recPropery)=>{
                if (receiverDetail[recPropery] !== userInput[recPropery].value ) { 
                    receiverDetail[recPropery] = userInput[recPropery].value;
                 }
                 return true;
            })
            isDataValid = true;
        }
        else {
            // if anything fails then update the UI validation state but NOT the UI Data State
            this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
        }
        return isDataValid;
    }
    validationCheck() {
      if (!this._validateOnDemand)
        return;
      const userInput = this._grabUserInput(); // grab user entered vals
      const validateNewInput = this._validateData(userInput); // run the new input against the validator
  
      this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    }
     _validateData(data) {
      return  {
        nameVal: (data.name.value.length > 3),
        streetVal: (data.street.value.length > 4),
        cityVal: (data.city.value.length > 4),
        stateVal: (data.state.value.length > 4),
        zipVal: (data.zip.value.length > 4)
      }
    }
    _validationErrors(val) {
      const errMsgs = {
       nameValMsg: val.nameVal ? '' : 'Name is Invalid',
       streetValMsg: val.streetVal ? '' : 'Street is Invalid',
       cityValMsg: val.cityVal ? '' : 'City is Invalid',
       stateValMsg: val.stateVal ? '' : 'State is Invalid',
       zipValMsg: val.zipVal ? '' : 'Zip is Invalid',
      }
      return errMsgs;
    }
    _grabUserInput() {
      return this.refs
    }
    render() {
      // explicit class assigning based on validation
      let notValidClasses = {};
      let shippingInfoTo = this.props.wizardContext.to;
     
     const formData = Object.keys(shippingInfoTo).map((to) => {
           if (typeof this.state[to+'Val'] == 'undefined' || this.state[to+'Val']) {
                notValidClasses[to+'Cls']= 'no-error';
            }
            else {
                notValidClasses[to+'Cls'] = 'has-error';
                notValidClasses[to+'ValGrpCls'] = 'val-err-tooltip';
            }
            return(
                <div className="form-group col-md-12 content form-block-holder" key={to}>
                <label className="control-label">
                  {to}
                </label>
                <div className={notValidClasses[to+'Cls']}>
                  <input
                    ref={to}
                    autoComplete="off"
                    type="text"
                    placeholder="Type here.."
                    className="form-control"
                    required
                    defaultValue={shippingInfoTo[to]}
                    onBlur={this.validationCheck} />
                  <div className={notValidClasses[to+'ValGrpCls']}>{this.state[to+'ValMsg']}</div>
                </div>
              </div>
            )
        });
        
  
      return (
        <div className="step step2">
          <div className="row">
            <form id="Form" className="form-horizontal">
              <div className="form-group">
                <label className="col-md-12 control-label">
                  <h1>Step 2: Enter the Receiver's address:</h1>
                </label>
              </div>
               {formData}
            </form>
          </div>
        </div>
      )
    }
  }
export default GetReceiverAddress;