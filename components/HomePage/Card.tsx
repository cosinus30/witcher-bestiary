import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface CardProps {
  image: {
    url: string;
    alt: string;
  };
  name: string;
  type: string;
  weaknesses: string[];
  id: string;
}

const Card = ({ type, image, name }: CardProps) => {
  return (
    // eslint-disable-next-line @next/next/link-passhref
    <motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
      <Link href={`/${name}`}>
        <div className="group relative transition-all duration-300 hover:cursor-pointer sm:hover:scale-110">
          <div className="overflow-hidden w-full rounded-sm aspect-w-3 aspect-h-4">
            <Image
              src={image.url}
              alt={image.alt}
              layout="fill"
              objectFit="contain"
              className="opacity-75 group-hover:opacity-100"
            ></Image>
          </div>
          <div className="flex absolute inset-x-0 bottom-0 justify-center items-center text-white bg-darky shadow-inner drop-shadow-lg">
            <p className="truncate">{name}</p>
            <span className="pt-1 mx-3 ">
              <Image src={`/${type}.svg`} alt={type} width={24} height={24}></Image>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
