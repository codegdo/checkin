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