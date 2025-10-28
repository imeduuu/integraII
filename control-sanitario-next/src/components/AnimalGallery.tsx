// Componente de galería de imágenes para animales usando next/image
// Para agregar nuevas imágenes, pasa un array de URLs en la prop "images".
// Ejemplo: <AnimalGallery images={["/img1.jpg", "/img2.jpg"]} />

import React, { useState } from "react";
import Image from "next/image";

interface AnimalGalleryProps {
  images: string[];
}

const AnimalGallery: React.FC<AnimalGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt?: string } | null>(null);

  // Formato simple para uso interno
  const galleryImages = images.map((src, index) => ({
    src,
    alt: `Imagen ${index + 1}`,
  }));

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="grid grid-cols-2 gap-2">
        {galleryImages.map((image, index) => (
          <div key={index} className="relative">
            <Image
              key={index}
              src={image.src}
              alt={image.alt || `imagen-${index}`}
              width={800} // Ajusta el ancho
              height={600} // Ajusta la altura
              className="w-full h-auto rounded-lg shadow-md cursor-pointer"
              onClick={() => setSelectedImage(image)}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-full max-h-full">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt || "imagen-seleccionada"}
              width={1200}
              height={900}
              className="rounded-lg"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalGallery;

// Para agregar nuevas imágenes, pasa un array de URLs en la prop "images".
// Ejemplo: <AnimalGallery images={["/img1.jpg", "/img2.jpg"]} />
// Más opciones pueden implementarse según sea necesario.