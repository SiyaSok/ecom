/** @format */

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='mb-6'>
      <h3 className='font-semibold mb-3 text-lg'>{title}</h3>
      {children}
    </div>
  );
};

export default FilterSection;
