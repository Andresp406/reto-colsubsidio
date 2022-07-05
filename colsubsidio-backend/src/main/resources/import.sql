INSERT INTO users (username, password, enabled, full_name) VALUES ('ANDRES', '$2a$10$1dN0ibavnEuL5ZzX5142xeMAiP3A77lW9.paCrqWsNPB.VYaWLNW6', 1, 'andres');
INSERT INTO users (username, password, enabled, full_name) VALUES ('ADMIN', '$2a$10$5e4ted9Lie.yv3sLuXpVn.lkY/Lq.5plSK.fMkBiKatLpJqQEpltm', 1, 'soe');

INSERT INTO roles (rol_name) VALUES ('ROLE_USER');
INSERT INTO roles (rol_name) VALUES ('ROLE_ADMIN');

INSERT INTO user_rol (user_id, role_id) VALUES (1, 1);
INSERT INTO user_rol (user_id, role_id) VALUES (2, 2);
INSERT INTO user_rol (user_id, role_id) VALUES (2, 1);
