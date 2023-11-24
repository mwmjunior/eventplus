import React from 'react';
import './Title.css';

const Title = ({titleText, color="", classAdd=""}) => {
    return ( 
    <h1 className={`title  ${classAdd}` } style={{color:color}} >
         {titleText}
        
         <hr
         className="title__underscore"
         style ={
         {borderColor  : color} 
         }/>

    </h1> 
        
    );
};

export default Title;