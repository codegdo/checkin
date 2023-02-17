-- VIEW_ACTION
CREATE TABLE main_dbo.view_action (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  action_group varchar(20) NOT NULL CHECK (action_group IN ('list', 'read', 'write')),
  view_id int,

  is_active boolean DEFAULT TRUE NOT NULL,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_by varchar(50) DEFAULT CURRENT_USER NOT NULL,
  --
  FOREIGN KEY (view_id) REFERENCES main_dbo.view(id) ON DELETE SET NULL
);

CREATE TABLE main_dbo.view_action (
  id integer generated always as identity not null,
  name varchar(45) not null,
  action_group varchar(45) not null constraint action_group_check check (action_group in ('list','read','write')),
  view_id integer,

  is_active boolean default true,

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key (id),
  foreign key (view_id) references main_dbo.view(id) on delete set null
);

INSERT INTO main_dbo.view_action(name,action_group, view_id) VALUES
('users:getAllUser','list',50),
('users:getUser','read',50),
('users:createUser','write',50),
('users:updateUser','write',50),
('users:deleteUser','write',50);
