import PropertyDetails from '@/components/PropertyDetails';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyImages from '@/components/PropertyImages';
import connectDB from '@/config/db';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

// import { useParams, usePathname, useSearchParams } from 'next/navigation';
// import React from 'react';

// const PropertyById = () => {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const pathName = usePathname();

//   return (
//     <div>
//       Property by id
//       <p> Id: {params.id}</p>
//       {/* http://localhost:3000/properties/1?name=siddharth */}
//       <p>name params is {searchParams.get('name')}</p>
//       <p>just path name {pathName}</p>
//     </div>
//   );
// };

// export default PropertyById;

const PropertyById = async ({ params }) => {
  await connectDB();
  const { id } = await params;
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializableObject(propertyDoc);

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        {' '}
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>

      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            {/* Property Info */}
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyById;
