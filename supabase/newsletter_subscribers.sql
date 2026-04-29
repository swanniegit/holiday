create table newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  subscribed_at timestamptz default now()
);
