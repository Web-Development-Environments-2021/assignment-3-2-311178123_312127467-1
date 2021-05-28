-- Create a new table called 'TableName' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
DROP TABLE dbo.Users
IF OBJECT_ID('dbo.UsersFavoritePlayers', 'U') IS NOT NULL
DROP TABLE dbo.UsersFavoritePlayers

-- Create all the Users details with all the user's personal data.
-- The favorite teams and players will be in a different tables with the user name
-- acting as a foregin key to the main users table.
CREATE TABLE dbo.Users
(
    
    username [NVARCHAR](50) NOT NULL PRIMARY KEY,
    password [NVARCHAR](50) NOT NULL,
    firstname [NVARCHAR](50) NOT NULL,
    lastname [NVARCHAR](50) NOT NULL,
    country [NVARCHAR](50) NOT NULL,
    email [NVARCHAR](50) NOT NULL,
    imageurl [NVARCHAR](100) NOT NULL,
);

CREATE TABLE dbo.UsersFavoritePlayers
(
    
    username [NVARCHAR](50) NOT NULL,
    playerid [INT] NOT NULL
    PRIMARY KEY(username, playerid)
);



