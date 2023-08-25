CREATE TABLE main_dbo.object (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,

  is_internal BOOLEAN DEFAULT TRUE,
  is_external BOOLEAN DEFAULT FALSE,
  
  is_extendable BOOLEAN DEFAULT FALSE,
  is_editable BOOLEAN DEFAULT FALSE,
  is_auditable BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);

INSERT INTO main_dbo.object(name, is_internal, is_external, is_extendable, is_editable, is_auditable, is_active) VALUES
('user','1','1','0','0','0','1'),
('company','1','1','0','0','0','1'),
('contact','1','1','0','0','0','1'),
('account','1','1','0','0','0','1'),
('workspace','1','1','0','0','0','1'),

('group','1','1','0','0','0','1'),
('role','1','1','0','0','0','1'),
('policy','1','1','0','0','0','1'),
('permission','1','1','0','0','0','1'),

('customer','1','1','0','0','0','1'),
('customer_group','1','1','0','0','0','1');


--id INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL,
--OVERRIDING SYSTEM VALUE