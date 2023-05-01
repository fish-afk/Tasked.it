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

-- Dumping data for table taskedit.admins: ~5 rows (approximately)
INSERT INTO `admins` (`username`, `password`, `email`, `fullname`, `employee_title`) VALUES
	('admin1', '$2b$10$si3msoC4QZrqDfU0hQz6Y.4/NDWNRV8hRHd06ZViH7Zc6ECZucN8u', 'admin1@example.com', 'John Doe', 'Manager'),
	('admin2', 'password2', 'admin2@example.com', 'Jane Smith', 'Supervisor'),
	('admin3', 'password3', 'admin3@example.com', 'Mike Johnson', 'Director'),
	('asdasd', '$2b$10$.d7PF0JMd.Wd0NBomY7dzOAHRVJ4MAPRenGf9bERzD.Bb/1hfa5/O', 'mirzashihab2@gmail.com', 'asdasd', 'sdadasd'),
	('slide', '$2b$10$JBnl7X6gSh2cmxJzb6orx.tDjyICxTgQVNT9vmQxQE4tVIsWmaPAi', 'mirzashihab2@gmail.com', 'asdasd', 'asdasd');

-- Dumping data for table taskedit.clients: ~3 rows (approximately)
INSERT INTO `clients` (`name`, `description`, `email`) VALUES
	('Client A', 'A multinational company in the tech industry', "client1@example.com"),
	('Client B', 'A startup in the healthcare industry',"client2@example.com"),
	('Client C', 'A non-profit organization in the education sector', "client3@example.com");

-- Dumping data for table taskedit.freelancerroles: ~10 rows (approximately)
INSERT INTO `freelancerroles` (`id`, `role`, `freelancer`) VALUES
	(1, 1, NULL),
	(2, 2, NULL),
	(3, NULL, NULL),
	(4, 1, 'asdasd'),
	(5, 1, 'adas'),
	(6, 2, 'adas'),
	(7, NULL, 'asdasddfsdfs'),
	(8, 2, 'asdasddfsdfs'),
	(9, 1, 'dssad'),
	(10, 2, 'dssad');

-- Dumping data for table taskedit.freelancers: ~6 rows (approximately)
INSERT INTO `freelancers` (`username`, `fullname`, `password`, `age`, `email`) VALUES
	('adas', 'asdasd asd asd', '$2b$10$oAAnvz7IvpL187UJByAZSeNuYJG0H72XPHxm8SzFNLOrK1VdzwMxO', '123', 'mirzashihabwq2@gmail.com'),
	('asdasd', 'asdasddsdad', '$2b$10$kVbZPwIqKHtbxOmBS9euv.D9SCx1GU7Xn1Uf53CEP0cOnXzo/iD4y', '12', 'mirzashihab2@gmail.com'),
	('asdasddfsdfs', 'fsdfsdfsdf', '$2b$10$BYil0m.Zd590SxbuOuWTWei3Grwf.V0p.dJT0g9V/JI9fBXEpcHva', '1234', 'mirzashihab2@gmail.com'),
	('dssad', 'sadasdas', '$2b$10$ey4asvEzZrBqAIeCgQpctuZIfnxN4zaULpn/56Sk7Ppx2UWW7iuRy', '12', 'mirzashihab2@gmail.com'),
	('freelancer2', 'Michael Brown', 'password2', '35', 'michael.brown@example.com'),
	('freelancer3', 'Lisa Smith', 'password3', '42', 'lisa.smith@example.com');

-- Dumping data for table taskedit.projects: ~3 rows (approximately)
INSERT INTO `projects` (`id`, `name`, `duration_in_days`, `client`, `Admin`, `total_funding`, `completed`) VALUES
	(1, 'Project A', 6, 'Client A', 'admin1', 50000, 0),
	(2, 'Project B', 4, 'Client A', 'admin2', 20000, 0),
	(3, 'Project C', 8, 'Client B', 'admin3', 75000, 0);

-- Dumping data for table taskedit.roles: ~13 rows (approximately)
INSERT INTO `roles` (`id`, `name`, `description`) VALUES
	(1, 'Software Engineer', 'Develops software solutions to meet customer requirements'),
	(2, 'sadasdsadad', 'asdasdsadasdasdasdasdsad'),
	(4, 'Full Stack Developer', 'Develops both frontend and backend components of web applications'),
	(5, 'UI/UX Designer', 'Designs user interfaces and user experiences for websites and applications'),
	(7, 'Web Designer', 'Creates the look, layout, and features of websites'),
	(8, 'Mobile App Developer', 'Develops applications for mobile devices, such as smartphones and tablets'),
	(9, 'Game Developer', 'Creates video games for various platforms'),
	(10, 'Database Administrator', 'Manages the performance, security, and availability of databases'),
	(11, 'DevOps Engineer', 'Combines software development and IT operations to improve software delivery and infrastructure'),
	(12, 'Quality Assurance Engineer', 'Ensures the quality of software products by developing and executing test plans'),
	(13, 'Technical Writer', 'Creates technical documentation and manuals for software products'),
	(14, 'Project Manager (with tech focus)', 'Manages technology projects and ensures they are completed on time and within budget'),
	(15, 'test', 'testsdsad');

-- Dumping data for table taskedit.tasks: ~3 rows (approximately)
INSERT INTO `tasks` (`id`, `name`, `description`, `Freelancer_id`, `due_date`, `project_id`, `price_allocation`, `completed`) VALUES
	(1, 'Task A', 'Build login functionality', NULL, '2023-06-01', 1, 5000, 0),
	(2, 'Task B', 'Design homepage layout', NULL, '2023-05-01', 2, 3500, 0),
	(3, 'Task C', 'Manage project timeline', NULL, '2023-07-01', 3, 8000, 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
