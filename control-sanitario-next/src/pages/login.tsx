import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => (
  <>
    <Navbar />
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      {/* Formulario de login aquí */}
    </main>
    <Footer />
  </>
);

export default Login;
