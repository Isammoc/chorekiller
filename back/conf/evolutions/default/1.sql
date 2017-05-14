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
    ('admin', 'Administrateur', '$2a$10$l/2wt72y7NKxAfg7atDfA.gQYhTjA25ocKobSVgmU3Hyfz.SWXh/O', TRUE)
;

# --- !Downs

DROP TABLE user_account;
