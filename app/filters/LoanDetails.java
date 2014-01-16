package filters;

import java.util.List;

import com.cerrid.model.collections.DataMart;

import controllers.MorphiaObject;


public class LoanDetails {
	
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

}
