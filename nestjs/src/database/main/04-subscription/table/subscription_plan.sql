-- CREATE TABLE SUBSCRIPTION_PLAN
CREATE TABLE IF NOT EXISTS dbo.subscription_plan (
  id SERIAL NOT NULL,
  name VARCHAR(45),
  description VARCHAR(255),
  duration INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.subscription_plan(id, name, description, duration)
VALUES

('1', 'monthly', 'Every month', '30'),
('2', 'semiannual', 'Every six month', '180'),
('3', 'annual', 'Every year', '360'),
('4', 'trial', 'Trial', '15');