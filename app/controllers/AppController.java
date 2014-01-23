package controllers;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import models.Hierarchy;
import play.mvc.Controller;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Result;

import com.cerrid.analytics.service.ReportingService;
import com.cerrid.model.accessor.exception.DBQueryExecuteException;
import com.cerrid.model.collections.DataMart;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.io.Files;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import filters.LoanDetails;
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
	FilePart picture = body.getFile("filepath");
	File outFile = null;
	  if (picture != null) {
	    File inFile = picture.getFile();
	    outFile = new File("/home/cerrid/cerrid/UploadedFiles/" + picture.getFilename());
	    try {
			Files.copy(inFile, outFile);
		} catch (IOException e1) {
			e1.printStackTrace();
			return ok("{\"isSaved\":\"false\", \"error\":\"internal error\"}");
		}
	
	  }	
	return ok("{\"isSaved\":\"true\"}");
}


}
