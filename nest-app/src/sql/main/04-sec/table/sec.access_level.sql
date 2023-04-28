-- Create the 'main_sec.access_level' table
CREATE TABLE main_sec.access_level (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);

--

INSERT
INTO main_sec.access_level (id, name)
VALUES
(1, 'system'),
(2, 'internal'),
(3, 'external');