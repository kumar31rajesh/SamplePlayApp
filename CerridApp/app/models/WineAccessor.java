package models;

import java.util.ArrayList;
import java.util.List;

import controllers.MorphiaObject;

public class WineAccessor {
	
	public static List<Wine> findAll() {
		if (MorphiaObject.datastore != null) {
            return MorphiaObject.datastore.find(Wine.class).asList();
    } else {
            return new ArrayList<Wine>();
    }
	}

}
