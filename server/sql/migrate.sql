CREATE DATABASE IF NOT EXISTS Taskedit;

USE Taskedit;

CREATE TABLE IF NOT EXISTS `Admins`(
    `username` VARCHAR(255) NOT NULL PRIMARY KEY,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `fullname` VARCHAR(255) NOT NULL,
    `employee_title` VARCHAR(255) NOT NULL DEFAULT "staff"
);

CREATE TABLE IF NOT EXISTS `Clients`(
    `id` BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Roles`(
    `id` BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Freelancers`(
    `username` VARCHAR(255) NOT NULL PRIMARY KEY,
    `fullname` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `age` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `FreelancerRoles`(
    `id` BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `role` BIGINT UNSIGNED,
    `freelancer` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `Tasks`(
    `id` BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `Freelancer_id` VARCHAR(255),
    `due_date` DATE NOT NULL,
    `project_id` BIGINT UNSIGNED,
    `price_allocation` DOUBLE NOT NULL
);

CREATE TABLE IF NOT EXISTS `Projects`(
    `id` BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `duration_in_days` BIGINT UNSIGNED NOT NULL,
    `client` BIGINT UNSIGNED,
    `Admin` VARCHAR(255),
    `total_funding` DOUBLE NOT NULL
);

ALTER TABLE
    `FreelancerRoles` ADD CONSTRAINT `freelancerroles_freelancer_foreign` FOREIGN KEY(`freelancer`) REFERENCES `Freelancers`(`username`) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE
    `Tasks` ADD CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY(`project_id`) REFERENCES `Projects`(`id`) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE
    `Projects` ADD CONSTRAINT `projects_client_foreign` FOREIGN KEY(`client`) REFERENCES `Clients`(`id`) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE
    `FreelancerRoles` ADD CONSTRAINT `freelancerroles_role_foreign` FOREIGN KEY(`role`) REFERENCES `Roles`(`id`) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE
    `Projects` ADD CONSTRAINT `projects_admin_foreign` FOREIGN KEY(`Admin`) REFERENCES `Admins`(`username`) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE
    `Tasks` ADD CONSTRAINT `tasks_freelancer_id_foreign` FOREIGN KEY(`Freelancer_id`) REFERENCES `Freelancers`(`username`) ON UPDATE CASCADE ON DELETE SET NULL;