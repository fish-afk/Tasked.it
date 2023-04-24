INSERT INTO `Admins` (`username`, `password`, `email`, `fullname`, `employee_title`) 
VALUES 
('admin1', 'password1', 'admin1@example.com', 'John Doe', 'Manager'),
('admin2', 'password2', 'admin2@example.com', 'Jane Smith', 'Supervisor'),
('admin3', 'password3', 'admin3@example.com', 'Mike Johnson', 'Director');


INSERT INTO `Clients` (`name`, `description`) 
VALUES 
('Client A', 'A multinational company in the tech industry'),
('Client B', 'A startup in the healthcare industry'),
('Client C', 'A non-profit organization in the education sector');


INSERT INTO Roles (name, description) VALUES
('Software Engineer', 'Develops software solutions to meet customer requirements'),
('Frontend Developer', 'Develops user-facing web applications using HTML, CSS, and JavaScript'),
('Backend Developer', 'Builds server-side applications using various programming languages and technologies'),
('Full Stack Developer', 'Develops both frontend and backend components of web applications'),
('UI/UX Designer', 'Designs user interfaces and user experiences for websites and applications'),
('Graphic Designer', 'Creates visual concepts and designs using computer software or by hand'),
('Web Designer', 'Creates the look, layout, and features of websites'),
('Mobile App Developer', 'Develops applications for mobile devices, such as smartphones and tablets'),
('Game Developer', 'Creates video games for various platforms'),
('Database Administrator', 'Manages the performance, security, and availability of databases'),
('DevOps Engineer', 'Combines software development and IT operations to improve software delivery and infrastructure'),
('Quality Assurance Engineer', 'Ensures the quality of software products by developing and executing test plans'),
('Technical Writer', 'Creates technical documentation and manuals for software products'),
('Project Manager (with tech focus)', 'Manages technology projects and ensures they are completed on time and within budget');


INSERT INTO `Freelancers` (`username`, `fullname`, `password`, `age`, `email`) 
VALUES 
('freelancer1', 'Emily Johnson', 'password1', '28', 'emily.johnson@example.com'),
('freelancer2', 'Michael Brown', 'password2', '35', 'michael.brown@example.com'),
('freelancer3', 'Lisa Smith', 'password3', '42', 'lisa.smith@example.com');


INSERT INTO `FreelancerRoles` (`role`, `freelancer`) 
VALUES 
(1, 'freelancer1'),
(2, 'freelancer2'),
(3, 'freelancer3');


INSERT INTO `Projects` (`name`, `duration_in_days`, `client`, `Admin`, `total_funding`) 
VALUES 
('Project A', 6, 1, 'admin1', 50000),
('Project B', 4, 2, 'admin2', 20000),
('Project C', 8, 3, 'admin3', 75000);

INSERT INTO `Tasks` (`name`, `description`, `Freelancer_id`, `due_date`, `project_id`, `price_allocation`) 
VALUES 
('Task A', 'Build login functionality', 'freelancer1', '2023-06-01', 1, 5000),
('Task B', 'Design homepage layout', 'freelancer2', '2023-05-01', 2, 3500),
('Task C', 'Manage project timeline', 'freelancer3', '2023-07-01', 3, 8000);