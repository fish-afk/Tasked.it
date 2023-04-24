import React from 'react'
import { Navigate } from 'react-router-dom'

export default function FreelancerRedirect() {
    const accesstoken : any = localStorage.getItem('taskedit-accesstoken')
    const refreshtoken: any = localStorage.getItem('taskedit-refreshtoken')
    const username: any = localStorage.getItem('username')

    
    if (accesstoken == undefined || refreshtoken == undefined || username == undefined) {
        return <Navigate to='/freelancer/login' />
    } else {
        return <Navigate to='/freelancer/home' />
    }

}
