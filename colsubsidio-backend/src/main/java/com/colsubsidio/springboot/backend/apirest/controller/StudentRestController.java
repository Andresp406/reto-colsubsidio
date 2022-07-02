package com.colsubsidio.springboot.backend.apirest.controller;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.colsubsidio.springboot.backend.apirest.constants.EnumConstantsApi;
import com.colsubsidio.springboot.backend.apirest.models.entity.AccountEntity;
import com.colsubsidio.springboot.backend.apirest.models.entity.ClientEntity;
import com.colsubsidio.springboot.backend.apirest.models.services.ClientServicesInterface;

@CrossOrigin(origins= {"http://localhost:4200"})
@RestController()
@RequestMapping("/api")
public class StudentRestController {

	@Autowired
	private ClientServicesInterface studentService;
	
	private final Logger log = LoggerFactory.getLogger(StudentRestController.class);
	
	@GetMapping("/student")
	public List<ClientEntity> index(){
		return this.studentService.findAll();
	}
	
	@GetMapping("/student/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		ClientEntity student = null;
		Map<String, Object> response = new HashMap<>();
		try {
			student = this.studentService.findById(id);
		}catch(DataAccessException e){
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Error al realizar la consulta : en base de datos");
			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (student == null) {
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "El estudiante con ID: ".concat(id.toString().concat("No existe en base de datos")));
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
		
		
		return new ResponseEntity<>(student, HttpStatus.OK);
	}
	
	@PostMapping("/create-student")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> create(@Valid @RequestBody ClientEntity student, BindingResult result){
		ClientEntity studentNew = null;
		Map<String, Object> response = new HashMap<>();
		
		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(error -> "El campo '"+ error.getField() +"' " + error.getDefaultMessage()).collect(Collectors.toList());
			
			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), errors);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			studentNew = this.studentService.save(student);
		}catch(DataAccessException e) {
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Error al realizar el Insert : en base de datos");
			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Cliente creado con exito");
		response.put(EnumConstantsApi.ST_STUDENT_JSON.getValue(), studentNew);
		
		return new ResponseEntity<>( response, HttpStatus.CREATED);
	}
	
	@PutMapping("/student/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody ClientEntity student,BindingResult result,  @PathVariable Long id) {
		System.out.println(student);
		ClientEntity studentNow = studentService.findById(id);
		ClientEntity studentUpdate = null;
		Map<String, Object> response = new HashMap<>();
		
		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(error -> "El campo '"+ error.getField() +"' " + error.getDefaultMessage()).collect(Collectors.toList());
			
			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), errors);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
		
		if (studentNow == null) {
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Error no se pudo editar con ID: ".concat(id.toString()));
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			studentNow.setName(student.getName());
			studentNow.setLastName(student.getLastName());
			studentNow.setAge(student.getAge());
			studentNow.setCity(student.getCity());
			studentNow.setTimeZone(student.getTimeZone());
			
			studentUpdate = studentService.save(studentNow);
		}catch(DataAccessException e){
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Error al realizar la consulta : en base de datos");
			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Cliente actualizado con exito");
		response.put(EnumConstantsApi.ST_STUDENT_JSON.getValue(), studentUpdate);
	
		
		return new ResponseEntity<>( response, HttpStatus.CREATED); 
		
	}
	 

	@DeleteMapping("/student/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		ClientEntity student = this.studentService.findById(id);
		try{
			if (!isEmptyCustom(student.getPhoto())) {
				Path beforePhotoRoute = Paths.get("upload").resolve(student.getPhoto()).toAbsolutePath();
				File beforePhoto = beforePhotoRoute.toFile();
				if (beforePhoto.exists() && beforePhoto.canRead()) {
					beforePhoto.delete();
				}
			}
			this.studentService.delete(id);
		}catch(DataAccessException e){
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Error al eliminar al estudiante : en base de datos");
			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		 
		response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "cliente eliminado con exito");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	@GetMapping("/student/exam")
	public List<AccountEntity> getExams(){
		return this.studentService.findAllExam();
	}
	
	@PostMapping("student/upload")
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id){
		Map<String, Object> response = new HashMap<>();
		
		ClientEntity student = this.studentService.findById(id);
		
		if (!file.isEmpty()) {
			String fileName = UUID.randomUUID().toString().concat("").concat(file.getOriginalFilename().replace(" ", ""));
			Path photoRoute = Paths.get("upload").resolve(fileName).toAbsolutePath();
			log.info(fileName.toString());
			try {
				Files.copy(file.getInputStream(), photoRoute);
			} catch (IOException e) {
				response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Error al subir la imagen del estudiante ");
				response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
				
			}
			
			if (!isEmptyCustom(student.getPhoto())) {
				Path beforePhotoRoute = Paths.get("upload").resolve(student.getPhoto()).toAbsolutePath();
				File beforePhoto = beforePhotoRoute.toFile();
				if (beforePhoto.exists() && beforePhoto.canRead()) {
					beforePhoto.delete();
				}
			}
			
			student.setPhoto(fileName);
			this.studentService.save(student);
			
			response.put(EnumConstantsApi.ST_STUDENT_JSON.getValue(), student);
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "has subido correctamente la imagen "+ fileName );
		}
		
		
		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	
	}
	
	@GetMapping("/student/upload/img/{photoNam:.+}")
	public ResponseEntity<Resource> showPhoto(@PathVariable String photo){
		Path photoName = Paths.get("upload").resolve(photo).toAbsolutePath();
		log.info(photoName.toString());
		Resource resource = null;
		
		try {
			resource = new UrlResource(photoName.toUri());
		}catch(MalformedURLException e) {
			e.printStackTrace();
		}
		
		if ( !resource.exists() && !resource.isReadable()) {
			throw new RuntimeException("No se pudo cargar la imagen ".concat(photo));
		}
		
		HttpHeaders headers = new HttpHeaders(); 
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+ resource.getFilename() + "\"");
		
		return new ResponseEntity<Resource>(resource, headers, HttpStatus.OK);
	}
	
	private static boolean isEmptyCustom(String string) { 
		return (null == string || string.length() == 0) ? true : false; 
	}
	
	
}
