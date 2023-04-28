-- Create the 'main_sec.permission_level' table
CREATE TABLE IF NOT EXISTS main_sec.permission_level (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);


--

INSERT
INTO main_sec.permission_level (id, name)
VALUES
(1, 'list'),
(2, 'read'),
(3, 'write');