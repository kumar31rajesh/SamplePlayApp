package models;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ResourceBundle;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;

public class ConnectionHelper
{
	private String url;
	private static ConnectionHelper instance;

	private ConnectionHelper()
	{
    	String driver = null;
    	
   
		try {
			Class.forName("com.mysql.jdbc.Driver");
			url = "jdbc:mysql://localhost/cellar?user=root&password=root";
            ResourceBundle bundle = ResourceBundle.getBundle("cellar");
            driver = bundle.getString("jdbc.driver");
            Class.forName(driver);
            url=bundle.getString("jdbc.url");
     
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static Connection getConnection() throws SQLException {
		if (instance == null) {
			instance = new ConnectionHelper();
		}
		try {
			return DriverManager.getConnection(instance.url);
		} catch (SQLException e) {
			throw e;
		}
	}
	
	public static void close(Connection connection)
	{
		try {
			if (connection != null) {
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static void connectMongo(){
		try {
	
            
         // Since 2.10.0, uses MongoClient
        	MongoClient mongo = new MongoClient("localhost", 27017);
         
        	/**** Get database ****/
        	// if database doesn't exists, MongoDB will create it for you
        	DB db = mongo.getDB("cellar");
         
        	/**** Get collection / table from 'testdb' ****/
        	// if collection doesn't exists, MongoDB will create it for you
        	DBCollection table = db.getCollection("cellar");
        	DBCursor cursor = table.find();
        	 
        	while (cursor.hasNext()) {
        		System.out.println("############Mongo Result##############"+cursor.next());
        	}
        	
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}