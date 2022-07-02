package com.colsubsidio.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

import com.colsubsidio.springboot.backend.apirest.models.dao.ClientDaoInterface;
import com.colsubsidio.springboot.backend.apirest.models.entity.AccountEntity;
import com.colsubsidio.springboot.backend.apirest.models.entity.ClientEntity;

@Service
@ComponentScan
public class ClientServicesImpl implements ClientServicesInterface{

	@Autowired
	private ClientDaoInterface studentDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<ClientEntity> findAll() {
		return (List<ClientEntity>) this.studentDao.findAll();
	}
	
	@Override
	@Transactional(readOnly = true)
	public ClientEntity findById(Long id) {
		return this.studentDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public ClientEntity save(ClientEntity student) {
		return studentDao.save(student);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		this.studentDao.deleteById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public List<AccountEntity> findAllExam() {
		return this.studentDao.findAllExam();
	}




}
