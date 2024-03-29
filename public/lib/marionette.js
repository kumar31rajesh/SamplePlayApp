// MarionetteJS (Backbone.Marionette)
// ----------------------------------
// v1.0.3
//
// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://marionettejs.com
/*!
 * Includes BabySitter
 * https://github.com/marionettejs/backbone.babysitter/
 *
 * Includes Wreqr
 * https://github.com/marionettejs/backbone.wreqr/
 */
Backbone.ChildViewContainer = function (e, t) {
    var i = function (e) {
        this._views = {}, this._indexByModel = {}, this._indexByCollection = {}, this._indexByCustom = {}, this._updateLength(), this._addInitialViews(e)
    };
    t.extend(i.prototype, {
        add: function (e, t) {
            var i = e.cid;
            this._views[i] = e, e.model && (this._indexByModel[e.model.cid] = i), e.collection && (this._indexByCollection[e.collection.cid] = i), t && (this._indexByCustom[t] = i), this._updateLength()
        },
        findByModel: function (e) {
            var t = this._indexByModel[e.cid];
            return this.findByCid(t)
        },
        findByCollection: function (e) {
            var t = this._indexByCollection[e.cid];
            return this.findByCid(t)
        },
        findByCustom: function (e) {
            var t = this._indexByCustom[e];
            return this.findByCid(t)
        },
        findByIndex: function (e) {
            return t.values(this._views)[e]
        },
        findByCid: function (e) {
            return this._views[e]
        },
        remove: function (e) {
            var t = e.cid;
            e.model && delete this._indexByModel[e.model.cid], e.collection && delete this._indexByCollection[e.collection.cid];
            var i;
            for (var n in this._indexByCustom)
                if (this._indexByCustom.hasOwnProperty(n) && this._indexByCustom[n] === t) {
                    i = n;
                    break
                }
            i && delete this._indexByCustom[i], delete this._views[t], this._updateLength()
        },
        call: function (e, t) {
            t = Array.prototype.slice.call(arguments, 1), this.apply(e, t)
        },
        apply: function (e, i) {
            i = i || [], t.each(this._views, function (n) {
                t.isFunction(n[e]) && n[e].apply(n, i)
            })
        },
        _updateLength: function () {
            this.length = t.size(this._views)
        },
        _addInitialViews: function (e) {
            if (e) {
                var t, i, n = e.length;
                for (i = 0; n > i; i++) t = e[i], this.add(t)
            }
        }
    });
    var n = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck"];
    return t.each(n, function (e) {
        i.prototype[e] = function () {
            var i = t.values(this._views),
                n = [i].concat(t.toArray(arguments));
            return t[e].apply(t, n)
        }
    }), i
}(Backbone, _), Backbone.Wreqr = function (e, t, i) {
    "use strict";
    var n = {};
    return n.Handlers = function (e, t) {
        var i = function (e) {
            this.options = e, this._wreqrHandlers = {}, t.isFunction(this.initialize) && this.initialize(e)
        };
        return i.extend = e.Model.extend, t.extend(i.prototype, e.Events, {
            setHandlers: function (e) {
                t.each(e, function (e, i) {
                    var n = null;
                    t.isObject(e) && !t.isFunction(e) && (n = e.context, e = e.callback), this.setHandler(i, e, n)
                }, this)
            },
            setHandler: function (e, t, i) {
                var n = {
                    callback: t,
                    context: i
                };
                this._wreqrHandlers[e] = n, this.trigger("handler:add", e, t, i)
            },
            hasHandler: function (e) {
                return !!this._wreqrHandlers[e]
            },
            getHandler: function (e) {
                var t = this._wreqrHandlers[e];
                if (!t) throw Error("Handler not found for '" + e + "'");
                return function () {
                    var e = Array.prototype.slice.apply(arguments);
                    return t.callback.apply(t.context, e)
                }
            },
            removeHandler: function (e) {
                delete this._wreqrHandlers[e]
            },
            removeAllHandlers: function () {
                this._wreqrHandlers = {}
            }
        }), i
    }(e, i), n.CommandStorage = function () {
        var t = function (e) {
            this.options = e, this._commands = {}, i.isFunction(this.initialize) && this.initialize(e)
        };
        return i.extend(t.prototype, e.Events, {
            getCommands: function (e) {
                var t = this._commands[e];
                return t || (t = {
                    command: e,
                    instances: []
                }, this._commands[e] = t), t
            },
            addCommand: function (e, t) {
                var i = this.getCommands(e);
                i.instances.push(t)
            },
            clearCommands: function (e) {
                var t = this.getCommands(e);
                t.instances = []
            }
        }), t
    }(), n.Commands = function (e) {
        return e.Handlers.extend({
            storageType: e.CommandStorage,
            constructor: function (t) {
                this.options = t || {}, this._initializeStorage(this.options), this.on("handler:add", this._executeCommands, this);
                var i = Array.prototype.slice.call(arguments);
                e.Handlers.prototype.constructor.apply(this, i)
            },
            execute: function (e, t) {
                e = arguments[0], t = Array.prototype.slice.call(arguments, 1), this.hasHandler(e) ? this.getHandler(e).apply(this, t) : this.storage.addCommand(e, t)
            },
            _executeCommands: function (e, t, n) {
                var r = this.storage.getCommands(e);
                i.each(r.instances, function (e) {
                    t.apply(n, e)
                }), this.storage.clearCommands(e)
            },
            _initializeStorage: function (e) {
                var t, n = e.storageType || this.storageType;
                t = i.isFunction(n) ? new n : n, this.storage = t
            }
        })
    }(n), n.RequestResponse = function (e) {
        return e.Handlers.extend({
            request: function () {
                var e = arguments[0],
                    t = Array.prototype.slice.call(arguments, 1);
                return this.getHandler(e).apply(this, t)
            }
        })
    }(n), n.EventAggregator = function (e, t) {
        var i = function () {};
        return i.extend = e.Model.extend, t.extend(i.prototype, e.Events), i
    }(e, i), n
}(Backbone, Backbone.Marionette, _);
var Marionette = function (e, t, i) {
    "use strict";

    function n(e) {
        return s.call(e)
    }

    function r(e, t) {
        var i = Error(e);
        throw i.name = t || "Error", i
    }
    var o = {};
    t.Marionette = o, o.$ = t.$;
    var s = Array.prototype.slice;
    return o.extend = t.Model.extend, o.getOption = function (e, t) {
        if (e && t) {
            var i;
            return i = e.options && t in e.options && void 0 !== e.options[t] ? e.options[t] : e[t]
        }
    }, o.triggerMethod = function () {
        function e(e, t, i) {
            return i.toUpperCase()
        }
        var t = /(^|:)(\w)/gi,
            n = function (n) {
                var r = "on" + n.replace(t, e),
                    o = this[r];
                return this.trigger.apply(this, arguments), i.isFunction(o) ? o.apply(this, i.tail(arguments)) : void 0
            };
        return n
    }(), o.MonitorDOMRefresh = function () {
        function e(e) {
            e._isShown = !0, n(e)
        }

        function t(e) {
            e._isRendered = !0, n(e)
        }

        function n(e) {
            e._isShown && e._isRendered && i.isFunction(e.triggerMethod) && e.triggerMethod("dom:refresh")
        }
        return function (i) {
            i.listenTo(i, "show", function () {
                e(i)
            }), i.listenTo(i, "render", function () {
                t(i)
            })
        }
    }(),
    function (e) {
        function t(e, t, n, o) {
            var s = o.split(/\s+/);
            i.each(s, function (i) {
                var o = e[i];
                o || r("Method '" + i + "' was configured as an event handler, but does not exist."), e.listenTo(t, n, o, e)
            })
        }

        function n(e, t, i, n) {
            e.listenTo(t, i, n, e)
        }

        function o(e, t, n, r) {
            var o = r.split(/\s+/);
            i.each(o, function (i) {
                var r = e[i];
                e.stopListening(t, n, r, e)
            })
        }

        function s(e, t, i, n) {
            e.stopListening(t, i, n, e)
        }

        function h(e, t, n, r, o) {
            t && n && (i.isFunction(n) && (n = n.call(e)), i.each(n, function (n, s) {
                i.isFunction(n) ? r(e, t, s, n) : o(e, t, s, n)
            }))
        }
        e.bindEntityEvents = function (e, i, r) {
            h(e, i, r, n, t)
        }, e.unbindEntityEvents = function (e, t, i) {
            h(e, t, i, s, o)
        }
    }(o), o.Callbacks = function () {
        this._deferred = o.$.Deferred(), this._callbacks = []
    }, i.extend(o.Callbacks.prototype, {
        add: function (e, t) {
            this._callbacks.push({
                cb: e,
                ctx: t
            }), this._deferred.done(function (i, n) {
                t && (i = t), e.call(i, n)
            })
        },
        run: function (e, t) {
            this._deferred.resolve(t, e)
        },
        reset: function () {
            var e = this._callbacks;
            this._deferred = o.$.Deferred(), this._callbacks = [], i.each(e, function (e) {
                this.add(e.cb, e.ctx)
            }, this)
        }
    }), o.Controller = function (e) {
        this.triggerMethod = o.triggerMethod, this.options = e || {}, i.isFunction(this.initialize) && this.initialize(this.options)
    }, o.Controller.extend = o.extend, i.extend(o.Controller.prototype, t.Events, {
        close: function () {
            this.stopListening(), this.triggerMethod("close"), this.unbind()
        }
    }), o.Region = function (e) {
        if (this.options = e || {}, this.el = o.getOption(this, "el"), !this.el) {
            var t = Error("An 'el' must be specified for a region.");
            throw t.name = "NoElError", t
        }
        if (this.initialize) {
            var i = Array.prototype.slice.apply(arguments);
            this.initialize.apply(this, i)
        }
    }, i.extend(o.Region, {
        buildRegion: function (e, t) {
            var n = "string" == typeof e,
                r = "string" == typeof e.selector,
                o = e.regionType === void 0,
                s = "function" == typeof e;
            if (!s && !n && !r) throw Error("Region must be specified as a Region type, a selector string or an object with selector property");
            var h, a;
            n && (h = e), e.selector && (h = e.selector), s && (a = e), !s && o && (a = t), e.regionType && (a = e.regionType);
            var l = new a({
                el: h
            });
            return e.parentEl && (l.getEl = function (t) {
                var n = e.parentEl;
                return i.isFunction(n) && (n = n()), n.find(t)
            }), l
        }
    }), i.extend(o.Region.prototype, t.Events, {
        show: function (e) {
            this.ensureEl();
            var t = e.isClosed || i.isUndefined(e.$el),
                n = e !== this.currentView;
            n && this.close(), e.render(), (n || t) && this.open(e), this.currentView = e, o.triggerMethod.call(this, "show", e), o.triggerMethod.call(e, "show")
        },
        ensureEl: function () {
            this.$el && 0 !== this.$el.length || (this.$el = this.getEl(this.el))
        },
        getEl: function (e) {
            return o.$(e)
        },
        open: function (e) {
            this.$el.empty().append(e.el)
        },
        close: function () {
            var e = this.currentView;
            e && !e.isClosed && (e.close ? e.close() : e.remove && e.remove(), o.triggerMethod.call(this, "close"), delete this.currentView)
        },
        attachView: function (e) {
            this.currentView = e
        },
        reset: function () {
            this.close(), delete this.$el
        }
    }), o.Region.extend = o.extend, o.RegionManager = function (e) {
        var t = e.Controller.extend({
            constructor: function (t) {
                this._regions = {}, e.Controller.prototype.constructor.call(this, t)
            },
            addRegions: function (e, t) {
                var n = {};
                return i.each(e, function (e, r) {
                    "string" == typeof e && (e = {
                        selector: e
                    }), e.selector && (e = i.defaults({}, e, t));
                    var o = this.addRegion(r, e);
                    n[r] = o
                }, this), n
            },
            addRegion: function (t, n) {
                var r, o = i.isObject(n),
                    s = i.isString(n),
                    h = !! n.selector;
                return r = s || o && h ? e.Region.buildRegion(n, e.Region) : i.isFunction(n) ? e.Region.buildRegion(n, e.Region) : n, this._store(t, r), this.triggerMethod("region:add", t, r), r
            },
            get: function (e) {
                return this._regions[e]
            },
            removeRegion: function (e) {
                var t = this._regions[e];
                this._remove(e, t)
            },
            removeRegions: function () {
                i.each(this._regions, function (e, t) {
                    this._remove(t, e)
                }, this)
            },
            closeRegions: function () {
                i.each(this._regions, function (e) {
                    e.close()
                }, this)
            },
            close: function () {
                this.removeRegions();
                var t = Array.prototype.slice.call(arguments);
                e.Controller.prototype.close.apply(this, t)
            },
            _store: function (e, t) {
                this._regions[e] = t, this._setLength()
            },
            _remove: function (e, t) {
                t.close(), delete this._regions[e], this._setLength(), this.triggerMethod("region:remove", e, t)
            },
            _setLength: function () {
                this.length = i.size(this._regions)
            }
        }),
            n = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck"];
        return i.each(n, function (e) {
            t.prototype[e] = function () {
                var t = i.values(this._regions),
                    n = [t].concat(i.toArray(arguments));
                return i[e].apply(i, n)
            }
        }), t
    }(o), o.TemplateCache = function (e) {
        this.templateId = e
    }, i.extend(o.TemplateCache, {
        templateCaches: {},
        get: function (e) {
            var t = this.templateCaches[e];
            return t || (t = new o.TemplateCache(e), this.templateCaches[e] = t), t.load()
        },
        clear: function () {
            var e, t = n(arguments),
                i = t.length;
            if (i > 0)
                for (e = 0; i > e; e++) delete this.templateCaches[t[e]];
            else this.templateCaches = {}
        }
    }), i.extend(o.TemplateCache.prototype, {
        load: function () {
            if (this.compiledTemplate) return this.compiledTemplate;
            var e = this.loadTemplate(this.templateId);
            return this.compiledTemplate = this.compileTemplate(e), this.compiledTemplate
        },
        loadTemplate: function (e) {
            var t = o.$(e).html();
            return t && 0 !== t.length || r("Could not find template: '" + e + "'", "NoTemplateError"), t
        },
        compileTemplate: function (e) {
            return i.template(e)
        }
    }), o.Renderer = {
        render: function (e, t) {
            if (!e) {
                var i = Error("Cannot render the template since it's false, null or undefined.");
                throw i.name = "TemplateNotFoundError", i
            }
            var n;
            return n = "function" == typeof e ? e : o.TemplateCache.get(e), n(t)
        }
    }, o.View = t.View.extend({
        constructor: function () {
            i.bindAll(this, "render");
            var e = Array.prototype.slice.apply(arguments);
            t.View.prototype.constructor.apply(this, e), o.MonitorDOMRefresh(this), this.listenTo(this, "show", this.onShowCalled, this)
        },
        triggerMethod: o.triggerMethod,
        getTemplate: function () {
            return o.getOption(this, "template")
        },
        mixinTemplateHelpers: function (e) {
            e = e || {};
            var t = this.templateHelpers;
            return i.isFunction(t) && (t = t.call(this)), i.extend(e, t)
        },
        configureTriggers: function () {
            if (this.triggers) {
                var e = {}, t = i.result(this, "triggers");
                return i.each(t, function (t, i) {
                    e[i] = function (e) {
                        e && e.preventDefault && e.preventDefault(), e && e.stopPropagation && e.stopPropagation();
                        var i = {
                            view: this,
                            model: this.model,
                            collection: this.collection
                        };
                        this.triggerMethod(t, i)
                    }
                }, this), e
            }
        },
        delegateEvents: function (e) {
            this._delegateDOMEvents(e), o.bindEntityEvents(this, this.model, o.getOption(this, "modelEvents")), o.bindEntityEvents(this, this.collection, o.getOption(this, "collectionEvents"))
        },
        _delegateDOMEvents: function (e) {
            e = e || this.events, i.isFunction(e) && (e = e.call(this));
            var n = {}, r = this.configureTriggers();
            i.extend(n, e, r), t.View.prototype.delegateEvents.call(this, n)
        },
        undelegateEvents: function () {
            var e = Array.prototype.slice.call(arguments);
            t.View.prototype.undelegateEvents.apply(this, e), o.unbindEntityEvents(this, this.model, o.getOption(this, "modelEvents")), o.unbindEntityEvents(this, this.collection, o.getOption(this, "collectionEvents"))
        },
        onShowCalled: function () {},
        close: function () {
            if (!this.isClosed) {
                var e = this.triggerMethod("before:close");
                e !== !1 && (this.isClosed = !0, this.triggerMethod("close"), this.unbindUIElements(), this.remove())
            }
        },
        bindUIElements: function () {
            if (this.ui) {
                this._uiBindings || (this._uiBindings = this.ui);
                var e = i.result(this, "_uiBindings");
                this.ui = {}, i.each(i.keys(e), function (t) {
                    var i = e[t];
                    this.ui[t] = this.$(i)
                }, this)
            }
        },
        unbindUIElements: function () {
            this.ui && (i.each(this.ui, function (e, t) {
                delete this.ui[t]
            }, this), this.ui = this._uiBindings, delete this._uiBindings)
        }
    }), o.ItemView = o.View.extend({
        serializeData: function () {
            var e = {};
            return this.model ? e = this.model.toJSON() : this.collection && (e = {
                items: this.collection.toJSON()
            }), e
        },
        render: function () {
            this.isClosed = !1, this.triggerMethod("before:render", this), this.triggerMethod("item:before:render", this);
            var e = this.serializeData();
            e = this.mixinTemplateHelpers(e);
            var t = this.getTemplate(),
                i = o.Renderer.render(t, e);
            return this.$el.html(i), this.bindUIElements(), this.triggerMethod("render", this), this.triggerMethod("item:rendered", this), this
        },
        close: function () {
            this.isClosed || (this.triggerMethod("item:before:close"), o.View.prototype.close.apply(this, n(arguments)), this.triggerMethod("item:closed"))
        }
    }), o.CollectionView = o.View.extend({
        itemViewEventPrefix: "itemview",
        constructor: function () {
            this._initChildViewStorage(), o.View.prototype.constructor.apply(this, n(arguments)), this._initialEvents()
        },
        _initialEvents: function () {
            this.collection && (this.listenTo(this.collection, "add", this.addChildView, this), this.listenTo(this.collection, "remove", this.removeItemView, this), this.listenTo(this.collection, "reset", this.render, this))
        },
        addChildView: function (e) {
            this.closeEmptyView();
            var t = this.getItemView(e),
                i = this.collection.indexOf(e);
            this.addItemView(e, t, i)
        },
        onShowCalled: function () {
            this.children.each(function (e) {
                o.triggerMethod.call(e, "show")
            })
        },
        triggerBeforeRender: function () {
            this.triggerMethod("before:render", this), this.triggerMethod("collection:before:render", this)
        },
        triggerRendered: function () {
            this.triggerMethod("render", this), this.triggerMethod("collection:rendered", this)
        },
        render: function () {
            return this.isClosed = !1, this.triggerBeforeRender(), this._renderChildren(), this.triggerRendered(), this
        },
        _renderChildren: function () {
            this.closeEmptyView(), this.closeChildren(), this.collection && this.collection.length > 0 ? this.showCollection() : this.showEmptyView()
        },
        showCollection: function () {
            var e;
            this.collection.each(function (t, i) {
                e = this.getItemView(t), this.addItemView(t, e, i)
            }, this)
        },
        showEmptyView: function () {
            var e = o.getOption(this, "emptyView");
            if (e && !this._showingEmptyView) {
                this._showingEmptyView = !0;
                var i = new t.Model;
                this.addItemView(i, e, 0)
            }
        },
        closeEmptyView: function () {
            this._showingEmptyView && (this.closeChildren(), delete this._showingEmptyView)
        },
        getItemView: function () {
            var e = o.getOption(this, "itemView");
            return e || r("An `itemView` must be specified", "NoItemViewError"), e
        },
        addItemView: function (e, t, n) {
            var r = o.getOption(this, "itemViewOptions");
            i.isFunction(r) && (r = r.call(this, e, n));
            var s = this.buildItemView(e, t, r);
            this.addChildViewEventForwarding(s), this.triggerMethod("before:item:added", s), this.children.add(s), this.renderItemView(s, n), this._isShown && o.triggerMethod.call(s, "show"), this.triggerMethod("after:item:added", s)
        },
        addChildViewEventForwarding: function (e) {
            var t = o.getOption(this, "itemViewEventPrefix");
            this.listenTo(e, "all", function () {
                var i = n(arguments);
                i[0] = t + ":" + i[0], i.splice(1, 0, e), o.triggerMethod.apply(this, i)
            }, this)
        },
        renderItemView: function (e, t) {
            e.render(), this.appendHtml(this, e, t)
        },
        buildItemView: function (e, t, n) {
            var r = i.extend({
                model: e
            }, n);
            return new t(r)
        },
        removeItemView: function (e) {
            var t = this.children.findByModel(e);
            this.removeChildView(t), this.checkEmpty()
        },
        removeChildView: function (e) {
            e && (this.stopListening(e), e.close ? e.close() : e.remove && e.remove(), this.children.remove(e)), this.triggerMethod("item:removed", e)
        },
        checkEmpty: function () {
            this.collection && 0 !== this.collection.length || this.showEmptyView()
        },
        appendHtml: function (e, t) {
            e.$el.append(t.el)
        },
        _initChildViewStorage: function () {
            this.children = new t.ChildViewContainer
        },
        close: function () {
            this.isClosed || (this.triggerMethod("collection:before:close"), this.closeChildren(), this.triggerMethod("collection:closed"), o.View.prototype.close.apply(this, n(arguments)))
        },
        closeChildren: function () {
            this.children.each(function (e) {
                this.removeChildView(e)
            }, this), this.checkEmpty()
        }
    }), o.CompositeView = o.CollectionView.extend({
        _initialEvents: function () {
            this.collection && (this.listenTo(this.collection, "add", this.addChildView, this), this.listenTo(this.collection, "remove", this.removeItemView, this), this.listenTo(this.collection, "reset", this._renderChildren, this))
        },
        getItemView: function () {
            var e = o.getOption(this, "itemView") || this.constructor;
            return e || r("An `itemView` must be specified", "NoItemViewError"), e
        },
        serializeData: function () {
            var e = {};
            return this.model && (e = this.model.toJSON()), e
        },
        render: function () {
            this.isRendered = !0, this.isClosed = !1, this.resetItemViewContainer(), this.triggerBeforeRender();
            var e = this.renderModel();
            return this.$el.html(e), this.bindUIElements(), this.triggerMethod("composite:model:rendered"), this._renderChildren(), this.triggerMethod("composite:rendered"), this.triggerRendered(), this
        },
        _renderChildren: function () {
            this.isRendered && (o.CollectionView.prototype._renderChildren.call(this), this.triggerMethod("composite:collection:rendered"))
        },
        renderModel: function () {
            var e = {};
            e = this.serializeData(), e = this.mixinTemplateHelpers(e);
            var t = this.getTemplate();
            return o.Renderer.render(t, e)
        },
        appendHtml: function (e, t) {
            var i = this.getItemViewContainer(e);
            i.append(t.el)
        },
        getItemViewContainer: function (e) {
            if ("$itemViewContainer" in e) return e.$itemViewContainer;
            var t;
            if (e.itemViewContainer) {
                var n = i.result(e, "itemViewContainer");
                t = e.$(n), 0 >= t.length && r("The specified `itemViewContainer` was not found: " + e.itemViewContainer, "ItemViewContainerMissingError")
            } else t = e.$el;
            return e.$itemViewContainer = t, t
        },
        resetItemViewContainer: function () {
            this.$itemViewContainer && delete this.$itemViewContainer
        }
    }), o.Layout = o.ItemView.extend({
        regionType: o.Region,
        constructor: function (e) {
            e = e || {}, this._firstRender = !0, this._initializeRegions(e), o.ItemView.call(this, e)
        },
        render: function () {
            this._firstRender ? this._firstRender = !1 : this.isClosed ? this._initializeRegions() : this._reInitializeRegions();
            var e = Array.prototype.slice.apply(arguments),
                t = o.ItemView.prototype.render.apply(this, e);
            return t
        },
        close: function () {
            if (!this.isClosed) {
                this.regionManager.close();
                var e = Array.prototype.slice.apply(arguments);
                o.ItemView.prototype.close.apply(this, e)
            }
        },
        addRegion: function (e, t) {
            var i = {};
            return i[e] = t, this.addRegions(i)[e]
        },
        addRegions: function (e) {
            return this.regions = i.extend(this.regions || {}, e), this._buildRegions(e)
        },
        removeRegion: function (e) {
            return this.regionManager.removeRegion(e)
        },
        _buildRegions: function (e) {
            var t = this,
                i = {
                    parentEl: function () {
                        return t.$el
                    }
                };
            return this.regionManager.addRegions(e, i)
        },
        _initializeRegions: function (e) {
            var t;
            this._initRegionManager(), t = i.isFunction(this.regions) ? this.regions(e) : this.regions || {}, this.addRegions(t)
        },
        _reInitializeRegions: function () {
            this.regionManager.closeRegions(), this.regionManager.each(function (e) {
                e.reset()
            })
        },
        _initRegionManager: function () {
            this.regionManager = new o.RegionManager, this.listenTo(this.regionManager, "region:add", function (e, t) {
                this[e] = t, this.trigger("region:add", e, t)
            }), this.listenTo(this.regionManager, "region:remove", function (e, t) {
                delete this[e], this.trigger("region:remove", e, t)
            })
        }
    }), o.AppRouter = t.Router.extend({
        constructor: function (e) {
            if (t.Router.prototype.constructor.apply(this, n(arguments)), this.options = e, this.appRoutes) {
                var i = o.getOption(this, "controller");
                this.processAppRoutes(i, this.appRoutes)
            }
        },
        processAppRoutes: function (e, t) {
            var n = i.keys(t).reverse();
            i.each(n, function (n) {
                var r = t[n],
                    o = e[r];
                if (!o) throw Error("Method '" + r + "' was not found on the controller");
                this.route(n, r, i.bind(o, e))
            }, this)
        }
    }), o.Application = function (e) {
        this._initRegionManager(), this._initCallbacks = new o.Callbacks, this.vent = new t.Wreqr.EventAggregator, this.commands = new t.Wreqr.Commands, this.reqres = new t.Wreqr.RequestResponse, this.submodules = {}, i.extend(this, e), this.triggerMethod = o.triggerMethod
    }, i.extend(o.Application.prototype, t.Events, {
        execute: function () {
            var e = Array.prototype.slice.apply(arguments);
            this.commands.execute.apply(this.commands, e)
        },
        request: function () {
            var e = Array.prototype.slice.apply(arguments);
            return this.reqres.request.apply(this.reqres, e)
        },
        addInitializer: function (e) {
            this._initCallbacks.add(e)
        },
        start: function (e) {
            this.triggerMethod("initialize:before", e), this._initCallbacks.run(e, this), this.triggerMethod("initialize:after", e), this.triggerMethod("start", e)
        },
        addRegions: function (e) {
            return this._regionManager.addRegions(e)
        },
        removeRegion: function (e) {
            this._regionManager.removeRegion(e)
        },
        module: function () {
            var e = n(arguments);
            return e.unshift(this), o.Module.create.apply(o.Module, e)
        },
        _initRegionManager: function () {
            this._regionManager = new o.RegionManager, this.listenTo(this._regionManager, "region:add", function (e, t) {
                this[e] = t
            }), this.listenTo(this._regionManager, "region:remove", function (e) {
                delete this[e]
            })
        }
    }), o.Application.extend = o.extend, o.Module = function (e, t) {
        this.moduleName = e, this.submodules = {}, this._setupInitializersAndFinalizers(), this.app = t, this.startWithParent = !0, this.triggerMethod = o.triggerMethod
    }, i.extend(o.Module.prototype, t.Events, {
        addInitializer: function (e) {
            this._initializerCallbacks.add(e)
        },
        addFinalizer: function (e) {
            this._finalizerCallbacks.add(e)
        },
        start: function (e) {
            this._isInitialized || (i.each(this.submodules, function (t) {
                t.startWithParent && t.start(e)
            }), this.triggerMethod("before:start", e), this._initializerCallbacks.run(e, this), this._isInitialized = !0, this.triggerMethod("start", e))
        },
        stop: function () {
            this._isInitialized && (this._isInitialized = !1, o.triggerMethod.call(this, "before:stop"), i.each(this.submodules, function (e) {
                e.stop()
            }), this._finalizerCallbacks.run(void 0, this), this._initializerCallbacks.reset(), this._finalizerCallbacks.reset(), o.triggerMethod.call(this, "stop"))
        },
        addDefinition: function (e, t) {
            this._runModuleDefinition(e, t)
        },
        _runModuleDefinition: function (e, n) {
            if (e) {
                var r = i.flatten([this, this.app, t, o, o.$, i, n]);
                e.apply(this, r)
            }
        },
        _setupInitializersAndFinalizers: function () {
            this._initializerCallbacks = new o.Callbacks, this._finalizerCallbacks = new o.Callbacks
        }
    }), i.extend(o.Module, {
        create: function (e, t, r) {
            var o = e,
                s = n(arguments);
            s.splice(0, 3), t = t.split(".");
            var h = t.length,
                a = [];
            return a[h - 1] = r, i.each(t, function (t, i) {
                var n = o;
                o = this._getModule(n, t, e), this._addModuleDefinition(n, o, a[i], s)
            }, this), o
        },
        _getModule: function (e, t, i) {
            var n = e[t];
            return n || (n = new o.Module(t, i), e[t] = n, e.submodules[t] = n), n
        },
        _addModuleDefinition: function (e, t, n, r) {
            var o, s;
            i.isFunction(n) ? (o = n, s = !0) : i.isObject(n) ? (o = n.define, s = n.startWithParent) : s = !0, o && t.addDefinition(o, r), t.startWithParent = t.startWithParent && s, t.startWithParent && !t.startWithParentIsConfigured && (t.startWithParentIsConfigured = !0, e.addInitializer(function (e) {
                t.startWithParent && t.start(e)
            }))
        }
    }), o
}(this, Backbone, _);
//@ sourceMappingURL=backbone.marionette.map