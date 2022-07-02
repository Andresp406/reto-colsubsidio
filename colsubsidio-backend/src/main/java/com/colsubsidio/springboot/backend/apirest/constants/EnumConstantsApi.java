package com.colsubsidio.springboot.backend.apirest.constants;

public enum EnumConstantsApi {
	ST_HEADERS("application/json"),
	ST_MESSAGE_QUESTION_OK("Pregunta Creada"),
	ST_ERROR_CODE_200("200"),
	ST_DESCRIPTION_CODE_200("Exitoso"),
	ST_MESSAGE_JSON("message"),
	ST_ERROR_JSON("error"),
	ST_EXAM_JSON("exam"),
	ST_STUDENT_JSON("student"),
	
	ST_ERROR_CODE_400("400"),
	ST_DESCRIPTION_CODE_400("Error en la formacion de la solicitud"),
	
	ST_ERROR_CODE_404("404"),
	ST_DESCRIPTION_CODE_404("Solicitud no encontrada"),
	
		
	ST_URL_CREATE_EXAM("/crear-examen"),
	ST_TITLE_CREATE_EXAM("Crear examen"),
    ST_URL_DESCRIPTION_CREATE_EXAM("Este se compone de un conjunto de preguntas con 4 opciones, 1 opción correcta y un puntaje por cada pregunta que en total deben sumar 100 puntos (la nota total del examen)."),
    
    ST_URL_CREATE_STUDENT("/crear-estudiante"),
    ST_TITLE_CREATE_STUDENT("Crear estudiante"),
    ST_URL_DESCRIPTION_CREATE_STUDENT("Este se compone de la siguiente información: nombre, edad, ciudad y zona horaria de la ciudad. "),

    ST_URL_ASSING_EXAM("/asignar-examen"),
    ST_TITLE_ASSING_EXAM("Asignar examen"),
    ST_URL_DESCRIPTION_ASSING_EXAM("Dada una fechade presentación del examen en zona horaria de Bogotá se debe recibir la fecha de  presentación para cada estudiante en su zona horaria correspondiente. "),
    

    ST_URL_GET_EXAM_ASSING("/obtener-examenes-asignados"),
    ST_TITLE_GET_EXAM_ASSING("Obtner examenes asignados"),
    ST_URL_DESCRIPTION_GET_EXAM_ASSING("Obtiene los exámenes asignados de un estudiante. "),
    
    ST_URL_GET_ANSWER( "/recopilar-respuestas/{asignacionId}"),
    ST_TITLE_GET_ANSWER("Recopilar respuestas"),
    ST_URL_DESCRIPTION_GET_ANSWER("Se debe poder recopilar todas las respuestas de un estudiante en un examen que se le ha asignado."),
    
    ST_URL_GRADE_EXAM("/calificar-examen"),
    ST_TITLE_GRADE_EXAM("Calificar examen"),
    ST_URL_DESCRIPTION_GRADE_EXAM("Una vez recibida las respuestas de un estudiante se deberá entregarla calificación de este.");
    
	private String stValue;
	
	private EnumConstantsApi(String stValue) {
		this.stValue = stValue;
	}
	
	public String getValue() {
		return this.stValue;
	}
}
