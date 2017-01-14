# react-fuelux-wizard
A ReactJS wrapper for a FuelUX Wizard control.

At first of all i want say thanks for this component to creators of fuel ux. 
http://getfuelux.com/javascript.html#wizard


 Using Wizard

```jsx
import { Wizard, WizardStep } from "react-fuelux-wizard";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";


class ReactFuelUXWizardExample{

getNextBtnTextArray(){
	return	{2:"Next on page two"};
}

<Wizard 
  id="wizard" 
  defaultActiveKey={1}   // badge value from WizardStep that opened after page rendering.
  prevBtnText="Previous Button"   // Previous button text
  nextBtnText="Next Button"	  // Default next button text
  nextBtnTextFinish="Complete"	  // Next button text for a Last page
  onFinish={this.onFinish.bind(this)}  // Finish button callback
  nextBtnTextArray={this.getNextBtnTextArray()} // return object with key is badge value from WizardStep and value - text representation of next button. this is not required prop.
  onNextPageClick={this.handleOnNextPageClick.bind(this)}> // callback fires after next page clicked, have a parameter - number active of page.
  <WizardStep badge={1} title="Page one"><Page1/></WizardStep>
  <WizardStep badge={2} title="Page two"><Page2/></WizardStep>
  <WizardStep badge={3} title="Page three"><Page3/></WizardStep>
</Wizard>
}

export default ReactFuelUXWizardExample
```
          

Examples not created yet.

### Changes.

* 14.01.2017 - Added nextBtnTextArray params, it should contains an object with key - is a WizardStep badge value and value is a next page button text.

* 10.11.2016 - Initial commit.



