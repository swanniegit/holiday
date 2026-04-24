import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const supabase = url && key ? createClient(url, key) : null;

/*
  Run once in Supabase SQL editor:

  create table enquiries (
    id uuid default gen_random_uuid() primary key,
    package_name text,
    name text not null,
    surname text not null,
    travel_dates text,
    adults integer,
    children integer,
    departure_city text,
    budget text,
    star_grading text,
    special_occasion text,
    additional_info text,
    created_at timestamptz default now()
  );
*/
