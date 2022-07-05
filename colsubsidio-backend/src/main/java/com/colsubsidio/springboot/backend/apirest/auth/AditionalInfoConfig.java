package com.colsubsidio.springboot.backend.apirest.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import com.colsubsidio.springboot.backend.apirest.models.entity.UserEntity;
import com.colsubsidio.springboot.backend.apirest.models.services.UserServicesInterface;

@Component
public class AditionalInfoConfig implements TokenEnhancer{

	@Autowired
	private UserServicesInterface userService;
	
	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		UserEntity user = this.userService.findByUserName(authentication.getName());
		Map<String,Object> info = new HashMap<>();
		info.put("stUserName", user.getUserName());
		
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
		return accessToken;
	}

}
