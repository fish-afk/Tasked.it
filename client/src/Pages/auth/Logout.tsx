import React from 'react'
import { Navigate } from 'react-router-dom';

type proptypes = {
  accountype: string
}

export default function Logout({accountype}: proptypes) {

    localStorage.removeItem("taskedit-accesstoken");
    localStorage.removeItem("taskedit-refreshtoken");
    localStorage.removeItem("username");
    const url = `/${accountype}/login`

    return <Navigate to={url}/>
}
