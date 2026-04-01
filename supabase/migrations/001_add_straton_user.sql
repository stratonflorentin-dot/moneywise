-- Create user: Straton Florentin Tesha
-- Email: stratonflorentin@gmail.com
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql/new)

-- First, enable the pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Insert user into auth.users only if not already exists
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token,
    phone_change,
    phone_change_token,
    reauthentication_token,
    is_super_admin,
    is_sso_user
)
SELECT
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'stratonflorentin@gmail.com',
    crypt('Tony@5002', gen_salt('bf')),
    NOW(),
    NULL,
    NULL,
    '{"provider":"email","providers":["email"]}',
    '{"name":"Straton Florentin Tesha","full_name":"Straton Florentin Tesha"}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    FALSE,
    FALSE
WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'stratonflorentin@gmail.com'
);

-- Verify the user was created
SELECT id, email, raw_user_meta_data, created_at 
FROM auth.users 
WHERE email = 'stratonflorentin@gmail.com';
