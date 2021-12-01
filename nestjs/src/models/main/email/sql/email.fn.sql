-- CREATE FUNCTION FN_GET_EMAIL_BY_NAME
CREATE OR REPLACE FUNCTION org.fn_get_email_by_name(p_name dbo.email_type_enum)
RETURNS TABLE (
  id INT,
  name VARCHAR,
  type VARCHAR,
  recipients TEXT,
  "ccRecipients" TEXT,
  "bccRecipients" TEXT,
  subject VARCHAR,
  body TEXT,
  "isActive" BOOLEAN,
  "orgId" INT
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
        et.type,
        ea.recipients,
        ea.cc_recipients,
        ea.bcc_recipients,
        e.subject,
        e.body,
        e.is_active,
        e.org_id
      FROM org.email e
      LEFT JOIN dbo.email_type et ON et.id = e.email_type_id
      LEFT JOIN dbo.email_address ea ON ea.id = et.email_address_id
      WHERE et.name = p_name AND e.is_active = true;

  END;
$$;

SELECT * FROM org.fn_get_email_by_name('signup');