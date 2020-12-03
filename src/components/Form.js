import React, { Component } from 'react';
import axios from 'axios';
import Groups from './Groups';
class Form extends Component{
    constructor(){
        super();
        this.state ={
            data: [],
            campuses: [],
            demographics: [],
            groupTypes: [],
            meetingDates: [],
            zipCodes: [],
            campus: "",
            demographic: "",
            groupType: "",
            meetingDate: "",
            zipCode: "",
            filtered: [],
            changed: false,

        }
        this.handleChange = this.handleChange.bind(this);
    }
    //Handles select dropdown changes by updating state
    handleChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
        this.setState(prevState => ({
            changed: !prevState.changed
          }));
    }
    componentDidMount(){
        let campuses = ["View All"];
        let demographics = ["View All"];
        let groups = ["View All"];
        let meetings = ["View All"];
        let zipCodes = ["View All"];
        const url = `http://159.122.174.181:31217/groups`;
        let results = []
        axios
          .get(url)
          .then((response) => {
             response.data.map((group) => {
              campuses.push(group.campus);
              demographics.push(group.demographic);
              groups.push(group.group_type);
              meetings.push(group.meeting_date.substring(0, 10));
              zipCodes.push(group.zip_code);
              results.push(group);
            })
            this.setState({filtered: results});
            
            //Keep unique values only
            campuses = Array.from(new Set(campuses));
            demographics = Array.from(new Set(demographics));
            groups = Array.from(new Set(groups));
            meetings = Array.from(new Set(meetings));
            zipCodes = Array.from(new Set(zipCodes));
            this.setState({campuses: campuses});
            this.setState({demographics: demographics});
            this.setState({groupTypes: groups});
            this.setState({meetingDates: meetings});
            this.setState({zipCodes: zipCodes});
            this.setState({ data: response.data });

            //set form values
            this.setState({campus: campuses[0]});
            this.setState({meetingDate: meetings[0]});
            this.setState({demographic: demographics[0]});
            this.setState({groupType: groups[0]});
            this.setState({zipCode: zipCodes[0]});
          })
          .catch((err) => {
            console.log(err);
          });
        
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.changed !== this.state.changed){
            //User selections
            let selections ={
                "campus": this.state.campus,
                "demographic": this.state.demographic,
                "group_type": this.state.groupType,
                "meeting_date": this.state.meetingDate,
                "zip_code": this.state.zipCode
            }
            let results = []
            let valid = true;
            //Filters groups based on the selected criteria
            this.state.data.map(group => {
                for( const[key, value] of Object.entries(selections)){
                    if(value === "View All"){
                        continue;
                    } else{
                        if(key === "meeting_date"){
                           if(group[key].substring(0,10) !== value.substring(0,10)){
                                valid = false;
                           }
                        } else{
                        if(group[key].toString() !== value){ //toString() because zip_code is an integer
                            valid = false;
                        }
                        }
                    }
                    
                }
                if(valid){
                    results.push(group);
                }
                valid = true;
            })
           this.setState({filtered: results});
      

        }
    
    }
  render(){
      return(
          <div className="row">
               <form className="col-md-2 mb-3">
        <div className="form-group">
        <label>Campus</label>
        <select
         className="form-control"
         name="campus"
         value={this.state.campus}
         onChange={this.handleChange}
        >
            {this.state.campuses.map((val, i) => {
                return <option key={i}>{val}</option>
            })}
        </select>

        </div>
        <div className="form-group">
        <label>Demographic</label>
        <select
        className="form-control"
         name="demographic"
         value={this.state.demographic}
         onChange={this.handleChange}
         >
        {this.state.demographics.map((val, i) => {
                return <option key={i}>{val}</option>
            })}
        </select>
        </div>

      <div className="form-group">
      <label>Group Type</label>
        <select
        className="form-control"
         name="groupType"
         value={this.state.groupType}
         onChange={this.handleChange}
        >
        {this.state.groupTypes.map((val, i) => {
                return <option key={i}>{val}</option>
            })}
        </select>
      </div>

    <div className="form-group">
    <label>Meeting Date</label>
        <select
        className="form-control"
         name="meetingDate"
         value={this.state.meetingDate}
         onChange={this.handleChange}
        >
        {this.state.meetingDates.map((val, i) => {
                return <option key={i}>{val}</option>
            })}
        </select>
    </div>

     <div className="form-group">
     <label>Zip Code</label>
        <select
        className="form-control"
         name="zipCode"
         value={this.state.zipCode}
         onChange={this.handleChange}
        >
        {this.state.zipCodes.map((val, i) => {
                return <option key={i}>{val}</option>
            })}
        </select>
     </div>
    </form>
    <div className="col-md-9 mb-3">
    <Groups filtered={this.state.filtered}/>
    </div>
  </div>
         
      );
  }
}
export default Form;