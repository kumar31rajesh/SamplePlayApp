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

		
	/*	ArrayList al=new ArrayList();
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
		col=col+"]";*/
	
		
		String[] cols = { "id", "name", "amount", "age", "place","salary" };
	    String table = "cerridApp";
	     
	    /*JSONObject result = new JSONObject();
	    JSONArray array = new JSONArray();*/
	    
	    int amount = 10;
	    int start = 0;
	    int echo = 0;
	    int col = 0;
	     
	    String tableid = "";
	    String tablename = "";
	    String tableamount = "";
	    String tableage = "";
	    String tableplace = "";
	    String tablesalary = "";
	 
	    String dir = "asc";
	    String sStart = request().getQueryString("iDisplayStart");
	    String sAmount = request().getQueryString("iDisplayLength");
	    String sEcho = request().getQueryString("sEcho");
	    String sCol = request().getQueryString("iSortCol_0");
	    String sdir = request().getQueryString("sSortDir_0");
	     
	    tableid= request().getQueryString("sSearch_0");
	    tablename = request().getQueryString("sSearch_1");
	    tableamount = request().getQueryString("sSearch_2");
	    tableage = request().getQueryString("sSearch_3");
	    tableplace = request().getQueryString("sSearch_4");
	    tablesalary = request().getQueryString("sSearch_5");
	    
	     
	    List<String> sArray = new ArrayList<String>();
	    if (!tableid.equals("")) {
	        String sEngine = " engine like '%" + tableid + "%'";
	        sArray.add(sEngine);

	    }
	    if (!tablename.equals("")) {
	        String sBrowser = " browser like '%" + tablename + "%'";
	        sArray.add(sBrowser);
	    }
	    if (!tableamount.equals("")) {
	        String sPlatform = " platform like '%" + tableamount + "%'";
	        sArray.add(sPlatform);
	    }
	    if (!tableage.equals("")) {
	        String sVersion = " version like '%" + tableage + "%'";
	        sArray.add(sVersion);
	    }
	    if (!tableplace.equals("")) {
	        String sGrade = " grade like '%" + tableplace + "%'";
	        sArray.add(sGrade);
	    }
	    if (!tablesalary.equals("")) {
	        String sal = " grade like '%" + tablesalary + "%'";
	        sArray.add(sal);
	    }
	     
	    String individualSearch = "";
	    if(sArray.size()==1){
	        individualSearch = sArray.get(0);
	    }else if(sArray.size()>1){
	        for(int i=0;i<sArray.size()-1;i++){
	            individualSearch += sArray.get(i)+ " and ";
	        }
	        individualSearch += sArray.get(sArray.size()-1);
	    }
	     
	    if (sStart != null) {
	        start = Integer.parseInt(sStart);
	        if (start < 0)
	            start = 0;
	    }
	    if (sAmount != null) {
	        amount = Integer.parseInt(sAmount);
	        if (amount < 10 || amount > 100)
	            amount = 10;
	    }
	    if (sEcho != null) {
	        echo = Integer.parseInt(sEcho);
	    }
	    if (sCol != null) {
	        col = Integer.parseInt(sCol);
	        if (col < 0 || col > 5)
	            col = 0;
	    }
	    if (sdir != null) {
	        if (!sdir.equals("asc"))
	            dir = "desc";
	    }
	 
		 
		System.out.println(jsonRepresentation);
		//return ok("{\"columns\":"+col+",\"data\":"+jsonRepresentation+"}");
		return ok("{\"sEcho\":"+request().getQueryString("sEcho")+",\"iTotalRecords\":"+ldata.size()+",\"iTotalDisplayRecords\":"+ldata.size()+",\"aaData\":"+jsonRepresentation+"}");
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
	
	
	

}
