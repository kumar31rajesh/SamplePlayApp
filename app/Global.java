import java.net.UnknownHostException;

import play.GlobalSettings;
import play.Logger;

import com.google.code.morphia.Morphia;
import com.mongodb.Mongo;

import controllers.MorphiaObject;

public class Global extends GlobalSettings {
        @Override
        public void onStart(play.Application arg0) {
                super.beforeStart(arg0);
                Logger.debug("** onStart **");
                try {
                        MorphiaObject.mongo = new Mongo("127.0.0.1", 27017);
                } catch (UnknownHostException e) {
                        e.printStackTrace();
                }
                MorphiaObject.morphia = new Morphia();
		MorphiaObject.datastore = MorphiaObject.morphia.createDatastore(
				MorphiaObject.mongo, "cerrid_app_dev");
                MorphiaObject.datastore.ensureIndexes();
                MorphiaObject.datastore.ensureCaps();

                Logger.debug("** Morphia datastore: " + MorphiaObject.datastore.getDB());
        }

	/*
	 * @SuppressWarnings("rawtypes")
	 * 
	 * @Override public play.mvc.Action onRequest(play.mvc.Http.Request request,
	 * Method actionMethod) { String username =
	 * request.cookie("username").value(); if (username != null &&
	 * !username.isEmpty()) { return super.onRequest(request, actionMethod); }
	 * else { return null;// redirect("/home"); }
	 * 
	 * }
	 */
}