CREATE TABLE pets (
  id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  dob DATE NOT NULL,
  client_email VARCHAR(255),
  archived BOOLEAN DEFAULT 0
);

INSERT INTO
  `pets` (`id`, `name`, `dob`, `client_email`, `archived`)
VALUES
  (
    NULL,
    'Garfield',
    '2021-09-01',
    'James@garfield.com',
    '0'
  );

-- LOGS table
CREATE TABLE logs (
  id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  pet_id INT(11) UNSIGNED,
  status VARCHAR(255) NOT NULL,
  description TEXT
);

-- MEDICATIONS table
CREATE TABLE medications (
  id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

-- prescriptions  table
CREATE TABLE prescriptions (
  id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  pet_id INT(11) UNSIGNED,
  medication_id INT(11) UNSIGNED,
  comment TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);