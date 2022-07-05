package com.colsubsidio.springboot.backend.apirest.models.services;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.colsubsidio.springboot.backend.apirest.models.dao.UserDaoInterface;
import com.colsubsidio.springboot.backend.apirest.models.entity.UserEntity;

@Service
public class UserServicesImpl implements UserServicesInterface, UserDetailsService {

	private Logger logger = LoggerFactory.getLogger(UserServicesImpl.class);

	@Autowired
	private UserDaoInterface userDao;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity user = this.userDao.findByUsername(username);
		if (null == user) {
			logger.error("error en el login: no existe el usuario".concat(username).concat("en el sistema"));
			throw new UsernameNotFoundException(
					"error en el login: no existe el usuario".concat(username).concat("en el sistema"));
		}

		List<GrantedAuthority> authorities = user.getRoles()
				.stream()
				.map(rol -> new SimpleGrantedAuthority(rol.getRolName()))
				.peek(auth -> logger.info("Rol :" + auth.getAuthority() ))
				.collect(Collectors.toList());
		return new User(user.getUsername(), user.getPassword(), user.getEnabled(), true, true, true, authorities);
	}

	@Override
	@Transactional(readOnly = true)
	public UserEntity findByUsername(String username) {
		return this.userDao.findByUsername(username);
	}
}
