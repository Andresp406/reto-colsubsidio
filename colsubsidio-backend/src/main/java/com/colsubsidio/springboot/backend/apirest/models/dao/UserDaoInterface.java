package com.colsubsidio.springboot.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.colsubsidio.springboot.backend.apirest.models.entity.UserEntity;

public interface UserDaoInterface extends CrudRepository<UserEntity, Long> {

	public UserEntity findByUsername(String username);

}
