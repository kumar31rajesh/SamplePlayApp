package filters;

import models.User;

import com.fasterxml.jackson.databind.JsonNode;

import controllers.MorphiaObject;

public class LoginAuthentication {

	public static boolean loginValidation(JsonNode asJson) {
		User user = null;
		boolean isAuthentic = false;
		if (MorphiaObject.datastore != null) {
			System.out.println(asJson.get("email").asText());
			user = MorphiaObject.datastore.find(User.class)
					.filter("email", asJson.get("email").asText()).get();
		}
		if (user == null) {
			isAuthentic = false;
			return isAuthentic;
		}
		isAuthentic = asJson.get("password").asText().equals(user.getPassword()) ? true : false;
		
		
		
		return isAuthentic;
	}

	public static boolean adminValidation(JsonNode asJson) {
		// TODO Auto-generated method stub
		boolean isAuthentic ;
		System.out.println("adminvalidation");
		
		System.out.println(asJson.get("username").asText());
	
		isAuthentic =( (asJson.get("username").asText().equals("support@cerridsolutions") ? true : false) && (asJson.get("password").asText().equals("cerrid@admin2014") ? true : false) );
		
		return isAuthentic;
	}

	public static boolean saveUser(JsonNode asJson) {
		// TODO Auto-generated method stub
		User user =null;
		boolean issaved=false;
		System.out.println("saveUser");
		if (MorphiaObject.datastore != null) {
			System.out.println(asJson.get("email").asText());
			user = MorphiaObject.datastore.find(User.class).filter("email", asJson.get("email").asText()).get();
			
			if ((user==null)) {
				user=new User();
				user.setEmail(asJson.get("email").asText());
				user.setPassword(asJson.get("password").asText());
				user.setDomain(asJson.get("domain").asText());
				MorphiaObject.datastore.save(user);
				issaved=true ;
			}
		}
		
		
		return issaved;
	}

}
