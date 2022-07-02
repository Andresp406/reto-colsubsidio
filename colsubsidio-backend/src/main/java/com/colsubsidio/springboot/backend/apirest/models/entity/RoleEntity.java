package com.colsubsidio.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="roles")
public class RoleEntity implements Serializable {

	
	

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="rol_name", unique=true, length=20)
	private String rolName;
	
	@ManyToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL, mappedBy="roles")
	private List<MovementEntity> users;
	
	
	
	public RoleEntity() {
		this.users = new ArrayList<>();
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getRolName() {
		return rolName;
	}



	public void setRolName(String rolName) {
		this.rolName = rolName;
	}



	public List<MovementEntity> getUsers() {
		return users;
	}



	public void setUsers(List<MovementEntity> users) {
		this.users = users;
	}



	private static final long serialVersionUID = 1L;

}
