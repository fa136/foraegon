$(function ()
{
    kendo.data.binders.required = kendo.data.Binder.extend({
        refresh: function ()
        {
            var value = this.bindings["required"].get();

            if (value)
            {
                $(this.element).attr("required", "required");
            }
        }
    });

    kendo.data.binders.widget.required = kendo.data.Binder.extend({
        refresh: function ()
        {
            var value = this.bindings["required"].get();

            if (value)
            {
                $(this.element).attr("required", "required");
            }
        }
    });

    var ViewModel = kendo.data.ObservableObject.extend({
        init: function ()
        {
            var self = this;
            kendo.data.ObservableObject.fn.init.call(self);
            this.initHandle = $.Deferred();
        },

        initHandle: null,

        initCompleted: function ()
        {
            this.initHandle.resolve();
        },

        initFailed: function (error)
        {
            this.initHandle.reject(error);
            console.error("Page '" + this.typeId + "' initialization has been failed: " + error);
        }
    });

    var CookieStore = kendo.Class.extend({
        cookieName: "aegonCalc_apiKey",

        load: function ()
        {
            try
            {
                return $.Deferred().resolve($.cookie(this.cookieName));
            }
            catch (ex)
            {
                return $.Deferred().reject(ex);
            }
        },

        save: function(apiKey)
        {
            try
            {
                $.cookie(this.cookieName, apiKey, { expires: 10 * 365, path: "/" });
                return $.Deferred().resolve();
            }
            catch (ex)
            {
                return $.Deferred().reject(ex);
            }
        },

        drop: function()
        {
            $.removeCookie(this.cookieName, { path: "/" });
        }
    });

    var Login = ViewModel.extend({
        userName: null,
        password: null,
        rememberMe: false,
        signIn: function (e)
        {
            e.preventDefault();
            var self = this;
            var validator = $("#login-panel").kendoValidator().data("kendoValidator");

            if (validator && validator.validate())
            {
                $.ajax({
                    url: "http://aegoncalc.swicon.hu/rest/authenticate",
                    type: "POST",
                    contentType: "application/x-authc-username-password+json",
                    data: kendo.stringify({ userId: self.userName, password: self.password }),
                    dataType: "json"
                }).success(function ()
                {
                    var cookieStore = new CookieStore();
                    cookieStore.save(self.userName);

                    window.app.set("currentUser", kendo.observable({
                        userName: self.userName
                    }));

                    window.app.router.navigate("/select");
                }).error(function (error)
                {
                    alert("An error occured.");
                });
            }
        }
    });

    var TemplateSelector = ViewModel.extend({

        clientId: null,

        onSubmit: function (e)
        {
            // mock
            window.app.set("isClientIdentified", true);
            window.app.router.navigate("/");
        }
    });

    var Form = kendo.Class.extend({

        init: function (tab, items, index)
        {
            var self = this;
            self.tab = tab;
            self.items = self._sortItems(items);
            self.index = index;
        },

        element: function ()
        {
            return $("#" + this.tab);
        },

        _sortItems: function (array)
        {
            if (array instanceof Array)
            {
                array.sort(function (a, b)
                {
                    var i1 = a.index;
                    var i2 = b.index;
                    return (i1 == i2) ? 0 : (i1 > i2) ? 1 : -1;
                });

                $.each(array, function (i, v)
                {
                    if (v.hasOwnProperty("formItems"))
                    {
                        v.formItems.sort(function (a, b)
                        {
                            var i1 = a.index;
                            var i2 = b.index;
                            return (i1 == i2) ? 0 : (i1 > i2) ? 1 : -1;
                        });
                    }
                });
            }

            return array;
        },

        callProcess: function ()
        {
            window.app.isBusy();
            $.ajax({
                url: "http://aegoncalc.swicon.hu/rest/GraphTalk/Process",
                type: "GET",
                contentType: "application/json",
                dataType: "json"
            }).success(function (msg)
            {
                $("#final-modal").find(".modal-body").text("success");
                $("#final-modal").find("#new-btn").click(function ()
                {
                    window.app.router.navigate("/select");
                    $("#final-modal").modal("hide");
                });

                $("#final-modal").find("#try-again-btn").hide();

                $('#final-modal').modal();
            }).error(function (ex)
            {
                $("#final-modal").find(".modal-body").text("error");
                $("#final-modal").find("#new-btn").hide();
                $('#final-modal').modal();

            }).always(function ()
            {
                window.app.isBusy();
            });
        },

        valid: function ()
        {
            var self = this;
            var validator = self.element().kendoValidator().data("kendoValidator");
            return validator && validator.validate();
        }
    });

    var Calculator = ViewModel.extend({

        init: function ()
        {
            var self = this;
            ViewModel.fn.init.call(self);

            self.forms = new kendo.data.ObservableArray([]);

            var firstTabItems = [
                {
                    index: 0,
                    name: "clientId",
                    type: "string",
                    value: 492424,
                    list: null,
                    label: "Client Id",
                    required: true,
                    disabled: false,
                    hidden: false
                },
                {
                    index: 1,
                    name: "clientIdBtn",
                    type: "button",
                    method: "POST",
                    value: "http://aegoncalc.swicon.hu/rest/GraphTalk/ClientSearch",
                    list: null,
                    label: "Search Client",
                    required: false,
                    disabled: false,
                    hidden: false,
                    callButton: self.searchClientFunc
                }
            ];
            var firstForm = new Form("tab0", firstTabItems, 0);
            self.forms.push(firstForm);
            self.dispatch(self.createWizard, self);
        },

        dispatch: function (f, scope)
        {
            if (typeof f === "function") window.setTimeout(scope ? function() { f(scope) } : f, 1);
        },

        isInvalid: false,

        _isBusy: false,
        isBusy: function()
        {
            this._isBusy = !this._isBusy;
            kendo.ui.progress($("body"), this._isBusy);
        },

        getJson: function (url, data)
        {
            return $.ajax({
                url: url,
                type: "GET",
                contentType: "application/json",
                dataType: "json",
                data: data
            });
        },

        postJson: function (url, data)
        {
            return $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                data: data
            });
        },

        serializeForms: function ()
        {
            var self = this;
            var items = [];

            self.forms.splice(4, 1);

            var ix = 0;

            $.each(self.forms, function (i, v)
            {
                $.each(v.items, function (c, x)
                {
                    if (x.formItems && x.formItems.length > 0)
                    {
                        var group = {
                            index: ix++,
                            groupName: x.groupName,
                            formItems: []
                        }

                        $.each(x.formItems, function (k, y)
                        {
                            if (y.type != "button" && !y.hidden)
                            {
                                group.formItems.push({
                                    index: y.index,
                                    type: "label",
                                    label: y.label != "" ? y.label : y.name,
                                    text: y.value
                                });
                            }
                        });
                        items.push(group);
                    }
                    else
                    {
                        if (x.type != "button" && !x.hidden)
                        {
                            items.push({
                                index: ix++,
                                type: "label",
                                label: x.label != "" ? x.label : x.name,
                                text: x.value
                            });
                        }
                    }
                });
            });

            return items;
        },

        createWizard: function (self)
        {
            var wizard = $("#document-wizard");
            wizard.bootstrapWizard({
                nextSelector: ".button-next",
                previousSelector: ".button-previous",
                firstSelector: ".button-first",
                lastSelector: ".button-last",
                onNext: function (tab, navigation, index)
                {
                    var currentForm = self.forms[index - 1];

                    if (currentForm.valid()) // validation
                    {
                        self.set("isInvalid", false);
                        if (!self.forms[index])
                        {
                            self.isBusy();
                            $(navigation.children()[index]).removeClass("disabled");
                            switch (index)
                            {
                                case 1:
                                    self.getJson("http://aegoncalc.swicon.hu/rest/GraphTalk/Begin")
                                        .success(function (result)
                                        {
                                            var form = new Form("tab1", result, 1);
                                            self.forms.push(form);
                                            self.trigger("change", { field: "forms" });
                                            wizard.bootstrapWizard("show", index - 1);
                                            wizard.bootstrapWizard("show", index);
                                        }).error(function()
                                        {
                                            alert("An error occured. Please try again later.");
                                        }).always(function ()
                                        {
                                            self.isBusy();
                                        });
                                    break;
                                case 2:
                                    self.getJson("http://aegoncalc.swicon.hu/rest/GraphTalk/ActivityRequest")
                                        .success(function (result)
                                        {
                                            var form = new Form("tab2", result, 2);
                                            self.forms.push(form);
                                            self.trigger("change", { field: "forms" });
                                            wizard.bootstrapWizard("show", index - 1);
                                            wizard.bootstrapWizard("show", index);
                                        }).error(function()
                                        {
                                            alert("An error occured. Please try again later.");
                                        }).always(function ()
                                        {
                                            self.isBusy();
                                        });
                                    break;
                                case 3:
                                    self.postJson("http://aegoncalc.swicon.hu/rest/GraphTalk/CoverageSelector", kendo.stringify(buildingMock))
                                        .success(function (result)
                                        {
                                            self.forms.push(new Form("tab3", result, 3));
                                            self.trigger("change", { field: "forms" });
                                            wizard.bootstrapWizard("show", index - 1);
                                            wizard.bootstrapWizard("show", index);
                                        }).error(function()
                                        {
                                            alert("An error occured. Please try again later.");
                                        }).always(function ()
                                        {
                                            self.isBusy();
                                        });

                                    break;
                                case 4:
                                    var items = self.serializeForms();
                                    self.forms.push(new Form("tab4", items, 4));
                                    self.trigger("change", { field: "forms" });
                                    self.isBusy();
                                    break;
                            }
                        } else
                        {
                            if (index === 4)
                            {
                                var items = self.serializeForms();
                                self.forms.pop();
                                self.forms.push(new Form("tab4", items, 4));
                                self.trigger("change", { field: "forms" });
                            }
                        }
                    }
                    else
                    {
                        self.set("isInvalid", true);
                        if ($(navigation.children()[index]).hasClass("disabled"))
                            return false;
                    }
                },
                onLast: function (tab, navigation, index)
                {
                    if ($(navigation.children()[index]).hasClass("disabled"))
                        return false;
                },
                onTabClick: function (tab, navigation, index)
                {
                    if ($(navigation.children()[index]).hasClass("disabled"))
                        return false;

                    if (index === 4)
                    {
                        var items = self.serializeForms();
                        self.forms.pop();
                        self.forms.push(new Form("tab4", items, 4));
                        self.trigger("change", { field: "forms" });
                    }
                }
            });
        },

        searchClientFunc: function (e)
        {
            var self = this.parent().parent();
            if (self.valid())
            {
                window.app.isBusy();
                $.ajax({
                    url: e.data.value,
                    type: e.data.method,
                    contentType: "application/json",
                    dataType: "json",
                    data: kendo.stringify({ clientId: self.items[0].value })
                }).success(function (result)
                {
                    $.each(result, function (i, v)
                    {
                        self.items.push(v);
                    });
                    e.data.set("disabled", true);
                }).error(function ()
                {
                    alert("An error occured. Please try again later.");
                }).always(function ()
                {
                    window.app.isBusy();
                });
            }
        }
    });

    var App = ViewModel.extend({

        layout: null,

        currentUser: null,

        isClientIdentified: false,
        isContentLoaded: false,

        _isBusy: false,
        isBusy: function()
        {
            this._isBusy = !this._isBusy;
            kendo.ui.progress($("body"), this._isBusy);
        },

        logout: function ()
        {
            var cookieStore = new CookieStore();
            cookieStore.drop();
            window.location = "/";
        },

        resolveContentFullHeight: function ()
        {
            var content = $("#content");
            if (content)
            {
                var document = $("body").height();
                var fullHeightTop = content.position().top;
                var fullHeight = (-1 * (fullHeightTop - document));
                $("#content").height(fullHeight);
            }
        },

        trySetPage: function ()
        {
            var self = this;
            var deferred = $.Deferred();

            if (!self.currentUser)
            {
                self.router.navigate("/login");
            }
            else
            {
                if (self.isClientIdentified)
                {
                    self.isBusy();
                    var calculator = new kendo.View("calculator-tmpl",
                        {
                            model: new Calculator()
                        });

                    self.layout.showIn("#content", calculator);

                    self.set("isContentLoaded", true);
                    self.isBusy();
                }
                else
                {
                    self.router.navigate("/select");
                }
            }

            return deferred.resolve();
        },

        init: function ()
        {
            var self = this;
            ViewModel.fn.init.call(self);

            self.layout = new kendo.Layout("layout-tmpl",
                {
                    init: function ()
                    {
                        self.resolveContentFullHeight();
                    }
                });
            self.layout.render("#wrapper");

            var cookieStore = new CookieStore();
            cookieStore.load(cookieStore.cookieName).then(function (cookie)
            {
                if (cookie) self.set("currentUser", kendo.observable({
                    userName: cookie
                }));
            });

            self.router = new kendo.Router({
                routeMissing: function (e)
                {
                    if (e.url.indexOf("section") < 0)
                        self.router.navigate("/");
                }
            });

            self.router.route("/", function ()
            {
                self.trySetPage();
            });

            self.router.route("/select", function ()
            {
                self.isBusy();
                var selector = new kendo.View("selector-tmpl",
                    {
                        model: new TemplateSelector()
                    });

                self.layout.showIn("#content", selector);
                self.isBusy();
            });

            self.router.route("/login", function ()
            {
                if (self.currentUser)
                {
                    history.back();
                    return;
                }

                self.isBusy();
                var login = new kendo.View("login-tmpl",
                    {
                        model: new Login()
                    });

                self.layout.showIn("#content", login);
                self.isBusy();
            });

            self.router.route("/section:id", function (id)
            {
                if (self.isContentLoaded)
                {
                    $("ul.nav a").removeClass("active");
                    $("ul.nav").find("a[data-section$=" + id + "]").addClass("active");
                    return false;
                }
                else
                {
                    self.trySetPage();
                }
            });

            self.router.start();
            kendo.bind($("#header-info"), self);
            $(window).resize(self.resolveContentFullHeight);
        }
    });

    window.app = new App();
});