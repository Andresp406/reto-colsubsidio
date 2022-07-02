package com.colsubsidio.springboot.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.colsubsidio.springboot.backend.apirest.models.entity.AccountEntity;

public interface AccountDaoInterface extends CrudRepository<AccountEntity, Long>{

}
