## Mock database init

- find the file at 'app/server/services/database/seed-init.sql'

- mock db structure

- user table

id
name
email
emailVerified
image
createdAt
updatedAt
sessions
accounts

subscriptions
payments

role
phone
phoneVerified
profileCompleted
subscriptionId

```example
id	7CfHtp6M0zkon1OtPlQpcFiEtdoqy9qT
name	sai harsha
email	saiharsha9897@gmail.com
emailVerified	true
image	https://lh3.googleusercontent.com/a/ACg8ocJbhk2QKOBabPRzyd_u-I1LgLN5EaA3XW77NFGn9OaBBscu8ck=s96-c
role	user
createdAt	2025-05-31 18:19:01.242
updatedAt	2025-05-31 18:19:01.242
phone	+919603028848
phoneVerified	true
profileCompleted	true
subscriptionId	cmbck4ocm00054q13amt4lry0
```

## sql command to generate 500 users ( make all creators fully authenticated )

```sql
WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 500
)
INSERT INTO users (
  id,
  name,
  email,
  emailVerified,
  image,
  role,
  createdAt,
  updatedAt,
  phone,
  phoneVerified,
  profileCompleted,
  subscriptionId
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
```

Let me explain the SQL command:

1. First, we create a CTE (Common Table Expression) called `numbers` that generates numbers from 1 to 500 recursively.

2. The main INSERT statement creates 500 users with the following characteristics:
   - Unique 32-character alphanumeric IDs using MD5 hash
   - Realistic names combining "Creator N" with common surnames
   - Unique email addresses in the format creator{N}@example.com
   - All users are marked as email verified (true)
   - Random profile images using picsum.photos service
   - All users have the 'creator' role
   - Creation and update dates randomly distributed over the last 30 days
   - Random but valid-format US phone numbers
   - All users are phone verified (true)
   - All users have completed profiles (true)
   - Unique subscription IDs with 'sub_' prefix and 24 random characters

This will generate a diverse set of test data while ensuring all creators are fully authenticated as requested. The data is structured to match the example provided in the file while providing enough variation to be useful for testing.


## to be implemented

- userPreferences
- CreatorPreferences