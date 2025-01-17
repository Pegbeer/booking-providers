/*
  Warnings:

  - Added the required column `active` to the `Campaing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from` to the `Campaing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `until` to the `Campaing` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Campaing] ADD [active] BIT NOT NULL,
[from] DATETIME2 NOT NULL,
[until] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
