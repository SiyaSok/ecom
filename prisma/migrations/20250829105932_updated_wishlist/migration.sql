-- Drop the broken foreign key if it exists
ALTER TABLE "Wishlist"
DROP CONSTRAINT IF EXISTS "Wishlist_productSlug_fkey";

-- Ensure column type matches Product.slug
ALTER TABLE "Wishlist"
ALTER COLUMN "productSlug" TYPE TEXT USING "productSlug"::TEXT;

-- Add the new foreign key referencing Product.slug
ALTER TABLE "Wishlist"
ADD CONSTRAINT "Wishlist_productSlug_fkey"
FOREIGN KEY ("productSlug")
REFERENCES "Product"("slug")
ON DELETE CASCADE;
