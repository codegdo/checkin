-- PERMISSION_LEVEL
CREATE TABLE IF NOT EXISTS main_sec.permission_level (
  id integer not null,
  name varchar(255),

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key(id)
);

--

INSERT
INTO main_sec.permission_level (id, name)
VALUES
(1, 'list'),
(2, 'read'),
(3, 'write');