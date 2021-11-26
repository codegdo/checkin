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