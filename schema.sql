-- This script sets up your entire database structure.
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  family_id UUID NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'Member' CHECK (role IN ('Admin', 'Member'))
);

CREATE TABLE public.assets (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL,
  name TEXT NOT NULL,
  metadata JSONB,
  current_value NUMERIC NOT NULL
);

-- Turn on Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- Create Security Policies
CREATE POLICY "Users can view and update their own profile."
  ON public.profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can only manage their own assets."
  ON public.assets FOR ALL USING (auth.uid() = user_id);