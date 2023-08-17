-- Create the 'field' table
CREATE TABLE main_com.field (
  id SERIAL PRIMARY KEY,

  name VARCHAR(50) NOT NULL,

  type VARCHAR(20) NOT NULL,
  data_type VARCHAR(20) NOT NULL,
  
  value VARCHAR(100),
  data_value JSON,

  length INT,

  mapping VARCHAR(100),
  lookup VARCHAR(100),

  parent_id INT,
  object_id INT,
  company_id INT,

  default_translation JSON,
  
  has_dependent BOOLEAN NOT NULL DEFAULT FALSE,
  is_dependent BOOLEAN NOT NULL DEFAULT FALSE,

  is_key BOOLEAN NOT NULL DEFAULT FALSE,
  is_new BOOLEAN NOT NULL DEFAULT TRUE,
  is_renew BOOLEAN NOT NULL DEFAULT TRUE,
  is_internal BOOLEAN NOT NULL DEFAULT FALSE,
  is_unique BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  CONSTRAINT field_name_unique UNIQUE (name),
  CHECK (type IN ('text', 'password', 'number', 'date', 'email', 'tel', 'radio', 'checkbox', 'select', 'component')),
  CHECK (data_type IN ('field', 'group', 'grid')),
  FOREIGN KEY (object_id) REFERENCES main_dbo.object(id)
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER field_update_trigger
BEFORE UPDATE ON main_com.field
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();

INSERT INTO main_com.field (name, type, data_type, length, mapping, lookup, default_translation, parent_id, object_id, company_id) VALUES
('companyName','text','field',100,'main_sec.company.name','null','{"es":{"companyName":""}}',null,1,null),
('companyDescription','text','field',255,'main_sec.company.description','null','{"es":{"companyName":""}}',null,1,null),
('companyLogoUrl','text','field',255,'main_sec.company.logo_url','null','{"es":{"companyName":""}}',null,1,null),
('companyBillingAddress','component','group',0,'null','null','{"es":{"companyName":""}}',null,1,null),
('companyBillingStreetAddress','text','field',255,'main_sec.company.billing_address_id','main_sec.address.street_address','{"es":{"companyName":""}}',4,1,null),
('companyBillingCountry','select','field',50,'main_sec.company.billing_address_id','main_sec.address.territory_id:main_dbo.territory.country.country_code','{"es":{"companyName":""}}',4,1,null),
('companyBillingState','select','field',50,'main_sec.company.billing_address_id','main_sec.address.territory_id:main_dbo.territory.state.state_code','{"es":{"companyName":""}}',4,1,null),
('companyBillingCity','text','field',50,'main_sec.company.billing_address_id','main_sec.address.city','{"es":{"companyName":""}}',4,1,null),
('companyBillingPostalCode','text','field',10,'main_sec.company.billing_address_id','main_sec.address.postal_code','{"es":{"companyName":""}}',4,1,null),
('companyShippingAddress','component','group',0,'null','null','{"es":{"companyName":""}}',null,1,null),
('companyShippingStreetAddress','text','field',255,'main_sec.company.shipping_address_id','main_sec.address.street_address','{"es":{"companyName":""}}',10,1,null),
('companyShippingCountry','select','field',3,'main_sec.company.shipping_address_id','main_sec.address.territory_id:main_dbo.territory.country.country_code','{"es":{"companyName":""}}',10,1,null),
('companyShippingState','select','field',2,'main_sec.company.shipping_address_id','main_sec.address.territory_id:main_dbo.territory.state.state_code','{"es":{"companyName":""}}',10,1,null),
('companyShippingCity','text','field',50,'main_sec.company.shipping_address_id','main_sec.address.city','{"es":{"companyName":""}}',10,1,null),
('companyShippingPostalCode','text','field',10,'main_sec.company.shipping_address_id','main_sec.address.postal_code','{"es":{"companyName":""}}',10,1,null),
('companyPhone','text','field',20,'main_sec.company.phone','null','{"es":{"companyName":""}}',10,1,null),
('companyWebsite','text','field',100,'main_sec.company.website','null','{"es":{"companyName":""}}',null,1,null),
('companyEmployeesCount','number','field',5,'main_sec.company.employees_count','null','{"es":{"companyName":""}}',null,1,null),
('companyLocationsCount','number','field',5,'main_sec.company.locations_count','null','{"es":{"companyName":""}}',null,1,null),
('companyBusinessType','text','field',100,'main_sec.company.business_type_id','main_dbo.business_type.category','{"es":{"companyName":""}}',null,1,null),

('userUsername','text','field',30,'main_sec.user.username','null','{"es":{"companyName":""}}',null,2,null),
('userPassword','password','field',100,'main_sec.user.password','null','{"es":{"companyName":""}}',null,2,null),
('userPasscode','number','field',4,'main_sec.user.passcode','null','{"es":{"companyName":""}}',null,2,null),
('userGroup','select','field',50,'main_sec.user.group_id','main_sec.group.group_type_id:main_sec.group_type.name.id','{"es":{"companyName":""}}',null,2,null),
('userRole','select','field',50,'main_sec.user.group_id','main_sec.group.name.id','{"es":{"companyName":""}}',null,2,null),

('contactName','component','group',0,'null','null','{"es":{"companyName":""}}',null,3,null),
('contactFirstName','text','field',50,'main_sec.contact.first_name','null','{"es":{"companyName":""}}',null,3,null),
('contactLastName','text','field',50,'main_sec.contact.last_name','null','{"es":{"companyName":""}}',null,3,null),
('contactEmail','email','field',100,'main_sec.contact.email','null','{"es":{"companyName":""}}',null,3,null),
('contactPhone','text','field',20,'main_sec.contact.phone','null','{"es":{"companyName":""}}',null,3,null),
('contactStreetAddress','text','field',255,'main_sec.contact.address_id','main_sec.address.street_address','{"es":{"companyName":""}}',null,3,null),
('contactCountry','select','field',50,'main_sec.contact.address_id','main_sec.address.territory_id:main_dbo.territory.country.country_code','{"es":{"companyName":""}}',null,3,null),
('contactState','select','field',50,'main_sec.contact.address_id','main_sec.address.territory_id:main_dbo.territory.state.state_code','{"es":{"companyName":""}}',null,3,null),
('contactCity','text','field',50,'main_sec.contact.address_id','main_sec.address.city','{"es":{"companyName":""}}',null,3,null),
('contactPostalCode','text','field',10,'main_sec.contact.address_id','main_sec.address.postal_code','{"es":{"companyName":""}}',null,3,null),

('accountAccountId','text','field',10,'main_sec.account.account_id','null','{"es":{"companyName":""}}',null,4,null);