package com.colsubsidio.springboot.backend.apirest.models.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.colsubsidio.springboot.backend.apirest.models.entity.*;

public interface ClientDaoInterface extends JpaRepository<ClientEntity, Long>{

	
}
