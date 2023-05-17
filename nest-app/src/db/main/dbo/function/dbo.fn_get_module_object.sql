CREATE FUNCTION main_dbo.fn_get_module_object(p_access_level VARCHAR)
RETURNS TABLE (
  module VARCHAR,
  module_group VARCHAR,
  view VARCHAR,
  view_group VARCHAR,
  object VARCHAR
) AS $$
DECLARE
  access_level VARCHAR = p_access_level;
BEGIN
  RETURN QUERY
  SELECT
    m.name,
    m2.name,
    v.name,
    v2.name,
    o.name
  FROM
    main_dbo.module m
    INNER JOIN main_dbo.module m2 ON m2.id = m.parent_id
    JOIN main_dbo.module_view mv ON m.id = mv.module_id
    JOIN main_dbo.view v ON mv.view_id = v.id
    INNER JOIN main_dbo.view v2 ON v2.id = v.parent_id
    JOIN main_dbo.view_object vo ON v.id = vo.view_id
    JOIN main_dbo.object o ON vo.object_id = o.id
  WHERE (
    CASE
      WHEN access_level = 'internal'
        THEN m.is_internal
          AND m.is_active
          AND v.is_internal
          AND v.is_active
          AND o.is_active
      WHEN access_level = 'external'
        THEN m.is_external
          AND m.is_active
          AND v.is_external
          AND v.is_active
          AND o.is_active
      WHEN access_level = 'system'
        THEN m.is_active 
          AND v.is_active
          AND o.is_active
      ELSE
        m.is_active IS NULL
    END
  );
END;
$$ LANGUAGE plpgsql;

SELECT * FROM main_dbo.fn_get_module_object('external');
