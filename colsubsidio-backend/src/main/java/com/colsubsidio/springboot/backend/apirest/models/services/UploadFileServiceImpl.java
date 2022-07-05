package com.colsubsidio.springboot.backend.apirest.models.services;


import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadFileServiceImpl implements UploadServicesInterface{
	
	private final Logger log = LoggerFactory.getLogger(UploadFileServiceImpl.class);
	
	private final static String UPLOAD_DIRECTORY = "uploads";

	@Override
	public Resource upload(String photoName) throws MalformedURLException {
		
		Path fileRoute = getPath(photoName);
		log.info(fileRoute.toString());
		
		Resource resource = new UrlResource(fileRoute.toUri());
		
		if(!resource.exists() && !resource.isReadable()) {
			fileRoute = Paths.get("src/main/resources/static/images").resolve("no-usuario.png").toAbsolutePath();
			
			resource = new UrlResource(fileRoute.toUri());
			
			log.error("Error no se pudo cargar la imagen: " + photoName);
			
		}
		return resource;
	}

	@Override
	public String copy(MultipartFile file) throws IOException {
		
		String fileName = UUID.randomUUID().toString() + "_" +  file.getOriginalFilename().replace(" ", "");
		
		Path fileRoute = getPath(fileName);
		log.info(fileRoute.toString());
		
		Files.copy(file.getInputStream(), fileRoute);
		
		return fileName;
	}

	@Override
	public boolean delete(String photoName) {
		
		if(!isEmptyCustom(photoName)) {
			Path photoRouteBefore = Paths.get("uploads").resolve(photoName).toAbsolutePath();
			File filePhotoBefore = photoRouteBefore.toFile();
			if(filePhotoBefore.exists() && filePhotoBefore.canRead()) {
				filePhotoBefore.delete();
				return true;
			}
		}
		
		return false;
	}

	@Override
	public Path getPath(String photoName) {
		return Paths.get(UPLOAD_DIRECTORY).resolve(photoName).toAbsolutePath();
	}
	

	private static boolean isEmptyCustom(String string) {
		return (null == string || string.length() == 0);
	}


}