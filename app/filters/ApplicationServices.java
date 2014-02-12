package filters;


import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import play.mvc.Http.RequestBody;
import models.DataSet;
import models.User;

import com.cerrid.model.collections.DataMart;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.io.Files;

import controllers.MorphiaObject;

public class ApplicationServices {

	public static boolean loginValidation(JsonNode asJson) {
		User user = null;
		boolean isAuthentic = false;
		if (MorphiaObject.datastore != null) {
			System.out.println(asJson.get("email").asText());
			user = MorphiaObject.datastore.find(User.class)
					.filter("email", asJson.get("email").asText()).get();
		}
		if (user == null) {
			isAuthentic = false;
			return isAuthentic;
		}
		isAuthentic = asJson.get("password").asText().equals(user.getPassword()) ? true : false;
		
		
		
		return isAuthentic;
	}

	public static boolean adminValidation(JsonNode asJson) {
		// TODO Auto-generated method stub
		boolean isAuthentic ;
		System.out.println("adminvalidation");
		
		System.out.println(asJson.get("username").asText());
	
		isAuthentic =( (asJson.get("username").asText().equals("support@cerridsolutions") ? true : false) && (asJson.get("password").asText().equals("cerrid@admin2014") ? true : false) );
		
		return isAuthentic;
	}

	public static boolean saveUser(JsonNode asJson) {
		// TODO Auto-generated method stub
		User user =null;
		boolean issaved=false;
		System.out.println("saveUser");
		if (MorphiaObject.datastore != null) {
			System.out.println(asJson.get("email").asText());
			user = MorphiaObject.datastore.find(User.class).filter("email", asJson.get("email").asText()).get();
			
			if ((user==null)) {
				user=new User();
				user.setEmail(asJson.get("email").asText());
				user.setPassword(asJson.get("password").asText());
				user.setDomain(asJson.get("domain").asText());
				MorphiaObject.datastore.save(user);
				issaved=true ;
			}
		}
		
		
		return issaved;
	}
	
	
	public static List<DataMart> getLoanDetails(Long id) {
		List<DataMart> loandata = null;
		if (MorphiaObject.datastore != null) {
			loandata = MorphiaObject.datastore.find(DataMart.class).asList();
		}
		return loandata ;
	}
	
	public static List<DataMart> getHirarchy() {
		List<DataMart> hi = null;
		
		if (MorphiaObject.datastore != null) {
			hi = MorphiaObject.datastore.find(DataMart.class).asList();
		}
		return hi ;
		
	}

	public static boolean uploadCSVFile(MultipartFormData body) {
		// TODO Auto-generated method stub
		
		FilePart file = body.getFile("filepath");
		Map<String,String[]>  fileinfo=body.asFormUrlEncoded();
	
		File outFile = null;
		DataSet dataset=null;
		
		boolean uploaded=false;
		  if (file != null) {
		    File inFile = file.getFile();
		    outFile = new File("/home/cerrid/cerrid/UploadedFiles/" + file.getFilename());
		    
		    try {
		    	System.out.println(fileinfo.get("dslabel")[0]+""+fileinfo.get("dsname")[0]+""+fileinfo.get("dstype")[0]);
				Files.copy(inFile, outFile);
				
				if (MorphiaObject.datastore != null) {
					
					dataset=MorphiaObject.datastore.find(DataSet.class).filter("name",fileinfo.get("dsname")[0]).get() ;
					if(dataset==null)
					{
						dataset=new DataSet();	
						dataset.setLabel(fileinfo.get("dslabel")[0]);
						dataset.setName(fileinfo.get("dsname")[0]);
						dataset.setType(fileinfo.get("dstype")[0]);;
						MorphiaObject.datastore.save(dataset);
					}
					
					uploaded=true;
					
													}
				
				
				 }catch (IOException e1) {
					e1.printStackTrace();
										}
		
		  					}
		  
		  return uploaded ;
	}

	public static List<DataSet> getDataSourceList(String label) {
		// TODO Auto-generated method stub
		List<DataSet> dataset = null;
		if (MorphiaObject.datastore != null) {
			dataset = MorphiaObject.datastore.find(DataSet.class).filter("label",label).asList();
		}
		return dataset ; 
	}
}
