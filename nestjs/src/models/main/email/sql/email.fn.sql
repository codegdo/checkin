CREATE OR REPLACE FUNCTION org.fn_get_email_by_name(p_name varchar)
RETURNS TABLE (
  id int,
  name dbo.email_type_enum,
  
  subject varchar,
  
  body text,
  isActive boolean,
  orgId int,
  isOwner boolean,
)
LANGUAGE plpgsql
AS
$$
  DECLARE

  BEGIN
    RETURN QUERY
      
      SELECT
        e.id,
        e.name,
        e.subject,
        e.body,
        e.is_active,
        e.org_id,
        et.type,
        ea.recipient,
        ea.cc_recipient,
        ea.bcc_recipient
      FROM org.email e
      LEFT JOIN dbo.email_type et ON et.id = e.email_type_id
      LEFT JOIN dbo.email_address ea ON ea.id = et.email_address_id
      WHERE et.name = p_name AND e.is_active = true;

  END;
$$;

SELECT * FROM sec.fn_get_email_by_name('signup');