/**
Address editable input.
Internally value stored as {city: "Moscow", street: "Lenina", building: "15"}

@class address
@extends abstractinput
@final
@example
<a href="#" id="address" data-type="address" data-pk="1">awesome</a>
<script>
$(function(){
	$('#address').editable({
		url: '/post',
		title: 'Enter city, street and building #',
		value: {
			city: "Moscow", 
			street: "Lenina", 
			building: "15"
		}
	});
});
</script>
**/
(function ($) {
	"use strict";
	
	var Caps = function (options) {
		this.init('caps', options, Caps.defaults);
	};

	//inherit from Abstract input
	$.fn.editableutils.inherit(Caps, $.fn.editabletypes.abstractinput);

	$.extend(Caps.prototype, {
		/**
		Renders input from tpl

		@method render() 
		**/        
		render: function() {
		   this.$input = this.$tpl.find('input');
		   this.$select = this.$tpl.find('select');
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
			var html;
			if(value.is_caps == 1){
				// html = '<p>Allow Caps: <strong>Yes</strong></p>' +
				// 		'<p>Daily Conversions: <strong>' + ((value.daily_conversions != 0) ? $('<div>').text(value.daily_conversions).html() : 'Unlimited') + '</strong>, Monthly Conversions: <strong>' + ((value.monthly_conversions != 0) ? $('<div>').text(value.monthly_conversions).html() : 'Unlimited') + '</strong></p> <p>Daily Payout: <strong>' + ((value.daily_payout != 0) ? $('<div>').text(value.daily_payout).html() : 'Unlimited') +
				// 		'</strong>, Monthly Payout: <strong>' + ((value.monthly_payout != 0) ? $('<div>').text(value.monthly_payout).html() : 'Unlimited') +
				// 		'</strong></p> <p>Daily Revenue: <strong>' + ((value.daily_revenue != 0) ? $('<div>').text(value.daily_revenue).html() : 'Unlimited') +
				// 		'</strong>, Monthly Revenue: <strong>' + ((value.monthly_revenue != 0) ? $('<div>').text(value.monthly_revenue).html() : 'Unlimited') + '</strong></p>';

				html = '<table class="table">' +
							'<thead><tr><td colspan="4">Allow Caps: <strong>Yes</strong></td></tr></thead>' +
							'<tr>' +
								'<td>Daily Conversions:</td><td><strong>' + ((value.daily_conversions != 0) ? $('<div>').text(value.daily_conversions).html() : 'Unlimited') +'</strong></td>' +
								'<td>Monthly Conversions:</td><td><strong>' + ((value.monthly_conversions != 0) ? $('<div>').text(value.monthly_conversions).html() : 'Unlimited') + '</strong></td>' +
							'</tr><tr>' +
								'<td>Daily Payout:</td><td><strong>' + ((value.daily_payout != 0) ? '$ ' + $('<div>').text(value.daily_payout).html() : 'Unlimited') + '</strong></td>' +
								'<td>Monthly Payout:</td><td><strong>' + ((value.monthly_payout != 0) ? '$ ' + $('<div>').text(value.monthly_payout).html() : 'Unlimited') + '</strong></td>' +
							'</tr><tr>' +
								'<td>Daily Revenue:</td><td><strong>' + ((value.daily_revenue != 0) ? $('<div>').text(value.daily_revenue).html() : 'Unlimited') + '</strong></td>' +
								'<td>Monthly Revenue:</td><td><strong>' + ((value.monthly_revenue != 0) ? $('<div>').text(value.monthly_revenue).html() : 'Unlimited') + '</strong></td>' +
							'</tr><tr>' +
								'<td>Daily Alarm:</td><td><strong>' + ((value.daily_alarm != 0) ? $('<div>').text(value.daily_alarm).html() : '0') + ' %</strong></td>' +
								'<td>Monthly Alarm:</td><td><strong>' + ((value.monthly_alarm != 0) ? $('<div>').text(value.monthly_alarm).html() : '0') + ' %</strong></td>' +
							'</tr>' +
						'</table>';
			}else{
				html = 'Allow Caps: No';
			}

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
		  return null;  
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
			str = $.fn.editableutils.tryParseJson(str, true); 

			return str;
	   },
	   
	   /**
		Sets value of input.
		
		@method value2input(value) 
		@param {mixed} value
	   **/         
	   value2input: function(value) {
	   		var self = this;
	   		var func_alarm_field = function (val, input) {
				if (val == '' || val == 0) {
					self.$input.filter('[name="'+ input +'"]').prop('disabled', true).val(0);
				} else {
					self.$input.filter('[name="'+ input +'"]').prop('disabled', false);
				}
	   		}
			if(_.isEmpty(value)) {
				value = {
					is_caps: 0,
					daily_conversions: 0,
					monthly_conversions: 0,
					daily_payout: '0.00',
					monthly_payout: '0.00',
					daily_revenue: '0.00',
					monthly_revenue: '0.00',
					daily_alarm: 0,
					monthly_alarm: 0
				}
			}
			self.$select.filter('[name="is_caps"]').find('option[value=' + value.is_caps + ']').attr('selected', 'selected');
			self.$input.filter('[name="daily_conversions"]').val(value.daily_conversions)
			.on('keyup change', function(){
				var _val = $.trim($(this).val());
				func_alarm_field(_val, 'daily_alarm');
			});

			self.$input.filter('[name="monthly_conversions"]').val(value.monthly_conversions)
			.on('keyup change', function(){
				var _val = $.trim($(this).val());
				func_alarm_field(_val, 'monthly_alarm');
			});
			self.$input.filter('[name="daily_payout"]').val(value.daily_payout);
			self.$input.filter('[name="monthly_payout"]').val(value.monthly_payout);
			self.$input.filter('[name="daily_revenue"]').val(value.daily_revenue);
			self.$input.filter('[name="monthly_revenue"]').val(value.monthly_revenue);
			self.$input.filter('[name="daily_alarm"]').val(value.daily_alarm);
			self.$input.filter('[name="monthly_alarm"]').val(value.monthly_alarm);

			if (value.daily_conversions == 0 || value.daily_conversions == '') {
				self.$input.filter('[name="daily_alarm"]').prop('disabled', true);
			}
			if (value.monthly_conversions == 0 || value.monthly_conversions == '') {
				self.$input.filter('[name="monthly_alarm"]').prop('disabled', true);
			}
	   },       
	   
	   /**
		Returns value of input.
		
		@method input2value() 
	   **/          
	   input2value: function() {
			return {
				is_caps: this.$select.filter('[name="is_caps"]').val(),
				daily_conversions: this.$input.filter('[name="daily_conversions"]').val(),
				monthly_conversions: this.$input.filter('[name="monthly_conversions"]').val(),
				daily_payout: this.$input.filter('[name="daily_payout"]').val(),
				monthly_payout: this.$input.filter('[name="monthly_payout"]').val(),
				daily_revenue: this.$input.filter('[name="daily_revenue"]').val(),
				monthly_revenue: this.$input.filter('[name="monthly_revenue"]').val(),
				daily_alarm: this.$input.filter('[name="daily_alarm"]').val(),
				monthly_alarm: this.$input.filter('[name="monthly_alarm"]').val()
			};
	   },        
	   
		/**
		Activates input: sets focus on the first field.
		
		@method activate() 
	   **/        
	   activate: function() {
			this.$input.filter('[name=daily_conversions]').focus();
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

	Caps.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
		tpl: '<table class="table">' +
				'<thead><tr><td>Caps:</td><td colspan="3"><select name="is_caps" class="form-control"><option value="1">Yes</option><option value="0">No</option></select></td></tr></thead>' +
				'<tr>' +
					'<td>Daily Conversions:</td><td><input type="number" name="daily_conversions" class="input-small form-control" min="0" value="0" /></td>' +
					'<td>Monthly Conversions:</td><td><input type="number" name="monthly_conversions" class="input-small form-control" min="0" value="0" /></td>' +
				'</tr><tr>' +
					'<td>Daily Payout:</td><td><input type="text" name="daily_payout" class="input-small form-control" value="0.00" /></td>' +
					'<td>Monthly Payout:</td><td><input type="text" name="monthly_payout" class="input-small form-control" value="0.00" /></td>' +
				'</tr><tr>' +
					'<td>Daily Revenue:</td><td><input type="text" name="daily_revenue" class="input-small form-control" value="0.00" /></td>' +
					'<td>Monthly Revenue:</td><td><input type="text" name="monthly_revenue" class="input-small form-control" value="0.00" /></td>' +
				'</tr><tr>' +
					'<td colspan="4">Alarm allow Only integers. eg. 0 or 10 or 20 or 30 etc.</td>' +
				'</tr><tr>' +
					'<td>Daily Alarm:</td><td><input type="number" name="daily_alarm" class="input-small form-control" min="0" max="99" value="0" /> %</td>' +
					'<td>Monthly Alarm:</td><td><input type="number" name="monthly_alarm" class="input-small form-control" min="0" max="99" value="0" /> %</td>' +
				'</tr>' +
			'</table>',

		inputclass: ''
	});

	$.fn.editabletypes.caps = Caps;

}(window.jQuery));