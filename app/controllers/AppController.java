package controllers;


import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import models.DataSet;
import models.Hierarchy;
import play.mvc.Controller;
import play.mvc.Http.MultipartFormData;
import play.mvc.Result;

import com.cerrid.analytics.service.ReportingService;
import com.cerrid.model.accessor.exception.DBQueryExecuteException;
import com.cerrid.model.collections.DataMart;
import com.fasterxml.jackson.databind.JsonNode;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import filters.ApplicationServices;

public class AppController extends Controller {
	
	public static Result authentiate() {
		
		System.out.println("authentiate");
		JsonNode asJson = request().body().asJson();
		
		boolean isAuthenticate=ApplicationServices.loginValidation(asJson);
		
		if(isAuthenticate)
			return ok("{\"status\":\"home\",\"message\":\"Welcome\"}");
		else
			return ok("{\"status\":\"error\",\"message\":\"Invalid UserName and Password\"}");
		
		
	}
	
	public static Result details() {
		String dataTableData = null;
		Map<String,String[]>  data=request().body().asFormUrlEncoded();

		
		String tablecolumns=data.get("datacolumns")[0];
		
		System.out.println(tablecolumns);
		
		try {
			dataTableData = ReportingService.getDataTableData(data.get("dataid")[0]);
		} catch (DBQueryExecuteException e) {
			e.printStackTrace();
		}
		return ok(dataTableData);
	}

public static Result dataSource(String label){
	
		List<DataSet> dataSourcelist = ApplicationServices.getDataSourceList(label);
		
	
	String jsonRepresentation = "";
	
		if (dataSourcelist != null) {
		Gson gson = new GsonBuilder().excludeFieldsWithModifiers(Modifier.PROTECTED).create();
			jsonRepresentation = gson.toJson(dataSourcelist);
		}
	
	return ok(jsonRepresentation);
	
}

public static Result getHirarchy(){
	
	List<DataMart> dataMarts = ApplicationServices.getHirarchy();
	List<Hierarchy> hiearchy = new ArrayList<>();
	for (DataMart hierarchy2 : dataMarts) {
		Hierarchy h1 = new Hierarchy();
		h1.setId(hierarchy2.getId().toString());
		h1.setLabel(hierarchy2.getName());
		hiearchy.add(h1);
	}
	// Hierarchy h1 = new Hierarchy();
	// h1.setId("52d4f60b44aed848df5804e2");
	// h1.setLabel("Test loader DM");
	// hierarchy.add(h1);
String jsonRepresentation = "";

	if (hiearchy != null) {
	Gson gson = new GsonBuilder().excludeFieldsWithModifiers(Modifier.PROTECTED).create();
		jsonRepresentation = gson.toJson(hiearchy);
	}

return ok(jsonRepresentation);

}

public static Result validateAdmin() {
	
	System.out.println("validateAdmin");
	JsonNode asJson = request().body().asJson();
	
	boolean isAuthenticate=ApplicationServices.adminValidation(asJson);
	
	if(isAuthenticate)
		return ok("{\"isValid\":\"True\"}");
	else
		return ok("{\"status\":\"error\",\"message\":\"Invalid Admin UserName and Password combination\"}");
	
	
}


	
public static Result saveUserDetails() {
	
	System.out.println("saveUserDetails");
	JsonNode asJson = request().body().asJson();
	
	boolean saved=ApplicationServices.saveUser(asJson);
	
	if(saved)
		return ok("{\"isSaved\":\"true\"}");
	else
		return ok("{\"isSaved\":\"false\",\"message\":\"User Already Exist\"}");
	
	
}

public static Result uplaodDataSourceCSVFile() {
	

	MultipartFormData body = request().body().asMultipartFormData();
	
	boolean uploaded=ApplicationServices.uploadCSVFile(body);
	
	  
	  if(uploaded)
			return ok("{\"isSaved\":\"true\"}");
		else
			return ok("{\"isSaved\":\"false\",\"error\":\"internal server error\"}");

}


}
