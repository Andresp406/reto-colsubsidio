package com.colsubsidio.springboot.backend.apirest.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.colsubsidio.springboot.backend.apirest.models.entity.*;

public interface ClientDaoInterface extends CrudRepository<ClientEntity, Long>{

	
}
