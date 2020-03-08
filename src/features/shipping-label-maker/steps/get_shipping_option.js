import React,{ Component } from 'react';

class GetShippingOption extends Component {
    constructor(props) {
      super(props);
      this.state = {
        shippingOp: ""
      };
      this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
      this.validationCheck = this.validationCheck.bind(this);
      this.isValidated = this.isValidated.bind(this);
    }
  
    isValidated() {
        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
        let isDataValid = false;
        if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
            if (this.props.wizardContext.shippingOption !== userInput.shippingOp ) { // only update store of something changed
                this.props.wizardContext.shippingOption = userInput.shippingOp;
             }
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
        shippingOpVal: (data.shippingOp != 0)
        }
    }
  
    _validationErrors(val) {
      const errMsgs = {
        shippingOpValMsg: val.shippingOpVal ? '' : 'Shipping Option selection is required'
      }
      return errMsgs;
    }
  
    _grabUserInput() {
      return {
        shippingOp: this.refs.shippingOp.value
      };
    }
  
    render() {
      // explicit class assigning based on validation
      let notValidClasses = {};
      if (typeof this.state.shippingOpVal == 'undefined' || this.state.shippingOpVal) {
        notValidClasses.shippingOpCls = 'no-error';
      }
      else {
         notValidClasses.shippingOpCls = 'has-error';
         notValidClasses.shippingOpValGrpCls = 'val-err-tooltip';
      }
  
      return (
        <div className="step step4">
          <div className="row">
            <form id="Form" className="form-horizontal">
              <div className="form-group">
                <label className="col-md-12 control-label">
                  <h1>Step 4: Select Shipping Option</h1>
                </label>
              </div>
              <div className="form-group col-md-12 content form-block-holder">
                  <label className="control-label">
                    Shipping Option
                  </label>
                  <div className={notValidClasses.shippingOpCls}>
                    <select
                      ref="shippingOp"
                      autoComplete="off"
                      className="form-control"
                      required
                      defaultValue={this.state.shippingOp}
                      onBlur={this.validationCheck}>
                        <option value="">Please select</option>
                        <option value="1">Ground</option>
                        <option value="2">Priority</option>
                    </select>
                    <div className={notValidClasses.shippingOpValGrpCls}>{this.state.shippingOpValMsg}</div>
                  </div>
                </div>
            </form>
          </div>
        </div>
      )
    }
  }
export default GetShippingOption;