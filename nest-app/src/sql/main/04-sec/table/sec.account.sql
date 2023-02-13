-- ACCOUNT
CREATE TABLE main_sec.account(
  id integer generated always as identity not null,
  name varchar(85),

  street_address varchar(95),
  city varchar(95),
  territory_id int,
  postal_code varchar(15),

  phone_number varchar(20),
  website varchar(85),

  owner_id integer,
  business_type_id integer,

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