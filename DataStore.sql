USE [Project51702017]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[accountID] [int] IDENTITY(10000,123) NOT NULL,
	[userName] [varchar](255) NULL,
	[password] [varchar](255) NULL,
	[name] [nvarchar](max) NULL,
	[email] [varchar](255) NULL,
	[cost] [int] NULL,
	[phone] [varchar](255) NULL,
	[address] [nvarchar](max) NULL,
	[role] [int] NULL,
	[isGmail] [bit] NULL,
	[idGoogle] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[accountID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [email_unique] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [userNameOnlyOnce] UNIQUE NONCLUSTERED 
(
	[userName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[orderId] [varchar](50) NOT NULL,
	[accountID] [int] NOT NULL,
	[ProductID] [varchar](50) NOT NULL,
	[countPro] [int] NOT NULL,
	[statusOrder] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[ProductID] [varchar](50) NOT NULL,
	[NameProduct] [nvarchar](255) NULL,
	[Prices] [int] NULL,
	[storage] [int] NULL,
	[Image] [varchar](max) NULL,
	[ProductTypeID] [nchar](10) NULL,
	[description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([accountID])
REFERENCES [dbo].[Account] ([accountID])
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([ProductID])
REFERENCES [dbo].[Products] ([ProductID])
GO
/****** Object:  StoredProcedure [dbo].[Account_changePass]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[Account_changePass] 
	@accountId int,
	@oldPassword varchar(255),
	@newPassword varchar(255)
AS
BEGIN
	update Account set password = @newPassword where password = @oldPassword and accountID = @accountId
	IF @@ROWCOUNT > 0  
	Select * from Account where accountID = @accountId and password = @newPassword
END
GO
/****** Object:  StoredProcedure [dbo].[Account_changePass2]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[Account_changePass2] 
	@accountId int,
	@newPassword varchar(255)
AS
BEGIN
	update Account set password = @newPassword where  accountID = @accountId
	IF @@ROWCOUNT > 0  
	Select * from Account where accountID = @accountId and password = @newPassword
END
GO
/****** Object:  StoredProcedure [dbo].[Account_Check]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[Account_Check]
	@accountID int
AS
BEGIN
	select userName,password,name,email,cost,phone,address,role From Account where accountID = @accountID
END
GO
/****** Object:  StoredProcedure [dbo].[Account_Check_Email]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Account_Check_Email]
	@email varchar(255)
AS
BEGIN
	select accountID,userName,password,name,email,cost,phone,address,isGmail,idGoogle,role From Account where email = @email
END
GO
/****** Object:  StoredProcedure [dbo].[Account_createAccount]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Account_createAccount]
	@userName varchar(255),
	@password varchar(255),
	@name nvarchar(max),
	@email varchar(255),
	@cost int,
	@address nvarchar(max),
	@phone varchar(255),
	@isGmail Bit,
	@role int
AS
BEGIN
	insert into Account (userName,password,name,email,cost,address,phone,role,isGmail) values (@userName,@password,@name,@email,@cost,@address,@phone,@role,@isGmail)
	IF @@ROWCOUNT > 0  
	select * from Account where userName = @userName
END
GO
/****** Object:  StoredProcedure [dbo].[Account_createAccount_Google]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Account_createAccount_Google]
	@name nvarchar(max),
	@email varchar(255),
	@isGmail Bit,
	@idGoogle varchar(max),
	@role int
AS
BEGIN
	insert into Account (userName,name,email,isGmail,idGoogle,role) values (@email,@name,@email,@isGmail,@idGoogle,@role)
	IF @@ROWCOUNT > 0  
	select * from Account where idGoogle = @idGoogle
END
GO
/****** Object:  StoredProcedure [dbo].[Account_editProfile]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Account_editProfile]
	@accountId int,
	@name nvarchar(max),
	@address nvarchar(max),
	@phone varchar(255)
AS
BEGIN
	update Account set name = @name, address = @address , phone = @phone
	where accountID = @accountId 
	IF @@ROWCOUNT > 0  
	select * from Account where  accountID = @accountId 
END
GO
/****** Object:  StoredProcedure [dbo].[Account_getall]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[Account_getall]
AS
BEGIN
	Select * from Account
END
GO
/****** Object:  StoredProcedure [dbo].[Account_Login]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Account_Login]
	@username varchar(255),
	@password varchar(255)
AS
BEGIN
	select accountID, userName,name,email,cost,phone,address,role From Account where userName = @username and password = @password
END
GO
/****** Object:  StoredProcedure [dbo].[Account_Login1]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[Account_Login1]
	@username varchar(255)
AS
BEGIN
	select accountID, userName,password,name,email,cost,phone,address,role From Account where userName = @username
END
GO
/****** Object:  StoredProcedure [dbo].[Orders_change_status]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[Orders_change_status]
	@orderID varchar(50),
	@userID int,
	@statusOrder int
AS
BEGIN
	update Orders set statusOrder = @statusOrder where orderId = @orderID and accountID = @userID
	select 
	CASE WHEN @@ROWCOUNT > 0  THEN 
		CAST( 1 as BIT ) 
	ELSE 
      CAST( 0 as BIT )  
	END 
END
GO
/****** Object:  StoredProcedure [dbo].[Orders_change_status_admin]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[Orders_change_status_admin]
	@orderID varchar(50),
	@statusOrder int
AS
BEGIN
	update Orders set statusOrder = @statusOrder where orderId = @orderID 
	select 
	CASE WHEN @@ROWCOUNT > 0  THEN 
		CAST( 1 as BIT ) 
	ELSE 
      CAST( 0 as BIT )  
	END 
END
GO
/****** Object:  StoredProcedure [dbo].[Orders_create]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Orders_create]
	@orderID varchar(50),
	@accountID int,
	@productID varchar(50),
	@countPro int,
	@statusOrder int

AS
BEGIN
	Update Products 
	set storage = storage - @countPro where ProductID = @productID AND (storage - @countPro) >= 0
	IF @@ROWCOUNT > 0 
		insert into Orders(orderId, accountID , ProductID ,countPro, statusOrder) values (@orderID , @accountID ,@productID ,@countPro,@statusOrder)
		IF @@ROWCOUNT > 0 
			select * from Orders where orderId = @orderID
END
GO
/****** Object:  StoredProcedure [dbo].[Orders_delete]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[Orders_delete] 
	@orderID varchar(50),
	@userID int
AS
BEGIN
	Delete from Orders where orderId = @orderID and accountID = @userID
	select 
	CASE WHEN @@ROWCOUNT > 0  THEN 
		CAST( 1 as BIT ) 
	ELSE 
      CAST( 0 as BIT )  
	END 
END
GO
/****** Object:  StoredProcedure [dbo].[Orders_delete_idPro]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[Orders_delete_idPro] 
	@orderID varchar(50),
	@userID int,
	@idPro varchar(50)
AS
BEGIN
	Delete from Orders where orderId = @orderID and accountID = @userID and ProductID = @idPro
	select 
	CASE WHEN @@ROWCOUNT > 0  THEN 
		CAST( 1 as BIT ) 
	ELSE 
      CAST( 0 as BIT )  
	END 
END
GO
/****** Object:  StoredProcedure [dbo].[Orders_getAll_admin]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Orders_getAll_admin]
AS
BEGIN
	SELECT ord.orderId, ord.statusOrder ,ord.countPro , acc.accountID, acc.userName , acc.name , acc.email, acc.cost , acc.phone, acc.address, pro.ProductID, pro.NameProduct, pro.Prices , pro.storage, pro. storage,pro.Image,pro.ProductTypeID
	FROM Orders ord
	INNER JOIN Account acc ON ord.accountID=acc.accountID
	INNER JOIN Products pro ON ord.ProductID =pro.ProductID
	
END
GO
/****** Object:  StoredProcedure [dbo].[Orders_getAll_orderID]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Orders_getAll_orderID]
	@orderID varchar(50),
	@userID int
AS
BEGIN
	SELECT ord.orderId, ord.statusOrder ,ord.countPro , acc.accountID, acc.userName , acc.name , acc.email, acc.cost , acc.phone, acc.address, pro.ProductID, pro.NameProduct, pro.Prices , pro.storage, pro. storage,pro.Image,pro.ProductTypeID
	FROM Orders ord
	INNER JOIN Account acc ON ord.accountID=acc.accountID
	INNER JOIN Products pro ON ord.ProductID =pro.ProductID
	where ord.orderId = @orderID and ord.accountID = @userID
END
GO
/****** Object:  StoredProcedure [dbo].[Orders_getAll_userID]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Orders_getAll_userID]
	@userID int
AS
BEGIN
	SELECT ord.orderId, ord.statusOrder ,ord.countPro , acc.accountID, acc.userName , acc.name , acc.email, acc.cost , acc.phone, acc.address, pro.ProductID, pro.NameProduct, pro.Prices , pro.storage,pro.Image,pro.ProductTypeID
	FROM Orders ord
	INNER JOIN Account acc ON ord.accountID=acc.accountID
	INNER JOIN Products pro ON ord.ProductID =pro.ProductID
	where acc.accountID = @userID
END
GO
/****** Object:  StoredProcedure [dbo].[Product_getall]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Product_getall] 
AS
BEGIN
	Select * from Products
END
GO
/****** Object:  StoredProcedure [dbo].[Product_getall_type]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Product_getall_type]
	@ProductTypeID nchar(10)
AS
BEGIN
	Select * from Products where ProductTypeID = @ProductTypeID
END
GO
/****** Object:  StoredProcedure [dbo].[Products_createProducts]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Products_createProducts]
	@ProductID nchar(50),
	@NameProduct nvarchar(50),
	@Prices int,
	@Storage int,
	@Image varchar(max),
	@ProductTypeID nchar(10),
	@description nvarchar(max)

AS
BEGIN
	insert into Products(ProductID , NameProduct,Prices,storage,Image,ProductTypeID,description) values(TRIM(@ProductID),@NameProduct,@Prices,@Storage,@Image,@ProductTypeID,@description)
	IF @@ROWCOUNT > 0  
	select * from Products where ProductID = @ProductID
END
GO
/****** Object:  StoredProcedure [dbo].[Products_deleteProducts]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[Products_deleteProducts]
	@ProductID nchar(50)
AS
BEGIN
	Delete from Products where ProductID = @ProductID
	select 
	CASE WHEN @@ROWCOUNT > 0  THEN 
		CAST( 1 as BIT ) 
	ELSE 
      CAST( 0 as BIT )  
	END 
END
GO
/****** Object:  StoredProcedure [dbo].[Products_editProducts]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Products_editProducts]
	@ProductID nchar(50),
	@NameProduct nvarchar(50),
	@Prices int,
	@Storage int,
	@Image varchar(max),
	@ProductTypeID nchar(10),
	@description nvarchar(max)

AS
BEGIN
	update Products 
	set 
	NameProduct = @NameProduct,
	Prices = @Prices,
	storage = @Storage,
	Image = @Image,
	ProductTypeID = @ProductTypeID,
	description=@description
	where ProductID = @ProductID
	IF @@ROWCOUNT > 0  
	select * from Products where ProductID = @ProductID
END
GO
/****** Object:  StoredProcedure [dbo].[Products_getDetail]    Script Date: 3/22/2022 4:00:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Products_getDetail]
	@id nchar(50)
AS
BEGIN
	select * from Products where ProductID = @id
END
GO
