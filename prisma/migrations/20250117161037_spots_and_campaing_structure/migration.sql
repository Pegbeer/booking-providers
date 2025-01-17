/*
  Warnings:

  - Added the required column `columnsGrid` to the `Campaing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rowsGrid` to the `Campaing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campaingId` to the `Spot` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Spot] DROP CONSTRAINT [Spot_providerId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Campaing] ADD [columnsGrid] INT NOT NULL,
[rowsGrid] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Spot] ADD [campaingId] NVARCHAR(1000) NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Spot] ADD CONSTRAINT [Spot_providerId_fkey] FOREIGN KEY ([providerId]) REFERENCES [dbo].[Provider]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Spot] ADD CONSTRAINT [Spot_campaingId_fkey] FOREIGN KEY ([campaingId]) REFERENCES [dbo].[Campaing]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
