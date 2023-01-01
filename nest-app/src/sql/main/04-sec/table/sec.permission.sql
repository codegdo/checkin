-- PERMISSION
CREATE TABLE sec.permission(
  id integer generated always as identity not null,
  name varchar(85) unique,
 
  view_id integer,
  is_active boolean,

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key(id),
  foreign key (view_id) references dbo.view(id) on delete set null 
);