package com.colsubsidio.springboot.backend.apirest.models.services;

import com.colsubsidio.springboot.backend.apirest.models.entity.UserEntity;

public interface UserServicesInterface {
	public UserEntity findByUsername(String username);
}
