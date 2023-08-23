-- Create the 'field' table
CREATE TABLE main_com.field (
  id SERIAL PRIMARY KEY,

  name VARCHAR(50) NOT NULL,

  type VARCHAR(20) NOT NULL,
  data_type VARCHAR(20) NOT NULL,
  
  data JSON,
  value VARCHAR(100),

  length INT,

  mapping VARCHAR(100),
  lookup VARCHAR(100),

  parent_id INT,
  object_id INT,
  company_id INT,

  default_translation JSON,
  default_options JSON DEFAULT '{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}',
  
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
('companyName','text','field',100,'main_sec.company.name','null','{"es":{"companyName":{"title":"Nombre"}},"vn":{"companyName":{"title":"Tên"}}}',null,1,null),
('companyDescription','text','field',255,'main_sec.company.description','null','{"es":{"companyDescription":{"title":"Descripción"}},"vn":{"companyDescription":{"title":"Mô tả"}}}',null,1,null),
('companyLogoUrl','text','field',255,'main_sec.company.logo_url','null','{"es":{"companyLogoUrl":{"title":"URL del logo"}},"vn":{"companyLogoUrl":{"title":"Đường dẫn Logo"}}}',null,1,null),
('companyBillingAddress','component','group',0,'null','null','{"es":{"companyBillingAddress":{"title":"Dirección de facturación"}},"vn":{"companyBillingAddress":{"title":"Địa chỉ thanh toán"}}}',null,1,null),
('companyBillingStreetAddress','text','field',255,'main_sec.company.billing_address_id:main_sec.address.street_address','null','{"es":{"companyBillingStreetAddress":{"title":"Dirección de la calle"}},"vn":{"companyBillingStreetAddress":{"title":"Địa chỉ đường"}}}',4,1,null),
('companyBillingCountry','select','field',50,'main_sec.company.billing_address_id:main_sec.address.territory_id','checkin.main_dbo.territory.country.country_code','{"es":{"companyBillingCountry":{"title":"País"}},"vn":{"companyBillingCountry":{"title":"Quốc gia"}}}',4,1,null),
('companyBillingState','select','field',50,'main_sec.company.billing_address_id:main_sec.address.territory_id','checkin.main_dbo.territory.state.state_code','{"es":{"companyBillingState":{"title":"Estado"}},"vn":{"companyBillingState":{"title":"Tiểu bang"}}}',4,1,null),
('companyBillingCity','text','field',50,'main_sec.company.billing_address_id:main_sec.address.city','null','{"es":{"companyBillingCity":{"title":"Ciudad"}},"vn":{"companyBillingCity":{"title":"Thành phố"}}}',4,1,null),
('companyBillingPostalCode','text','field',10,'main_sec.company.billing_address_id:main_sec.address.postal_code','null','{"es":{"companyBillingPostalCode":{"title":"Código Posta"}},"vn":{"companyBillingPostalCode":{"title":"Mã bưu chính"}}}',4,1,null),
('companyShippingAddress','component','group',0,'null','null','{"es":{"companyShippingAddress":{"title":"Dirección de envío"}},"vn":{"companyShippingAddress":{"title":"Địa chỉ nhận hàng"}}}',null,1,null),
('companyShippingStreetAddress','text','field',255,'main_sec.company.shipping_address_id:main_sec.address.street_address','null','{"es":{"companyShippingStreetAddress":{"title":"Dirección de la calle"}},"vn":{"companyShippingStreetAddress":{"title":"Địa chỉ đường"}}}',10,1,null),
('companyShippingCountry','select','field',3,'main_sec.company.shipping_address_id:main_dbo.territory.country.country_code','checkin.main_dbo.territory.country.country_code','{"es":{"companyShippingCountry":{"title":"País"}},"vn":{"companyShippingCountry":{"title":"Quốc gia"}}}',10,1,null),
('companyShippingState','select','field',2,'main_sec.company.shipping_address_id:main_dbo.territory.state.state_code','checkin.main_dbo.territory.state.state_code','{"es":{"companyShippingState":{"title":"Estado"}},"vn":{"companyShippingState":{"title":"Tiểu bang"}}}',10,1,null),
('companyShippingCity','text','field',50,'main_sec.company.shipping_address_id:main_sec.address.city','null','{"es":{"companyShippingCity":{"title":"Ciudad"}},"vn":{"companyShippingCity":{"title":"Thành phố"}}}',10,1,null),
('companyShippingPostalCode','text','field',10,'main_sec.company.shipping_address_id:main_sec.address.postal_code','null','{"es":{"companyShippingPostalCode":{"title":"Código Posta"}},"vn":{"companyShippingPostalCode":{"title":"Código Posta"}}}',10,1,null),
('companyPhone','text','field',20,'main_sec.company.phone','null','{"es":{"companyPhone":{"title":"Teléfono"}},"vn":{"companyPhone":{"title":"Số điện thoại"}}}',10,1,null),
('companyWebsite','text','field',100,'main_sec.company.website','null','{"es":{"companyWebsite":{"title":"Sitio web"}},"vn":{"companyWebsite":{"title":"Trang web"}}}',null,1,null),
('companyEmployeesCount','number','field',5,'main_sec.company.employees_count','null','{"es":{"companyEmployeesCount":{"title":"Cantidad de empleados"}},"vn":{"companyEmployeesCount":{"title":"Số lượng nhân viên"}}}',null,1,null),
('companyLocationsCount','number','field',5,'main_sec.company.locations_count','null','{"es":{"companyLocationsCount":{"title":"Cantidad de ubicaciones"}},"vn":{"companyLocationsCount":{"title":"Số địa điểm"}}}',null,1,null),
('companyBusinessType','select','field',100,'main_sec.company.business_type_id','checkin.main_dbo.business_type.category.id','{"es":{"companyBusinessType":{"title":"Tipo de negocio"}},"vn":{"companyBusinessType":{"title":"Phân loại doanh nghiệp"}}}',null,1,null),

('userUsername','text','field',30,'main_sec.user.username','null','{"es":{"userUsername":{"title":"Nombre de usuario"}},"vn":{"userUsername":{"title":"Tên đăng nhập"}}}',null,2,null),
('userPassword','password','field',100,'main_sec.user.password','null','{"es":{"userPassword":{"title":"Contraseña"}},"vn":{"userPassword":{"title":"Mật khẩu"}}}',null,2,null),
('userPasscode','number','field',4,'main_sec.user.passcode','null','{"es":{"userPasscode":{"title":"Código de acceso"}},"vn":{"userPasscode":{"title":"Mã truy cập"}}}',null,2,null),
('userGroup','select','field',50,'main_sec.user.group_id','checkin.main_sec.group_type.name.id','{"es":{"userGroup":{"title":"Grupo"}},"vn":{"userGroup":{"title":"Nhóm"}}}',null,2,null),
('userRole','select','field',50,'main_sec.user.group_id','checkin.main_sec.group.name.id','{"es":{"userRole":{"title":"Rol"}},"vn":{"userRole":{"title":"Vai trò"}}}',null,2,null),

('contactFullName','component','group',0,'null','null','{"es":{"contactFullName":{"title":"Nombre completo"}},"vn":{"contactFullName":{"title":"Họ và tên"}}}',null,3,null),
('contactFirstName','text','field',50,'main_sec.contact.first_name','null','{"es":{"contactFirstName":{"title":"Primer nombre"}},"vn":{"contactFirstName":{"title":"Tên"}}}',26,3,null),
('contactLastName','text','field',50,'main_sec.contact.last_name','null','{"es":{"contactLastName":{"title":"Apellido paterno"}},"vn":{"contactLastName":{"title":"Họ"}}}',26,3,null),
('contactEmail','email','field',100,'main_sec.contact.email','null','{"es":{"contactEmail":{"title":"Email"}},"vn":{"contactEmail":{"title":"Email"}}}',null,3,null),
('contactPhone','text','field',20,'main_sec.contact.phone','null','{"es":{"contactPhone":{"title":"Teléfono"}},"vn":{"contactPhone":{"title":"Số điện thoại"}}}',null,3,null),
('contactStreetAddress','text','field',255,'main_sec.contact.address_id:main_sec.address.street_address','null','{"es":{"contactStreetAddress":{"title":"Dirección de la calle"}},"vn":{"contactStreetAddress":{"title":"Địa chỉ đường"}}}',null,3,null),
('contactCountry','select','field',50,'main_sec.contact.address_id:main_dbo.territory.country.country_code','checkin.main_dbo.territory.country.country_code','{"es":{"contactCountry":{"title":"País"}},"vn":{"contactCountry":{"title":"Quốc gia"}}}',null,3,null),
('contactState','select','field',50,'main_sec.contact.address_id:main_dbo.territory.state.state_code','checkin.main_dbo.territory.state.state_code','{"es":{"contactState":{"title":"Estado"}},"vn":{"contactState":{"title":"Tiểu bang"}}}',null,3,null),
('contactCity','text','field',50,'main_sec.contact.address_id:main_sec.address.city','null','{"es":{"contactCity":{"title":"Ciudad"}},"vn":{"contactCity":{"title":"Thành phố"}}}',null,3,null),
('contactPostalCode','text','field',10,'main_sec.contact.address_id:main_sec.address.postal_code','null','{"es":{"contactPostalCode":{"title":"Código Posta"}},"vn":{"contactPostalCode":{"title":"Mã bưu chính"}}}',null,3,null),

('accountAccountId','text','field',10,'main_sec.account.account_id','null','{"es":{"accountAccountId":{"title":"ID de cuenta"}},"vn":{"accountAccountId":{"title":"Mã tài khoản"}}}',null,4,null);