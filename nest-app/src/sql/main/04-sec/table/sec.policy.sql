-- POLICY
CREATE TABLE main_sec.policy (
  id serial PRIMARY KEY,
  name varchar(100),
  description varchar(255),
  data jsonb,
  access_level_id int,
  company_id int,
  is_active boolean,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT CURRENT_USER,
  updated_by varchar(50),
);

CREATE TABLE main_sec.policy(
  id integer generated always as identity not null,
  name varchar(100),
  description text,
  data jsonb,

  access_level_id integer,
  account_id integer,
  is_active boolean,

  created_at timestamp default current_timestamp,
  updated_at timestamp,
  created_by varchar(45) default current_user,
  updated_by varchar(45),
  --
  primary key(id)
);

--

INSERT
INTO main_sec.policy (name, description, data, access_level_id, is_active)
VALUES
('System Owner', 'Full Access', '{"version": "2023","statement":[{"sid": 1,"effect":"allow","action":"*","resource":"*","condition":{}}]}', '1', '1'),
('Admin Owner', 'Full Access', '{"version": "2023","statement":[{"sid": 1,"effect":"allow","action":"*","resource":"*","condition":{}}]}', '2', '1');