# react-fuelux-wizard
A React version of Fuel UX Wizard control

At first of all i want to say thanks for this component to creators of fuel ux. 
http://getfuelux.com/javascript.html

Using Wizard

`<Wizard 
  id="wizard" 
  defaultActiveKey={1}
  prevBtnText="Previous Button"
  nextBtnText="Next Button"
  nextBtnTextFinish="Complete"
  onFinish={this.onFinish.bind(this)}
  onNextPageClick={this.handleOnNextPageClick.bind(this)}>
  <WizardStep badge={1} title="Поверяемое оборудование"><Page1/></WizardStep>
  <WizardStep badge={2} title="Эталоны"><Page2/></WizardStep>
  <WizardStep badge={3} title="Влияющие факторы"><Page3/></WizardStep>
  <WizardStep badge={4} title="Параметры шаблона"><Page4/></WizardStep>
  <WizardStep badge={5} title="Подписи"><Page5/></WizardStep>
  <WizardStep badge={6} title="Файлы"><Page6/></WizardStep>
</Wizard>`
          
