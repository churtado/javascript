/**
 * semicolon in case another lib before mine didn't finish
 * properly
 *  */ 

;(function (global, $) {

    var Greetr = function (firstname, lastname, language) {
        /**
         * Here, I'm referencing the constructor function
         * Greetr.init to give me back a new object with 
         * the values I want initialized in it, along with
         * all my library functions
         */
        return new Greetr.init(firstname, lastname, language);
    }

    /**
     * Thanks to closures, this array gets saved
     * in the execution context of my Greetr object,
     * but won't be exposed to the outside world
     */
    var supportedLangs = ['en', 'es'];

    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    };

    /**
     * I'm going to set all the properties and methods
     * that my objects created from my Greetr constructor
     * will share. That is, all those objects will point to 
     * the same place in memory.
     * 
     * Anything in this object will be exposed to the outside
     * world.
     *  */
    Greetr.prototype = {
        fullName: function () {
            return this.firstname + ' ' + this.lastname;
        },

        validate: function () {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw 'Invalid language';
            }
        },

        greeting: function () {
            return greetings[this.language] + ' ' + this.firstname + '!';
        },

        formalGreeting: function () {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        greet: function (formal) {
            var msg;
            // if undefined or null it will be coerced to false
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // make this method chainable
            return this;
        },

        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ':' + this.fullName());
            }

            return this
        },

        setLang: function (lang) {
            this.language = lang;
            this.validate();
            return this;
        },

        HTMLGreeting: function (selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }

            if (!selector) {
                throw 'Missing jQuery selector';
            }

            var msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            $(selector).html(msg);
            
            return this;
        }
    };

    /**
     * However, I'm going to use this function as a constructor
     * function. It will create a blank object, and I'll pass it
     * these parameters to initialize them
     */
    Greetr.init = function (firstname, lastname, language) {

        var self = this;

        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';

    }

    /**
     * Finally, that blank object will need to have
     * access to those shared functions I talked about in the
     * first comment I made above this line: Greetr.prototype = {};
     */
    Greetr.init.prototype = Greetr.prototype;

    /**
     * Now let's expose Greetr to the outside world by attaching it
     * to the global object and give it an alias
     */
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));