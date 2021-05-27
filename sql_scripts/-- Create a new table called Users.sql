-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
-- IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
-- DROP TABLE dbo.Users
-- GO
-- Create the table in the specified schema
CREATE TABLE dbo.Users
(
    
    username [NVARCHAR](50) NOT NULL PRIMARY KEY,
    password [NVARCHAR](50) NOT NULL,
    firstname [NVARCHAR](50) NOT NULL,
    lastname [NVARCHAR](50) NOT NULL,
    country [NVARCHAR](50) NOT NULL,
    email [NVARCHAR](50) NOT NULL,
    imageurl [NVARCHAR](100) NOT NULL,
    FavoritePlayers [INT],
    FavoriteTeams [INT],
    -- specify more columns here
);
GO