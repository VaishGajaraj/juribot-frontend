import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Document from "./Document";

import Analytics from "./Analytics";

import Settings from "./Settings";

import Landing from "./Landing";

import SignIn from "./SignIn";

import Upload from "./Upload";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    Document: Document,
    
    Analytics: Analytics,
    
    Settings: Settings,
    
    Landing: Landing,
    
    SignIn: SignIn,
    
    Upload: Upload,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Document" element={<Document />} />
                
                <Route path="/Analytics" element={<Analytics />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                <Route path="/Landing" element={<Landing />} />
                
                <Route path="/SignIn" element={<SignIn />} />
                
                <Route path="/Upload" element={<Upload />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}