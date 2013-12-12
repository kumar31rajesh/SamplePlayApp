package models;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

import com.google.code.morphia.annotations.Entity;

import controllers.MorphiaObject;

/**
 * @author Christophe Coenraets
 */
@Entity
public class Wine {

    private ObjectId _id;
    private int id;

    public void setId(int id) {
		this.id = id;
	}
    public void getId(int id) {
		this.id = id;
	}


	private String name;

    private String grapes;

    private String country;

    private String region;
    
    private String year;
    
    private String imageurl;

    private String description;
    
    private double price ; 

	public ObjectId getId() {
		return _id;
	}

	public void setId(ObjectId id) {
		this._id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGrapes() {
		return grapes;
	}

	public void setGrapes(String grapes) {
		this.grapes = grapes;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	

	public String getImageurl() {
		return imageurl;
	}

	public void setImageurl(String imageurl) {
		this.imageurl = imageurl;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	

}
