import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_INIT } from '../../Constant';


const StartApplication =()=>{
    const navigate = useNavigate();
    
    const initApplication = async()=>{
        try{
            const response:AxiosResponse = await axios.post(API_INIT);
            navigate('/businessForm',{state:{id:response.data.application._id}})
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className='start-application'>
            <button className="btn btn-primary" onClick={initApplication} >Start Application</button>
        </div>
    );
}


export default StartApplication;