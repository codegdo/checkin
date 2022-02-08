-- CREATE TABLE EMAIL_ADDRESS
CREATE TABLE IF NOT EXISTS dbo.email_address (
  id SERIAL NOT NULL,
  name VARCHAR(45),
  recipient TEXT,
  cc_recipient TEXT,
  bcc_recipient TEXT,

  sms_recipient TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.email_address (name, recipient, cc_recipient, bcc_recipient, sms_recipient)
VALUES
('System', 'checkin.workspace@gmail.com', null, null, null);

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
INTO dbo.email_type (id, name, type, module_id, email_address_id, email_from_id)
VALUES
('1', 'verify', 'S', '1', null, '1');

-- CREATE TABLE EMAIL
CREATE TABLE IF NOT EXISTS org.email (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  subject VARCHAR(255),
  body TEXT,
  text TEXT,

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
INTO org.email (name, subject, body, text, email_type_id, org_id)
VALUES
('Verify Confirmation', 'Your Verification Code', '<html><body><p>Hi {{name}},</p><p>Your verification code is {{key}}, please enter the code to confirm.</p><p>If you believe you received this email in error, please contact us at <a href="mailto:suport@codegdo.com">support@codegdo.com</a></p><p>Thank you,<br>The Codegdo Team</p></body></html>', 'Your verification code is {{key}}.', '1', null);

-- SELECT TABLES

SELECT * FROM org.email;

-- DROP TABLES

DROP TABLE IF EXISTS
dbo.email_address,
dbo.email_from,
dbo.email_type,
org.email CASCADE;