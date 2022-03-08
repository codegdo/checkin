-- CREATE FUNCTION FN_GET_EMAIL
CREATE OR REPLACE FUNCTION org.fn_get_email(p_email_id varchar)
RETURNS TABLE (
  id int,
  name varchar,
  type varchar,
  "fromName" varchar,
  "fromAddress" varchar,
  "replyTo" varchar,
  "recipient" text,
  "ccRecipient" text,
  "bccRecipient" text,
  "smsRecipient" text,
  "subject" varchar,
  "body" text,
  "text" text,
  "isActive" boolean,
  "orgId" int
)
AS
$BODY$
  DECLARE
    filter_id int := 0;
    filter_name varchar := '';
  BEGIN

    IF (SELECT p_user_id ~ '^\d+$') THEN
      filter_id := p_email_id::int;
    ELSE
      filter_name := p_email_id::varchar;
    END IF;

    RETURN QUERY

      SELECT
        e.id,
        e.name,
        et.type,
        ef.from_name,
        ef.from_address,
        ef.reply_to,
        ea.recipient,
        ea.cc_recipient,
        ea.bcc_recipient,
        ea.sms_recipient,
        e.subject,
        e.body,
        e.text,
        e.is_active,
        e.org_id
      FROM org.email e
      LEFT JOIN dbo.email_type et ON et.id = e.email_type_id
      LEFT JOIN dbo.email_address ea ON ea.id = et.email_address_id
      LEFT JOIN dbo.email_from ef ON ef.id = et.email_from_id
      WHERE e.id = filter_id OR et.name = filter_name;

  END;
$BODY$
LANGUAGE plpgsql;

/* DROP FUNCTIONS

DROP FUNCTION IF EXISTS org.fn_email_get_by_name;
*/
