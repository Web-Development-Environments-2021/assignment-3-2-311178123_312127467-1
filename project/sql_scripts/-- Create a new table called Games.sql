-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Games', 'U') IS NOT NULL
DROP TABLE dbo.Games
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Games
(
    gameid INT NOT NULL PRIMARY KEY, -- primary key column
    -- specify more columns here
);
GO