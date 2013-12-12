package controllers;

import java.util.List;

import com.google.gson.Gson;

import play.mvc.Controller;

public class WineController extends Controller{
	
	public  static String toJsonData(List<?> list){
		
		return new Gson().toJson(list) ;
		
	}

}
