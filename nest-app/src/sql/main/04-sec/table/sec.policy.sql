-- POLICY
CREATE TABLE main_sec.policy(
  id integer generated always as identity not null,
  name varchar(85),
  description varchar(255),
  data jsonb,

  access_level_id integer,
  company_id integer,
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