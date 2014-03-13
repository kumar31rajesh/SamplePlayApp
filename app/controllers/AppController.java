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
import play.mvc.Security;

import com.cerrid.model.collections.DataMart;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import filters.ApplicationServices;

@Security.Authenticated(Secured.class)
public class AppController extends Controller {

	public static Result details() {
		String dataTableData = null;
		Map<String,String[]>  data=request().body().asFormUrlEncoded();
		
		try {
			String tablecolumns=data.get("datacolumns")[0];
			System.out.println("columns"+tablecolumns);
			//52d786eb44ae1f357323d228
			
		//	dataTableData = ReportingService.getDataTableData(data.get("dataid")[0]);
			dataTableData = ApplicationServices.getLoanDetails(tablecolumns,data.get("dataid")[0]);
			
		}catch ( Exception e) {
			e.printStackTrace();
		} 
		return ok(dataTableData);
	}

	public static Result dataSource(String label) {
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
	List<Hierarchy> hiearchy = new ArrayList<Hierarchy>();
	for (DataMart hierarchy2 : dataMarts) {
		Hierarchy h1 = new Hierarchy();
		h1.setId(hierarchy2.getId().toString());
		h1.setLabel(hierarchy2.getName());
		hiearchy.add(h1);
	}
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

	public static Result uploadDataSourceCSVFile() {
	

	MultipartFormData body = request().body().asMultipartFormData();
	
	boolean uploaded=ApplicationServices.uploadCSVFile(body);
	
	  
	  if(uploaded)
			return ok("{\"isSaved\":\"true\"}");
		else
			return ok("{\"isSaved\":\"false\",\"error\":\"internal server error\"}");

}

public static Result loadFileContents(){
	
	Map<String,String[]>  data=request().body().asFormUrlEncoded();
	
	Map<Integer, String> result=ApplicationServices.loadFileContents(data);
	
	  
	  if(result==null)
			return ok("{\"is\":\"false\"}");
		else
			return ok(result.get(0).toString());
	
}

public static Result loadChartData(){
	
	//Map<String,String[]>  data=request().body().asFormUrlEncoded();
	
	String result=ApplicationServices.loadBarChart();
	
	  
	  if(result==null)
			return ok("{\"is\":\"false\"}");
		else
			return ok(result);
	
}


}
