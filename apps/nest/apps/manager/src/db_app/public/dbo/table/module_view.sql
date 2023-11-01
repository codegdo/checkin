CREATE TABLE IF NOT EXISTS module_view (
  module_id INT NOT NULL,
  view_id INT NOT NULL,
  company_id INT,

  PRIMARY KEY (module_id, view_id),
  FOREIGN KEY (module_id) REFERENCES module(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (view_id) REFERENCES view(id) ON DELETE SET NULL ON UPDATE CASCADE
);

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM module_view) = 0 THEN
    
    INSERT INTO module_view(module_id, view_id, company_id) VALUES

    (2,2,null),

    (3,51,null),
    (3,52,null),

    (4,101,null),
    (4,102,null),

    (5,151,null),
    (5,152,null),
    (5,153,null),
    (5,154,null),
    (5,155,null),

    (6,201,null),
    (6,202,null),
    (6,203,null),
    (6,204,null),
    (6,205,null),

    (201,951,null),

    (21,1001,null),
    (21,1002,null),
    (21,1003,null),
    (21,1004,null),
    (21,1005,null),

    (22,1051,null),
    (22,1052,null),

    (23,1101,null),
    (23,1102,null),

    (24,1151,null),
    (24,1152,null),

    (202,1951,null),
    (202,1952,null),
    (202,1953,null),
    (202,1954,null),
    (202,1955,null),

    (41,2001,null),
    (41,2002,null),

    (42,2051,null),
    (42,2052,null),

    (43,2101,null),
    (43,2102,null),
    (43,2103,null),

    (44,2151,null),
    (44,2152,null),
    (44,2153,null),
    (44,2154,null),

    (203,2951,null),
    (203,2952,null),
    (203,2953,null),
    (203,2954,null),
    (203,2955,null),

    (61,3001,null),
    (61,3002,null),

    (62,3051,null),
    (62,3052,null),
    (62,3053,null),

    (63,3101,null),
    (63,3102,null),

    (64,3151,null),
    (64,3152,null),

    (65,3201,null),
    (65,3202,null),
    (65,3203,null),

    (204,3950,null),
    (204,3951,null),
    (204,3952,null);

  ELSE
    RAISE NOTICE 'The module_view table is not empty.';
  END IF;
END;
$$;