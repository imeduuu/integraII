import React from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const getLinkClasses = (path: string) => {
    const baseClasses = 'mx-2';
    const activeClasses = 'font-bold underline';
    return `${baseClasses} ${router.pathname === path ? activeClasses : ''}`;
  };

  return (
    <nav className="bg-primary text-white p-4 flex flex-col sm:flex-row justify-between items-center">
      <span className="font-bold text-lg mb-2 sm:mb-0">Control Sanitario</span>
      <div className="flex justify-center items-center flex-grow">
        <a href="/" className={getLinkClasses('/')}>Inicio</a>
        <a href="/report" className={getLinkClasses('/report')}>Reportar</a>
        <a href="/animals" className={getLinkClasses('/animals')}>Animales</a>
        <a href="/alerts" className={getLinkClasses('/alerts')}>Alertas</a>
        <a href="/donations" className={getLinkClasses('/donations')}>Donaciones</a>
      </div>
    </nav>
  );
};

export default Navbar;