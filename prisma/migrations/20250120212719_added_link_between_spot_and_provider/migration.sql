BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[ProviderSpot] (
    [id] NVARCHAR(1000) NOT NULL,
    [providerId] NVARCHAR(1000) NOT NULL,
    [spotId] NVARCHAR(1000) NOT NULL,
    [isActive] BIT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ProviderSpot_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ProviderSpot_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[ProviderSpot] ADD CONSTRAINT [ProviderSpot_providerId_fkey] FOREIGN KEY ([providerId]) REFERENCES [dbo].[Provider]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProviderSpot] ADD CONSTRAINT [ProviderSpot_spotId_fkey] FOREIGN KEY ([spotId]) REFERENCES [dbo].[Spot]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
