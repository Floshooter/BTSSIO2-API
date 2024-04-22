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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table m2l_bdd.cart : ~0 rows (environ)

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
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table m2l_bdd.items : ~15 rows (environ)
REPLACE INTO `items` (`id_items`, `item_name`, `description`, `stocks`, `thumbnail`, `price`, `id_category`) VALUES
	(63, 'Balle de golf', 'Pack de 8 balle de golf.', 17, 'img-1713782141970.jpg', 9, 6),
	(64, 'Balle de ping pong', 'Pack de 16 balle de tennis de table.', 49, 'img-1713782194058.jpg', 7, 4),
	(65, 'Balle de tennis', 'Pack de 4 balle de tennis.', 24, 'img-1713782230006.jpg', 12, 3),
	(66, 'Ballon de basketball', 'Ballon de backetball.', 5, 'img-1713782294177.jpg', 24, 2),
	(67, 'Ballon de football', 'Ballon de football pour s\'amuser entre ami.', 78, 'img-1713782332476.jpg', 28, 1),
	(68, 'Ballon de volleyball', 'Ballon de volleyball bon marché.', 34, 'img-1713782382588.jpg', 48, 5),
	(69, 'Casque de vélo', 'Casque de vélo pour la meilleure des protections.', 38, 'img-1713782425517.jpg', 46, 7),
	(70, 'Chasuble', 'Chasuble pour former des équipes.', 189, 'img-1713782456332.jpg', 14, 7),
	(71, 'Club de golf', 'Pack de 4 club de golf.', 61, 'img-1713782512376.jpg', 399, 6),
	(72, 'Corde à sauter', 'Corde à sauter pour vos meilleurs sauts !', 250, 'img-1713782573899.jpg', 5, 7),
	(73, 'Raquette de ping pong', 'Raquette de ping pong parfaites pour les meilleurs smash !', 16, 'img-1713782821913.jpg', 14, 4),
	(74, 'Raquette de tennis', 'Raquette de tennis en bonne état et très solide.', 19, 'img-1713782868357.jpg', 56, 3),
	(75, 'Table de ping pong', 'Table de ping pong utile pour la pratique du sport.', 3, 'img-1713782914454.jpg', 269, 4),
	(76, 'Tapis de gymnastique', 'Tapis pour s\'essuyer les pieds et faire du yoga.', 741, 'img-1713782970001.jpg', 6, 7),
	(77, 'Vélo de course', 'Vélo de course pour défier les plus grands', 20, 'img-1713783012337.jpg', 347, 7);

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
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Utilisateur (0) - Staff (1) - Admin (2)';

-- Listage des données de la table m2l_bdd.users : ~5 rows (environ)
REPLACE INTO `users` (`id`, `firstname`, `lastname`, `username`, `email`, `pwd`, `country`, `perm_level`) VALUES
	(34, 'Florent', 'Bernier', 'Floshooter', 'f.bernier@ecole-ipssi.net', '$2b$10$ZCsUICQ8Po1.wmU/lh6O7u7RcxiGZfXN8UMzXvi60gUxalZcZHEsm', 'FR', 2),
	(35, 'David', 'Groove', 'GroovyDave', 'davidgroove@gmail.com', '$2b$10$CBgYtUOzhqOYX6Fchx5IA.AL.FxtL/rz1PBK7MDMFzjURiKcqrY7y', 'UK', 0),
	(40, 'Camille', 'Honnête', 'Camionnette', 'camillehonnête@gmail.com', '$2b$10$FXjgGq22//KzkYNiefrqO.kv7YwCfBz/yv1RZ358wepv/T9/Bnhzm', 'France', 0),
	(41, 'Angele', 'Lemercier', 'Angela1', 'a.lemercier@m2l.fr', '$2b$10$CDCseuHgFRW7toOJcIT/au6mDpLvdymlJYQOzYeh9M4EJOVGhMg8e', 'FR', 1),
	(73, 'Charlie', 'Boston', 'Tonton', 'tonton@m2l.fr', '$2b$10$JLuXsB5PiV0d3wB2hc.Qhej0mAsFrKLvSrbgYgR9qa11TpW5zUlSa', 'FR', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
