-- CREATE FUNCTION FN_EMAIL_GET_BY_NAME
CREATE OR REPLACE FUNCTION org.fn_email_get_by_name(p_name varchar)
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

  BEGIN
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
        e.biz_id
      FROM org.email e
      LEFT JOIN dbo.email_type et ON et.id = e.email_type_id
      LEFT JOIN dbo.email_address ea ON ea.id = et.email_address_id
      LEFT JOIN dbo.email_from ef ON ef.id = et.email_from_id
      WHERE et.name = p_name AND e.is_active = true;

  END;
$BODY$
LANGUAGE plpgsql;

-- CALL FUNCTIONS

SELECT * FROM org.fn_email_get_by_name('verify');

-- DROP FUNCTIONS

DROP FUNCTION IF EXISTS
org.fn_email_get_by_name;
