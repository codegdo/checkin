SELECT
  e.id,
  e.name,
  et.type,
  r.email_address,
  subject,
  body,
  is_active,
  org_id
FROM org.email e
LEFT JOIN dbo.email_type et ON et.id = e.email_type_id
LEFT JOIN dbo.recipient r ON r.id = et.recipient_id
WHERE et.name = 'signup' AND e.is_active = true;