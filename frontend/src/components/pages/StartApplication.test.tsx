import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StartApplication from './StartApplication';

jest.mock('axios');

describe('StartApplication', () => {
    test('handles button click and navigates to BusinessForm on successful initiation', async () => {
        const spy = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: { application: { _id: 'mockId' } } });

        render(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <Routes>
                    <Route path="/" element={<StartApplication />} />
                    <Route path="/businessForm" element={<div data-testid="businessForm">Business Form</div>} />
                </Routes>
            </MemoryRouter>
        );

        const startApplicationButton = screen.getByText('Start Application');
        fireEvent.click(startApplicationButton);

        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
            expect(screen.getByTestId('businessForm')).toBeInTheDocument();
        });
    });

});
