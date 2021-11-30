-- CREATE TABLE RECIPIENT
CREATE TABLE IF NOT EXISTS dbo.email_address (
  id SERIAL NOT NULL,
  name CHARACTER VARYING(45),
  recipient TEXT,
  cc_recipient TEXT,
  bcc_recipient TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by CHARACTER VARYING(45) DEFAULT CURRENT_USER,
  updated_by CHARACTER VARYING(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.email_address (name, recipient, cc_recipient, bcc_recipient)
VALUES
('System', 'codegdo.checkin@gmail.com', null, null);

-- CREATE TABLE EMAIL_TYPE
CREATE TYPE dbo.email_type_enum AS ENUM ('signup');

CREATE TABLE IF NOT EXISTS dbo.email_type (
  id SERIAL NOT NULL,
  name dbo.email_type_enum NOT NULL,
  type CHARACTER VARYING(1) CHECK(type in ('S', 'R')),
  module_id INT,
  email_address_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by CHARACTER VARYING(45) DEFAULT CURRENT_USER,
  updated_by CHARACTER VARYING(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE SET NULL,
  FOREIGN KEY(email_address_id) REFERENCES dbo.email_address(id) ON DELETE SET NULL
);

INSERT
INTO dbo.email_type (id, name, type, module_id, email_address_id)
VALUES
('1', 'signup', 'S', '1', null),
('2', 'signup', 'R', '1', '1');

-- CREATE TABLE EMAIL
CREATE TABLE IF NOT EXISTS org.email (
  id SERIAL NOT NULL,
  name CHARACTER VARYING(45) NOT NULL,
  subject CHARACTER VARYING(255),
  body TEXT,

  email_type_id INT,
  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by CHARACTER VARYING(45) DEFAULT CURRENT_USER,
  updated_by CHARACTER VARYING(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(email_type_id) REFERENCES dbo.email_type(id) ON DELETE SET NULL
);

INSERT
INTO org.email (name, subject, body, email_type_id, org_id)
VALUES
('Signup Confirmation', 'Activate Your Account', '<html><body><a href="{{url}}">Confirmation</a></body></html>', '1', null),
('New Organization Signup', 'New Client Signup', '<html><body>New client has signed up. username: {{username}}</body></html>', '2', null);