/** @format */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
const Search = async () => {
  return (
    <form action={"/search"} method='GET'>
      <div className='flex w-full max-w-sm items-center space-x-2 relative'>
        <Input
          name='q'
          type='text'
          placeholder='Search...'
          className='md:w-[500px] lg:w-[600px] rounded-full'
        />
        <Button variant='ghost' className='absolute top-0 right-0 rounded-full'>
          <SearchIcon className=' text-black' />
        </Button>
      </div>
    </form>
  );
};

export default Search;
