WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 500
)
INSERT INTO "user" (
  "id",   
  "name",
  "email",
  "emailVerified",
  "image",
  "role",
  "createdAt",
  "updatedAt",
  "phone",
  "phoneVerified",
  "profileCompleted",
  "subscriptionId"
)
SELECT 
  -- Generate unique 32 character alphanumeric id
  substr(md5(random()::text), 1, 32),
  -- Generate realistic names
  'Creator ' || n::text || ' ' || (
    CASE (n % 3) 
      WHEN 0 THEN 'Smith'
      WHEN 1 THEN 'Johnson'
      ELSE 'Williams'
    END
  ),
  -- Generate unique emails
  'creator' || n::text || '@example.com',
  -- All creators are email verified
  true,
  -- Profile image URL
  'https://picsum.photos/200/200?random=' || n::text,
  -- All are creators
  'creator',
  -- Created within last 30 days
  NOW() - (random() * interval '30 days'),
  -- Updated same as created date
  NOW() - (random() * interval '30 days'),
  -- Generate phone numbers
  '+1' || (floor(random() * 900) + 100)::text || 
         (floor(random() * 900) + 100)::text || 
         (floor(random() * 9000) + 1000)::text,
  -- All creators are phone verified
  true,
  -- All creators have completed profiles
  true,
  -- Generate subscription IDs
  'sub_' || substr(md5(random()::text), 1, 24)
FROM numbers;