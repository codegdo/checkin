-- Create the 'main_com.form_field' table
CREATE TABLE main_com.form_field (
  form_id INT NOT NULL,
  field_id INT NOT NULL,

  title VARCHAR(255),
  description VARCHAR(255),

  default_value VARCHAR(255),

  accessibility JSON,
  validation JSON,
  translation JSON,
  options JSON,

  position INT,
  map_to_parent VARCHAR(10),

  is_required BOOLEAN DEFAULT FALSE,
  is_disabled BOOLEAN DEFAULT FALSE,
  is_hidden BOOLEAN DEFAULT FALSE,
  is_readonly BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  PRIMARY KEY(form_id, field_id),
  FOREIGN KEY(form_id) REFERENCES main_com.form(id),
  FOREIGN KEY(field_id) REFERENCES main_com.field(id)
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER form_field_update_trigger
BEFORE UPDATE ON main_com.form_field
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();

-- Insert data into the 'form_field' table
INSERT INTO main_com.form_field (form_id, field_id, title, translation, options, is_required) VALUES
(1,27,'Full Name','{"es":{"contactFullName":{"title":"Nombre completo"}},"vn":{"contactFullName":{"title":"Họ và tên"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,28,'First Name','{"es":{"contactFirstName":{"title":"Primer nombre"}},"vn":{"contactFirstName":{"title":"Tên"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,29,'Last Name','{"es":{"contactLastName":{"title":"Apellido paterno"}},"vn":{"contactLastName":{"title":"Họ"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,30,'Email','{"es":{"contactEmail":{"title":"Email"}},"vn":{"contactEmail":{"title":"Email"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,1,'Username','{"es":{"userUsername":{"title":"Nombre de usuario"}},"vn":{"userUsername":{"title":"Tên đăng nhập"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,2,'Password','{"es":{"userPassword":{"title":"Contraseña"}},"vn":{"userPassword":{"title":"Mật khẩu"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,6,'Company Name','{"es":{"companyName":{"title":"Nombre"}},"vn":{"companyName":{"title":"Tên"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,26,'Business Type','{"es":{"companyBusinessType":{"title":"Tipo de negocio"}},"vn":{"companyBusinessType":{"title":"Phân loại doanh nghiệp"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,39,'Location Name','{"es":{"companyBusinessType":{"title":"Nombre de la ubicación"}},"vn":{"companyBusinessType":{"title":"Tên địa điểm"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,41,'Location Address','{"es":{"companyBusinessType":{"title":"Dirección de la ubicación"}},"vn":{"companyBusinessType":{"title":"Địa chỉ địa điểm"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,42,'Street Address','{"es":{"companyBusinessType":{"title":"Dirección de la calle"}},"vn":{"companyBusinessType":{"title":"Địa chỉ đường"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,43,'Country','{"es":{"companyBusinessType":{"title":"País"}},"vn":{"companyBusinessType":{"title":"Quốc gia"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,44,'State','{"es":{"companyBusinessType":{"title":"Estado"}},"vn":{"companyBusinessType":{"title":"Tiểu bang"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,45,'City','{"es":{"companyBusinessType":{"title":"Ciudad"}},"vn":{"companyBusinessType":{"title":"Thành phố"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,46,'Potal Code','{"es":{"companyBusinessType":{"title":"Código postal"}},"vn":{"companyBusinessType":{"title":"Mã bưu điện"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1'),
(1,31,'Phone','{"es":{"contactPhone":{"title":"Teléfono"}},"vn":{"contactPhone":{"title":"Số điện thoại"}}}','{"className":null,"min":null,"max":null,"pattern":null,"hint":null,"placeholder":null}','1');