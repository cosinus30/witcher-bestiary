import Image from "next/image";

interface IImageDeck {
  images: {
    url: string;
    alt: string;
  }[];
}

const ImageDeck = ({ images }: IImageDeck) => {
  return (
    <div className="grid grid-flow-col gap-2 sm:grid-rows-2">
      <div className="overflow-hidden row-span-2 w-full rounded-sm shadow-lg aspect-w-9 aspect-h-16">
        <Image src={images[0].url} alt={images[0].alt} layout="fill" objectFit="cover"></Image>
      </div>
      <div className="hidden overflow-hidden col-span-1 w-full rounded-sm shadow-lg aspect-w-4 aspect-h-3 sm:block">
        <Image src={images[1].url} alt={images[1].alt} layout="fill" objectFit="cover"></Image>
      </div>
      <div className="hidden overflow-hidden col-span-1 w-full rounded-sm shadow-lg aspect-w-4 aspect-h-3 sm:block">
        <Image src={images[2].url} alt={images[2].alt} layout="fill" objectFit="cover"></Image>
      </div>
    </div>
  );
};

export default ImageDeck;