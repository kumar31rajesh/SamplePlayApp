package filters;

import controllers.MorphiaObject;
import models.LoanData;


public class LoanDetails {
	
	public static LoanData getLoanDetails(Long id){
		LoanData loandata=null;
		if (MorphiaObject.datastore != null) {
			loandata = MorphiaObject.datastore.find(LoanData.class)
					.filter("id", id).get();
		}
		return loandata ;
	}

}
