import React from 'react';
import Group from './Group';
//Gathers list of all valid groups that were filtered in the search
function Groups(props){
    const text = props.filtered.length > 0 ? "" : "No results found."
    const groups = props.filtered.map((item, i) => {
       return <Group key={i} data={item} />
   })
   return(
       <div className="row row-cols-1 row-cols-md-3">
            {groups}
            <h3>{text}</h3>

       </div>
   )
}
export default Groups;