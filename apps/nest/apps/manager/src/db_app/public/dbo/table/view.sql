CREATE TABLE IF NOT EXISTS view (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parent_id INT,

  is_internal BOOLEAN DEFAULT TRUE,
  is_external BOOLEAN DEFAULT FALSE,
  is_nested BOOLEAN DEFAULT FALSE,
  
  is_active BOOLEAN,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,
  
  FOREIGN KEY (parent_id) REFERENCES view(id) ON DELETE SET NULL
);

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM view) = 0 THEN
    
    INSERT INTO view(id, name, parent_id, is_external, is_internal,is_nested, is_active) VALUES

    (1,'sys_admin',null,null,null,null,'1'),
    (2,'users',1,'0','0','1','1'),
    (3,'clients',1,'0','0','1','1'),
    (4,'migrations',1,'0','0','1','1'),

    (100,'app_account',null,null,null,null,'1'),
    (101,'profile',100,'0','0','0','1'),

    (110,'app_iam',null,null,null,null,'1'),
    (111,'users',110,'0','1','1','1');

  ELSE
    RAISE NOTICE 'The view table is not empty.';
  END IF;
END;
$$;