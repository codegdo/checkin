-- CREATE TABLE FIELD
CREATE TABLE IF NOT EXISTS dbo.field (
  id SERIAL,
  name VARCHAR(255),
  role VARCHAR(15) CHECK(type in ('field')),
  type VARCHAR(15) CHECK(type in ('text', 'radio', 'checkbox', 'textarea', 'select')),

  value VARCHAR(255),

  data JSONB,

  mapto VARCHAR(95),
  lookup VARCHAR(95),

  is_required BOOLEAN DEFAULT FALSE,
  
  object_id INT,
  org_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(object_id) REFERENCES dbo.object(id) ON DELETE SET NULL 
);