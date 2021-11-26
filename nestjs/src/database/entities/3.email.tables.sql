-- CREATE TABLE RECIPIENT
CREATE TABLE IF NOT EXISTS dbo.recipient (
  id SERIAL NOT NULL,
  name VARCHAR(45),
  email_address TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.recipient (name, email_address)
VALUES
('System', 'codegdo.checkin@gmail.com');

-- CREATE TABLE EMAIL_TYPE
CREATE TYPE dbo.email_type_enum AS ENUM ('signup');

CREATE TABLE IF NOT EXISTS dbo.email_type (
  id SERIAL NOT NULL,
  name dbo.email_type_enum NOT NULL,
  type VARCHAR(1) CHECK(type in ('S', 'R')),
  module_id INT,
  recipient_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE SET NULL,
  FOREIGN KEY(recipient_id) REFERENCES dbo.recipient(id) ON DELETE SET NULL
);

INSERT
INTO dbo.email_type (id, name, type, module_id, recipient_id)
VALUES
('1', 'signup', 'S', '1', null),
('2', 'signup', 'R', '1', '1');

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
('Signup Confirmation', 'Activate Your Account', '<html><body><a href="{{url}}">Confirmation</a></body></html>', '1', null),
('New Organization Signup', 'New Client Signup', '<html><body>New client has signed up. username: {{username}}</body></html>', '2', null);


-- SELECT
SELECT * FROM dbo.email_type;
SELECT * FROM org.email;

SELECT
  e.id,
  e.name,
  et.type,
  r.email_address,
  subject,
  body,
  is_active,
  org_id
FROM org.email e
LEFT JOIN dbo.email_type et ON et.id = e.email_type_id
LEFT JOIN dbo.recipient r ON r.id = et.recipient_id
WHERE et.name = 'signup' AND e.is_active = true;

-- DROP
DROP TABLE IF EXISTS
dbo.recipient,
dbo.email_type,
org.email
CASCADE;

DROP TYPE IF EXISTS
dbo.email_type_enum;