# Grocery schema

# --- !Ups

CREATE TABLE grocery (
  id SERIAL  PRIMARY KEY,
  name TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

INSERT INTO grocery
  (id, name, completed)
  VALUES
    (1, 'Lait', FALSE),
    (2, 'Oeufs', FALSE),
    (3, 'Jus d''orange', TRUE)
;

# --- !Downs

DROP TABLE grocery;