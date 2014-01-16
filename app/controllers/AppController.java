package controllers;


import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;

import models.Hierarchy;
import play.mvc.Controller;
import play.mvc.Result;

import com.cerrid.analytics.service.ReportingService;
import com.cerrid.model.accessor.exception.DBQueryExecuteException;
import com.cerrid.model.collections.DataMart;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import filters.LoanDetails;
import filters.LoginAuthentication;

public class AppController extends Controller {
	
	public static Result authentiate() {
		
		System.out.println("authentiate");
		JsonNode asJson = request().body().asJson();
		
		boolean isAuthenticate=LoginAuthentication.loginValidation(asJson);
		
		if(isAuthenticate)
			return ok("{\"status\":\"home\",\"message\":\"Welcome\"}");
		else
			return ok("{\"status\":\"error\",\"message\":\"Invalid UserName and Password\"}");
		
		
	}
	
	public static Result details(String datasetId) {
		String dataTableData = null;
		try {
			dataTableData = ReportingService.getDataTableData(datasetId);
		} catch (DBQueryExecuteException e) {
			e.printStackTrace();
		}
		return ok(dataTableData);
	}

public static Result getHirarchy(){
	
		List<DataMart> dataMarts = LoanDetails.getHirarchy();
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
	
	boolean isAuthenticate=LoginAuthentication.adminValidation(asJson);
	
	if(isAuthenticate)
		return ok("{\"isValid\":\"True\"}");
	else
		return ok("{\"status\":\"error\",\"message\":\"Invalid Admin UserName and Password combination\"}");
	
	
}


	
public static Result saveUserDetails() {
	
	System.out.println("saveUserDetails");
	JsonNode asJson = request().body().asJson();
	
	boolean saved=LoginAuthentication.saveUser(asJson);
	
	if(saved)
		return ok("{\"isSaved\":\"true\"}");
	else
		return ok("{\"isSaved\":\"false\",\"message\":\"User Already Exist\"}");
	
	
}
	

}
