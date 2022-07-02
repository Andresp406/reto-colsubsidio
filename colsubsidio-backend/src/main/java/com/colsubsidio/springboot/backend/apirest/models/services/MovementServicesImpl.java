package com.colsubsidio.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.colsubsidio.springboot.backend.apirest.models.dao.AccountDaoInterface;
import com.colsubsidio.springboot.backend.apirest.models.entity.AccountEntity;
import com.colsubsidio.springboot.backend.apirest.models.entity.AnswerEntity;
import com.colsubsidio.springboot.backend.apirest.models.entity.QuestionEntity;

@Service
@ComponentScan
public class MovementServicesImpl implements MovementServicesInterface {

	@Autowired
	private AccountDaoInterface examDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<AccountEntity> findAll() {
		return (List<AccountEntity>) this.examDao.findAll();
	}
	
	@Override
	@Transactional(readOnly = true)
	public AccountEntity findById(Long id) {
		return this.examDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public AccountEntity save(AccountEntity exam) {
		return examDao.save(exam);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		this.examDao.deleteById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public List<?> findAllQuestion() {
		return this.examDao.findAllQuestion();
	}

	@Override
	@Transactional(readOnly = true)
	public List<?> findAllAnswer() {
		return this.examDao.findAllAnswer();
	}

}
