/*
  Warnings:

  - Added the required column `order_type` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `order_type` ENUM('BOOK', 'RECORD') NOT NULL,
    MODIFY `book_id` VARCHAR(191) NULL;
