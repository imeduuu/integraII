// Componente de galería de imágenes para animales usando next/image
// Para agregar nuevas imágenes, pasa un array de URLs en la prop "images".
// Ejemplo: <AnimalGallery images={["/img1.jpg", "/img2.jpg"]} />

import React from "react";
import ReactImageGallery from 'react-image-gallery';

interface AnimalGalleryProps {
  images: string[];
}

const AnimalGallery: React.FC<AnimalGalleryProps> = ({ images }) => {
  const items = images.map((src) => ({ original: src, thumbnail: src }));

  return (
    <div className="w-full max-w-lg mx-auto">
      <ReactImageGallery items={items} />
    </div>
  );
};

export default AnimalGallery;

// Para agregar nuevas imágenes, pasa un array de URLs en la prop "images".
// Ejemplo: <AnimalGallery images={["/img1.jpg", "/img2.jpg"]} />
// Más opciones pueden implementarse según sea necesario.