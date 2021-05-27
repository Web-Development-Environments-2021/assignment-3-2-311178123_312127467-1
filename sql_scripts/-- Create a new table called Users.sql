-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Games', 'U') IS NOT NULL
DROP TABLE dbo.Users
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Users
(
    username [NVARCHAR](50) NOT NULL PRIMARY KEY,
    password [NVARCHAR](50) NOT NULL,
    


    -- specify more columns here
);
GO