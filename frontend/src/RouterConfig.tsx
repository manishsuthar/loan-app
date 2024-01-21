import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartApplication from "./components/pages/StartApplication";
import BusinessDetailsForm from "./components/pages/BusinessDetailsForm";
import ReviewBalanceSheet from "./components/pages/ReviewBalanceSheet";
import Decision from "./components/pages/Decision";

const RouterConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartApplication />}/>
                <Route path="/businessForm" element={<BusinessDetailsForm />}/>
                <Route path="/reviewBalanceSheet" element={<ReviewBalanceSheet />}/>
                <Route path="/decision" element={<Decision />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterConfig;