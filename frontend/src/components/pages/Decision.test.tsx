import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Decision from './Decision';

describe('Decision', () => {
    test('renders decision details correctly', () => {
        render(
            <MemoryRouter initialEntries={[{
                state: {
                    name: 'Test',
                    businessName: 'Business ABC',
                    yearEstablished: 2005,
                    loanAmount: 50000,
                    outcome: {
                        approved: true,
                        amount: 80,
                    },
                }
            }]}>
                <Routes>
                    <Route path="/" element={<Decision />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Name :- Test')).toBeInTheDocument();
        expect(screen.getByText('Business Name :- Business ABC')).toBeInTheDocument();
        expect(screen.getByText('Year Established :- 2005')).toBeInTheDocument();
        expect(screen.getByText('Loan Amount :- 50000')).toBeInTheDocument();
    });
});
