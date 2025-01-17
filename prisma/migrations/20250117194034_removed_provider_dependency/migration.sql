/*
  Warnings:

  - You are about to drop the column `providerId` on the `Spot` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Spot] DROP CONSTRAINT [Spot_providerId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Spot] DROP COLUMN [providerId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
