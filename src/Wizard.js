import React from "react";
import _ from "lodash";
import $ from "jquery";

class Wizard extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        active:props.defaultActiveKey,
        pages:props.children,
        completepages:[],
        maxpage:0,
        nextBtnTextArray:props.nextBtnTextArray || {},
//        prevBtnTextArray:[],
        prevBtnText:props.prevBtnText|| "Prev",
        nextBtnText:props.nextBtnText|| "Next",
        nextBtnTextDefault:props.nextBtnText|| "Next",
        nextBtnTextFinish:props.nextBtnTextFinish|| "Finish",
      };
      this.onNextClick = this.onNextClick.bind(this);
      this.onPrevClick = this.onPrevClick.bind(this);
      this.componentDidUpdate = this.componentDidUpdate.bind(this);
      this.pageClick = this.pageClick.bind(this);
      this.nextBtn = this.nextBtn.bind(this);
      this.popstate = this.popstate.bind(this);
      this.getNextBtnText = this.getNextBtnText.bind(this);
      this.state.nextBtnText = this.getNextBtnText(this.state.active);

    }


    onNextClick(){
      let activepage=this.state.active;
      let validated=true;
      let completepages=this.state.completepages;
      completepages[activepage-1] = "complete";
      if(activepage===this.state.pages.length){
        if(_.isFunction(this.props.onFinish)) this.props.onFinish();
      }
      if (_.isFunction(this.props.onNextPageClick)){
        validated=this.props.onNextPageClick(activepage);
      }
      if(validated && activepage<this.state.pages.length){ activepage+=1; }
      let nextBtnText = this.getNextBtnText(activepage);
      window.history.pushState({},"","#step"+activepage);
      this.setState({active:activepage, nextBtnText:nextBtnText, completepages: completepages});
      if(_.isFunction(this.props.onUpdate)) this.props.onUpdate(activepage);

    }

    getNextBtnText(activepage){
      let nextBtnText=this.state.nextBtnTextDefault;
      let nextBtnTextArray;
      if(_.isFunction(this.state.nextBtnTextArray)){
        nextBtnTextArray=this.state.nextBtnTextArray();
      } else if (_.isObject(this.state.nextBtnTextArray)) {
        nextBtnTextArray=this.state.nextBtnTextArray;
      }
      if(_.isObject(nextBtnTextArray)) {
          if(this.state.nextBtnTextArray.hasOwnProperty(activepage)){
            nextBtnText=this.state.nextBtnTextArray[activepage];
          }
        } else {
          if(activepage===this.state.pages.length){
            nextBtnText=this.state.nextBtnTextFinish;
          }
      }
      return nextBtnText;
    }
    getPrevBtnText(activepage){
      //let BtnText=this.state.nextBtnTextDefault;
      return ;
    }

    componentDidMount(){
      //let completepages=[];
      let completepages = React.Children.map(this.state.pages,(child,idx)=>{
          return "";
        });
        this.state.completepages = completepages;

        window.onpopstate = this.popstate;

    }
    popstate(e){
      console.log(e.target.location.hash);
      let activepage = Number(e.target.location.hash.replace(/\#step/, ""));
      this.setState({active:activepage});
      if(_.isFunction(this.props.onUpdate)) this.props.onUpdate(activepage);

    }
    onPrevClick(){
      let activepage=this.state.active;
      let nextBtnText=this.state.nextBtnTextDefault;
      if(activepage>1) activepage-=1;
      nextBtnText=this.getNextBtnText(activepage);
      this.setState({active:activepage, nextBtnText: nextBtnText});
      if(_.isFunction(this.props.onUpdate)) this.props.onUpdate(activepage);

    }
    componentDidUpdate(){
      var totalWidth = 0;
      _.each(this.refs,function (ref,refname) {
        if(refname.startsWith("step")) totalWidth += $(ref).outerWidth();
       });
      var containerWidth = 0;
      containerWidth = $(this.refs.stepscontainer).width();

      if (totalWidth > containerWidth) {
         // set the position so that the last step is on the right
         var newMargin = totalWidth - containerWidth;
         $('.steps').first().attr('style', 'margin-left: -' + newMargin + 'px');
      //
      //   // set the position so that the active step is in a good
      //   // position if it has been moved out of view
         if ($('li.active').first().position().left < 200) {
           newMargin += $('li.active').first().position().left - 200;
           if (newMargin < 1) {
              $('.steps').first().attr('style', 'margin-left: 0');
           } else {
              $('.steps').first().attr('style', 'margin-left: -' + newMargin + 'px');
           }

         }

      }



    }

    pageClick(e){
      let a = e.target.getAttribute("data-target");
      let activepage = Number(a.replace(/\#step/, ""));
      this.setState({active:activepage});
      if(_.isFunction(this.props.onUpdate)) this.props.onUpdate(this.state.active);


    }
    nextBtn(){
       if(this.state.active===this.state.pages.length){
          return (<button type="button" className="btn btn-primary btn-next" onClick={this.onNextClick}>{this.state.nextBtnText}</button>);
        } else {
          return (<button type="button" className="btn btn-primary btn-next" onClick={this.onNextClick}>{this.state.nextBtnText}<span className="glyphicon glyphicon-arrow-right"></span></button>);
        }
    }

    render(){

        let steps = React.Children.map(this.state.pages,(child,idx)=>{
            let activeClass="";
            if (this.state.completepages[idx]) activeClass += this.state.completepages[idx];
            if (child.props.badge===this.state.active) activeClass+=" active"
            return (<li
                      ref={"step"+idx}
                      onClick={this.pageClick}
                      data-target={"#step"+child.props.badge} className={activeClass}>
                      <span className="badge badge-info">{child.props.badge}</span>
                      {child.props.title}
                      <span className="chevron"></span>
                    </li>);
        });

        let pages = React.Children.map(this.state.pages,(child)=>{
          let activeClass="";
          if (child.props.badge===this.state.active) activeClass="active"
          return (<div className={"step-pane "+activeClass} id={"step"+this.props.badge}>{child}</div>);
        });

        return (
          <div className="fuelux">
            <div id="MyWizard" className="wizard">
              <div className="steps-container" ref="stepscontainer">
                <ul className="steps">
                  {steps}
                </ul>
              </div>
              <div className="actions">
                <button type="button" className="btn btn-default btn-prev" onClick={this.onPrevClick}><span className="glyphicon glyphicon-arrow-left"></span>{this.state.prevBtnText}</button>
                {this.nextBtn()}
              </div>
              <div className="step-content" data-active={this.state.active} style={this.props.style}>
                {pages}
              </div>
          </div>
        </div>
    );

    }

}

Wizard.PropTypes =  {
    prevBtnText: React.PropTypes.string,
    nextBtnText: React.PropTypes.string,
    nextBtnText: React.PropTypes.string,
    nextBtnTextFinish: React.PropTypes.string,
    nextBtnTextArray: React.PropTypes.object,
    onFinish: React.PropTypes.func,
    onNextPageClick: React.PropTypes.func,
    onPrevPageClick: React.PropTypes.func,

};
export default Wizard;
