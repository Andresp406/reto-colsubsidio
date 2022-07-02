 package com.colsubsidio.springboot.backend.apirest.models.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.colsubsidio.springboot.backend.apirest.models.dao.MovementDaoInterface;
import com.colsubsidio.springboot.backend.apirest.models.entity.MovementEntity;

@Service
public class AccountServicesImpl implements UserDetailsService {

	
	private MovementDaoInterface userDao;
	
	@Override
	@Transactional(readOnly=true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MovementEntity user = this.userDao.findByUsername(username);
		List<GrantedAuthority> authorities = user.getRoles()
											.stream()
											.map(rol -> new SimpleGrantedAuthority(rol.getRolName()))
											.collect(Collectors.toList());
		return new User( user.getUserName(), user.getPassword(), user.getEnabled(), true, true,true, authorities);
	}
	
	

}
