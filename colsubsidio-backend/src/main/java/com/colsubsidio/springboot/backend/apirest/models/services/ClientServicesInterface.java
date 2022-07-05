package com.colsubsidio.springboot.backend.apirest.models.services;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.colsubsidio.springboot.backend.apirest.models.entity.ClientEntity;

public interface ClientServicesInterface {
	
	public List<ClientEntity> findAll();
	
	public Page<ClientEntity> findAll(Pageable pageable);
	
	public void delete(Long id);
	
	public ClientEntity findById(Long id);
	
	public ClientEntity save(ClientEntity student);
	
	
}
