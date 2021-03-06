/**
  Name editable input.
  Internally value stored as {first_name: "Jack", last_name: "Wang"}

@class name
@extends abstractinput
@final
@example
<a href="#" id="name" data-type="name" data-pk="1">awesome</a>
<script>
$(function(){
$('#name').editable({
url: '/post',
title: 'Enter city, street and building #',
value: {
first_name: "Jack", 
last_name: "Wang",
}
});
});
</script>
 **/
(function ($) {
    "use strict";

    var Name = function (options) {
        this.init('name', options, Name.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(Name, $.fn.editabletypes.abstractinput);

    $.extend(Name.prototype, {
        /**
          Renders input from tpl

          @method render() 
         **/        
        render: function() {
            this.$input = this.$tpl.find('input');
        },

        /**
          Default method to show value in element. Can be overwritten by display option.

          @method value2html(value, element) 
         **/
        value2html: function(value, element) {
            if(!value) {
                $(element).empty();
                return; 
            }
            var html = $('<div>').text(value.first_name).html() + ' ' + $('<div>').text(value.last_name).html();
            $(element).html(html); 
        },

        /**
          Gets value from element's html

          @method html2value(html) 
         **/        
        html2value: function(html) {        
            /*
               you may write parsing method to get value by element's html
               e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
               but for complex structures it's not recommended.
               Better set value directly via javascript, e.g. 
               editable({
            value: {
            city: "Moscow", 
            street: "Lenina", 
            building: "15"
            }
            });
            */ 

           var names = html.split(" ");
           return null;
           //return {first_name: names[0], last_name: names[1]};
        },

        /**
          Converts value to string. 
          It is used in internal comparing (not for sending to server).

          @method value2str(value)  
         **/
        value2str: function(value) {
            var str = '';
            if(value) {
                for(var k in value) {
                    str = str + k + ':' + value[k] + ';';  
                }
            }
            return str;
        }, 

        /*
           Converts string to value. Used for reading value from 'data-value' attribute.

           @method str2value(str)  
           */
        str2value: function(str) {
            /*
               this is mainly for parsing value defined in data-value attribute. 
               If you will always set value by javascript, no need to overwrite it
               */
            return str;
        },                

        /**
          Sets value of input.

          @method value2input(value) 
          @param {mixed} value
         **/         
        value2input: function(value) {
            if(!value) {
                return;
            }
            this.$input.filter('[name="first_name"]').val(value.first_name);
            this.$input.filter('[name="last_name"]').val(value.last_name);
        },       

        /**
          Returns value of input.

          @method input2value() 
         **/          
        input2value: function() { 
            return {
                first_name: this.$input.filter('[name="first_name"]').val(), 
                last_name: this.$input.filter('[name="last_name"]').val()
            };
        },        

        /**
          Activates input: sets focus on the first field.

          @method activate() 
         **/        
        activate: function() {
            this.$input.filter('[name="city"]').focus();
        },  

        /**
          Attaches handler to submit form in case of 'showbuttons=false' mode

          @method autosubmit() 
         **/       
        autosubmit: function() {
            this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        }       
    });

    Name.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        //tpl: '<div class="editable-name"><label><input type="text" name="first_name" class="input-small form-control"></label>'+
        //    '<label><input type="text" name="last_name" class="input-small form-control"></label></div>',

        tpl: '<div class="editable-name"><label><span>First Name </span><input type="text" name="first_name" class="input-small form-control"></label>'+
             '<label><span>Last Name </span><input type="text" name="last_name" class="input-small form-control"></label></div>',

        inputclass: ''
    });

    $.fn.editabletypes.name = Name;

}(window.jQuery));
