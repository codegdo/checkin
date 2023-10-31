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

    (1,1,null),

    (2,50,null),
    (2,51,null),

    (3,100,null),
    (3,101,null),

    (4,150,null),
    (4,151,null),
    (4,152,null),
    (4,153,null),
    (4,154,null),

    (5,200,null),
    (5,201,null),
    (5,202,null),
    (5,203,null),
    (5,204,null),

    (19,950,null),

    (20,1000,null),
    (20,1001,null),
    (20,1003,null),
    (20,1004,null),

    (21,1050,null),
    (21,1051,null),

    (22,1100,null),
    (22,1101,null),

    (23,1150,null),
    (23,1151,null),

    (39,1950,null),
    (39,1951,null),
    (39,1952,null),
    (39,1953,null),
    (39,1954,null),

    (40,2000,null),
    (40,2001,null),

    (41,2050,null),
    (41,2051,null),

    (42,2100,null),
    (42,2101,null),
    (42,2102,null),

    (43,2150,null),
    (43,2151,null),
    (43,2152,null),
    (43,2153,null),

    (59,2950,null),
    (59,2951,null),
    (59,2952,null),
    (59,2953,null),
    (59,2954,null),

    (50,3000,null),
    (50,3001,null),

    (51,3050,null),
    (51,3051,null),
    (51,3052,null),

    (52,3100,null),
    (52,3101,null),

    (53,3150,null),
    (53,3151,null),

    (54,3200,null),
    (54,3201,null),
    (54,3202,null),

    (69,3250,null),
    (69,3251,null),
    (69,3252,null);

  ELSE
    RAISE NOTICE 'The module_view table is not empty.';
  END IF;
END;
$$;