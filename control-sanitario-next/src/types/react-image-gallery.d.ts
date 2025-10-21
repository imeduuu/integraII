declare module 'react-image-gallery' {
  import * as React from 'react';

  export interface ReactImageGalleryItem {
    original: string;
    thumbnail?: string;
    originalAlt?: string;
    thumbnailAlt?: string;
  }

  export interface ReactImageGalleryProps {
    items: ReactImageGalleryItem[];
    showThumbnails?: boolean;
    showPlayButton?: boolean;
    showFullscreenButton?: boolean;
    slideOnThumbnailOver?: boolean;
    showNav?: boolean;
    useBrowserFullscreen?: boolean;
    lazyLoad?: boolean;
    slideDuration?: number;
    slideInterval?: number;
  }

  export default class ImageGallery extends React.Component<ReactImageGalleryProps> {}
}
