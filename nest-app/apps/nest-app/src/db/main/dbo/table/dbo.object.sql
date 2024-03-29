CREATE TABLE main_dbo.object (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,

  is_external BOOLEAN DEFAULT FALSE,
  is_internal BOOLEAN DEFAULT TRUE,
  is_custom BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);

INSERT INTO main_dbo.object(id, name, is_external, is_internal, is_custom, is_active) VALUES
(1,'account','1','1','0','1'),
(2,'company','1','1','0','1'),
(3,'contact','1','1','0','1'),
(4,'user','1','1','0','1'),
(5,'group','1','1','0','1'),
(6,'role','1','1','0','1'),
(7,'policy','1','1','0','1'),
(8,'permission','1','1','0','1'),

(9,'customer','1','1','0','1'),
(10,'customer_group','1','1','0','1');


--id INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL,
--OVERRIDING SYSTEM VALUE