# Grocery schema

# --- !Ups

CREATE TABLE grocery (
  id SERIAL  PRIMARY KEY,
  name TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

INSERT INTO grocery
  (name, completed)
  VALUES
    ('Lait', FALSE),
    ('Oeufs', FALSE),
    ('Jus d''orange', TRUE)
;

# --- !Downs

DROP TABLE grocery;