# --- !Ups
ALTER TABLE grocery
  RENAME TO task
;

# --- !Downs
ALTER TABLE task
  RENAME TO grocery
;
