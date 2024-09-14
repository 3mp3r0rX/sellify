-- In the new migration file

-- Add the new column with a default value (e.g., 'Uncategorized')
ALTER TABLE "Ad" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'Uncategorized';

-- If you have existing rows and you want to set a specific default category for them
-- You can also add an update statement to ensure existing rows have a value
UPDATE "Ad" SET "category" = 'Uncategorized' WHERE "category" IS NULL;
