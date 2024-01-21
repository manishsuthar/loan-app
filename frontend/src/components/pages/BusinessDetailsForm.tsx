import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BALANCE_SHEET } from '../../Constant';


const BusinessDetailsForm = () => {
    const [name, setName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [yearEstablished, setYearEstablished] = useState(2001);
    const [loanAmount, setLoanAmount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const getBalanceSheet = async () => {
        try {
            const id = location?.state?.id;
            const response = await axios.get(API_BALANCE_SHEET + id);
            const balanceSheet = response.data.balanceSheet;
            navigate('/reviewBalanceSheet', {
                state: {
                    name, businessName, yearEstablished, loanAmount, balanceSheet
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="d-flex align-items-center">
            <div className='businessDetailsForm row'>
                <div className='col-12'>
                    <div className="mb-3">
                        <label className="form-label" aria-labelledby="Name">Name</label>
                        <input type="text" data-testid="Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    </div>
                </div>
                <div className='col-12'>
                    <div className="mb-3">
                        <label className="form-label" aria-labelledby="Business Name">Business Name</label>
                        <input type="text" data-testid="Business Name" className="form-control" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Name" />
                    </div>
                </div>
                <div className='col-12'>
                    <div className="mb-3">
                        <label className="form-label" aria-labelledby="Year Established Name">Year Established Name</label>
                        <input type="number" data-testid="Year Established Name" className="form-control" value={yearEstablished} onChange={(e) => setYearEstablished(Number(e.target.value))} placeholder="Name" />
                    </div>
                </div>
                <div className='col-12'>
                    <div className="mb-3">
                        <label className="form-label" aria-labelledby="Loan Amount">Loan Amount</label>
                        <input type="number" data-testid="Loan Amount" className="form-control" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} placeholder="Name" />
                    </div>
                </div>
                <div className='col-12'>
                    <div className="col-auto">
                        <button onClick={getBalanceSheet} className="btn btn-primary mb-3">Get Balance Sheet</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default BusinessDetailsForm;