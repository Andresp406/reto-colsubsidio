package com.colsubsidio.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.colsubsidio.springboot.backend.apirest.models.dao.ClientDaoInterface;
import com.colsubsidio.springboot.backend.apirest.models.entity.ClientEntity;

@Service
@ComponentScan
public class ClientServicesImpl implements ClientServicesInterface{

	@Autowired
	private ClientDaoInterface clientDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<ClientEntity> findAll() {
		return this.clientDao.findAll();
	}
	
	@Override
	@Transactional(readOnly = true)
	public Page<ClientEntity> findAll(Pageable pageable) {
		return this.clientDao.findAll(pageable);
	}
	
	@Override
	@Transactional(readOnly = true)
	public ClientEntity findById(Long id) {
		return this.clientDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public ClientEntity save(ClientEntity username) {
		return clientDao.save(username);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		this.clientDao.deleteById(id);
	}
}
