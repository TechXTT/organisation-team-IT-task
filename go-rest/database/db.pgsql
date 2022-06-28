CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT UNIQUE NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL
);

CREATE TABLE "workspaces" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "uid" INT
);

CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "done" BOOL DEFAULT false,
  "created_at" DATE DEFAULT (CURRENT_DATE),
  "expire_at" DATE NOT NULL,
  "note" TEXT,
  "wsid" INT,
  "uid" INT
);

ALTER TABLE "workspaces" ADD FOREIGN KEY ("uid") REFERENCES "users" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("uid") REFERENCES "users" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("wsid") REFERENCES "workspaces" ("id");
