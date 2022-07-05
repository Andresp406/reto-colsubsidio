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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name="clients")
public class ClientEntity implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) 
	private Long id;
	
	@NotEmpty
	@Size(min=4, max=15)
	@Column(name="full_name", nullable=false)
	private String fullName; 
	
	@NotEmpty
	@Size(min=4, max=15)
	@Column(name="user_name", nullable=false)
	private String userName;
	
	@Column(nullable=false)
	private Long phone;
	
	@Column(nullable=false)
	private String address;
	
	@NotEmpty
	private String password;
	

	@JsonIgnoreProperties({"client", "hibernateLazyInitializer", "handler",})
	@OneToMany(fetch=FetchType.LAZY, mappedBy="client", cascade=CascadeType.ALL)
	private List<AccountEntity> account;
	
	
	private String photo;
	
	
	public ClientEntity() {
		this.account = new ArrayList<>();
	}
	
	
	//getter and setter

	private static final long serialVersionUID = 1L;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Long getPhone() {
		return phone;
	}

	public void setPhone(Long phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public List<AccountEntity> getAccount() {
		return account;
	}

	public void setAccount(List<AccountEntity> account) {
		this.account = account;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	

}
