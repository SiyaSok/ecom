/** @format */

// components/ui/shared/skeletons/search-results-skeleton.tsx
const SearchResultsSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <div className='bg-white rounded-lg border p-4 shadow-sm animate-pulse'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div>
            <div className='h-7 bg-gray-200 rounded w-40 mb-2'></div>
            <div className='h-4 bg-gray-200 rounded w-24'></div>
          </div>
          <div className='h-9 bg-gray-200 rounded w-32'></div>
        </div>
      </div>

      {/* Product grid skeleton */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='bg-white rounded-lg border p-4 shadow-sm animate-pulse'>
            <div className='aspect-square bg-gray-200 rounded-lg mb-4'></div>
            <div className='h-5 bg-gray-200 rounded w-3/4 mb-2'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2 mb-3'></div>
            <div className='h-6 bg-gray-200 rounded w-1/3 mb-4'></div>
            <div className='h-9 bg-gray-200 rounded w-full'></div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className='flex justify-center mt-8'>
        <div className='flex space-x-2'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='h-9 w-9 bg-gray-200 rounded'></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsSkeleton;
