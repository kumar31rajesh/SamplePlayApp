package controllers;


import models.Hierarchy;
import models.LoanData;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;


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
		
		List<LoanData> ldata=LoanDetails.getLoanDetails(id);
		

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
		
		String info="Custome Column Info" ;
		
		String col="[";
		boolean initial = false;
		for(int i=0;i<al.size();i++){
			initial = i == al.size()-1 ? true: false;
			col=col+"{\"mData\":\""+al.get(i)+"\",\"sTitle\":\""+al.get(i).toString().toUpperCase()+"\",\"sInfo\":\""+info+"\"}" ;
			if(!initial){
				col += ",";
			}
			
		}
		col=col+"]";
	
		
		String echo;
		if(request().getQueryString("sEcho")==null)
			echo="0";
		else
			echo=request().getQueryString("sEcho");
		
		
		return ok("{\"sEcho\":"+echo+",\"aoColumns\":" +col+",\"iTotalRecords\":"+ldata.size()+",\"iTotalDisplayRecords\":"+request().getQueryString("iDisplayLength")+",\"aaData\":"+jsonRepresentation+"}");
		//return ok("{\"sEcho\":\"1\",\"iTotalRecords\":"+ldata.size()+",\"iTotalDisplayRecords\":"+5+",\"aoColumns\":"+col+",\"aaData\":"+jsonRepresentation+"}");
		//return ok(jsonRepresentation);

		
	}

public static Result getHirarchy(){
	
	List<Hierarchy>  hierarchy=LoanDetails.getHirarchy() ;
	String jsonRepresentation = "";
	
	if(hierarchy!=null){
		Gson gson = new GsonBuilder().excludeFieldsWithModifiers(Modifier.PROTECTED).create();
		jsonRepresentation= gson.toJson(hierarchy);
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
