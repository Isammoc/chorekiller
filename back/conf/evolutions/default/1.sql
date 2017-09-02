# Users schema

# --- !Ups

CREATE TABLE user_account (
  id     SERIAL  PRIMARY KEY,
  login  TEXT NOT NULL UNIQUE,
  name   TEXT NOT NULL,
  passwd TEXT NOT NULL,
  admin  BOOLEAN
);

-- admin/liberty
INSERT INTO 
  user_account (login, name, passwd, admin)
  VALUES
    ('admin', 'Administrateur', '$2a$10$l/2wt72y7NKxAfg7atDfA.gQYhTjA25ocKobSVgmU3Hyfz.SWXh/O', TRUE),
    ('isammoc', 'Sébastien', '$2a$10$EWap2iIx1WqoLzpvO1oGeei30Jkv4dNT9NhF2vxotpEWWoYxk8wai', FALSE),
    ('gzl', 'Gaëlle', '$2a$10$EWap2iIx1WqoLzpvO1oGeei30Jkv4dNT9NhF2vxotpEWWoYxk8wai', FALSE)
;

# --- !Downs

DROP TABLE user_account;
