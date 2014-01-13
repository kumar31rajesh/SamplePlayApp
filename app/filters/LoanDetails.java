package filters;

import java.util.List;

import controllers.MorphiaObject;
import models.Hierarchy;
import models.LoanData;


public class LoanDetails {
	
	public static List<LoanData> getLoanDetails(Long id){
		List<LoanData> loandata=null;
		if (MorphiaObject.datastore != null) {
			loandata = MorphiaObject.datastore.find(LoanData.class)
					.filter("id", id).asList();
		}
		return loandata ;
	}
	
	public static List<Hierarchy> getHirarchy(){
		List<Hierarchy> hi=null;
		
		if (MorphiaObject.datastore != null) {
			hi = MorphiaObject.datastore.find(Hierarchy.class).asList();
		}
		return hi ;
		
	}

}
