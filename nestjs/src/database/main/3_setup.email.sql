-- CREATE TABLE EMAIL_ADDRESS
CREATE TABLE IF NOT EXISTS dbo.email_address (
  id SERIAL NOT NULL,
  group_name VARCHAR(45),
  recipients TEXT,
  cc_recipients TEXT,
  bcc_recipients TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.email_address (group_name, recipients, cc_recipients, bcc_recipients)
VALUES
('System', 'checkin.workspace@gmail.com', null, null);

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
CREATE TYPE dbo.email_type_enum AS ENUM ('signup');

CREATE TABLE IF NOT EXISTS dbo.email_type (
  id SERIAL NOT NULL,
  type_name dbo.email_type_enum NOT NULL,
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
('1', 'signup', 'S', '1', null, '1'),
('2', 'signup', 'R', '1', '1', '1');

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
('Signup Confirmation', 'Activate Your Account', '<html><body><p>Hi {{name}},</p><p>To verify your email address ({{emailAddres}}), please click the following <a href="{{url}}">confirmation link</a></p><p>If you believe you received this email in error, please contact us at <a href="mailto:suport@codegdo.com">support@codegdo.com</a></p><p>Thank you,<br>The Codegdo Team</p></body></html>', '1', null),
('Organization Signup', 'New Client Signup', '<html><body>New client has signed up. username: {{username}}</body></html>', '2', null);


-- CREATE FUNCTION FN_GET_EMAIL_BY_NAME
CREATE OR REPLACE FUNCTION org.fn_get_email_by_name(p_type_name dbo.email_type_enum)
RETURNS TABLE (
  id INT,
  name VARCHAR,
  type VARCHAR,
  "fromName" VARCHAR,
  "fromAddress" VARCHAR,
  "replyTo" VARCHAR,
  recipients TEXT,
  "ccRecipients" TEXT,
  "bccRecipients" TEXT,
  subject VARCHAR,
  body TEXT,
  "isActive" BOOLEAN,
  "orgId" INT
)
AS
$BODY$
  DECLARE

  BEGIN
    RETURN QUERY

       SELECT
        e.id,
        e.name,
        et.type,
        ef.from_name,
        ef.from_address,
        ef.reply_to,
        ea.recipients,
        ea.cc_recipients,
        ea.bcc_recipients,
        e.subject,
        e.body,
        e.is_active,
        e.org_id
      FROM org.email e
      LEFT JOIN dbo.email_type et ON et.id = e.email_type_id
      LEFT JOIN dbo.email_address ea ON ea.id = et.email_address_id
      LEFT JOIN dbo.email_from ef ON ef.id = et.email_from_id
      WHERE et.type_name = p_type_name AND e.is_active = true;

  END;
$BODY$
LANGUAGE plpgsql;

-------------------------------------------------------------------------
-- END ------------------------------------------------------------------
-------------------------------------------------------------------------

-- SELECT
SELECT * FROM dbo.email_address;
SELECT * FROM dbo.email_from;
SELECT * FROM dbo.email_type;
SELECT * FROM org.email;
SELECT * FROM org.fn_get_email_by_name('signup');

-- DROP
DROP TABLE IF EXISTS
dbo.email_address,
dbo.email_from,
dbo.email_type,
org.email
CASCADE;

DROP TYPE IF EXISTS
dbo.email_type_enum
CASCADE;

DROP FUNCTION IF EXISTS
org.fn_get_email_by_name;

