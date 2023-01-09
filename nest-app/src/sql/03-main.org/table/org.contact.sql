-- CONTACT
CREATE TABLE "main.org".contact(
  id integer generated always as identity not null,
  first_name varchar(45),
  last_name varchar(45),
  email_address varchar(45),
  phone_number varchar(20),

  street_address varchar(95),
  city varchar(95),
  postal_code varchar(15),
  territory_id int,

  is_active boolean,

  created_at timestamp default current_timestamp,
  updated_at timestamp,
  created_by varchar(45) default current_user,
  updated_by varchar(45),
  --
  primary key(id),
  foreign key(territory_id) references gen.territory(id)
);
