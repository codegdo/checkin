-- CREATE TABLE FIELD
CREATE TABLE IF NOT EXISTS dbo.field (
  id SERIAL,
  name VARCHAR(255),
  description VARCHAR(255),
  role VARCHAR(15) CHECK(type in ('field')),
  type VARCHAR(15) CHECK(type in ('text', 'textarea', 'select')),

  data JSONB

  is_required BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);