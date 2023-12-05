import React, { useEffect } from "react";
function HomePage(){
    useEffect(()=>{
        
console.log('Mouted Home page')
        
    },[]
    )
    return(
        <h1>Home Page</h1>
    )
}
export default HomePage;