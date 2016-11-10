# react-fuelux-wizard
A React version of Fuel UX Wizard control

At first of all i want say thanks for this component to creators of fuel ux. 
http://getfuelux.com/javascript.html#wizard


 Using Wizard

```jsx
<Wizard 
  id="wizard" 
  defaultActiveKey={1}
  prevBtnText="Previous Button"
  nextBtnText="Next Button"
  nextBtnTextFinish="Complete"
  onFinish={this.onFinish.bind(this)}
  onNextPageClick={this.handleOnNextPageClick.bind(this)}>
  <WizardStep badge={1} title="Page one"><Page1/></WizardStep>
  <WizardStep badge={2} title="Page two"><Page2/></WizardStep>
  <WizardStep badge={3} title="Page three"><Page3/></WizardStep>
  </Wizard>```
          
