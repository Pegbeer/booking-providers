/*
  Warnings:

  - You are about to drop the column `from` on the `Campaing` table. All the data in the column will be lost.
  - You are about to drop the column `until` on the `Campaing` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Campaing] DROP COLUMN [from],
[until];
ALTER TABLE [dbo].[Campaing] ADD CONSTRAINT [Campaing_active_df] DEFAULT 1 FOR [active];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
