PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS clients (
 id TEXT PRIMARY KEY, name TEXT NOT NULL CHECK(length(trim(name)) > 0), phone TEXT NOT NULL DEFAULT '', email TEXT NOT NULL DEFAULT '', notes TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS jobs (
 id TEXT PRIMARY KEY, client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE RESTRICT, title TEXT NOT NULL CHECK(length(trim(title)) > 0), start TEXT NOT NULL, end TEXT NOT NULL CHECK(end > start), status TEXT NOT NULL CHECK(status IN ('pending','active','done','cancelled')), notes TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS jobs_client ON jobs(client_id);
CREATE INDEX IF NOT EXISTS jobs_interval ON jobs(start,end);
CREATE INDEX IF NOT EXISTS jobs_status ON jobs(status);
