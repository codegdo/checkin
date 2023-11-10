CREATE FUNCTION module_fn_get_module_view_object(roleType VARCHAR)
RETURNS TABLE (
  module VARCHAR,
  module_group VARCHAR,
  module_sort_order INT,
  view VARCHAR,
  view_group VARCHAR,
  view_sort_order INT,
  object VARCHAR,
  object_slug VARCHAR,
  object_sort_order INT,
  action VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.name,
    m2.name,
    m.sort_order,
    v.name,
    v2.name,
    mv.sort_order,
    o.name,
    o.slug,
    vo.sort_order,
    p.name
  FROM
    module m
    INNER JOIN module m2 ON m2.id = m.parent_id
    JOIN module_view mv ON m.id = mv.module_id
    JOIN view v ON mv.view_id = v.id
    INNER JOIN view v2 ON v2.id = v.parent_id
    JOIN view_object vo ON v.id = vo.view_id
    JOIN object o ON vo.object_id = o.id
    LEFT JOIN permission p ON p.view_id = v.id
  WHERE (
    CASE
      WHEN roleType = 'internal'
        THEN m.is_internal
          AND m.is_active
          AND v.is_internal
          AND v.is_active
          AND o.is_active
      WHEN roleType = 'external'
        THEN m.is_external
          AND m.is_active
          AND v.is_external
          AND v.is_active
          AND o.is_active
      WHEN roleType = 'system'
        THEN m.is_active
          AND v.is_active
          AND o.is_active
      ELSE
        m.is_active IS NULL
    END
  );
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION module_fn_get_module_view_object(varchar) FROM public;

--SELECT * FROM module_fn_get_module_view_object('system');
