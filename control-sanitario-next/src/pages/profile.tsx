import React from 'react';
import Map from '../components/Map';
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
          ? 'min-h-screen bg-black py-10 px-4 flex flex-col items-center text-white transition-colors duration-300'
          : 'min-h-screen bg-gradient-to-br from-blue-200 to-white py-10 px-4 flex flex-col items-center transition-colors duration-300'
      }
    >
      <div className="w-full max-w-4xl">
        <div className="mb-8 flex justify-end">
          <Button
            variant="primary"
            className="!rounded-full !px-6 !py-2 !text-base !shadow-lg"
            onClick={() => window.location.href = '/'}
          >
            Ir a inicio
          </Button>
        </div>
        <div
          className={
            theme === 'dark'
              ? 'bg-neutral-900 rounded-3xl shadow-2xl p-8 flex flex-col items-center mb-8 border border-neutral-800'
              : 'bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center mb-8'
          }
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Foto de perfil"
            className="w-28 h-28 rounded-full mb-4 border-4 border-blue-400 shadow-lg object-cover"
          />
          <h1 className={theme === 'dark' ? 'text-3xl font-extrabold mb-2 text-white tracking-tight' : 'text-3xl font-extrabold mb-2 text-blue-800 tracking-tight'}>{mockUser.nombre}</h1>
          <p className={theme === 'dark' ? 'text-base text-gray-200 mb-1' : 'text-base text-gray-700 mb-1'}>{mockUser.email}</p>
          <p className={theme === 'dark' ? 'text-base text-blue-300 mb-4' : 'text-base text-blue-600 mb-4'}>Zona: {mockUser.zona}</p>
          <div className="w-full max-w-md">
            <h3 className={theme === 'dark' ? 'font-semibold mb-2 text-white text-lg' : 'font-semibold mb-2 text-blue-700 text-lg'}>Favoritos</h3>
            <ul className="space-y-2">
              {mockUser.favoritos.map((f) => (
                <li
                  key={f.id}
                  className={
                    theme === 'dark'
                      ? 'flex items-center justify-between bg-neutral-800 rounded-lg px-4 py-2 shadow-sm border border-neutral-700'
                      : 'flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 shadow-sm'
                  }
                >
                  <span className={theme === 'dark' ? 'font-semibold text-white' : 'font-semibold text-blue-900'}>{f.nombre}</span>
                  <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>{f.especie}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 w-full max-w-md">
            <ProfileSettings onThemeChange={setTheme} />
          </div>
        </div>
        <div className={theme === 'dark' ? 'bg-neutral-900 rounded-3xl shadow-2xl p-8 border border-neutral-800' : 'bg-white rounded-3xl shadow-2xl p-8'}>
          <h2 className={theme === 'dark' ? 'text-xl font-bold mb-4 text-white' : 'text-xl font-bold mb-4 text-blue-700'}>Mapa</h2>
          <div className={theme === 'dark' ? 'rounded-xl overflow-hidden border border-neutral-700 shadow' : 'rounded-xl overflow-hidden border border-blue-100 shadow'}>
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
