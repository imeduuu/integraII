import React from 'react';
import * as Fa from 'react-icons/fa';

interface IconProps {
  name: string; // nombre lógico del icono, ej: 'paw', 'heart', 'map-marker', 'facebook'
  className?: string;
  'aria-label'?: string;
}

// Mapeo sencillo: nombres lógicos -> componentes de react-icons/fa
const map: Record<string, any> = {
  paw: Fa.FaPaw,
  heart: Fa.FaHeart,
  'map-marker': Fa.FaMapMarkerAlt,
  chart: Fa.FaChartLine,
  facebook: Fa.FaFacebook,
  twitter: Fa.FaTwitter,
  instagram: Fa.FaInstagram,
  user: Fa.FaUser,
  star: Fa.FaStar,
};

const Icon: React.FC<IconProps> = ({ name, className = '', ...rest }) => {
  const Component = map[name];
  if (!Component) return null;
  return <Component className={className} {...rest} />;
};

export default Icon;
