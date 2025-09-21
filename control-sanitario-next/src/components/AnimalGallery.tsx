// Componente de galería de imágenes para animales usando react-image-gallery
// Documentación oficial: https://github.com/xiaolin/react-image-gallery
// Para agregar nuevas imágenes, pasa un array de URLs en la prop "images".
// Ejemplo: <AnimalGallery images={["/img1.jpg", "/img2.jpg"]} />
// Puedes personalizar la galería usando las props de la librería (ver documentación).

import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface AnimalGalleryProps {
  images: string[];
}

const AnimalGallery: React.FC<AnimalGalleryProps> = ({ images }) => {
  // Formato requerido por react-image-gallery
  const galleryImages = images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <div className="w-full max-w-lg mx-auto">
      <ImageGallery
        items={galleryImages}
        showThumbnails={true}
        showPlayButton={false}
        showFullscreenButton={true}
        slideOnThumbnailOver={true}
        showNav={true}
        useBrowserFullscreen={true}
      />
    </div>
  );
};

export default AnimalGallery;

// Para agregar nuevas imágenes, pasa un array de URLs en la prop "images".
// Ejemplo: <AnimalGallery images={["/img1.jpg", "/img2.jpg"]} />
// Más opciones en la documentación oficial.