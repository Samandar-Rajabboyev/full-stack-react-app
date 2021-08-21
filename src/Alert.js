import React, { useEffect } from 'react'

const Alert = ({type, msg, removeAlert, list}) => {

  useEffect(() => {
    const timeout = setTimeout(()=> {
      removeAlert();
    }, 3000)
    return () => clearInterval(timeout) 
  }, [list])

  return <h3 className={`alert alert-${type}`}>{msg}</h3>
}

export default Alert
