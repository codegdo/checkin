-- CREATE TABLE ROLE TYPE
CREATE TABLE IF NOT EXISTS dbo.role_type (
  id SERIAL NOT NULL,
  name VARCHAR(15) CHECK(name in ('system', 'internal', 'external')) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.role_type(name)
VALUES
('1', 'system'),
('2', 'internal'),
('3', 'external');