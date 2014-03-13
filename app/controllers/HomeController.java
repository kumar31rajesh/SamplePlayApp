/**
 * 
 */
package controllers;

import play.mvc.Controller;
import play.mvc.Result;

import com.fasterxml.jackson.databind.JsonNode;

import filters.ApplicationServices;

/**
 * @author amit singh
 *
 */
public class HomeController extends Controller {

	public static Result authentiate() {

		System.out.println("authentiate");
		JsonNode asJson = request().body().asJson();

		boolean isAuthenticate = ApplicationServices.loginValidation(asJson);

		if (isAuthenticate) {
			session("username", "amit@cerridsolutions.com");
			response().setCookie("username", "amit@cerridsolutions.com");
			return ok("{\"status\":\"home\",\"message\":\"Welcome\"}");
			// return ok("{\"status\":\"home\",\"message\":\"Welcome\"}");
		} else
			return ok("{\"status\":\"error\",\"message\":\"Invalid UserName and Password\"}");

	}
}
