import React from "react";

type ApiState = {
    results: []
}


const Display = (props: ApiState) => {
    
    console.log(props.results);





    return (
        <div>
            <h1>Results:</h1>
        </div>
    )
}



export default Display