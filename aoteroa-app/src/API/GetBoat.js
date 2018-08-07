import React,{Component} from 'react'
import axios from 'axios'
const host = 'http://localhost:3000/'

const getNewList=()=>{
    return axios.get(host+"boat")
        .then( (response)=> response.data.data)
        .catch(function (error) {
            console.log(error);
        })
}

export {getNewList};