require.config({
  paths : {
    bootstrap : 'lib/bootstrap-3-1-1-dist/js/bootstrap',
    backbone : 'lib/backbone-marionette/backbone',
    underscore : 'lib/backbone-marionette/underscore',
    jquery : 'lib/jquery-1-9-0-min',
    marionette : 'lib/backbone-marionette/backbone-marionette',
    'backbone.wreqr' : 'lib/backbone-marionette/backbone-wreqr',
    'backbone.babysitter' : 'lib/backbone-marionette/backbone-babysitter'
  },
  shim : {
    jquery : {
      exports : 'jQuery'
    },
    underscore : {
      exports : '_'
    },
    bootstrap : {
      deps : ['jquery'],
      exports : 'Bootstrap'
    },
    backbone : {
      deps : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    marionette : {
      deps : ['jquery', 'underscore', 'backbone'],
      exports : 'Marionette'
    }
  }
});

define(['app']);