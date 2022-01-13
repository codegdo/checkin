-- CREATE TABLE ROLE TYPE
CREATE TYPE dbo.role_type_enum AS ENUM ('system', 'internal', 'external');

CREATE TABLE IF NOT EXISTS dbo.role_type (
  id SERIAL NOT NULL,
  name dbo.role_type_enum NOT NULL,
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.role_type(name)
VALUES
('system'),
('internal'),
('external');