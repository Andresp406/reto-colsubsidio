package com.colsubsidio.springboot.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.colsubsidio.springboot.backend.apirest.models.entity.MovementEntity;

public interface MovementDaoInterface extends CrudRepository<MovementEntity, Long> {

}
