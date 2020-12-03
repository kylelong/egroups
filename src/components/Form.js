import React, { Component } from 'react';
import axios from 'axios';
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

        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
    componentDidMount(){
        let campuses = ["View All"];
        let demographics = ["View All"];
        let groups = ["View All"];
        let meetings = ["View All"];
        let zipCodes = ["View All"];
        const url = `http://159.122.174.181:31217/groups`;
        axios
          .get(url)
          .then((response) => {
             response.data.map((group) => {
              campuses.push(group.campus);
              demographics.push(group.demographic);
              groups.push(group.group_type);
              meetings.push(group.meeting_date.substring(0, 10));
              zipCodes.push(group.zip_code);
            })

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
            //console.log(err);
          });
        
    }
    componentDidUpdate(){
        let selections ={
            "campus": this.state.campus,
            "demographic": this.state.demographic,
            "group_type": this.state.groupType,
            "meeting_date": this.state.meetingDate,
            "zip_code": this.state.zipCode
        }
        console.log(selections);
        let results = {} //if results is empty print no results
        //if any value is View All it does not matter use loop instead of if
        //pass results to component that loops over each object
        this.state.data.map(group => {
            let campus = group.campus;
            let demographic = group.demographic;
            let group_type = group.group_type;
            let meeting_date = group.meeting_date.substring(0, 10);
            let zip_code = group.zip_code;
            if(campus === selections.campus &&
                demographic === selections.demographic &&
                group_type === selections.group_type &&
                meeting_date === selections.meeting_date &&
                zip_code === selections.zip_code
                ){
                    console.log(group);
                }
        })
    }
  render(){
      return(
          <form>
                            <p>{this.state.campus}</p>
              <p>{this.state.demographic}</p>
              <p>{this.state.groupType}</p>
              <p>{this.state.meetingDate}</p>
              <p>{this.state.zipCode}</p>
              <label>Campus</label>
              <select
               name="campus"
               value={this.state.campus}
               onChange={this.handleChange}
              >
                  {this.state.campuses.map((val, i) => {
                      return <option key={i}>{val}</option>
                  })}
              </select> <br />

              <label>Demographic</label>
              <select
               name="demographic"
               value={this.state.demographic}
               onChange={this.handleChange}
               >
              {this.state.demographics.map((val, i) => {
                      return <option key={i}>{val}</option>
                  })}
              </select> <br />

              <label>Group Type</label>
              <select
               name="groupType"
               value={this.state.groupType}
               onChange={this.handleChange}
              >
              {this.state.groupTypes.map((val, i) => {
                      return <option key={i}>{val}</option>
                  })}
              </select> <br />

              <label>Meeting Date</label>
              <select
               name="meetingDate"
               value={this.state.meetingDate}
               onChange={this.handleChange}
              >
              {this.state.meetingDates.map((val, i) => {
                      return <option key={i}>{val}</option>
                  })}
              </select> <br />

              <label>Zip Code</label>
              <select
               name="zipCode"
               value={this.state.zipCode}
               onChange={this.handleChange}
              >
              {this.state.zipCodes.map((val, i) => {
                      return <option key={i}>{val}</option>
                  })}
              </select>
          </form>
      );
  }
}
export default Form;