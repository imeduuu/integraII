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
const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '500px',
  marginTop: '24px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
}

const Home = () => (
  <>
    <Navbar />
    <main style={mainStyle}>
      <h1 style={h1Style}>Bienvenido a la Plataforma de Control Sanitario</h1>
      <p style={pStyle}>Reporta animales en situación de calle, consulta focos sanitarios y participa en la comunidad.</p>
    <div style={mapContainerStyle}>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105642.40346423266!2d-72.695372!3d-38.7396505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9614c7d0b94bcd6f%3A0x44e62a1db2d4bb51!2sTemuco%2C%20Araucan%C3%ADa!5e0!3m2!1ses-419!2scl!4v1693000000000!5m2!1ses-419!2scl" 
        width="100%" 
        height="100%"
        allowFullScreen
        loading="lazy"
        style={{ border: 0 }}
      ></iframe>
    </div>
    </main>
    <Footer />
  </>
);

export default Home;
