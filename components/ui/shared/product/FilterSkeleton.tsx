/** @format */

// components/ui/shared/skeletons/filter-skeleton.tsx
const FilterSkeleton = () => {
  return (
    <div className='bg-white rounded-lg border p-4 shadow-sm animate-pulse'>
      <div className='h-6 bg-gray-200 rounded w-1/3 mb-4'></div>

      {/* Department filter skeleton */}
      <div className='mb-6'>
        <div className='h-5 bg-gray-200 rounded w-1/2 mb-3'></div>
        <div className='space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-1/4'></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='h-4 bg-gray-200 rounded w-3/4'></div>
          ))}
        </div>
      </div>

      {/* Price filter skeleton */}
      <div className='mb-6'>
        <div className='h-5 bg-gray-200 rounded w-1/2 mb-3'></div>
        <div className='space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-1/4'></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='h-4 bg-gray-200 rounded w-2/3'></div>
          ))}
        </div>
      </div>

      {/* Rating filter skeleton */}
      <div>
        <div className='h-5 bg-gray-200 rounded w-1/2 mb-3'></div>
        <div className='space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-1/4'></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='h-4 bg-gray-200 rounded w-1/2'></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSkeleton;
