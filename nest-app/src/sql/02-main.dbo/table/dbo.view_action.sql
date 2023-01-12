-- VIEW_ACTION
CREATE TABLE "main.dbo".view_action (
  id integer not null,
  name varchar(45) not null,
  view_id integer,

  is_active boolean,

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key (id),
  foreign key (view_id) references "main.dbo".view(id) on delete set null 
);

INSERT INTO "main.dbo".view_object(name, view_id) VALUES
('user:getAllUser',1),
('user:getUser',1),
('user:createUser',1),
('user:updateUser',1),
('user:deleteUser',1);