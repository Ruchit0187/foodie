import Image from "next/image";
import type { PictureProps } from "../types";

function Picture({ src, alt, sizes, ...props }: PictureProps) {
  return <Image src={src} alt={alt} sizes={sizes} {...props} />;
}

export default Picture;
