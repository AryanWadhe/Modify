import { useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

type Props = {
  assetId: string;
  height?: number;
};

export default function Image3DViewer({ assetId, height = 510 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.cloudinary || !containerRef.current) return;

    const gallery = window.cloudinary.galleryWidget({
      cloudName: "dlevzyz21",
      container: containerRef.current,

      // 🔥 load single 3D asset
      mediaAssets: [
        {
          publicId: assetId,
          mediaType: "3d",
        },
      ],
       aspectRatio: "1:2", 

      // 🔥 THIS replaces all your old Dimensions config
      ar3dProps: {
        autoRotate: true,
        showZoomButtons: false,
        showAR: false,
        shadows: true,
      },

      // optional cleanup (no nav/buttons)
      navigation: "none",
      carouselStyle: "none",
      zoom: false,
    
    });

    gallery.render();

    return () => gallery.destroy();
  }, [assetId]);

  return <div ref={containerRef} style={{ height }} />;
}
