package filters;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import models.DataSet;
import models.User;
import play.Play;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;

import com.cerrid.model.collections.DataMart;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.io.Files;

import controllers.MorphiaObject;

public class ApplicationServices {
	private static String fsinboundstore = Play.application().configuration()
			.getString("fsinboundstore");

	public static boolean loginValidation(JsonNode asJson) {
		User user = null;
		boolean isAuthentic = false;
		if (MorphiaObject.datastore != null) {
			System.out.println(asJson.get("email").asText());
			user = MorphiaObject.datastore.find(User.class)
					.filter("username", asJson.get("email").asText()).get();
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
		
		System.out.println(asJson.get("email").asText());
	
		isAuthentic =( (asJson.get("email").asText().equals("support@cerridsolutions") ? true : false) && (asJson.get("password").asText().equals("cerrid@admin2014") ? true : false) );
		
		return isAuthentic;
	}

	public static boolean saveUser(JsonNode asJson) {
		User user =null;
		boolean issaved=false;
		System.out.println("saveUser");
		if (MorphiaObject.datastore != null) {
			System.out.println(asJson.get("email").asText());
			user = MorphiaObject.datastore.find(User.class)
					.filter("username", asJson.get("email").asText()).get();
			if ((user==null)) {
				user=new User();
				user.setUsername(asJson.get("email").asText());
				user.setPassword(asJson.get("password").asText());
				user.setDomain(asJson.get("domain").asText());
				MorphiaObject.datastore.save(user);
				issaved=true ;
			}
		}
		return issaved;
	}

	public static String getLoanDetails(String columns, String id) {
		if (columns.equals("")) {
			columns="[{\"mData\":\"AdditionalBondDescription\",\"sTitle\":\"AdditionalBondDescription\"},{\"mData\":\"__count__\",\"sTitle\":\"__count__\"},{\"mData\":\"CurrentFactor\",\"sTitle\":\"CurrentFactor\"},{\"mData\":\"BECDR\",\"sTitle\":\"BECDR\"},{\"mData\":\"ResidualBondFlag\",\"sTitle\":\"ResidualBondFlag\"},{\"mData\":\"OriginalSubordinationPct\",\"sTitle\":\"OriginalSubordinationPct\"},"
					+ "{\"mData\":\"OriginalMoodysRating\",\"sTitle\":\"OriginalMoodysRating\"},{\"mData\":\"CurrentSubordinationPct\",\"sTitle\":\"CurrentSubordinationPct\"},{\"mData\":\"OriginalSnPRating\",\"sTitle\":\"OriginalSnPRating\"},{\"mData\":\"floaterIndex\",\"sTitle\":\"floaterIndex\"},{\"mData\":\"RatedMaturity\",\"sTitle\":\"RatedMaturity\"},"
					+ "{\"mData\":\"cumBondLossPct\",\"sTitle\":\"cumBondLossPct\"},{\"mData\":\"CUSIP\",\"sTitle\":\"CUSIP\"},{\"mData\":\"CurrentBalance\",\"sTitle\":\"CurrentBalance\"},"
					+ "{\"mData\":\"Coupon\",\"sTitle\":\"Coupon\"},{\"mData\":\"OriginalBalance\",\"sTitle\":\"OriginalBalance\"},{\"mData\":\"CouponDescription\",\"sTitle\":\"CouponDescription\"},"
					+ "{\"mData\":\"curCreditThickness\",\"sTitle\":\"curCreditThickness\"},{\"mData\":\"TreppDealName\",\"sTitle\":\"TreppDealName\"},{\"mData\":\"TrancheName\",\"sTitle\":\"TrancheName\"},{\"mData\":\"SeniorBondClassification\",\"sTitle\":\"SeniorBondClassification\"},{\"mData\":\"InterestShortfall\",\"sTitle\":\"InterestShortfall\"},"
					+ "{\"mData\":\"TapeDate\",\"sTitle\":\"TapeDate\"},{\"mData\":\"denomCurrency\",\"sTitle\":\"denomCurrency\"},{\"mData\":\"PeriodBondLoss\",\"sTitle\":\"PeriodBondLoss\"},{\"mData\":\"secCreditThickness\",\"sTitle\":\"secCreditThickness\"},{\"mData\":\"Interest\",\"sTitle\":\"Interest\"},{\"mData\":\"defeaseCreditEnhance\",\"sTitle\":\"defeaseCreditEnhance\"},{\"mData\":\"CurrentSnPRating\",\"sTitle\":\"CurrentSnPRating\"},{\"mData\":\"CurrentFitchRating\",\"sTitle\":\"CurrentFitchRating\"},{\"mData\":\"OriginalFitchRating\",\"sTitle\":\"OriginalFitchRating\"},{\"mData\":\"MasterBondIDTrepp\",\"sTitle\":\"MasterBondIDTrepp\"}]";
		} else {
			String[] arr=columns.split(",");
			columns="[";
			for(int i=0;i<arr.length-1;i++){
				columns=columns+"{\"mData\":\""+arr[i]+"\",\"sTitle\":\""+arr[i].toUpperCase()+"\"}," ;
			}
			columns=columns+"{\"mData\":\""+arr[arr.length-1]+"\",\"sTitle\":\""+arr[arr.length-1].toUpperCase()+"\"}" ;
			columns=columns+"]";
		}
		String jsonRepresentation = "[{\"SeniorBondClassification\":\"na\",\"AdditionalBondDescription\":\"Fixed Rate\",\"InterestShortfall\":0,\"TapeDate\":20120813,\"__count__\":1,\"denomCurrency\":\"USD\",\"PeriodBondLoss\":0,"
				+ "\"secCreditThickness\":67.287,\"Interest\":379306.66,\"defeaseCreditEnhance\":\"na\",\"CurrentFactor\":1,\"CurrentSnPRating\":\"na\",\"CurrentFitchRating\":\"na\",\"BECDR\":\"99999\",\"OriginalFitchRating\":\"na\",\"OriginalSubordinationPct\":32.71,\"ResidualBondFlag\":\"N\","
				+ "\"CurrentSubordinationPct\":32.71,\"OriginalMoodysRating\":\"na\",\"MasterBondIDTrepp\":\"1375.T2\",\"CurrentMoodysRating\":\"na\",\"OriginalSnPRating\":\"AAA\",\"ISIN\":\"na\",\"Penalty\":0,\"floaterIndex\":\"na\",\"RatedMaturity\":20371013,\"cumBondLossPct\":0,"
				+ "\"CUSIP\":\"682439AC8\",\"CumulativeLosses\":0,\"cpnSpread\":\"na\",\"CurrentBalance\":80000000,\"Coupon\":5.6896,\"OriginalBalance\":80000000,\"CouponDescription\":\"Fixed Rate\",\"curCreditThickness\":67.287,\"PrincipalDistribution\":0,\"TreppDealName\":\"116605c6\",\"TrancheName\":\"A-2\"}]"; 
		System.out.println("{\"aoColumns\":" + columns + ",\"aaData\":"
				+ jsonRepresentation + "}");
		return "{\"aoColumns\":"+columns+",\"aaData\":"+jsonRepresentation+"}" ;
	}
	
	public static List<DataMart> getHirarchy() {
		List<DataMart> hi = null;
		if (MorphiaObject.datastore != null) {
			hi = MorphiaObject.datastore.find(DataMart.class).asList();
		}
		return hi ;
		
	}

	public static boolean uploadCSVFile(MultipartFormData body) {
		FilePart file = body.getFile("filepath");
		Map<String,String[]>  fileinfo=body.asFormUrlEncoded();
		File outFile = null;
		DataSet dataset=null;
		boolean uploaded = false;
		  if (file != null) {
		    File inFile = file.getFile();
			outFile = new File(fsinboundstore + file.getFilename());
		    try {
		    	System.out.println(fileinfo.get("dslabel")[0]+""+fileinfo.get("dsname")[0]+""+fileinfo.get("dstype")[0]);
				Files.copy(inFile, outFile);
				if (MorphiaObject.datastore != null) {
					dataset = MorphiaObject.datastore.find(DataSet.class)
							.filter("name", fileinfo.get("dsname")[0]).get();
					if(dataset==null)
					{
						dataset=new DataSet();	
						dataset.setLabel(fileinfo.get("dslabel")[0]);
						dataset.setName(fileinfo.get("dsname")[0]);
						dataset.setType(fileinfo.get("dstype")[0]);
						dataset.setFilepath(fsinboundstore + file.getFilename());
						MorphiaObject.datastore.save(dataset);
					}
					uploaded = true;
				}
			} catch (IOException e1) {
					e1.printStackTrace();
			}
		}
		return uploaded;
	}

	public static List<DataSet> getDataSourceList(String label) {
		List<DataSet> dataset = null;
		if (MorphiaObject.datastore != null) {
			dataset = MorphiaObject.datastore.find(DataSet.class).filter("label",label).asList();
		}
		return dataset ; 
	}

	public static Map<Integer,String> loadFileContents(Map<String, String[]> data) {
		Map<String,String[]>  fileinfo=data;
		BufferedReader br = null;
		String line = "";
		Map<Integer,String> filedata=new HashMap<Integer,String>();
		try {
			int i=0;
			br = new BufferedReader(new FileReader(fileinfo.get("filepath")[0]));
			while ((line = br.readLine()) != null) {
				filedata.put(i, line.replace("\"",""));
				if(i>0)
				break;
				i=i+1;
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		System.out.println("Done"+filedata);
		return filedata;
	}

	public static String loadBarChart() {
		String jsondata="[{\"color\": \"steelblue\",\"name\": \"New York\",\"data\": [ { \"x\": 0, \"y\": 40 }, { \"x\": 1, \"y\": 49 }"
				+ ", { \"x\": 2, \"y\": 38 }, { \"x\": 3, \"y\": 30 }, { \"x\": 4, \"y\": 32 } ]}, {\"color\": \"Brown\","
				+ "\"name\": \"London\",\"data\": [ { \"x\": 0, \"y\": 19 }, { \"x\": 1, \"y\": 22 }, { \"x\": 2,\"y\": 29 },"
				+ " { \"x\": 3, \"y\": 20 }, { \"x\": 4, \"y\": 14 } ]}, "
				+ "{\"color\": \"Gray\",\"name\": \"Tokyo\",\"data\": [ { \"x\": 0, \"y\": 8 }, { \"x\": 1, \"y\": 12 }, { \"x\": 2, \"y\": 15 }, { \"x\": 3, \"y\": 11 }, {\"x\": 4, \"y\": 10 } ]}]" ;
		return jsondata;
	}
}
