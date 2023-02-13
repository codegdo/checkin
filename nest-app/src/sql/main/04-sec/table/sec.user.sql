-- USER
CREATE TABLE main_sec.user(
  id integer generated always as identity not null,
  username varchar(45) unique,
  password varchar(85),
  passcode numeric(4),

  contact_id integer,
  group_id integer,
  role_id integer,
  account_id integer,
  
  is_new_password boolean default false,
  is_active boolean default false,

  created_at timestamp default current_timestamp,
  updated_at timestamp,
  created_by varchar(45) default current_user,
  updated_by varchar(45),
  --
  primary key(id),
  foreign key(group_id) references main_sec.group(id),
  foreign key(contact_id) references main_org.contact(id)
);


-- Roles help you manage permissions
-- Groups help you manage objects and subjects