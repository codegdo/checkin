-- CREATE TABLE EMAIL_FROM
CREATE TABLE IF NOT EXISTS dbo.email_from (
  id SERIAL NOT NULL,
  from_name VARCHAR(45),
  from_address VARCHAR(255),
  reply_to VARCHAR(255),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.email_from (from_name, from_address, reply_to)
VALUES
('Auth Service', 'checkin.authservice@gmail.com', null);