import React,{ PropTypes} from "react";



class WizardStep extends React.Component {
    constructor(props){
        super();
        this.el=null;
    }

    render(){
      //return (<div className={"step-pane "+this.props.active} id={"step"+this.props.badge}>{this.props.children}</div>);
      return this.props.children;
    }

}

WizardStep.propTypes = {
    badge: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,

};

export default WizardStep;
