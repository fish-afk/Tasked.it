-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.31 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for taskedit
CREATE DATABASE IF NOT EXISTS `taskedit` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `taskedit`;

-- Dumping structure for table taskedit.admins
CREATE TABLE IF NOT EXISTS `admins` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `employee_title` varchar(255) NOT NULL DEFAULT 'staff',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table taskedit.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `email` text NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table taskedit.freelancerroles
CREATE TABLE IF NOT EXISTS `freelancerroles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role` bigint unsigned DEFAULT NULL,
  `freelancer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `freelancerroles_freelancer_foreign` (`freelancer`),
  KEY `freelancerroles_role_foreign` (`role`),
  CONSTRAINT `freelancerroles_freelancer_foreign` FOREIGN KEY (`freelancer`) REFERENCES `freelancers` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `freelancerroles_role_foreign` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table taskedit.freelancers
CREATE TABLE IF NOT EXISTS `freelancers` (
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table taskedit.projects
CREATE TABLE IF NOT EXISTS `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `duration_in_days` bigint unsigned NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `client` varchar(255) DEFAULT NULL,
  `Admin` varchar(255) DEFAULT NULL,
  `total_funding` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_client_foreign` (`client`),
  KEY `projects_admin_foreign` (`Admin`),
  CONSTRAINT `projects_admin_foreign` FOREIGN KEY (`Admin`) REFERENCES `admins` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projects_client_foreign` FOREIGN KEY (`client`) REFERENCES `clients` (`name`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table taskedit.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table taskedit.tasks
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `Freelancer_id` varchar(255) DEFAULT NULL,
  `due_date` date NOT NULL,
  `project_id` bigint unsigned DEFAULT NULL,
  `price_allocation` double NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `tasks_project_id_foreign` (`project_id`),
  KEY `tasks_freelancer_id_foreign` (`Freelancer_id`),
  CONSTRAINT `tasks_freelancer_id_foreign` FOREIGN KEY (`Freelancer_id`) REFERENCES `freelancers` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
