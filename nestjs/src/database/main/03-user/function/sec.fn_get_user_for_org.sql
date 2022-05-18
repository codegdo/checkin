-- CREATE FUNCTION GET_USER_FOR_ORG
CREATE OR REPLACE FUNCTION sec.fn_get_user_for_org(
  p_org_id int,
  p_location_id int,
  p_query json
)
RETURNS TABLE (
  id int,
  username varchar,
  is_active boolean,

  first_name varchar,
  last_name varchar,
  email_address varchar,
  phone_number varchar,

  --location text,

  group_level int,
  group_name varchar,
  group_type varchar,
  is_owner boolean
)
AS
$BODY$
  DECLARE
    _username varchar = p_query ->> 'username';
    _first_name varchar = p_query ->> 'firstName';
    _last_name varchar = p_query ->> 'lastName';
    _email_address varchar = p_query ->> 'emailAddress';
    _phone_number varchar = p_query ->> 'phoneNumber';
    --_location varchar = p_query ->> 'location';
    _group varchar = p_query ->> 'group';
    _type varchar = p_query ->> 'type';

    _sort_column varchar = p_query ->> 'sortColumn';
    _sort_direction varchar = p_query ->> 'sortDirection';
  BEGIN
    RETURN QUERY

    SELECT
      u.id,
      u.username,
      u.is_active,

      c.first_name,
      c.last_name,
      c.email_address,
      c.phone_number,

      --string_agg(l.name, ', ') location_name,

      g.group_level,
      g.name,
      gt.name,
      g.is_owner
    FROM sec.user u
    LEFT JOIN org.contact c ON c.id = u.contact_id
    LEFT JOIN sec.group g ON g.id = u.group_id
    LEFT JOIN dbo.group_type gt ON gt.id = g.group_type_id
    LEFT JOIN sec.user_location ul ON ul.user_id = u.id
    LEFT JOIN org.location l ON l.id = ul.location_id
    WHERE u.org_id = p_org_id AND l.id = p_location_id AND
      CASE WHEN _username IS NULL
        AND _first_name IS NULL
        AND _last_name IS NULL
        AND _email_address IS NULL
        AND _phone_number IS NULL
        --AND _location IS NULL
        AND _group IS NULL
        AND _type IS NULL THEN true
      ELSE u.username LIKE '%' || _username || '%'
        OR c.first_name LIKE '%' || _first_name || '%'
        OR c.last_name LIKE '%' || _last_name || '%'
        OR c.email_address LIKE '%' || _email_address || '%'
        OR c.phone_number LIKE '%' || _phone_number || '%'
        --OR l.name LIKE '%' || _location || '%'
        OR g.name LIKE '%' || _group || '%'
        OR gt.name LIKE '%' || _type || '%'
      END
    --GROUP BY u.id, u.username, c.first_name, c.last_name, c.email_address, c.phone_number, l.name, g.group_level, g.name, gt.name, g.is_owner, u.is_active
    ORDER BY
      CASE WHEN _sort_column = '' AND _sort_direction = '' THEN u.id END DESC,
      CASE WHEN _sort_column = 'id' AND _sort_direction = 'asc' THEN u.id END ASC,
      CASE WHEN _sort_column = 'id' AND _sort_direction = 'desc' THEN u.id END DESC,
      CASE WHEN _sort_column = 'username' AND _sort_direction = 'asc' THEN u.username END ASC,
      CASE WHEN _sort_column = 'username' AND _sort_direction = 'desc' THEN u.username END DESC,
      CASE WHEN _sort_column = 'firstName' AND _sort_direction = 'asc' THEN c.first_name END ASC,
      CASE WHEN _sort_column = 'firstName' AND _sort_direction = 'desc' THEN c.first_name END DESC,
      CASE WHEN _sort_column = 'lastName' AND _sort_direction = 'asc' THEN c.last_name END ASC,
      CASE WHEN _sort_column = 'lastName' AND _sort_direction = 'desc' THEN c.last_name END DESC,
      CASE WHEN _sort_column = 'emailAddress' AND _sort_direction = 'asc' THEN c.email_address END ASC,
      CASE WHEN _sort_column = 'emailAddress' AND _sort_direction = 'desc' THEN c.email_address END DESC,
      CASE WHEN _sort_column = 'phoneNumber' AND _sort_direction = 'asc' THEN c.phone_number END ASC,
      CASE WHEN _sort_column = 'phoneNumber' AND _sort_direction = 'desc' THEN c.phone_number END DESC,
      --CASE WHEN _sort_column = 'location' AND _sort_direction = 'asc' THEN l.name END ASC,
      --CASE WHEN _sort_column = 'location' AND _sort_direction = 'desc' THEN l.name END DESC,
      CASE WHEN _sort_column = 'level' AND _sort_direction = 'asc' THEN g.group_level END ASC,
      CASE WHEN _sort_column = 'level' AND _sort_direction = 'desc' THEN g.group_level END DESC,
      CASE WHEN _sort_column = 'group' AND _sort_direction = 'asc' THEN g.name END ASC,
      CASE WHEN _sort_column = 'group' AND _sort_direction = 'desc' THEN g.name END DESC,
      CASE WHEN _sort_column = 'type' AND _sort_direction = 'asc' THEN gt.name END ASC,
      CASE WHEN _sort_column = 'type' AND _sort_direction = 'desc' THEN gt.name END DESC;

  END;
$BODY$
LANGUAGE plpgsql;

--SELECT * FROM sec.fn_get_user_for_org(1, null)
