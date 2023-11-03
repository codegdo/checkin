CREATE TABLE IF NOT EXISTS object (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(255),
  sort_order INT,

  is_internal BOOLEAN DEFAULT TRUE,
  is_external BOOLEAN DEFAULT FALSE,
  is_extendable BOOLEAN DEFAULT FALSE,
  is_editable BOOLEAN DEFAULT FALSE,
  is_auditable BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END
);

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM object) = 0 THEN
    
    INSERT INTO object(id, name, slug, sort_order, is_internal, is_external, is_extendable, is_editable, is_auditable, is_active) VALUES

    (2,'metric','metrics',1,'0','0','0','0','0','1'),

    (101,'account','accounts',3,'1','1','0','0','0','1'),
    (102,'company','companies',4,'1','1','0','0','0','1'),
    (103,'subscription','subscriptions',5,'1','1','0','0','0','1'),
    (104,'payment','payments',6,'1','1','0','0','0','1'),
    (105,'invoice','invoices',7,'1','1','0','0','0','1'),

    (151,'migration','migrations',9,'0','0','0','0','0','1'),
    (152,'migration_category','migration-categories',10,'0','0','0','0','0','1'),
    (153,'migration_script','migration-scripts',11,'0','0','0','0','0','1'),
    (154,'migration_rolback','migration-rolbacks',12,'0','0','0','0','0','1'),
    (155,'migration_tag','migration-tags',13,'0','0','0','0','0','1'),
    (156,'migration_metadata','migration-metadata',14,'0','0','0','0','0','1'),

    (951,'config','configs',16,'1','1','0','0','0','1'),

    (1051,'user','users',18,'1','1','0','0','0','1'),
    (1052,'group','groups',19,'1','1','0','0','0','1'),
    (1053,'role','roles',20,'1','1','0','0','0','1'),
    (1054,'policy','policies',21,'1','1','0','0','0','1'),
    (1055,'permission','permissions',22,'1','1','0','0','0','1'),

    (1151,'customer','customers',24,'1','1','0','0','0','1'),
    (1152,'customer_group','customer-groups',25,'1','1','0','0','0','1');

  ELSE
    RAISE NOTICE 'The object table is not empty.';
  END IF;
END;
$$;