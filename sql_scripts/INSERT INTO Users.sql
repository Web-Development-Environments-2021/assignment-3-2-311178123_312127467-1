INSERT INTO Users
   ([username],[password],[firstname],[lastname],
   [country],[email],[imageurl],[FavoritePlayers],[FavoriteTeams])
   
VALUES
   ('eden6', 'red', 'eden','yav','iraq','ede@.com',
   'dsfsfs.com',5,4)

GO
-- Query the total count of employees
SELECT * FROM dbo.Users;
-- Query all employee information
GO
INSERT INTO Users ([FavoritePlayers]) 

VALUES 
    (7)

WHERE username = 'eden2';
