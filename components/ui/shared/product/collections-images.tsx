/** @format */

import { getAllCollections } from "@/lib/actions/collection-action";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../../card";
const CollectionsImages = async () => {
  const collections = await getAllCollections({});

  return (
    <div className='grid gap-3 grid-cols-2 md:grid-cols-4 '>
      {collections.data.map((collection) => (
        <Card key={collection.id} className='relative'>
          <Link href={`collections/${collection.slug}`}>
            <Image
              src={collection.images[0]}
              alt={collection.name}
              width={400}
              height={400}
              className='hover:opacity-80 '
            />
          </Link>
          <p className='absolute bottom-2 left-2 text-2xl text-white font-bold drop-shadow-md'>
            {collection.name}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default CollectionsImages;
