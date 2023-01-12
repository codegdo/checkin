-- VIEW_ACTION
CREATE TABLE "main.dbo".view_action (
  id integer generated always as identity not null,
  name varchar(45) not null,
  action_group varchar(45) not null constraint action_group_check check (action_group in ('list','read','write')),
  view_id integer,

  is_active boolean default true,

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key (id),
  foreign key (view_id) references "main.dbo".view(id) on delete set null
);

INSERT INTO "main.dbo".view_action(name,action_group, view_id) VALUES
('users:getAllUser','list',50),
('users:getUser','read',50),
('users:createUser','write',50),
('users:updateUser','write',50),
('users:deleteUser','write',50);

select * from "main.dbo".view_action;