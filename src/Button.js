import React, { Component } from 'react';

// reusable
// functional state component - render is implicit
// ES5 - function Button(props) {
// ES6 - concise body
//(stateless function compoent, 3 params, concise body, no return)
const Button = ({onClick,className,children}) => //{
    //const {
    //  onClick,
    //  className = '', // creates a default when not in props
    //  children,
    //} = props;

    //return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    //);
//}

export default Button;