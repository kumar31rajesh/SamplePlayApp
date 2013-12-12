/**
 * 
 */
package controllers;

import java.util.List;

import models.Wine;
import models.WineAccessor;
import models.WineDAO;
import play.mvc.Result;

import com.google.gson.Gson;


/**
 * @author cerrid
 *
 */
public class WineCellarController extends WineController {

	static WineDAO dao = new WineDAO();
		
	public static Result index() {
	    return ok(
	        //cellar.render()
	    );
	}
	
	public static Result findAll() {
		System.out.println("findAll");
		
		//String json = new Gson().toJson(dao.findAll());
		//String json = new Gson().toJson(WineAccessor.findAll());		
		return ok(toJsonData(WineAccessor.findAll()));
	
	}

	
	public List<Wine> findByName(String query) {
		System.out.println("findByName: " + query);
		return dao.findByName(query);
	}

	
	public Wine findById(String id) {
		System.out.println("findById " + id);
		return dao.findById(Integer.parseInt(id));
	}

	public Wine create(Wine wine) {
		return dao.create(wine);
	}

	
	public Wine update(Wine wine) {
		System.out.println("Updating wine: " + wine.getName());
		dao.update(wine);
		return wine;
	}
	
	public void remove(String id) {
		dao.remove(Integer.parseInt(id));
	}

}
