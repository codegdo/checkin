CREATE TABLE IF NOT EXISTS object (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(255),

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
    INSERT INTO object(id, name, slug, is_internal, is_external, is_extendable, is_editable, is_auditable, is_active) VALUES

    (1,'metric','metrics','0','0','0','0','0','1'),

    (150,'migration','migrations','0','0','0','0','0','1'),
    (151,'migration_category','migration-categories','0','0','0','0','0','1'),
    (152,'migration_script','migration-scripts','0','0','0','0','0','1'),
    (153,'migration_rolback','migration-rolbacks','0','0','0','0','0','1'),
    (154,'migration_tag','migration-tags','0','0','0','0','0','1'),
    (155,'migration_metadata','migration-metadata','0','0','0','0','0','1'),

    (200,'account','accounts','1','1','0','0','0','1'),
    (201,'company','companies','1','1','0','0','0','1'),
    (202,'subscription','subscriptions','1','1','0','0','0','1'),
    (203,'payment','payments','1','1','0','0','0','1'),
    (204,'invoice','invoices','1','1','0','0','0','1'),

    (950,'config','configs','1','1','0','0','0','1'),

    (1000,'user','users','1','1','0','0','0','1'),
    (1001,'group','groups','1','1','0','0','0','1'),
    (1002,'role','roles','1','1','0','0','0','1'),
    (1003,'policy','policies','1','1','0','0','0','1'),
    (1004,'permission','permissions','1','1','0','0','0','1'),

    (1150,'customer','customers','1','1','0','0','0','1'),
    (1151,'customer_group','customer-groups','1','1','0','0','0','1');

  ELSE
    RAISE NOTICE 'The object table is not empty.';
  END IF;
END;
$$;