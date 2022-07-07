INSERT INTO clients (full_name, phone, address, password) VALUES('Andrés Penagos', '123456', 'andres@mail.com', '1234');
INSERT INTO clients (full_name, phone, address, password) VALUES('Mr. John Doe', '123456', 'john.doe@gmail.com', '1234');
INSERT INTO clients (full_name, phone, address, password) VALUES('Linus Torvalds', '123456', 'linus.torvalds@gmail.com', '1234');
INSERT INTO clients (full_name, phone, address, password) VALUES('Rasmus Lerdorf', '123456', 'rasmus.lerdorf@gmail.com', '1234');
INSERT INTO clients (full_name, phone, address, password) VALUES('Erich Gamma', '123456', 'erich.gamma@gmail.com', '1234');
INSERT INTO clients (full_name, phone, address, password) VALUES('Richard Helm', '123456', 'richard.helm@gmail.com', '1234');
INSERT INTO clients (full_name, phone, address, password) VALUES('Ralph Johnson', '123456', 'ralph.johnson@gmail.com', '1234');
INSERT INTO clients (full_name, phone, address, password) VALUES('John Vlissides', '123456', 'john.vlissides@gmail.com', '1234');
INSERT INTO clients (full_name, phone, address, password) VALUES('Dr. James Gosling', '123456', 'james.gosling@gmail.com', '1234');
INSERT INTO clients (full_name, phone, address, password) VALUES('Magma Lee', '123456', 'magma.lee@gmail.com', '1234');
INSERT INTO clients (full_name, phone, address, password) VALUES('Tornado Roe', '123456', 'tornado.roe@gmail.com', '1234');


INSERT INTO users (username, password, enabled, full_name) VALUES ('ANDRES', '$2a$10$1dN0ibavnEuL5ZzX5142xeMAiP3A77lW9.paCrqWsNPB.VYaWLNW6', 1, 'andres');
INSERT INTO users (username, password, enabled, full_name) VALUES ('ADMIN', '$2a$10$5e4ted9Lie.yv3sLuXpVn.lkY/Lq.5plSK.fMkBiKatLpJqQEpltm', 1, 'soe');

INSERT INTO roles (rol_name) VALUES ('ROLE_USER');
INSERT INTO roles (rol_name) VALUES ('ROLE_ADMIN');

INSERT INTO user_rol (user_id, role_id) VALUES (1, 1);
INSERT INTO user_rol (user_id, role_id) VALUES (2, 2);
INSERT INTO user_rol (user_id, role_id) VALUES (2, 1);

