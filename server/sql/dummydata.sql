INSERT INTO Admins(username, password, email, fullname, employee_title)
VALUES ('johndoe', '1234abcd', 'johndoe@example.com', 'John Doe', 'Project Manager');

INSERT INTO Admins(username, password, email, fullname, employee_title)
VALUES ('janedoe2', 'abcd1234', 'janedoe2@example.com', 'Jane Doe 2', 'Senior Project Coordinator');

INSERT INTO Admins(username, password, email, fullname, employee_title)
VALUES ('sarahlee', '9tgb8765', 'sarahlee@example.com', 'Sarah Lee', 'Marketing Coordinator');

INSERT INTO Admins(username, password, email, fullname, employee_title)
VALUES ('davidchen', '1qaz2wsx', 'davidchen@example.com', 'David Chen', 'Chief Financial Officer');

INSERT INTO Admins(username, password, email, fullname, employee_title)
VALUES ('jimmynguyen', 'y6t5r4e3', 'jimmynguyen@example.com', 'Jimmy Nguyen', 'Web Developer');


INSERT INTO Freelancers(username, fullname, password, age, email)
VALUES ('janedoe123', 'Jane Doe 123', '1234abcd', '28', 'janedoe123@example.com');

INSERT INTO Freelancers(username, fullname, password, age, email)
VALUES ('michaelsmith', 'Michael Smith', '5tgb6yhn', '35', 'michaelsmith@example.com');

INSERT INTO Freelancers(username, fullname, password, age, email)
VALUES ('emilytran', 'Emily Tran', 'u8i9o0p', '29', 'emilytran@example.com');

INSERT INTO Freelancers(username, fullname, password, age, email)
VALUES ('jasonbrown', 'Jason Brown', 'r4t5y6u7', '42', 'jasonbrown@example.com');

INSERT INTO Freelancers(username, fullname, password, age, email)
VALUES ('catherinewang', 'Catherine Wang', 'fghjkl;', '31', 'catherinewang@example.com');

INSERT INTO Freelancers(username, fullname, password, age, email)
VALUES ('davidkim', 'David Kim', 'zxcvbnm,', '27', 'davidkim@example.com');

INSERT INTO Freelancers(username, fullname, password, age, email)
VALUES ('angelalee', 'Angela Lee', 'dfghjkl', '25', 'angelalee@example.com');

INSERT INTO Freelancers(username, fullname, password, age, email)
VALUES ('kevinyang', 'Kevin Yang', 'bnm,./', '30', 'kevinyang@example.com');

INSERT INTO Freelancers(username, fullname, password, age, email)
VALUES ('karennielsen', 'Karen Nielsen', '6y7u8i9o', '38', 'karennielsen@example.com')



INSERT INTO `Tasks` (`name`, `description`, `Freelancer_id`, `due_date`, `project_id`, `price_allocation`) 
VALUES ('Design UI Mockups', 'Create UI design concepts for the project', 'freelancer1', UNIX_TIMESTAMP('2023-06-15'), 1, 1500.00);

INSERT INTO `Tasks` (`name`, `description`, `Freelancer_id`, `due_date`, `project_id`, `price_allocation`) 
VALUES ('Develop Back-end', 'Build the server-side codebase of the project', 'freelancer2', UNIX_TIMESTAMP('2023-07-01'), 1, 2000.00);

INSERT INTO `Tasks` (`name`, `description`, `Freelancer_id`, `due_date`, `project_id`, `price_allocation`) 
VALUES ('Test App on Different Devices', 'Perform testing and debugging on various mobile devices', 'freelancer3', UNIX_TIMESTAMP('2023-08-01'), 2, 3000.00);

INSERT INTO `Tasks` (`name`, `description`, `Freelancer_id`, `due_date`, `project_id`, `price_allocation`) 
VALUES ('Create Landing Page', 'Develop an attractive landing page for the website', 'freelancer4', UNIX_TIMESTAMP('2023-06-30'), 3, 1200.00);

INSERT INTO `Tasks` (`name`, `description`, `Freelancer_id`, `due_date`, `project_id`, `price_allocation`) 
VALUES ('Implement Payment Gateway', 'Integrate payment gateway functionality into the website', 'freelancer5', UNIX_TIMESTAMP('2023-09-01'), 3, 2500.00);

INSERT INTO `Tasks` (`name`, `description`, `Freelancer_id`, `due_date`, `project_id`, `price_allocation`) 
VALUES ('Design App Logo', 'Create a unique and appealing logo for the app', 'freelancer1', UNIX_TIMESTAMP('2023-05-15'), 2, 500.00);

INSERT INTO `Tasks` (`name`, `description`, `Freelancer_id`, `due_date`, `project_id`, `price_allocation`) 
VALUES ('Develop Front-end', 'Build the client-side codebase of the project', 'freelancer2', UNIX_TIMESTAMP('2023-06-15'), 2, 1800.00);


INSERT INTO `Roles` (`name`, `description`) VALUES 
('Front-end Developer', 'Responsible for developing the user-facing side of web applications.'),
('Back-end Developer', 'Responsible for developing the server-side of web applications.'),
('Full-stack Developer', 'Responsible for developing both the front-end and back-end of web applications.'),
('UI/UX Designer', 'Responsible for designing user interfaces and user experiences for websites and applications.'),
('Graphic Artist', 'Responsible for creating visual content for websites, apps, and other digital media.'),
('Video Editor', 'Responsible for editing and enhancing video footage for various projects.'),
('Photo Editor', 'Responsible for editing and enhancing photos for various projects.'),
('Web Content Manager', 'Responsible for creating and managing the content of websites and web applications.'),
('Database Administrator', 'Responsible for designing, maintaining, and securing databases.'),
('Network Administrator', 'Responsible for designing, maintaining, and securing computer networks.');


INSERT INTO `Clients` (`name`, `description`) VALUES 
('ABC Corp', 'A software development company focused on creating innovative solutions for businesses.'),
('XYZ Inc', 'A marketing agency specializing in digital marketing campaigns and social media management.'),
('Acme Co', 'A manufacturing company that produces consumer goods.'),
('Globex Corporation', 'A multinational conglomerate with diverse interests in various industries.'),
('Smith & Co', 'A small consulting firm providing business strategy and financial planning services.'),
('Delta Airlines', 'A major airline company providing domestic and international flights to passengers.');
