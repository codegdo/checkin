-- CREATE TABLE EMAIL_TYPE
CREATE TABLE IF NOT EXISTS dbo.email_type (
  id SERIAL NOT NULL,
  name VARCHAR(45),
  type VARCHAR(1) CHECK(type in ('S', 'R')),

  email_address_id INT,
  email_from_id INT,
  module_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(email_address_id) REFERENCES dbo.email_address(id) ON DELETE SET NULL,
  FOREIGN KEY(email_from_id) REFERENCES dbo.email_from(id) ON DELETE SET NULL,
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE SET NULL
);

INSERT
INTO dbo.email_type (id, type_name, type, module_id, email_address_id, email_from_id)
VALUES
('1', 'verify', 'S', '1', null, '1');