-- Create the 'main_com.field' table
CREATE TABLE main_com.field (
  id SERIAL PRIMARY KEY,

  name VARCHAR(50) NOT NULL,

  type VARCHAR(20) NOT NULL,
  data_type VARCHAR(20) NOT NULL,
  
  data JSON,
  data_value JSON,
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
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  CONSTRAINT field_name_unique UNIQUE (name),
  CHECK (type IN ('text', 'textarea', 'password', 'number', 'date', 'email', 'tel', 'radio', 'checkbox', 'select', 'component')),
  CHECK (data_type IN ('field', 'group', 'grid')),
  FOREIGN KEY (object_id) REFERENCES main_dbo.object(id)
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER field_update_trigger
BEFORE UPDATE ON main_com.field
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();

-- Insert data into the 'field' table
INSERT INTO main_com.field (name, type, data_type, length, mapping, lookup, default_translation, parent_id, object_id, company_id, is_key, is_dependent, has_dependent) VALUES
('userUsername','text','field',30,'checkin.main_sec.user.username','null','{"es":{"userUsername":{"title":"Nombre de usuario"}},"vn":{"userUsername":{"title":"Tên đăng nhập"}}}',null,1,null,'0','0','0'),
('userPassword','password','field',100,'checkin.main_sec.user.password','null','{"es":{"userPassword":{"title":"Contraseña"}},"vn":{"userPassword":{"title":"Mật khẩu"}}}',null,1,null,'0','0','0'),
('userPasscode','number','field',4,'checkin.main_sec.user.passcode','null','{"es":{"userPasscode":{"title":"Código de acceso"}},"vn":{"userPasscode":{"title":"Mã truy cập"}}}',null,1,null,'0','0','0'),
('userGroup','select','field',50,'checkin.main_sec.user.group_id','checkin.main_sec.group_type.name.id','{"es":{"userGroup":{"title":"Grupo"}},"vn":{"userGroup":{"title":"Nhóm"}}}',null,1,null,'0','0','0'),
('userRole','select','field',50,'checkin.main_sec.user.group_id','checkin.main_sec.group.name.id','{"es":{"userRole":{"title":"Rol"}},"vn":{"userRole":{"title":"Vai trò"}}}',null,1,null,'0','0','0'),

('companyName','text','field',100,'checkin.main_sec.company.name','null','{"es":{"companyName":{"title":"Nombre"}},"vn":{"companyName":{"title":"Tên"}}}',null,2,null,'0','0','0'),
('companyDescription','textarea','field',255,'checkin.main_sec.company.description','null','{"es":{"companyDescription":{"title":"Descripción"}},"vn":{"companyDescription":{"title":"Mô tả"}}}',null,2,null,'0','0','0'),
('companyLogoUrl','text','field',255,'checkin.main_sec.company.logo_url','null','{"es":{"companyLogoUrl":{"title":"URL del logo"}},"vn":{"companyLogoUrl":{"title":"Đường dẫn Logo"}}}',null,2,null,'0','0','0'),
('companyBillingAddress','component','group',50,'checkin.main_sec.company.billing_address_id','null','{"es":{"companyBillingAddress":{"title":"Dirección de facturación"}},"vn":{"companyBillingAddress":{"title":"Địa chỉ thanh toán"}}}',4,2,null,'1','0','0'),
('companyBillingStreetAddress','text','field',255,'checkin.main_sec.address.street_address','null','{"es":{"companyBillingStreetAddress":{"title":"Dirección de la calle"}},"vn":{"companyBillingStreetAddress":{"title":"Địa chỉ đường"}}}',4,2,null,'0','0','0'),
('companyBillingCountry','select','field',50,'checkin.main_sec.address.territory_id','checkin.main_dbo.territory.country.country_code','{"es":{"companyBillingCountry":{"title":"País"}},"vn":{"companyBillingCountry":{"title":"Quốc gia"}}}',4,2,null,'0','0','1'),
('companyBillingState','select','field',50,'checkin.main_sec.address.territory_id','checkin.main_dbo.territory.state.state_code','{"es":{"companyBillingState":{"title":"Estado"}},"vn":{"companyBillingState":{"title":"Tiểu bang"}}}',4,2,null,'0','1','0'),
('companyBillingCity','text','field',50,'checkin.main_sec.address.city','null','{"es":{"companyBillingCity":{"title":"Ciudad"}},"vn":{"companyBillingCity":{"title":"Thành phố"}}}',4,2,null,'0','0','0'),
('companyBillingPostalCode','text','field',10,'checkin.main_sec.address.postal_code','null','{"es":{"companyBillingPostalCode":{"title":"Código Posta"}},"vn":{"companyBillingPostalCode":{"title":"Mã bưu chính"}}}',4,2,null,'0','0','0'),
('companyShippingAddress','component','group',50,'checkin.main_sec.company.shipping_address_id','null','{"es":{"companyShippingAddress":{"title":"Dirección de envío"}},"vn":{"companyShippingAddress":{"title":"Địa chỉ nhận hàng"}}}',10,2,null,'1','0','0'),
('companyShippingStreetAddress','text','field',255,'checkin.main_sec.address.street_address','null','{"es":{"companyShippingStreetAddress":{"title":"Dirección de la calle"}},"vn":{"companyShippingStreetAddress":{"title":"Địa chỉ đường"}}}',10,2,null,'0','0','0'),
('companyShippingCountry','select','field',3,'checkin.main_sec.address.territory_id','checkin.main_dbo.territory.country.country_code','{"es":{"companyShippingCountry":{"title":"País"}},"vn":{"companyShippingCountry":{"title":"Quốc gia"}}}',10,2,null,'0','0','1'),
('companyShippingState','select','field',2,'checkin.main_sec.address.territory_id','checkin.main_dbo.territory.state.state_code','{"es":{"companyShippingState":{"title":"Estado"}},"vn":{"companyShippingState":{"title":"Tiểu bang"}}}',10,2,null,'0','1','0'),
('companyShippingCity','text','field',50,'checkin.main_sec.address.city','null','{"es":{"companyShippingCity":{"title":"Ciudad"}},"vn":{"companyShippingCity":{"title":"Thành phố"}}}',10,2,null,'0','0','0'),
('companyShippingPostalCode','text','field',10,'checkin.main_sec.address.postal_code','null','{"es":{"companyShippingPostalCode":{"title":"Código Posta"}},"vn":{"companyShippingPostalCode":{"title":"Código Posta"}}}',10,2,null,'0','0','0'),
('companyPhone','text','field',20,'checkin.main_sec.company.phone','null','{"es":{"companyPhone":{"title":"Teléfono"}},"vn":{"companyPhone":{"title":"Số điện thoại"}}}',null,2,null,'0','0','0'),
('companyFax','text','field',20,'checkin.main_sec.company.fax','null','{"es":{"companyFax":{"title":"Fax"}},"vn":{"companyFax":{"title":"Số Fax"}}}',null,2,null,'0','0','0'),
('companyWebsite','text','field',100,'checkin.main_sec.company.website','null','{"es":{"companyWebsite":{"title":"Sitio web"}},"vn":{"companyWebsite":{"title":"Trang web"}}}',null,2,null,'0','0','0'),
('companyEmployeesCount','number','field',5,'checkin.main_sec.company.employees_count','null','{"es":{"companyEmployeesCount":{"title":"Cantidad de empleados"}},"vn":{"companyEmployeesCount":{"title":"Số lượng nhân viên"}}}',null,2,null,'0','0','0'),
('companyLocationsCount','number','field',5,'checkin.main_sec.company.locations_count','null','{"es":{"companyLocationsCount":{"title":"Cantidad de ubicaciones"}},"vn":{"companyLocationsCount":{"title":"Số địa điểm"}}}',null,2,null,'0','0','0'),
('companyBusinessType','select','field',100,'checkin.main_sec.company.business_type_id','checkin.main_dbo.business_type.category.id','{"es":{"companyBusinessType":{"title":"Tipo de negocio"}},"vn":{"companyBusinessType":{"title":"Phân loại doanh nghiệp"}}}',null,2,null,'0','0','0'),

('contactFullName','component','group',50,'null','null','{"es":{"contactFullName":{"title":"Nombre completo"}},"vn":{"contactFullName":{"title":"Họ và tên"}}}',27,3,null,'0','0','0'),
('contactFirstName','text','field',50,'checkin.main_sec.contact.first_name','null','{"es":{"contactFirstName":{"title":"Primer nombre"}},"vn":{"contactFirstName":{"title":"Tên"}}}',27,3,null,'0','0','0'),
('contactLastName','text','field',50,'checkin.main_sec.contact.last_name','null','{"es":{"contactLastName":{"title":"Apellido paterno"}},"vn":{"contactLastName":{"title":"Họ"}}}',27,3,null,'0','0','0'),
('contactEmail','email','field',100,'checkin.main_sec.contact.email','null','{"es":{"contactEmail":{"title":"Email"}},"vn":{"contactEmail":{"title":"Email"}}}',null,3,null,'0','0','0'),
('contactPhone','text','field',20,'checkin.main_sec.contact.phone','null','{"es":{"contactPhone":{"title":"Teléfono"}},"vn":{"contactPhone":{"title":"Số điện thoại"}}}',null,3,null,'0','0','0'),
('contactAddress','component','group',50,'checkin.main_sec.contact.address_id','null','{"es":{"contactAddress":{"title":"Dirección de contacto"}},"vn":{"contactAddress":{"title":"Địa chỉ liên hệ"}}}',null,3,null,'1','0','0'),
('contactStreetAddress','text','field',255,'checkin.main_sec.address.street_address','null','{"es":{"contactStreetAddress":{"title":"Dirección de la calle"}},"vn":{"contactStreetAddress":{"title":"Địa chỉ đường"}}}',null,3,null,'0','0','0'),
('contactCountry','select','field',50,'checkin.main_sec.address.territory_id','checkin.main_dbo.territory.country.country_code','{"es":{"contactCountry":{"title":"País"}},"vn":{"contactCountry":{"title":"Quốc gia"}}}',null,3,null,'0','0','1'),
('contactState','select','field',50,'checkin.main_sec.address.territory_id','checkin.main_dbo.territory.state.state_code','{"es":{"contactState":{"title":"Estado"}},"vn":{"contactState":{"title":"Tiểu bang"}}}',null,3,null,'0','1','0'),
('contactCity','text','field',50,'checkin.main_sec.address.city','null','{"es":{"contactCity":{"title":"Ciudad"}},"vn":{"contactCity":{"title":"Thành phố"}}}',null,3,null,'0','0','0'),
('contactPostalCode','text','field',10,'checkin.main_sec.address.postal_code','null','{"es":{"contactPostalCode":{"title":"Código Posta"}},"vn":{"contactPostalCode":{"title":"Mã bưu chính"}}}',null,3,null,'0','0','0'),

('accountAccountId','text','field',10,'checkin.main_sec.account.account_id','null','{"es":{"accountAccountId":{"title":"ID de cuenta"}},"vn":{"accountAccountId":{"title":"Mã tài khoản"}}}',null,4,null,'0','0','0'),

('workspaceName','text','field',100,'checkin.main_com.workspace.name','null','{"es":{"workspaceName":{"title":"Nombre"}},"vn":{"workspaceName":{"title":"Tên"}}}',null,5,null,'0','0','0'),
('workspaceDescription','textarea','field',255,'checkin.main_com.workspace.description','null','{"es":{"workspaceDescription":{"title":"Descripción"}},"vn":{"workspaceDescription":{"title":"Mô tả"}}}',null,5,null,'0','0','0'),
('workspaceAddress','text','group',50,'checkin.main_com.workspace.address_id','null','{"es":{"workspaceAddress":{"title":"Dirección del Espacio de Trabajo"}},"vn":{"workspaceAddress":{"title":"Địa chỉ nơi làm việc"}}}',41,5,null,'1','0','0'),
('workspaceStreetAddress','text','field',255,'checkin.main_sec.address.street_address','null','{"es":{"workspaceStreetAddress":{"title":"Dirección de la calle"}},"vn":{"workspaceStreetAddress":{"title":"Địa chỉ đường"}}}',41,5,null,'0','0','0'),
('workspaceCountry','select','field',50,'checkin.main_sec.address.territory_id','checkin.main_dbo.territory.country.country_code','{"es":{"workspaceCountry":{"title":"País"}},"vn":{"workspaceCountry":{"title":"Quốc gia"}}}',41,5,null,'0','0','1'),
('workspaceState','select','field',50,'checkin.main_sec.address.territory_id','checkin.main_dbo.territory.state.state_code','{"es":{"workspaceState":{"title":"Estado"}},"vn":{"workspaceState":{"title":"Tiểu bang"}}}',41,5,null,'0','1','0'),
('workspaceCity','text','field',50,'checkin.main_sec.address.city','null','{"es":{"workspaceCity":{"title":"Ciudad"}},"vn":{"workspaceCity":{"title":"Thành phố"}}}',41,5,null,'0','0','0'),
('workspacePostalCode','text','field',10,'checkin.main_sec.address.postal_code','null','{"es":{"workspacePostalCode":{"title":"Código Posta"}},"vn":{"workspacePostalCode":{"title":"Mã bưu chính"}}}',41,5,null,'0','0','0');