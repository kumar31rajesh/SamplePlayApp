package controllers;

import play.mvc.Controller;
import play.mvc.Http.MultipartFormData;
import play.mvc.Result;
import filters.ApplicationServices;

public class DataSourceController extends Controller {
	public static Result uploadDataSourceCSVFile() {
		MultipartFormData body = request().body().asMultipartFormData();
		boolean uploaded = ApplicationServices.uploadCSVFile(body);
		if (uploaded)
			return ok("{\"isSaved\":\"true\"}");
		else
			return ok("{\"isSaved\":\"false\",\"error\":\"internal server error\"}");

	}
}
