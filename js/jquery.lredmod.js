/*
 * jQuery LRED-modal Plugin 1.0
 * www.lred.ru
 * Copyright 2017, LRED
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function($) {

/*---------------------------
 Defaults for lredmod
----------------------------*/

/*---------------------------
 Listener for data-lredmod-id attributes
----------------------------*/
    $(document).ready(function(){
	$('.lredmod .lredform_hide').each(function() {
    $('<div class="lredform_nav"><div class="lredform_nav_down"><i class="fa fa-chevron-down"> Дополнительно</i></div><div class="lredform_nav_up"><i class="fa fa-chevron-up"> Скрыть</i></div></div>').insertBefore($(this));
	});
	});
    $(document).on('click', '.lredmod .lredform_nav .lredform_nav_down', function() {
    $(this).closest('.lredmod').find('.lredform_hide').show();
    $(this).closest('.lredmod').find('.lredform_nav .lredform_nav_down').hide();
    $(this).closest('.lredmod').find('.lredform_nav .lredform_nav_up').show();
	});
    $(document).on('click', '.lredmod .lredform_nav .lredform_nav_up', function() {
    $(this).closest('.lredmod').find('.lredform_hide').hide();
    $(this).closest('.lredmod').find('.lredform_nav .lredform_nav_down').show();
    $(this).closest('.lredmod').find('.lredform_nav .lredform_nav_up').hide();
	});

    $(document).on('click', '[data-lredmod-id]', function(e) {
		var modalLocation = $(this).attr('data-lredmod-id');
		$('#'+modalLocation).lredmod($(this).data());
		return false;
	});

	$(document).on("focusin", ".lredmod.opened.iphonchik input, .lredmod.opened.iphonchik input textarea", function(e) {
	    $(this).closest(".lredmod-wrapModal").css({
	        top: $(document).scrollTop(),
	        position: "absolute"
	    });
	}).on("focusout", ".lredmod.opened.iphonchik input, .lredmod.opened.iphonchik input textarea", function(e) {
	    $(this).closest(".lredmod-wrapModal").removeAttr('style');
	});

/*---------------------------
 Extend and Execute
----------------------------*/

    $.fn.lredmod = function(options) {

        var defaults = {
	    	animation: 'fadeAndPop', //fade, fadeAndPop, none
		    animationspeed: 300, //how fast animtions are
		    closeonbackgroundclick: true, //if you click background will modal close?
		    dismissmodalclass: 'lredmod-close', //the class of a button or element that will close an open modal
		    rotate: false //is rotate event
    	},
    	action = {
    		'fadeAndPop': {
    			'open': function(params){
    				params.modal.css({
    					'top': '-'+params.modalHeight+'px',
    					'visibility' : 'visible'
    				});

    				params.modalBG.fadeIn(params.options.animationspeed/2);

    				if(/iphone/i.test(navigator.userAgent)){
    					params.animateOption.step = function(now, tween){
    						if(tween.prop == 'top'){
    							tween.end = (window.innerHeight - params.modalHeight) / 2;
    						}
    					}
    				}

    				params.modal
    					.delay(params.options.animationspeed)
    					.animate(
    						{
    							'top': (params.windowInnerHeight - params.modalHeight) / 2 + 'px',
    							'opacity' : 1
    						},
    						params.animateOption
    					);
    			},
    			'close': function(params){
    				params.modalBG
    					.delay(params.options.animationspeed)
    					.fadeOut(params.options.animationspeed);

    				params.modal
    					.animate(
    						{
    							"top":  '-'+(params.modal.offset().top + params.modal.outerHeight())+'px',
    							"opacity" : 0
    						},
    						params.animateOption
    					);
    			}
    		},
    		'fade': {
    			'open': function(params){
    				params.modal.css({
    					'opacity' : 0,
    					'top': params.modalHeight >= params.windowInnerHeight
    						 ? 0
    						 :(params.windowInnerHeight - params.modalHeight) / 2 + 'px',
    					'visibility' : 'visible',
    				});

    				params.modalBG.fadeIn(params.options.animationspeed/2);

    				params.modal
    					.delay(params.options.animationspeed/2)
    					.animate(
    						{
    							'opacity' : 1
    						},
    						params.animateOption
    					);
    			},
    			'close': function(params){
    				params.modalBG
    					.delay(params.options.animationspeed)
    					.fadeOut(params.options.animationspeed);

    				params.modal
    					.animate(
    						{
    							"opacity" : 0
    						},
    						params.animateOption
    					);
    			}
    		},
    		'none': {
    			'open': function(params){
    				params.modalBG.css({"display":"block"});
    				params.modal.addClass("opened").css({
    					'position':'relative',
    					'visibility' : 'visible',
    					'opacity' : 1
    				});
    			},
    			'close': function(params){
    				params.modalBG.css({'display' : 'none'});
    				params.animateOption.complete.call();
    			}
    		}
    	};

        //Extend dem' options
        var options = $.extend({}, defaults, options);

        return this.each(function() {

			/*---------------------------
			 Global Variables
			----------------------------*/
        	var modal = $(this),
        		modalHeight = modal.outerHeight(true),
          		locked = false,
				modalBG = $('.lredmod-BG'),
				windowInnerHeight = window.innerHeight,
				windowInnerWidth = window.innerWidth;

			/*---------------------------
			 Create Modal BG
			----------------------------*/
			if(modalBG.length == 0) {
				modalBG = $('<div class="lredmod-BG" />').appendTo('body');
			}

			/*---------------------------
			 Open & Close Animations
			----------------------------*/
			//Entrance Animations
			modal.on('lredmod:open', function (e) {
			  	modalBG.add(modal.find('.' + options.dismissmodalclass)).off('.lredModalEvent');

				if(!locked) {
					lockModal();

					if(!modal.parent().is('body')){
						modal.appendTo('body');
					}

					modal
						.wrap('<div class="lredmod-wrapModal" />')
						.parent().on('click.lredModalEvent', function (e) {

						if($(e.target).is('.lredmod-wrapModal')){

							modalBG.trigger('click.lredModalEvent');
						}
					});

					if(!modal.hasClass("iphonchik") && /iphone/i.test(navigator.userAgent)){
						modal.addClass("iphonchik");
					}

					var animateOption = {
						'duration': options.animationspeed,
						'complete': function(){
							modal
								.addClass("opened")
								.css({
									'top':'',
									'left':'',
									'position':'relative'
								});
						}
					};

					action[options.animation].open.call(null,{
						'options': options,
						'modal': modal,
						'modalBG': modalBG,
						'modalHeight': modalHeight,
						'windowInnerHeight': windowInnerHeight,
						'animateOption': animateOption
					});

					unlockModal();
				}
				modal.off('lredmod:open');
			});

			//Closing Animation
			modal.on('lredmod:close', function (e) {

				if(!locked) {
					lockModal();

					modal.parent().off();

					var animateOption = {
						'duration': options.animationspeed/2,
						'complete': function(){
							modal
								.removeClass("opened")
								.removeAttr('style')
								.unwrap();

							andClosed();
						}
					};

					action[options.animation].close.call(null,{
						'options': options,
						'modal': modal,
						'modalBG': modalBG,
						'animateOption': animateOption
					});

					unlockModal();
				}
				modal.off();
			});

			//Rotate
			modal.on('lredmod:rotateIn', function (e) {
				modalBG.add(modal.find('.' + options.dismissmodalclass)).off('.lredModalEvent');

				if(!locked) {
					lockModal();

					if(!modal.parent().is('body')){
						modal.appendTo('body');
					}

					modal
						.wrap('<div class="lredmod-wrapModal" />')
						.parent().on('click.lredModalEvent', function (e) {

						if($(e.target).is('.lredmod-wrapModal')){

							modalBG.trigger('click.lredModalEvent');
						}
					});

					if(!modal.hasClass("iphonchik") && /iphone/i.test(navigator.userAgent)){
						modal.addClass("iphonchik");
					}

					var animateOption = {
						'duration': options.animationspeed,
						'complete': function(){
							modal
								.addClass("opened")
								.css({
									'top':'',
									'left':'',
									'position':'relative'
								});
						}
					};

					action[options.animation].open.call(null,{
						'options': options,
						'modal': modal,
						'modalBG': modalBG,
						'modalHeight': modalHeight,
						'windowInnerHeight': windowInnerHeight,
						'animateOption': animateOption
					});

					unlockModal();
				}
				modal.off('lredmod:rotateIn');
			});

			modal.on('lredmod:rotateOut', function (e) {
				modal.parent().off();
				modal
					.removeClass("opened")
					.removeAttr('style')
					.unwrap();

				modal.off();
			});

			/*---------------------------
			 Open and add Closing Listeners
			----------------------------*/
        	//Open Modal Immediately

        	if(options.rotate){
        		modal.trigger('lredmod:rotateIn');
        	} else {
        		modal.trigger('lredmod:open');
        	}

			//Close Modal Listeners
			$(".lredmod-close").on('click.lredModalEvent', function () {
				modal.trigger('lredmod:manuallyClose');
				modal.trigger('lredmod:close');
			});

			if(options.closeonbackgroundclick) {
				modalBG.on('click.lredModalEvent', function () {
					modal.trigger('lredmod:manuallyClose');
					modal.trigger('lredmod:close')
				});
			}

			$('body').keyup(function(e) {
        		if(e.which===27){  // 27 is the keycode for the Escape key
        			modal.trigger('lredmod:manuallyClose');
        			modal.trigger('lredmod:close');
        		}
			});

			function andClosed(){


			}

			/*---------------------------
			 Animations Locks
			----------------------------*/
			function unlockModal() {
				locked = false;
			}
			function lockModal() {
				locked = true;
			}

        });//each call
    }//orbit plugin call

})(jQuery);

