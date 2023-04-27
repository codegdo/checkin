-- PERMISSION_LEVEL
CREATE TABLE IF NOT EXISTS main_sec.permission_level (
  id serial PRIMARY KEY,
  name varchar(100),

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT CURRENT_USER,
);

--

INSERT
INTO main_sec.permission_level (id, name)
VALUES
(1, 'list'),
(2, 'read'),
(3, 'write');