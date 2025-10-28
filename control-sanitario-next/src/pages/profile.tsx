import React from 'react';
// ...import eliminado: Map...
import ProfileSettings from '../components/ProfileSettings';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';

const mockUser = {
  id: 1,
  nombre: 'Juan Pérez',
  zona: 'Temuco - Centro',
  email: 'juan@example.com',
  favoritos: [
    { id: 1, nombre: 'Firulais', especie: 'Perro' },
    { id: 2, nombre: 'Michi', especie: 'Gato' },
  ],
};

const ProfilePage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={
        theme === 'dark'
          ? 'min-h-screen bg-black py-10 px-4 flex flex-col items-center text-white transition-colors duration-300 tablet:py-12 tablet:px-6'
          : 'min-h-screen bg-gradient-to-br from-blue-200 to-white py-10 px-4 flex flex-col items-center transition-colors duration-300 tablet:py-12 tablet:px-6'
      }
    >
      <div className="w-full max-w-4xl tablet:max-w-5xl">
        <div className="mb-8 flex justify-end">
          <Button
            variant="primary"
            className="!rounded-full !px-6 !py-2 !text-base !shadow-lg tablet-button touch-feedback tablet:!px-8 tablet:!py-3 tablet:!text-lg tablet:!min-h-[48px]"
            onClick={() => window.location.href = '/'}
          >
            Ir a inicio
          </Button>
        </div>
        <div
          className={
            theme === 'dark'
              ? 'bg-neutral-900 rounded-3xl shadow-2xl p-8 flex flex-col items-center mb-8 border border-neutral-800 tablet:p-10'
              : 'bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center mb-8 tablet:p-10'
          }
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Foto de perfil"
            className="w-28 h-28 rounded-full mb-4 border-4 border-blue-400 shadow-lg object-cover tablet:w-36 tablet:h-36 tablet:mb-6"
          />
          <h1 className={theme === 'dark' ? 'text-responsive-h1 font-extrabold leading-tight mb-2 text-white tracking-tight' : 'text-responsive-h1 font-extrabold leading-tight mb-2 text-blue-800 tracking-tight'}>{mockUser.nombre}</h1>
          <p className={theme === 'dark' ? 'text-base text-gray-200 mb-1 tablet:text-lg' : 'text-base text-gray-700 mb-1 tablet:text-lg'}>{mockUser.email}</p>
          <p className={theme === 'dark' ? 'text-base text-blue-300 mb-4 tablet:text-lg' : 'text-base text-blue-600 mb-4 tablet:text-lg'}>Zona: {mockUser.zona}</p>
          <div className="w-full max-w-md tablet:max-w-lg">
            <h3 className={theme === 'dark' ? 'font-semibold mb-2 text-white text-lg tablet:text-xl' : 'font-semibold mb-2 text-blue-700 text-lg tablet:text-xl'}>Favoritos</h3>
            <ul className="space-y-2 tablet:space-y-3">
              {mockUser.favoritos.map((f) => (
                <li
                  key={f.id}
                  className={
                    theme === 'dark'
                      ? 'flex items-center justify-between bg-neutral-800 rounded-lg px-4 py-2 shadow-sm border border-neutral-700 tablet:px-6 tablet:py-3 tablet:text-lg'
                      : 'flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 shadow-sm tablet:px-6 tablet:py-3 tablet:text-lg'
                  }
                >
                  <span className={theme === 'dark' ? 'font-semibold text-white' : 'font-semibold text-blue-900'}>{f.nombre}</span>
                  <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>{f.especie}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 w-full max-w-md tablet:max-w-lg tablet:mt-10">
            <ProfileSettings />
          </div>
        </div>
        {/* Mapa eliminado, solo disponible en /mapa */}
      </div>
    </div>
  );
};

export default ProfilePage;
