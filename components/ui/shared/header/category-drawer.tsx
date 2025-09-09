/** @format */

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import MobileCollectionsNav from "./MobileCollectionsNav";

const CategoryDrawer = () => {
  return (
    <Drawer direction='left'>
      <DrawerTrigger asChild className='md:hidden'>
        <Button variant='ghost'>
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='h-full max-w-sm'>
        <DrawerHeader>
          <MobileCollectionsNav />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
