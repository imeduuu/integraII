import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const mainStyle: React.CSSProperties = {
  maxWidth: '900px',
  margin: '40px auto',
  padding: '32px',
  background: '#e0f2fe',
  minHeight: '80vh',
  borderRadius: '16px',
  boxShadow: '0 2px 16px rgba(0,0,0,0.08)'
};
const h1Style: React.CSSProperties = {
  fontSize: '2.2rem',
  fontWeight: 700,
  marginBottom: '18px',
  color: '#2563eb',
};
const pStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  color: '#222',
};

const Home = () => (
  <>
    <Navbar />
    <main style={mainStyle}>
      <h1 style={h1Style}>Bienvenido a la Plataforma de Control Sanitario</h1>
      <p style={pStyle}>Reporta animales en situación de calle, consulta focos sanitarios y participa en la comunidad.</p>
    </main>
    <Footer />
  </>
);

export default Home;
