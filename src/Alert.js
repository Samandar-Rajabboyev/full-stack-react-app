import React, { useEffect } from 'react'

const Alert = ({type, msg, removeAlert}) => {

  useEffect(() => {
    const timeout = setTimeout(()=> {
      removeAlert();
    }, 3000)
    return () => clearInterval(timeout) 
  }, [])

  return <h3 className={`alert alert-${type}`}>{msg}</h3>
}

export default Alert
