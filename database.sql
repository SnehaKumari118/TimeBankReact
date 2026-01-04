CREATE DATABASE timebank;
USE timebank;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  credits INT DEFAULT 5
);

ALTER TABLE users
ADD bio TEXT,
ADD skills_offered TEXT,
ADD skills_needed TEXT,
ADD profile_pic VARCHAR(255),
ADD location VARCHAR(100),
ADD experience_level VARCHAR(50);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(100),
  description TEXT,
  hours INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100),
  phone VARCHAR(15),
  subject VARCHAR(100),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE learning_resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(150),
  description TEXT,
  file_type ENUM('video','pdf','text'),
  file_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE services
ADD COLUMN user_name VARCHAR(100) AFTER user_id;

UPDATE services s
JOIN users u ON s.user_id = u.id
SET s.user_name = u.name
WHERE s.user_name IS NULL;



