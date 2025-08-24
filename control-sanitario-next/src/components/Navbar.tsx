import React from 'react';

const Navbar = () => (
  <nav className="bg-primary text-white p-4 flex justify-between items-center">
    <span className="font-bold text-lg">Control Sanitario</span>
    <div>
      <a href="/" className="mx-2">Inicio</a>
      <a href="/report" className="mx-2">Reportar</a>
      <a href="/animals" className="mx-2">Animales</a>
      <a href="/alerts" className="mx-2">Alertas</a>
      <a href="/donations" className="mx-2">Donaciones</a>
    </div>
  </nav>
);

export default Navbar;
