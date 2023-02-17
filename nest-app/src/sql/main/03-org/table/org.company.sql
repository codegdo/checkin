-- COMPANY
CREATE TABLE main_org.company(
  id serial PRIMARY KEY,
  name varchar(100),
  street_address varchar(200),
  city varchar(50),
  territory_id INT,
  postal_code varchar(20),
  phone_number varchar(20),
  website varchar(100),
  business_type_id int,
  is_active boolean DEFAULT FALSE,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT CURRENT_USER,
  updated_by varchar(50),

  FOREIGN KEY (group_id) REFERENCES main_sec.group(id),
  FOREIGN KEY (contact_id) REFERENCES main_org.contact(id)
);
