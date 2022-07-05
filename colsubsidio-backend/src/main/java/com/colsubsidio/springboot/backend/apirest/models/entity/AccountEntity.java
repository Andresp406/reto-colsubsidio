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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "accounts")
public class AccountEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name="account_number", nullable=false)
	private Long accountNumber;
	
	@Column(nullable=false)	
	private Double balance;
	
    @ManyToOne(fetch=FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "client"})
	private ClientEntity client;
    
    @JsonIgnoreProperties({"account", "hibernateLazyInitializer", "handler",})
	@OneToMany(fetch=FetchType.LAZY, mappedBy="account", cascade=CascadeType.ALL)
	private List<MovementEntity> movement;
	
	public AccountEntity() {
		this.movement = new ArrayList<>();
	}
	
	//getter and setter
	

	private static final long serialVersionUID = 1L;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public ClientEntity getClient() {
		return client;
	}

	public void setClient(ClientEntity client) {
		this.client = client;
	}

	public List<MovementEntity> getMovement() {
		return movement;
	}

	public void setMovement(List<MovementEntity> movement) {
		this.movement = movement;
	}



}
