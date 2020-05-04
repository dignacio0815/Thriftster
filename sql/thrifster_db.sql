-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- SET AUTOCOMMIT = 0;
START TRANSACTION;
-- SET time_zone = "+00:00";

--
-- Table structure for users
--
DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS (
  `ID` INT NOT NULL PRIMARY KEY,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(72) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE USERS
  MODIFY ID INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

DROP TABLE IF EXISTS POSTS;
CREATE TABLE POSTS (
  username varchar(50) COLLATE utf8_unicode_ci NOT NULL, 
  orderID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  purchaseDate DATE,                                                                                                             
  itemName varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  description varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  cost DOUBLE NOT NULL,
  data mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO USERS (ID, name, username, password) VALUE 
(1, "Denize", "cool", 12),
(2, "Bob", "liveLaugh", 23),
(3, "Duncan", "lol", 33),
(4, "Beyonce", "nice", 34),
(5, "Doja", "coloi", 45),
(6, "Kat", "nicePass", 43),
(7, "Kit", "password", 12),
(8, "Julio", "nani", 12),
(9, "Brian", "dare", 1929),
(10, "Adams", "coolPASSSS", 12345),
(11, "Sam", "wjat", 123456),
(12, "Rob", "logInm", 1029),
(13, "Christie", "Logout", 123421),
(14, "Natalie", "signIn", 1234567),
(15, "Alexis", "signUp1", 2456),
(16, "Jesus", "colioaaa", 20201),
(17, "Jose", "niceGuy123", 1010),
(18, "Mohammed", "webDev123", 3030),
(19, "Stacy", "androidDev", 2002),
(20, "Christopher", "123FrontEnd", 0102);