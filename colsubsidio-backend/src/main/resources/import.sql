INSERT INTO exams (grade) VALUES(100);
INSERT INTO exams (grade) VALUES(50);

--INSERT TABLE QUESTION
INSERT INTO questions (point, title, exam_id) VALUES (20, 'PREGUNTA 1', 1 );
INSERT INTO questions (point, title, exam_id) VALUES (20, 'PREGUNTA 2', 1 );
INSERT INTO questions (point, title, exam_id) VALUES (20, 'PREGUNTA 3', 1 );
INSERT INTO questions (point, title, exam_id) VALUES (20, 'PREGUNTA 4', 1 );
INSERT INTO questions (point, title, exam_id) VALUES (20, 'PREGUNTA 5', 1 );

INSERT INTO questions (point, title, exam_id) VALUES (20, 'PREGUNTA 1', 2 );
INSERT INTO questions (point, title, exam_id) VALUES (20, 'PREGUNTA 2', 2 );
INSERT INTO questions (point, title, exam_id) VALUES (20, 'PREGUNTA 3', 2 );
INSERT INTO questions (point, title, exam_id) VALUES (20, 'PREGUNTA 4', 2 );
INSERT INTO questions (point, title, exam_id) VALUES (20, 'PREGUNTA 5', 2 );
--
--INSERT TABLE ANSWERS
INSERT INTO answers (is_valid, opcion, question_id) VALUES (1, 'OPCION 1', 1 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 2', 1 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 3', 1 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 4', 1 );

INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 1', 2 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 2', 2 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 3', 2 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (1, 'OPCION 4', 2 );

INSERT INTO answers (is_valid, opcion, question_id) VALUES (1, 'OPCION 1', 3 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 2', 3 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 3', 3 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 4', 3 );

INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 1', 4 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 2', 4 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 3', 4 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (1, 'OPCION 4', 4 );

INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 1', 5 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 2', 5 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (1, 'OPCION 3', 5 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 4', 5 );

INSERT INTO answers (is_valid, opcion, question_id) VALUES (1, 'OPCION 1', 6 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 2', 6 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 3', 6 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 4', 6 );

INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 1', 7 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 2', 7 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 3', 7 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (1, 'OPCION 4', 7 );

INSERT INTO answers (is_valid, opcion, question_id) VALUES (1, 'OPCION 1', 8 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 2', 8 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 3', 8 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 4', 8 );

INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 1', 9 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 2', 9 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 3', 9 );
INSERT INTO answers (is_valid, opcion, question_id) VALUES (1, 'OPCION 4', 9 );

INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 1', 10);
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 2', 10);
INSERT INTO answers (is_valid, opcion, question_id) VALUES (1, 'OPCION 3', 10);
INSERT INTO answers (is_valid, opcion, question_id) VALUES (0, 'OPCION 4', 10);
--
--INSERT TABLE STUDENT
INSERT INTO students (name, last_name, age, city, time_zone, exam_id, photo) VALUES ('ANDRES', 'PENAGOS', 33, 'santa marta', '2022-03-12', 1 , NULL);
INSERT INTO students (name, last_name, age, city, time_zone, exam_id, photo) VALUES ('SOENDRA', 'HENRIQUEZ', 37, 'santa marta', '2022-03-12', 2, NULL );

