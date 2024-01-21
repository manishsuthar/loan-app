import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BusinessDetailsForm from './BusinessDetailsForm';

jest.mock('axios');

describe('BusinessDetailsForm', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('handles button click and navigates to reviewBalanceSheet', async () => {
        const spy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { balanceSheet: [] } })

        const { getByTestId, getByText } = render(
            <MemoryRouter initialEntries={[{
                state: {
                    id: 'Test',
                }
            }]}>
                <Routes>
                    <Route path="/" element={<BusinessDetailsForm />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(getByTestId('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(getByTestId('Business Name'), { target: { value: 'Business ABC' } });
        fireEvent.change(getByTestId('Year Established Name'), { target: { value: '2005' } });
        fireEvent.change(getByTestId('Loan Amount'), { target: { value: '50000' } });

        fireEvent.click(getByText('Get Balance Sheet'));
        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
        });

    });
});
