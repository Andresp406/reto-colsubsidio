package com.colsubsidio.springboot.backend.apirest.models.services;


import java.util.List;

import com.colsubsidio.springboot.backend.apirest.models.entity.AccountEntity;
import com.colsubsidio.springboot.backend.apirest.models.entity.ClientEntity;

public interface ClientServicesInterface {
	
	public List<ClientEntity> findAll();
	
	public void delete(Long id);
	
	public ClientEntity findById(Long id);
	
	public ClientEntity save(ClientEntity student);
	
	public List<AccountEntity> findAllExam();
}
