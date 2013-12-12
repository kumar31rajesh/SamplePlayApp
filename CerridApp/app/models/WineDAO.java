package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;

import com.mongodb.MongoClient;

import com.google.code.morphia.Datastore;
import com.google.code.morphia.Morphia;
import com.mongodb.Mongo;

/**
 * @author Christophe Coenraets
 */
public class WineDAO {

    public List<Wine> findAll() {
        List<Wine> list = new ArrayList<Wine>();
        Connection c = null;
    	String sql = "SELECT * FROM wine_details ORDER BY name";
        try {
            c = ConnectionHelper.getConnection();
            Statement s = c.createStatement();
            ResultSet rs = s.executeQuery(sql);
            while (rs.next()) {
                list.add(processRow(rs));
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.connectMongo();
			ConnectionHelper.close(c);
		}
        return list;
    }
    
    public String findAllData() {
    	String result =null;
    	
    	try {
    
            // Since 2.10.0, uses MongoClient
           	MongoClient mongo = new MongoClient("localhost", 27017);
           	
           	Mongo m=	new Mongo("127.0.0.1", 27017);
           	Morphia mph= new Morphia();
           	Datastore  datastore=mph.createDatastore(m, "cellar");
            datastore.ensureIndexes();
            datastore.ensureCaps(); 
           	datastore.getDB();
            
           	/**** Get database ****/
           	// if database doesn't exists, MongoDB will create it for you
           	DB db = mongo.getDB("cellar");
            
           	/**** Get collection / table from 'testdb' ****/
           	// if collection doesn't exists, MongoDB will create it for you
           	DBCollection table = db.getCollection("cellar");
           	DBCursor cursor = table.find();
           	
           	 
           	while (cursor.hasNext()) {
           		
           		if(result!=null)
           		result=result+cursor.next() ;
           		else
           		result=cursor.next().toString() ;
           	}
           	
           
           	
   		} catch (Exception e) {
   			e.printStackTrace();
   		}
    	return result ;
    }

    
    public List<Wine> findByName(String name) {
        List<Wine> list = new ArrayList<Wine>();
        Connection c = null;
    	String sql = "SELECT * FROM wine_details as e " +
			"WHERE UPPER(name) LIKE ? " +	
			"ORDER BY name";
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, "%" + name.toUpperCase() + "%");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                list.add(processRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return list;
    }
    
    public Wine findById(int id) {
    	String sql = "SELECT * FROM wine_details WHERE id = ?";
        Wine wine = null;
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                wine = processRow(rs);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return wine;
    }

    public Wine save(Wine wine)
	{
		return null;//wine.getId() > 0 ? update(wine) : create(wine);
	}    
    
    public Wine create(Wine wine) {
        Connection c = null;
        PreparedStatement ps = null;
        try {
            c = ConnectionHelper.getConnection();
            ps = c.prepareStatement("INSERT INTO wine_details (name, grapes, country, region, year, imageurl, description,price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                new String[] { "ID" });
            ps.setString(1, wine.getName());
            ps.setString(2, wine.getGrapes());
            ps.setString(3, wine.getCountry());
            ps.setString(4, wine.getRegion());
            ps.setString(5, wine.getYear());
            ps.setString(6, wine.getImageurl());
            ps.setString(7, wine.getDescription());
            ps.setDouble(8, wine.getPrice());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            rs.next();
            // Update the id in the returned object. This is important as this value must be returned to the client.
            int id = rs.getInt(1);
            //wine.setId(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return wine;
    }

    public Wine update(Wine wine) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("UPDATE wine_details SET name=?, grapes=?, country=?, region=?, year=?, imageurl=?, description=?,price=? WHERE id=?");
            ps.setString(1, wine.getName());
            ps.setString(2, wine.getGrapes());
            ps.setString(3, wine.getCountry());
            ps.setString(4, wine.getRegion());
            ps.setString(5, wine.getYear());
            ps.setString(6, wine.getImageurl());
            ps.setString(7, wine.getDescription());
            ps.setDouble(8, wine.getPrice());
            //ps.setInt(9, wine.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
        return wine;
    }

    public boolean remove(int id) {
        Connection c = null;
        try {
            c = ConnectionHelper.getConnection();
            PreparedStatement ps = c.prepareStatement("DELETE FROM wine_details WHERE id=?");
            ps.setInt(1, id);
            int count = ps.executeUpdate();
            return count == 1;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
    }

    protected Wine processRow(ResultSet rs) throws SQLException {
        Wine wine = new Wine();
        //wine.setId(rs.getInt("id"));
        wine.setName(rs.getString("name"));
        wine.setGrapes(rs.getString("grapes"));
        wine.setCountry(rs.getString("country"));
        wine.setRegion(rs.getString("region"));
        wine.setYear(rs.getString("year"));
        wine.setImageurl(rs.getString("imageurl"));
        wine.setDescription(rs.getString("description"));
        wine.setPrice(rs.getDouble("price"));
        return wine;
    }
    
}
