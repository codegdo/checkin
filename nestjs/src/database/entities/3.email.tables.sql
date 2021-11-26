-- CREATE TABLE EMAIL_TYPE
CREATE TYPE dbo.email_type_enum AS ENUM ('signup');

CREATE TABLE IF NOT EXISTS dbo.email_type (
  id SERIAL NOT NULL,
  name dbo.email_type_enum NOT NULL,
  module_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE SET NULL
);

INSERT
INTO dbo.email_type (id, name, module_id)
VALUES
('1', 'signup', '1');

-- CREATE TABLE EMAIL
CREATE TABLE IF NOT EXISTS org.email (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  subject VARCHAR(255),
  body TEXT,

  email_type_id INT,
  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(email_type_id) REFERENCES dbo.email_type(id) ON DELETE SET NULL
);

INSERT
INTO org.email (name, subject, body, email_type_id, org_id)
VALUES
('Signup Confirmation', 'Confirmation', '<html><body>Confirmation</body></html>', '1', null);


-- SELECT
SELECT * FROM dbo.email_type;
SELECT * FROM org.email;

-- DROP
DROP TABLE IF EXISTS
dbo.email_type,
org.email
CASCADE;