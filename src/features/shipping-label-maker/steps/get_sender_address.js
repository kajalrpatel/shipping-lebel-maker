import React,{ Component } from 'react';

class GetSenderAddress extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
      this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
      this.validationCheck = this.validationCheck.bind(this);
      this.isValidated = this.isValidated.bind(this);
    }
    
    isValidated() {
        const senderDetail = this.props.wizardContext.from;
        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
        let isDataValid = false;
        if (Object.keys(validateNewInput).every((toData) => { return validateNewInput[toData] === true })) {
            Object.keys(senderDetail).map((recPropery)=>{
                if (senderDetail[recPropery] !== userInput[recPropery].value ) { 
                    senderDetail[recPropery] = userInput[recPropery].value;
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
      let shippingInfoFrom = this.props.wizardContext.from;
     
     const formData = Object.keys(shippingInfoFrom).map((from) => {
           if (typeof this.state[from+'Val'] == 'undefined' || this.state[from+'Val']) {
                notValidClasses[from+'Cls']= 'no-error';
            }
            else {
                notValidClasses[from+'Cls'] = 'has-error';
                notValidClasses[from+'ValGrpCls'] = 'val-err-tooltip';
            }
            return(
                <div className="form-group col-md-12 content form-block-holder" key={from}>
                <label className="control-label">
                  {from}
                </label>
                <div className={notValidClasses[from+'Cls']}>
                  <input
                    ref={from}
                    autoComplete="off"
                    type="text"
                    placeholder="Type here.."
                    className="form-control"
                    required
                    defaultValue={shippingInfoFrom[from]}
                    onBlur={this.validationCheck} />
                  <div className={notValidClasses[from+'ValGrpCls']}>{this.state[from+'ValMsg']}</div>
                </div>
              </div>
            )
        });
        
  
      return (
        <div className="step step3">
          <div className="row">
            <form id="Form" className="form-horizontal">
              <div className="form-group">
                <label className="col-md-12 control-label">
                  <h1>Step 1: Enter the sender's address:</h1>
                </label>
              </div>
               {formData}
            </form>
          </div>
        </div>
      )
    }
  }
export default GetSenderAddress;