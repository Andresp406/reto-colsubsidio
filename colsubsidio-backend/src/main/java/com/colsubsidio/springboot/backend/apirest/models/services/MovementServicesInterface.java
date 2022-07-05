package com.colsubsidio.springboot.backend.apirest.models.services;

import java.util.List;

import com.colsubsidio.springboot.backend.apirest.models.entity.AccountEntity;

public interface MovementServicesInterface {
	
	public List<AccountEntity> findAll();
	
	public AccountEntity save(AccountEntity question);
	
	public AccountEntity findById(Long id);
	
	public void delete(Long id);
	
	public List<?> findAllQuestion();
	
	public List<?> findAllAnswer();
	
}
