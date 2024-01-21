import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ReviewBalanceSheet from './ReviewBalanceSheet';

jest.mock('axios');

describe('ReviewBalanceSheet', () => {
    test('renders application details and balance sheet correctly', () => {
        const state = {
                name: 'John Doe',
                businessName: 'Business ABC',
                yearEstablished: 2005,
                loanAmount: 50000,
                balanceSheet: [
                    { year: 2020, month: 12, profitOrLoss: 250000, assetsValue: 1234 },
                    { year: 2020, month: 11, profitOrLoss: 1150, assetsValue: 5789 },
                ],
            };

        render(
            <MemoryRouter initialEntries={[{ state }]} initialIndex={0}>
                <Routes>
                    <Route path="/" element={<ReviewBalanceSheet />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Name :- John Doe')).toBeInTheDocument();
        expect(screen.getByText('Business Name :- Business ABC')).toBeInTheDocument();
        expect(screen.getByText('Year Established :- 2005')).toBeInTheDocument();
        expect(screen.getByText('Loan Amount :- 50000')).toBeInTheDocument();

        expect(screen.getByText('Year')).toBeInTheDocument();
        expect(screen.getByText('Month')).toBeInTheDocument();
        expect(screen.getByText('Profit Or Loss')).toBeInTheDocument();
        expect(screen.getByText('Assets Value')).toBeInTheDocument();
    });

    test('handles button click and navigates to Decision component on successful submission', async () => {
        const state = {
                name: 'Jane Doe',
                businessName: 'Business XYZ',
                yearEstablished: 2010,
                loanAmount: 75000,
                balanceSheet: [
                    { year: 2021, month: 1, profitOrLoss: 5000, assetsValue: 9876 },
                    { year: 2021, month: 2, profitOrLoss: -1500, assetsValue: 5432 },
                ],
            };
        

        jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: { outcome: { approved: true, amount: 90 } } })

        render(
            <MemoryRouter initialEntries={[{ state }]}>
                <Routes>
                    <Route path="/" element={<ReviewBalanceSheet />} />
                </Routes>
            </MemoryRouter>
        );

        const submitButton = screen.getByText('Submit Application');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
        });
    });
});
