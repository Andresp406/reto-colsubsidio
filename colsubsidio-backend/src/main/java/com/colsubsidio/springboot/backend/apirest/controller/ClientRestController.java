package com.colsubsidio.springboot.backend.apirest.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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
import com.colsubsidio.springboot.backend.apirest.models.services.UploadServicesInterface;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController()
@RequestMapping("/api")
public class ClientRestController {

	@Autowired
	private ClientServicesInterface clientService;
	
	@Autowired
	private UploadServicesInterface uploadService;


	@GetMapping("/clients")
	public List<ClientEntity> index() {
		return this.clientService.findAll();
	}

	@GetMapping("/clients/page/{page}")
	public Page<ClientEntity> index(@PathVariable Integer page) {
		return this.clientService.findAll(PageRequest.of(page, 5));
	}

	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@GetMapping("/client/{id}")
	public ResponseEntity<Map<String, Object>> show(@PathVariable Long id) {
		ClientEntity client = null;
		Map<String, Object> response = new HashMap<>();
		try {
			client = this.clientService.findById(id);
			response.put(EnumConstantsApi.ST_CLIENT_JSON.getValue(), client);
		} catch (DataAccessException e) {
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(),
					"Error al realizar la consulta : en base de datos");
			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (null == client) {
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(),
					"El estudiante con ID: ".concat(id.toString().concat("No existe en base de datos")));
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Secured({"ROLE_ADMIN"})
	@PostMapping("/clients")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody ClientEntity client, BindingResult result) {
		ClientEntity clientNew = null;
		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(error -> "El campo '" + error.getField() + "' " + error.getDefaultMessage())
					.collect(Collectors.toList());

			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), errors);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		try {
			clientNew = this.clientService.save(client);
		} catch (DataAccessException e) {
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Error al realizar el Insert : en base de datos");
			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Cliente creado con exito");
		response.put(EnumConstantsApi.ST_CLIENT_JSON.getValue(), clientNew);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@PutMapping("/client/{id}")
	public ResponseEntity<Map<String, Object>> update(@Valid @RequestBody ClientEntity client, BindingResult result,
			@PathVariable Long id) {

		ClientEntity clientNow = clientService.findById(id);
		ClientEntity clientUpdate = null;
		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(error -> "El campo '" + error.getField() + "' " + error.getDefaultMessage())
					.collect(Collectors.toList());

			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), errors);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		if (clientNow == null) {
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(),
					"Error no se pudo editar con ID: ".concat(id.toString()));
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}

		try {
			clientNow.setFullName(client.getFullName());
			clientNow.setPhone(client.getPhone());
			clientNow.setAddress(client.getAddress());
			clientNow.setPassword(client.getPassword());

			clientUpdate = clientService.save(clientNow);
		} catch (DataAccessException e) {
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(),
					"Error al realizar la consulta : en base de datos");
			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Cliente actualizado con exito");
		response.put(EnumConstantsApi.ST_CLIENT_JSON.getValue(), clientUpdate);

		return new ResponseEntity<>(response, HttpStatus.CREATED);

	}

	@Secured({"ROLE_ADMIN"})
	@DeleteMapping("/client/{id}")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			ClientEntity client = clientService.findById(id);
			String nombreFotoAnterior = client.getPhoto();
			
			uploadService.delete(nombreFotoAnterior);
			
		    clientService.delete(id);
		} catch (DataAccessException e) {
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Error al eliminar el cliente de la base de datos");
			response.put(EnumConstantsApi.ST_ERROR_JSON.getValue(), e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "El cliente eliminado con éxito!");
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/client/exam")
	public List<AccountEntity> getExams() {
		return null;// this.clientService.findAllExam();
	}

	@Secured({"ROLE_ADMIN", "ROLE_USER"})
	@PostMapping("/clients/upload")
	public ResponseEntity<Map<String, Object>> upload(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id){
		Map<String, Object> response = new HashMap<>();
		
		ClientEntity client = clientService.findById(id);
		
		if(!file.isEmpty()) {

			String fileName = null;
			try {
				fileName = uploadService.copy(file);
			} catch (IOException e) {
				response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Error al subir la imagen del cliente");
				response.put(EnumConstantsApi.ST_CLIENT_JSON.getValue(), e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			String namePhotoBefore = client.getPhoto();
			
			uploadService.delete(namePhotoBefore);
						
			client.setPhoto(fileName);
			
			clientService.save(client);
			
			response.put(EnumConstantsApi.ST_CLIENT_JSON.getValue(), client);
			response.put(EnumConstantsApi.ST_MESSAGE_JSON.getValue(), "Has subido correctamente la imagen: " + fileName);
			
		}
		
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/uploads/img/{fileName:.+}")
	public ResponseEntity<Resource> verFoto(@PathVariable String photoName){

		Resource resource = null;
		
		try {
			resource = uploadService.upload(photoName);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		HttpHeaders header = new HttpHeaders();
		header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");
		
		return new ResponseEntity<>(resource, header, HttpStatus.OK);
	}


}
