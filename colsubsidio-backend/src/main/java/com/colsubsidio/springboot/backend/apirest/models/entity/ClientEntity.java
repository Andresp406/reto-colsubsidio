package com.colsubsidio.springboot.backend.apirest.models.entity;
import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name="clients")
public class ClientEntity implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) 
	private Long id;
	
	@Column(name="first_name", nullable=false)
	@Size(min=4, max=21)
	private String firstName; 
	
	@Column(name="last_name", nullable=false)
	@Size(min=4, max=21)
	private String lastName;
	
	@Column(nullable=false)
	private Long phone;
	
	@Column(nullable=false)
	private String address;
	

	@JsonIgnoreProperties({"account", "hibernateLazyInitializer", "handler",})
	@OneToMany(fetch=FetchType.LAZY, mappedBy="account", cascade=CascadeType.ALL)
	private AccountEntity account;
	
	private String photo;
	
	//getter and setter


	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public AccountEntity getAccount() {
		return account;
	}

	public void setAccount(AccountEntity account) {
		this.account = account;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}



	private static final long serialVersionUID = 1L;

}
