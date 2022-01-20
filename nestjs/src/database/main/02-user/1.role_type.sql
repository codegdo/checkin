-- CREATE TABLE ROLE TYPE
CREATE TABLE IF NOT EXISTS dbo.role_type (
  id SERIAL NOT NULL,
  name VARCHAR(15) CHECK(name in ('system', 'internal', 'external')) NOT NULL,
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.role_type(name)
VALUES
('system'),
('internal'),
('external');