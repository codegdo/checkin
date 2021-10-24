-- CREATE TABLE FEATURE
CREATE TABLE IF NOT EXISTS dbo.feature (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  price NUMERIC(8,2),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.feature (id, name, price)
VALUES
('1', 'Analytics', '100'),
('2', 'Rewards', '100'),
('3', 'Reminders', '100'),
('4', 'Reviews', '100'),
('5', 'Refferals', '100'),

('6', 'Customize Templates', '100'),
('7', 'Customize Reports', '100'),
('8', 'Customize Rules', '100'),

('9', 'Appointment Booking', '100'),
('10', 'Walkin Booking', '100'),

('11', 'Staffs Assignment', '100'),
('12', 'Staffs Clockin', '100');

-- CREATE TABLE FEATURE_MODULE
CREATE TABLE IF NOT EXISTS dbo.feature_module (
  feature_id INT NOT NULL,
  module_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(feature_id, module_id),
  FOREIGN KEY(feature_id) REFERENCES dbo.feature(id) ON DELETE CASCADE,
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE CASCADE
);

INSERT
INTO dbo.feature_module(feature_id, module_id, org_id)
VALUES
('1', '11', null),
('2', '11', null),
('3', '11', null),
('4', '11', null),
('5', '11', null),
('6', '11', null),
('7', '11', null),
('8', '11', null),
('9', '11', null),
('1', '12', null),
('2', '12', null),
('3', '12', null),
('4', '12', null),
('5', '12', null),
('6', '12', null),
('7', '12', null),
('8', '12', null),
('9', '12', null),
('2', '13', null),
('5', '13', null),
('6', '13', null),
('7', '13', null),
('8', '13', null),
('9', '13', null),
('1', '14', null),
('2', '14', null),
('3', '14', null),
('4', '14', null);