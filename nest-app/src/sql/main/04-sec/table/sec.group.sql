-- GROUP
CREATE TABLE main_sec.group (
  id serial PRIMARY KEY,
  name varchar(100),
  description text,
  group_level int DEFAULT 1,

  access_level_id int,
  company_id int,

  is_owner boolean,
  is_active boolean,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT CURRENT_USER,
  updated_by varchar(50),

  FOREIGN KEY(access_level_id) REFERENCES main_sec.access_level(id),
);

CREATE TABLE main_sec.group(
  id integer generated always as identity not null,
  name varchar(85),
  description varchar(255),
  group_level integer default 1,

  access_level_id integer ,
  company_id integer,

  is_owner boolean,
  is_active boolean,

  created_at timestamp default current_timestamp,
  updated_at timestamp,
  created_by varchar(45) default current_user,
  updated_by varchar(45),
  --
  primary key(id),
  foreign key(access_level_id) references main_sec.access_level(id)
);

--

INSERT
INTO main_sec.group (name, group_level, access_level_id, is_owner, is_active)
VALUES
('System', 0, 1, '1', '1'),
('Internal', 0, 2, '1', '1');
