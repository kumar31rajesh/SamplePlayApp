package filters;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.code.morphia.query.Query;

import models.User;
import controllers.MorphiaObject;

public class LoginAuthentication {

	public static boolean loginValidation(JsonNode asJson) {
		User user = null;
		boolean isAuthentic = false;
		if (MorphiaObject.datastore != null) {
			System.out.println(asJson.get("username").asText());
			user = MorphiaObject.datastore.find(User.class)
					.filter("username", asJson.get("username").asText()).get();
		}
		if (user == null) {
			isAuthentic = false;
			return isAuthentic;
		}
		isAuthentic = asJson.get("password").asText().equals(user.getPassword()) ? true : false;
		
		return isAuthentic;
	}

}
