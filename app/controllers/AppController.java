package controllers;


import models.LoanData;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.lang.reflect.Modifier;
import java.util.ArrayList;

import filters.LoanDetails;
import filters.LoginAuthentication;
import play.mvc.Controller;
import play.mvc.Result;

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
	
public static Result details(Long id) {
		
		System.out.println("details");
		
		LoanData ldata=LoanDetails.getLoanDetails(id);
		

		String jsonRepresentation = "";
	
		if(ldata!=null){
		Gson gson = new GsonBuilder().excludeFieldsWithModifiers(Modifier.PROTECTED).create();
		jsonRepresentation= gson.toJson(ldata);
		}

		
		ArrayList al=new ArrayList();
		al.add("id");
		al.add("name");
		al.add("amount");
		al.add("age");
		al.add("salary");
		
		String col="[";
		boolean initial = false;
		for(int i=0;i<al.size();i++){
			initial = i == al.size()-1 ? true: false;
			col=col+"{\"mData\":\""+al.get(i)+"\",\"sTitle\":\""+al.get(i).toString().toUpperCase()+"\"}" ;
			if(!initial){
				col += ",";
			}
			
		}
		col=col+"]";
		
	
		return ok("{\"columns\":"+col+",\"data\":["+jsonRepresentation+"]}");
		//return ok(jsonRepresentation);

		
	}
	
	
	

}
