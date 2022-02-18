-- CREATE TABLE GROUP TYPE
CREATE TABLE IF NOT EXISTS dbo.group_type (
  id SERIAL NOT NULL,
  name VARCHAR(15) CHECK(name in ('system', 'internal', 'external')) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.group_type(id, name)
VALUES
('1', 'system'),
('2', 'internal'),
('3', 'external');