INSERT INTO users (user_name, password, enabled) VALUES ('ANDRES', '$2a$10$8ODMuOuDHaoVVkuaTkV2jOTKSEUilktNPiEhq4sIRvgrqiNaNI1kK', 1);
INSERT INTO users (user_name, password, enabled) VALUES ('SOE', '$2a$10$5e4ted9Lie.yv3sLuXpVn.lkY/Lq.5plSK.fMkBiKatLpJqQEpltm', 1);

INSERT INTO roles (rol_name) VALUES ('ROLE_USER');
INSERT INTO roles (rol_name) VALUES ('ROLE_ADMIN');

INSERT INTO user_rol (user_id, role_id) VALUES (1, 1);
INSERT INTO user_rol (user_id, role_id) VALUES (2, 2);
INSERT INTO user_rol (user_id, role_id) VALUES (2, 1);
