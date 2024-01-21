import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';


const Decision = () => {
    const [applicationData, setApplicationData] = useState<any>({ balanceSheet: [] });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const bs = location.state;
        setApplicationData(bs);
    }, [location.state])

    const onClickBackToHome = () => {
        navigate('/', { state: {} })
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <div className='row mb-4'>
                    <div className='col-6'>Name :- {applicationData?.name}</div>
                    <div className='col-6'>Business Name :- {applicationData?.businessName}</div>
                </div>
                <div className='row mb-4'>
                    <div className='col-6'>Year Established :- {applicationData?.yearEstablished}</div>
                    <div className='col-6'>Loan Amount :- {applicationData?.loanAmount}</div>
                </div>
                <div className='row mb-4'>
                    <div className='col-6'>Loan Status :-
                        {applicationData?.outcome?.approved ? <span>Approved</span> : <span>Rejected</span>}
                    </div>
                    <div className='col-6'>Approved Amount :- {applicationData?.outcome?.amount} % | {((applicationData?.outcome?.amount/100)*applicationData?.loanAmount)}</div>
                </div>
            </div>
            <div className='col-12'>
                <div className="col-auto">
                    <button onClick={onClickBackToHome} className="btn btn-primary mb-3">Back to Home</button>
                </div>
            </div>
        </div>
    );
}


export default Decision;