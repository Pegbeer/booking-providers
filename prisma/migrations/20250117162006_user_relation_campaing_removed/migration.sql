/*
  Warnings:

  - You are about to drop the column `userId` on the `Campaing` table. All the data in the column will be lost.
  - Added the required column `cost` to the `Spot` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Campaing] DROP CONSTRAINT [Campaing_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Campaing] DROP COLUMN [userId];

-- AlterTable
ALTER TABLE [dbo].[Spot] ADD [cost] DECIMAL(32,16) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[Point] (
    [id] NVARCHAR(1000) NOT NULL,
    [x] INT NOT NULL,
    [y] INT NOT NULL,
    [spotId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Point_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Point] ADD CONSTRAINT [Point_spotId_fkey] FOREIGN KEY ([spotId]) REFERENCES [dbo].[Spot]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
