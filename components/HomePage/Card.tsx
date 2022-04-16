import Image from "next/image";
import Link from "next/link";

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

const Card = ({ type, image, name, weaknesses }: CardProps) => {
  return (
    <Link href={`/${name}`}>
      <div className="group relative transition-all duration-300 sm:hover:scale-110">
        <div className="overflow-hidden w-full rounded-sm aspect-w-3 aspect-h-4">
          <Image
            src={image.url}
            alt={image.alt}
            layout="fill"
            objectFit="cover"
            className="group-hover:opacity-75"
          ></Image>
        </div>
        <p className="absolute inset-x-0 bottom-0 py-2 text-center text-white bg-darky shadow-inner drop-shadow-lg">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default Card;