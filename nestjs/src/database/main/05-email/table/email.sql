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