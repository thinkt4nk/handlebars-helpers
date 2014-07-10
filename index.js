(function (global, factory) {
    // node
    if (typeof module === 'object' && module.exports)
        return module.exports = factory(require('Handlebars'));
    // browser
    global.HandlebarsHelpers = factory(module.Handlebars);
}(this, function(Handlebars) {
    return {
        registerHelpers: function() {

            Handlebars.registerHelper('equals',function(a, b, options) {
                return (a == b)
                    ? options.fn(this)
                    : options.inverse(this)
                    ;
            });
            Handlebars.registerHelper('notEquals',function(a,b, options) {
                return (a != b)
                    ? options.fn(this)
                    : options.inverse(this)
                    ;
            });
            Handlebars.registerHelper('inArray',function(a,b, options) {
                return (!!~b.indexOf(a))
                    ? options.fn(this)
                    : options.inverse(this)
                    ;
            });
            Handlebars.registerHelper('notInArray',function(a,b, options) {
                return (!~b.indexOf(a))
                    ? options.fn(this)
                    : options.inverse(this)
                    ;
            });
            Handlebars.registerHelper('isEmpty',function(a, options) {
                return (a == null || a.length < 1)
                    ? options.fn(this)
                    : options.inverse(this)
                    ;
            });
            Handlebars.registerHelper('notIsEmpty',function(a, options) {
                if (typeof(a) == 'string'){
                    return (a != null && a.length > 0)
                        ? options.fn(this)
                        : options.inverse(this)
                        ;
                } else {
                    return (a != null)
                        ? options.fn(this)
                        : options.inverse(this)
                        ;
                }
            });
            // Escape HTML
            Handlebars.registerHelper('htmlEscape', function(text) {
                return new Handlebars.SafeString(text);
            });

            // HELPER: #key_value
            //
            // Usage: {{#key_value obj}} Key: {{key}} // Value: {{value}} {{/key_value}}
            //
            // Iterate over an object, setting 'key' and 'value' for each property in
            // the object.
            Handlebars.registerHelper("key_value", function(obj, fn) {
                    var buffer = "",
                            key;

                    for (key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                    buffer += fn({key: key, value: obj[key]});
                            }
                    }

                    return buffer;
            });

            // HELPER: #each_with_key
            //
            // Usage: {{#each_with_key container key="myKey"}}...{{/each_with_key}}
            //
            // Iterate over an object containing other objects. Each
            // inner object will be used in turn, with an added key ("myKey")
            // set to the value of the inner object's key in the container.
            Handlebars.registerHelper("each_with_key", function(obj, fn) {
                    var context,
                            buffer = "",
                            key,
                            keyName = fn.hash.key;

                    for (key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                    context = obj[key];

                                    if (keyName) {
                                            context[keyName] = key;
                                    }

                                    buffer += fn(context);
                            }
                    }

                    return buffer;
            });
        }
    }
}));
