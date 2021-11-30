-- CREATE TABLE PAGE
CREATE TABLE IF NOT EXISTS dbo.field (
  id SERIAL,
  name CHARACTER VARYING(255),
  description CHARACTER VARYING(255),
  role CHARACTER VARYING(15) CHECK(type in ('field')),
  type CHARACTER VARYING(15) CHECK(type in ('text', 'textarea', 'select')),

  data JSONB

  is_required BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by CHARACTER VARYING(45) DEFAULT CURRENT_USER,
  updated_by CHARACTER VARYING(45),
  --
  PRIMARY KEY(id)
);