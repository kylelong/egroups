import React from 'react';
//Date for one group
function Group(props){
    console.log(props.data);
    let date = new Date(props.data.meeting_date);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[date.getDay()];
    return(
        <div className="col mb-4>">
            {props.data &&
                <div className="card h-100" >
                <div className="card-body">
                <h5 className="card-title">{`${props.data.group_type}`}</h5>
                     <p className="card-text">({props.data.demographic})</p>
                     <p className="card-text">{`Campus: ${props.data.campus}`}</p>
                       <p className="card-text">{`Weekly on ${day}'s`}</p>
                       <p className="card-text">{props.data.zip_code}</p>
                       <a href="#" className="btn btn-primary">Register</a>
                </div>
               </div>
            }

</div>
    )
}
export default Group;