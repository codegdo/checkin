SELECT 
  e.id,
  e.name,
  subject,
  body
FROM org.email e
JOIN dbo.email_type et ON et.id = e.email_type_id
WHERE et.name = 'signup';