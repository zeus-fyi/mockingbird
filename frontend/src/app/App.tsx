import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import store from "../redux/store";
import AiWorkflowsDashboard from "../components/ai/AI";
import AiWorkflowsEngineBuilderDashboard from "../components/ai/WorkflowBuilder";

export const App = () => {
    // ReactGA.initialize([
    //     {
    //         // trackingId: "",
    //         // gaOptions: { 'debug_mode':true }, // optional
    //         //gtagOptions: {...}, // optional
    //     },
    // ]);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AiWorkflowsDashboard />} />
                    <Route path="/ai/workflow/builder" element={<AiWorkflowsEngineBuilderDashboard />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )}

