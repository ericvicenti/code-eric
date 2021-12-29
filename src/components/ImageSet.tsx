import React from "react";
import styles from "./ImageSet.module.css";

export default function ImageSet({ images }: { images: any[] }) {
  return <div className={styles.set}>{images}</div>;
}

export function Image({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.image}>
      <img src={src} alt={alt} />
      <span>{alt}</span>
    </div>
  );
}

ImageSet.Image = Image;
