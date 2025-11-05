import React from 'react';
import Navbar from '../components/Navbar';
import TestNavbarOrgs from '../components/TestNavbarOrgs';

const TestNavbarOrgsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <TestNavbarOrgs />
      <div className="max-w-6xl mx-auto p-4">
        <p className="text-gray-700">
          Usa el navbar de prueba para interactuar con los endpoints de organizaciones.
        </p>
      </div>
    </>
  );
};

export default TestNavbarOrgsPage;
