-- USER
CREATE TABLE sec.user(
  id integer generated always as identity not null,
  username varchar(45) unique,
  password varchar(85),
  passcode numeric(4),

  group_id integer,
  role_id integer,
  contact_id integer,
  company_id integer,
  
  is_new_password boolean default false,
  is_active boolean default false,

  created_at timestamp default current_timestamp,
  updated_at timestamp,
  created_by varchar(45) default current_user,
  updated_by varchar(45),
  --
  primary key(id),
  foreign key(group_id) references sec.group(id),
  foreign key(contact_id) references org.contact(id)
);