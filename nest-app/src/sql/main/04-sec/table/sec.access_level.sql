-- ACCESS_LEVEL
CREATE TABLE main_sec.access_level (
  id serial PRIMARY KEY,
  name varchar(100),

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT CURRENT_USER,
);

CREATE TABLE main_sec.access_level (
  id integer not null,
  name varchar(255),

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key(id)
);

--

INSERT
INTO main_sec.access_level (id, name)
VALUES
(1, 'system'),
(2, 'internal'),
(3, 'external');