package com.colsubsidio.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="movements")
public class MovementEntity implements Serializable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable=false)
	private String type;

	private Date date;
	
	private Double value;
	
	@ManyToOne(fetch=FetchType.LAZY)
	private List<AccountEntity> account;
	
	
	public MovementEntity() {
		this.account = new ArrayList<>();
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getType() {
		return type;
	}



	public void setType(String type) {
		this.type = type;
	}



	public Date getDate() {
		return date;
	}



	public void setDate(Date date) {
		this.date = date;
	}



	public Double getValue() {
		return value;
	}



	public void setValue(Double value) {
		this.value = value;
	}



	public List<AccountEntity> getAccount() {
		return account;
	}



	public void setAccount(List<AccountEntity> account) {
		this.account = account;
	}



	private static final long serialVersionUID = 1L;

}
