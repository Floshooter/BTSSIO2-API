-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           11.3.0-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour m2l_bdd
CREATE DATABASE IF NOT EXISTS `m2l_bdd` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `m2l_bdd`;

-- Listage de la structure de la table m2l_bdd. cart
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `item_price` float NOT NULL,
  `id_item` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_item` (`id_item`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `FK__items` FOREIGN KEY (`id_item`) REFERENCES `items` (`id_items`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table m2l_bdd.cart : ~7 rows (environ)
REPLACE INTO `cart` (`id`, `item_name`, `quantity`, `item_price`, `id_item`, `id_user`) VALUES
	(52, 'Ballon de foot', 1, 12.5, 2, 40),
	(53, 'Ballon de basket', 1, 20, 3, 40),
	(54, 'Ballon de volley', 1, 10, 4, 40),
	(55, 'Balle de ping pong', 1, 15, 6, 34),
	(56, 'Corde à sauter', 2, 11.99, 11, 35),
	(57, 'Corde à sauter', 2, 11.99, 11, 35),
	(58, 'Corde à sauter', 2, 11.99, 11, 35);

-- Listage de la structure de la table m2l_bdd. category_item
CREATE TABLE IF NOT EXISTS `category_item` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table m2l_bdd.category_item : ~7 rows (environ)
REPLACE INTO `category_item` (`id`, `cat_name`) VALUES
	(1, 'football'),
	(2, 'backetball'),
	(3, 'tennis'),
	(4, 'ping pong'),
	(5, 'volleyball'),
	(6, 'golf'),
	(7, 'autre');

-- Listage de la structure de la table m2l_bdd. items
CREATE TABLE IF NOT EXISTS `items` (
  `id_items` int(10) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(40) NOT NULL,
  `description` longtext NOT NULL,
  `stocks` int(10) NOT NULL,
  `thumbnail` longtext DEFAULT NULL,
  `price` float NOT NULL,
  `id_category` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_items`),
  KEY `id_category` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table m2l_bdd.items : ~20 rows (environ)
REPLACE INTO `items` (`id_items`, `item_name`, `description`, `stocks`, `thumbnail`, `price`, `id_category`) VALUES
	(2, 'Ballon de foot', 'Ballon utilisé pour faire du football', 14, 'C:\\fakepath\\ballon_foot.jpg', 12.5, 1),
	(3, 'Ballon de basket', 'Ballon utilisé pour faire du basketball', 12, 'C:\\fakepath\\ballon_basket.jpg', 20, 2),
	(4, 'Ballon de volley', 'Ballon utilisé pour faire du volleyball', 20, 'C:\\fakepath\\ballon_volleyball.jpg', 10, 5),
	(5, 'Balle de tennis', 'Pack de 50 balles utilisées pour faire du tennis', 50, 'C:\\fakepath\\balle_tennis.jpg', 25, 3),
	(6, 'Balle de ping pong', 'Pack de 20 balles utilisées pour faire du tennis', 20, 'C:\\fakepath\\balle_tdt.jpg', 15, 4),
	(7, 'Balle de golf', 'Pack de 5 balles utilisées pour faire du golf', 0, 'C:\\fakepath\\balle_golf.jpg', 21, 6),
	(8, 'Casque de vélo', 'Casque utilisé lors de déplacement à vélo', 24, 'C:\\fakepath\\casque_velo.jpg', 30, 7),
	(9, 'Chasuble', 'Pack de 10 chasuble utilisé pour la différenciation des équipes', 50, 'C:\\fakepath\\chasuble.jpg', 40, 7),
	(10, 'Club de golf', 'Club utilisé pour la pratique du golf', 30, 'C:\\fakepath\\club_golf.jpg', 100, 6),
	(11, 'Corde à sauter', 'Corde à sauter utilisée pour toute activité sportive', 100, 'C:\\fakepath\\corde_gym.jpg', 12.99, 7),
	(12, 'Raquette de ping pong', 'Pack de 2 raquette utilisées pour la pratique du ping pong', 45, 'C:\\fakepath\\raquette_tdt.jpg', 24.67, 4),
	(13, 'Raquette de tennis', 'Raquette utilisée pour la pratique du tennis', 78, 'C:\\fakepath\\raquette_tennis.jpg', 58, 3),
	(14, 'Table de ping pong', 'Table de ping pong pratique pour le ping pong', 10, 'C:\\fakepath\\table_tdt.jpg', 343, 4),
	(15, 'Tapis de sport', 'Tapis pour la pratique de plusieurs sport', 150, 'C:\\fakepath\\tapis_gym.jpg', 8, 7),
	(16, 'Vélo', 'Vélo pour la pratique de cours à vélo', 5, 'C:\\fakepath\\vélo.jpg', 250, 7),
	(20, 'Sac de sport', 'Sac de sport', 6, '', 45, 7),
	(22, 'Gourde', 'Gourde', 18, '', 21, 7),
	(23, 'Gants', 'Gants', 18, '', 6.98, 7),
	(24, 'T-shirt foot', 't-shirt foot', 40, '', 16, 1),
	(43, 'Ballon de volleyball', 'Ballon de volleyball officiel de taille réglementaire', 10, '', 24.99, 5);

-- Listage de la structure de la table m2l_bdd. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(40) DEFAULT NULL,
  `lastname` varchar(40) DEFAULT NULL,
  `username` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `pwd` varchar(250) NOT NULL,
  `country` varchar(40) DEFAULT NULL,
  `perm_level` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Utilisateur (0) - Staff (1) - Admin (2)';

-- Listage des données de la table m2l_bdd.users : ~6 rows (environ)
REPLACE INTO `users` (`id`, `firstname`, `lastname`, `username`, `email`, `pwd`, `country`, `perm_level`) VALUES
	(34, 'Florent', 'Bernier', 'Floshooter', 'f.bernier@ecole-ipssi.net', '$2b$10$ZCsUICQ8Po1.wmU/lh6O7u7RcxiGZfXN8UMzXvi60gUxalZcZHEsm', 'FR', 2),
	(35, 'David', 'Groove', 'GroovyDave', 'davidgroove@gmail.com', '$2b$10$CBgYtUOzhqOYX6Fchx5IA.AL.FxtL/rz1PBK7MDMFzjURiKcqrY7y', 'UK', 0),
	(40, 'Camille', 'Honnête', 'Camionnette', 'camillehonnête@gmail.com', '$2b$10$FXjgGq22//KzkYNiefrqO.kv7YwCfBz/yv1RZ358wepv/T9/Bnhzm', 'France', 0),
	(41, 'Angele', 'Lemercier', 'Angela1', 'a.lemercier@m2l.fr', '$2b$10$CDCseuHgFRW7toOJcIT/au6mDpLvdymlJYQOzYeh9M4EJOVGhMg8e', 'FR', 1),
	(65, 'John', 'Doe', 'john_doe123', 'john.doe@example.com', '$2b$10$EMxZHMQnKr.Bv.0l2F4fk.okq020BkYJcFGT6chfUIXKC8NWl/0eG', 'United States', 0),
	(66, 'Alice', 'Dubois', 'alice_dub', 'alice.dubois@example.com', '$2b$10$HVOIh9fQNZHLktPQS402l.RSFWR5CFn..ZsrGSX7JyO501U.Fc.Xy', 'FR', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
