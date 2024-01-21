import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { API_SUBMIT } from '../../Constant';


const ReviewBalanceSheet = () => {

    const [applicationData, setApplicationData] = useState<any>({balanceSheet:[]});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const bs = location.state;
        setApplicationData(bs);
    }, [location.state])

    const submitApplication = async () => {
        const reviewData = location.state;
        const response = await axios.post(API_SUBMIT, reviewData);
        const outcome = response.data.outcome;
        navigate('/decision', {
            state: { outcome,...reviewData }
        })
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <div className='row'>
                    <div className='col-6'>Name :- {applicationData.name}</div>
                    <div className='col-6'>Business Name :- {applicationData.businessName}</div>
                </div>
                <div className='row'>
                    <div className='col-6'>Year Established :- {applicationData.yearEstablished}</div>
                    <div className='col-6'>Loan Amount :- {applicationData.loanAmount}</div>
                </div>
            </div>
            <div className='col-12'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Year</th>
                            <th scope="col">Month</th>
                            <th scope="col">Profit Or Loss</th>
                            <th scope="col">Assets Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applicationData?.balanceSheet?.map((e: any, i:number) =>
                                <tr key={`key${i}`}>
                                    <td>{e.year}</td>
                                    <td>{e.month}</td>
                                    <td>{e.profitOrLoss}</td>
                                    <td>{e.assetsValue}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className='col-12'>
                <div className="col-auto">
                    <button onClick={submitApplication} className="btn btn-primary mb-3">Submit Application</button>
                </div>
            </div>

        </div>
    );
}


export default ReviewBalanceSheet;