
-- Tạo bảng tài khoản -- 

CREATE TABLE Account(
	username nchar(25) PRIMARY KEY,
	password nchar(128) NOT NULL,
	name nvarchar(128) NOT NULL
);


-- Tạo Bảng sản phẩm -- 

CREATE TABLE PRODUCT(
	id_product int IDENTITY(1,1) PRIMARY KEY,
	name nvarchar(128) NOT NULL,
	image nchar(128),
	price int
)

-- Tạo bảng hóa đơn --

CREATE TABLE BILL(
	id_bill int IDENTITY(1,1) PRIMARY KEY,
	id_product int NOT NULL,
	username nchar(25) NOT NULL
)

-- Kết nối khóa chính --
ALTER TABLE BILL 
ADD CONSTRAINT FK_BILL_ACCOUNT 
FOREIGN KEY(username)
REFERENCES ACCOUNT(username);


ALTER TABLE BILL 
ADD CONSTRAINT FK_BILL_PRODUCT
FOREIGN KEY(id_product)
REFERENCES PRODUCT(id_product);