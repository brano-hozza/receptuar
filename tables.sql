CREATE TYPE "unit_type" AS ENUM (
  'kg',
  'g',
  'l',
  'pcs'
);

CREATE TABLE "users" (
  "user_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "username" varchar,
  "created_at" timestamp
);

CREATE TABLE "accomodations" (
  "accomodation_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "users__accomodations" (
  "user_id" integer,
  "accomodation_id" integer
);

CREATE TABLE "groceries" (
  "grocery_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "items" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "grocery_id" integer,
  "accomodation_id" integer
);

CREATE TABLE "grocery_categories" (
  "grocery_category_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar,
  "icon" varchar
);

CREATE TABLE "grocery_categories__groceries" (
  "grocery_category_id" integer,
  "grocery_id" integer
);

CREATE TABLE "grocery_tags" (
  "grocery_tag_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "grocery_tags__groceries" (
  "grocery_tag_id" integer,
  "grocery_id" integer
);

CREATE TABLE "recipes" (
  "recipe_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "recipes__groceries" (
  "recipe_id" integer,
  "grocery_id" integer,
  "amount" integer,
  "unit" unit_type
);

CREATE TABLE "recipe_categories" (
  "recipe_category_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar,
  "icon" varchar
);

CREATE TABLE "recipe_categories__recipes" (
  "recipe_category_id" integer,
  "recipe_id" integer
);

CREATE TABLE "recipe_tags" (
  "recipe_tag_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "recipe_tags__recipes" (
  "recipe_tag_id" integer,
  "recipe_id" integer
);

CREATE TABLE "lists" (
  "list_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "accomodation_id" integer
);

CREATE TABLE "lists__groceries" (
  "list_id" integer,
  "grocery_id" integer,
  "amount" integer,
  "unit" unit_type
);

ALTER TABLE "users__accomodations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "users__accomodations" ADD FOREIGN KEY ("accomodation_id") REFERENCES "accomodations" ("accomodation_id");

ALTER TABLE "items" ADD FOREIGN KEY ("grocery_id") REFERENCES "groceries" ("grocery_id");

ALTER TABLE "items" ADD FOREIGN KEY ("accomodation_id") REFERENCES "accomodations" ("accomodation_id");

ALTER TABLE "grocery_categories__groceries" ADD FOREIGN KEY ("grocery_category_id") REFERENCES "grocery_categories" ("grocery_category_id");

ALTER TABLE "grocery_categories__groceries" ADD FOREIGN KEY ("grocery_id") REFERENCES "groceries" ("grocery_id");

ALTER TABLE "grocery_tags__groceries" ADD FOREIGN KEY ("grocery_tag_id") REFERENCES "grocery_tags" ("grocery_tag_id");

ALTER TABLE "grocery_tags__groceries" ADD FOREIGN KEY ("grocery_id") REFERENCES "groceries" ("grocery_id");

ALTER TABLE "recipes__groceries" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("recipe_id");

ALTER TABLE "recipes__groceries" ADD FOREIGN KEY ("grocery_id") REFERENCES "groceries" ("grocery_id");

ALTER TABLE "recipe_categories__recipes" ADD FOREIGN KEY ("recipe_category_id") REFERENCES "recipe_categories" ("recipe_category_id");

ALTER TABLE "recipe_categories__recipes" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("recipe_id");

ALTER TABLE "recipe_tags__recipes" ADD FOREIGN KEY ("recipe_tag_id") REFERENCES "recipe_tags" ("recipe_tag_id");

ALTER TABLE "recipe_tags__recipes" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("recipe_id");

ALTER TABLE "lists" ADD FOREIGN KEY ("accomodation_id") REFERENCES "accomodations" ("accomodation_id");

ALTER TABLE "lists__groceries" ADD FOREIGN KEY ("list_id") REFERENCES "lists" ("list_id");

ALTER TABLE "lists__groceries" ADD FOREIGN KEY ("grocery_id") REFERENCES "groceries" ("grocery_id");
