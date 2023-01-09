-- GROUP
CREATE TABLE "main.sec".group(
  id integer generated always as identity not null,
  name varchar(85),
  description varchar(255),
  role_level integer default 1,

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
  foreign key(access_level_id) references "main.sec".access_level(id)
);

--

INSERT
INTO "main.sec".group (name, role_level, access_level_id, is_owner, is_active)
VALUES
('System', 0, 1, '1', '1'),
('Internal', 0, 2, '1', '1'),
('External', 0, 3, '0', '1');


select * from sec.group;