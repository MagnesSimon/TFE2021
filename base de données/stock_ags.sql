-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 18 mai 2021 à 17:03
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `stock_ags`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id_categorie` int(11) NOT NULL AUTO_INCREMENT,
  `nom_categorie` varchar(100) NOT NULL,
  `id_pole` int(11) NOT NULL,
  PRIMARY KEY (`id_categorie`),
  KEY `categorie_ibfk_1` (`id_pole`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `nom_categorie`, `id_pole`) VALUES
(7, 'Système pour garde corps en verre ', 1),
(8, 'Système pour extérieur', 1),
(9, 'Système pour cloison en verre ', 1),
(10, 'Pinces et fixations ponctuelles', 1),
(13, 'Systèmes pour parois et cabines de douches', 1),
(14, 'Systèmes pour vitrines et étagères', 1),
(15, 'Systèmes pour collages UV', 1);

-- --------------------------------------------------------

--
-- Structure de la table `dimension`
--

DROP TABLE IF EXISTS `dimension`;
CREATE TABLE IF NOT EXISTS `dimension` (
  `valeur_dimension` float NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`valeur_dimension`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `dimension`
--

INSERT INTO `dimension` (`valeur_dimension`) VALUES
(10),
(20),
(30),
(40),
(50),
(60),
(70),
(80),
(90),
(100),
(200),
(300),
(400),
(500),
(600),
(1000);

-- --------------------------------------------------------

--
-- Structure de la table `famille`
--

DROP TABLE IF EXISTS `famille`;
CREATE TABLE IF NOT EXISTS `famille` (
  `id_famille` int(11) NOT NULL AUTO_INCREMENT,
  `nom_famille` varchar(255) NOT NULL,
  `materiau` varchar(255) DEFAULT NULL,
  `pour_trou` float DEFAULT NULL,
  `specificite_technique` varchar(255) DEFAULT NULL,
  `image` longblob,
  `id_fournisseur` int(11) NOT NULL,
  PRIMARY KEY (`id_famille`),
  KEY `famille_ibfk_1` (`id_fournisseur`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `famille`
--

INSERT INTO `famille` (`id_famille`, `nom_famille`, `materiau`, `pour_trou`, `specificite_technique`, `image`, `id_fournisseur`) VALUES
(1, 'famille test', 'laiton', NULL, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `finition`
--

DROP TABLE IF EXISTS `finition`;
CREATE TABLE IF NOT EXISTS `finition` (
  `id_finition` int(11) NOT NULL AUTO_INCREMENT,
  `nom_finition` varchar(50) NOT NULL,
  `effet_finition` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_finition`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `finition`
--

INSERT INTO `finition` (`id_finition`, `nom_finition`, `effet_finition`) VALUES
(1, 'Chromé', NULL),
(2, 'Chromé', 'Brillant'),
(3, 'inox', 'satiné');

-- --------------------------------------------------------

--
-- Structure de la table `fonctionnalite`
--

DROP TABLE IF EXISTS `fonctionnalite`;
CREATE TABLE IF NOT EXISTS `fonctionnalite` (
  `id_fonctionnalite` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_fonctionnalite` varchar(255) NOT NULL,
  `id_profil` int(11) NOT NULL,
  PRIMARY KEY (`id_fonctionnalite`),
  KEY `fonctionnalite_ibfk_1` (`id_profil`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fonctionnalite`
--

INSERT INTO `fonctionnalite` (`id_fonctionnalite`, `libelle_fonctionnalite`, `id_profil`) VALUES
(2, 'fonctionnalité test ', 1);

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

DROP TABLE IF EXISTS `fournisseur`;
CREATE TABLE IF NOT EXISTS `fournisseur` (
  `id_fournisseur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_fournisseur` varchar(255) NOT NULL,
  `mail_fournisseur` varchar(255) NOT NULL,
  `telephone_fournisseur` int(13) DEFAULT NULL,
  `adresse_fournisseur` varchar(255) DEFAULT NULL,
  `id_localite` int(11) NOT NULL,
  PRIMARY KEY (`id_fournisseur`),
  KEY `fournisseur_ibfk_1` (`id_localite`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fournisseur`
--

INSERT INTO `fournisseur` (`id_fournisseur`, `nom_fournisseur`, `mail_fournisseur`, `telephone_fournisseur`, `adresse_fournisseur`, `id_localite`) VALUES
(2, 'test', 'test', NULL, NULL, 1316);

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

DROP TABLE IF EXISTS `historique`;
CREATE TABLE IF NOT EXISTS `historique` (
  `id_fiche_historique` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `quantite_modifie` float NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `reference` varchar(10) NOT NULL,
  PRIMARY KEY (`id_fiche_historique`),
  KEY `historique_ibfk_1` (`id_utilisateur`),
  KEY `historique_ibfk_2` (`reference`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `historique`
--

INSERT INTO `historique` (`id_fiche_historique`, `date`, `quantite_modifie`, `id_utilisateur`, `reference`) VALUES
(1, '2021-05-18 19:02:31', -1, 1, 'TE57');

-- --------------------------------------------------------

--
-- Structure de la table `jeu_de_dimension`
--

DROP TABLE IF EXISTS `jeu_de_dimension`;
CREATE TABLE IF NOT EXISTS `jeu_de_dimension` (
  `id_jeu_de_dimension` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_jeu_de_dimension` varchar(255) NOT NULL,
  `valeur_dimension` float NOT NULL,
  `reference` varchar(10) NOT NULL,
  PRIMARY KEY (`id_jeu_de_dimension`),
  KEY `jeu_de_dimension_ibfk_1` (`valeur_dimension`),
  KEY `jeu_de_dimension_ibfk_2` (`reference`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `jeu_de_dimension`
--

INSERT INTO `jeu_de_dimension` (`id_jeu_de_dimension`, `libelle_jeu_de_dimension`, `valeur_dimension`, `reference`) VALUES
(1, 'Longueur', 200, 'TE57'),
(2, 'Hauteur', 90, 'TE57');

-- --------------------------------------------------------

--
-- Structure de la table `localite`
--

DROP TABLE IF EXISTS `localite`;
CREATE TABLE IF NOT EXISTS `localite` (
  `id_localite` int(11) NOT NULL AUTO_INCREMENT,
  `code_postal` int(11) NOT NULL,
  `nom_localite` varchar(100) NOT NULL,
  `id_pays` int(11) NOT NULL,
  PRIMARY KEY (`id_localite`),
  KEY `localite_ibfk_1` (`id_pays`)
) ENGINE=InnoDB AUTO_INCREMENT=1317 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `localite`
--

INSERT INTO `localite` (`id_localite`, `code_postal`, `nom_localite`, `id_pays`) VALUES
(1316, 10, 'test', 1);

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

DROP TABLE IF EXISTS `pays`;
CREATE TABLE IF NOT EXISTS `pays` (
  `id_pays` int(11) NOT NULL AUTO_INCREMENT,
  `nom_pays` varchar(100) NOT NULL,
  PRIMARY KEY (`id_pays`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `pays`
--

INSERT INTO `pays` (`id_pays`, `nom_pays`) VALUES
(1, 'Belgique');

-- --------------------------------------------------------

--
-- Structure de la table `piece`
--

DROP TABLE IF EXISTS `piece`;
CREATE TABLE IF NOT EXISTS `piece` (
  `reference` varchar(10) NOT NULL,
  `valeur_seuil` float DEFAULT NULL,
  `quantite_en_stock` float NOT NULL DEFAULT '0',
  `id_famille` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `id_finition` int(11) NOT NULL,
  PRIMARY KEY (`reference`),
  KEY `piece_ibfk_1` (`id_famille`),
  KEY `piece_ibfk_2` (`id_categorie`),
  KEY `piece_ibfk_3` (`id_finition`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `piece`
--

INSERT INTO `piece` (`reference`, `valeur_seuil`, `quantite_en_stock`, `id_famille`, `id_categorie`, `id_finition`) VALUES
('TE57', 0, 0, 1, 13, 1);

-- --------------------------------------------------------

--
-- Structure de la table `pole`
--

DROP TABLE IF EXISTS `pole`;
CREATE TABLE IF NOT EXISTS `pole` (
  `id_pole` int(11) NOT NULL AUTO_INCREMENT,
  `nom_pole` varchar(100) NOT NULL,
  `quantite_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id_pole`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `pole`
--

INSERT INTO `pole` (`id_pole`, `nom_pole`, `quantite_type`) VALUES
(1, 'petits accessoires', 'unitaire'),
(2, 'profils', 'longueur'),
(3, 'silicone', 'tube');

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

DROP TABLE IF EXISTS `profil`;
CREATE TABLE IF NOT EXISTS `profil` (
  `id_profil` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_profil` varchar(255) NOT NULL,
  PRIMARY KEY (`id_profil`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `profil`
--

INSERT INTO `profil` (`id_profil`, `libelle_profil`) VALUES
(1, 'AdminTest');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_utilisateur` varchar(50) NOT NULL,
  `psw_utilisateur` varchar(255) NOT NULL,
  `id_profil` int(11) NOT NULL,
  PRIMARY KEY (`id_utilisateur`),
  KEY `utilisateurs_ibfk_1` (`id_profil`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `nom_utilisateur`, `psw_utilisateur`, `id_profil`) VALUES
(1, 'Test', 'user123', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD CONSTRAINT `categorie_ibfk_1` FOREIGN KEY (`id_pole`) REFERENCES `pole` (`id_pole`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `famille`
--
ALTER TABLE `famille`
  ADD CONSTRAINT `famille_ibfk_1` FOREIGN KEY (`id_fournisseur`) REFERENCES `fournisseur` (`id_fournisseur`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `fonctionnalite`
--
ALTER TABLE `fonctionnalite`
  ADD CONSTRAINT `fonctionnalite_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `profil` (`id_profil`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  ADD CONSTRAINT `fournisseur_ibfk_1` FOREIGN KEY (`id_localite`) REFERENCES `localite` (`id_localite`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `historique`
--
ALTER TABLE `historique`
  ADD CONSTRAINT `historique_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`) ON UPDATE CASCADE,
  ADD CONSTRAINT `historique_ibfk_2` FOREIGN KEY (`reference`) REFERENCES `piece` (`reference`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `jeu_de_dimension`
--
ALTER TABLE `jeu_de_dimension`
  ADD CONSTRAINT `jeu_de_dimension_ibfk_1` FOREIGN KEY (`valeur_dimension`) REFERENCES `dimension` (`valeur_dimension`) ON UPDATE CASCADE,
  ADD CONSTRAINT `jeu_de_dimension_ibfk_2` FOREIGN KEY (`reference`) REFERENCES `piece` (`reference`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `localite`
--
ALTER TABLE `localite`
  ADD CONSTRAINT `localite_ibfk_1` FOREIGN KEY (`id_pays`) REFERENCES `pays` (`id_pays`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `piece`
--
ALTER TABLE `piece`
  ADD CONSTRAINT `piece_ibfk_1` FOREIGN KEY (`id_famille`) REFERENCES `famille` (`id_famille`) ON UPDATE CASCADE,
  ADD CONSTRAINT `piece_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON UPDATE CASCADE,
  ADD CONSTRAINT `piece_ibfk_3` FOREIGN KEY (`id_famille`) REFERENCES `finition` (`id_finition`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `utilisateurs_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `profil` (`id_profil`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
