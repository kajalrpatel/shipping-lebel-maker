import React,{ Component } from 'react';

class GetWeight extends Component {
    constructor(props) {
      super(props);
      this.state = {
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
            if (this.props.wizardContext.weight !== userInput.weight ) { // only update store of something changed
                this.props.wizardContext.weight = userInput.weight;
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
        weightVal: (data.weight.length >= 1 && data.weight !== '0')
      }
    }
  
    _validationErrors(val) {
      const errMsgs = {
       weightValMsg: val.weightVal ? '' : 'Please Enter Valid Weight'
      }
      return errMsgs;
    }
  
    _grabUserInput() {
      return {
        weight: this.refs.weight.value
      };
    }
  
    render() {
      // explicit class assigning based on validation
      let notValidClasses = {};
      const weight = this.props.wizardContext.weight;
      if (typeof this.state.weightVal == 'undefined' || this.state.weightVal) {
          notValidClasses.weightCls = 'no-error';
      }
      else {
         notValidClasses.weightCls = 'has-error';
         notValidClasses.weightValGrpCls = 'val-err-tooltip';
      }
  
      return (
        <div className="step step3">
          <div className="row">
            <div className="card">
                <h5 className="card-header">Step 3: Enter Weight</h5>
                <div className="card-body">
                        <form id="Form" className="form-horizontal">
                          <div className="form-group col-md-5 col-xs-12 content form-block-holder">
                              <label className="control-label">
                                Weight
                              </label>
                              <div className={notValidClasses.weightCls}>
                                <input
                                  ref="weight"
                                  autoComplete="off"
                                  type="number"
                                  placeholder="Enter Weight.."
                                  className="form-control"
                                  required
                                  defaultValue={weight}
                                  onBlur={this.validationCheck} />
                                <div className={notValidClasses.weightValGrpCls}>{this.state.weightValMsg}</div>
                              </div>
                          </div>
                    </form>
                </div>
            </div>
          </div>
      </div>
      )
    }
  }
export default GetWeight;