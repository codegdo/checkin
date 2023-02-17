-- CONTACT
CREATE TABLE main_org.contact (
  id serial PRIMARY KEY,
  first_name varchar(50),
  last_name varchar(50),
  email_address varchar(50),
  phone_number varchar(20),
  street_address varchar(100),
  city varchar(100),
  postal_code varchar(15),
  territory_id int,
  is_active boolean,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT NULL,
  created_by varchar(50) DEFAULT CURRENT_USER,
  updated_by varchar(50),

  FOREIGN KEY (territory_id) REFERENCES main_pub.territory(id)
);

CREATE TABLE main_org.contact(
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
  foreign key(territory_id) references main_pub.territory(id)
);
