CREATE TABLE IF NOT EXISTS module (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parent_id INT,
  sort_order INT,

  is_internal BOOLEAN DEFAULT TRUE,
  is_external BOOLEAN DEFAULT FALSE,
  is_subscription BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,

  FOREIGN KEY (parent_id) REFERENCES module(id) ON DELETE SET NULL ON UPDATE CASCADE
);

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM module) = 0 THEN

    INSERT INTO module(id, name, sort_order, parent_id, is_external, is_internal, is_subscription, is_active) VALUES

    (1,'sys',1,null,null,null,null,'1'),
    (2,'admin',2,1,'0','0','0','1'),

    (20,'app',5,null,null,null,null,'1'),
    (21,'account',6,20,'0','1','0','1'),
    (22,'iam',7,20,'0','1','0','1');
    
  ELSE
    RAISE NOTICE 'The module table is not empty.';
  END IF;
END;
$$;