import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Itinerary from './pages/Itinerary';
import Currency from './pages/Currency';
import Packing from './pages/Packing';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Itinerary />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/packing" element={<Packing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;