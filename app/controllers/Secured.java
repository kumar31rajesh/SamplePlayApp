package controllers;
import play.mvc.Http.Context;
import play.mvc.Result;
import play.mvc.Security;

public class Secured extends Security.Authenticator {

	@Override
	public String getUsername(Context ctx) {
		String username = null;// ctx.session().get("username");
		if (username == null || username.isEmpty()) {
			return null;
		}
		return username;
	}

	@Override
	public Result onUnauthorized(Context ctx) {
		ctx.session().clear();
		return redirect("/");
	}
}