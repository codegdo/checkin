-- CREATE TABLE POLICY_VERSION
CREATE TABLE IF NOT EXISTS dbo.policy_version (
  id SERIAL NOT NULL,
  name VARCHAR(5) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.policy_version(id, name)
VALUES
('1', '1.0');