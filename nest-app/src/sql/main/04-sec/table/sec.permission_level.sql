-- PERMISSION_LEVEL
CREATE TABLE IF NOT EXISTS sec.permission_level (
  id integer not null,
  name varchar(255),

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key(id)
);

--

INSERT
INTO sec.permission_level (id, name)
VALUES
(1, 'list'),
(2, 'read'),
(3, 'write');