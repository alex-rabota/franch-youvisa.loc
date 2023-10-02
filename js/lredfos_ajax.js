/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){var t,n=!1,a=/chrome/i.test(navigator.userAgent),r=!0;e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&((n=this.createTextRange()).collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},lredfosmask:function(i,o){var c,l,u,f,s,h,g,m;if(!i&&this.length>0){var d=(c=e(this[0])).data(e.mask.dataName);return d?d():void 0}return o=e.extend({autoclear:e.mask.autoclear,placeholder:e.mask.placeholder,completed:null},o),l=e.mask.definitions,u=[],f=g=i.length,s=null,e.each(i.split(""),function(e,t){"?"==t?(g--,f=e):l[t]?(u.push(new RegExp(l[t])),null===s&&(s=u.length-1),f>e&&(h=u.length-1)):u.push(null)}),this.trigger("unmask").each(function(){function c(){if(o.completed){for(var e=s;h>=e;e++)if(u[e]&&T[e]===d(e))return;o.completed.call(S)}}function d(e){return o.placeholder.charAt(e<o.placeholder.length?e:0)}function p(e){for(;++e<g&&!u[e];);return e}function v(e){for(;--e>=0&&!u[e];);return e}function b(e,t){var n,a;if(0>e)S.caret(s);else{for(n=e,a=p(t);g>n;n++)if(u[n]){if(!(g>a&&u[n].test(T[a])))break;T[n]=T[a],T[a]=d(a),a=p(a)}j(),S.caret(e>s?e:s)}}function k(e){var t,n,a,r;for(t=e,n=d(e);g>t;t++)if(u[t]){if(a=p(t),r=T[t],T[t]=n,!(g>a&&u[a].test(r)))break;n=r}}function y(){R(),S.val()!=w&&S.change()}function x(e,t){var n;for(n=e;t>n&&g>n;n++)u[n]&&(T[n]=d(n))}function j(){S.val(T.join(""))}function R(e){var t,n,a,r=S.val(),i=-1;for(t=0,a=0;g>t;t++)if(u[t]){for(T[t]=d(t);a++<r.length;)if(n=r.charAt(a-1),u[t].test(n)){T[t]=n,i=t;break}if(a>r.length){x(t+1,g);break}}else T[t]===r.charAt(a)&&a++,f>t&&(i=t);return e?j():f>i+1?o.autoclear||T.join("")===A?(S.val()&&S.val(""),x(0,g)):j():(j(),S.val(S.val().substring(0,i+1))),f?t:s}var S=e(this),T=e.map(i.split(""),function(e,t){return"?"!=e?l[e]?d(t):e:void 0}),A=T.join(""),w=S.val();S.data(e.mask.dataName,function(){return e.map(T,function(e,t){return u[t]&&e!=d(t)?e:null}).join("")}),S.one("unmask",function(){S.off(".mask").removeData(e.mask.dataName)}).on("focus.mask",function(){if(!S.prop("readonly")){clearTimeout(t);var e;w=S.val(),e=R(),t=setTimeout(function(){S.get(0)===document.activeElement&&(j(),e==i.replace("?","").length?S.caret(0,e):S.caret(e))},10)}}).on("blur.mask",y).on("keydown.mask",function(e){if(!S.prop("readonly")){var t,a,r,i=e.keyCode||e.which;m=S.val(),8===i||46===i||n&&127===i?(t=S.caret(),a=t.begin,(r=t.end)-a==0&&(a=46!==i?v(a):r=p(a-1),r=46===i?p(r):r),x(a,r),b(a,r-1),e.preventDefault()):13===i?y.call(this,e):27===i&&(S.val(w),S.caret(0,R()),e.preventDefault())}}).on("keypress1.mask",function(t){var n=e("#console").html();if(e("#console").html(n+"<br>keypress"),!S.prop("readonly")){var a,i,o,l=t.keyCode||t.which,f=S.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||!l||13===l||(f.end-f.begin!=0&&(x(f.begin,f.end),b(f.begin,f.end-1)),a=p(f.begin-1),g>a&&(i=String.fromCharCode(l),u[a].test(i))&&(k(a),T[a]=i,j(),o=p(a),r?setTimeout(function(){e.proxy(e.fn.caret,S,o)()},0):S.caret(o),f.begin<=h&&c()),t.preventDefault())}}).on("input.mask paste.mask",function(){S.prop("readonly")||setTimeout(function(){var e=R(!0);S.caret(e),c()},0)}),a&&r&&S.off("input.mask").on("input.mask",function(){var t=S.val(),n=S.caret();if(m&&m.length&&m.length>t.length){for(R(!0);n.begin>0&&!u[n.begin-1];)n.begin--;if(0===n.begin)for(;n.begin<s&&!u[n.begin];)n.begin++;S.caret(n.begin,n.begin)}else{for(R(!0);n.begin<g&&!u[n.begin];)n.begin++;var a=v(n.begin);null===u[a]||u[a].test(T[a])||(n.begin=a),setTimeout(function(){e.proxy(e.fn.caret,S,n.begin)()},0)}c()}),R()})}})});

/*!
* JavaScript Cookie v2.2.0
* https://github.com/js-cookie/js-cookie
*
* Copyright 2006, 2015 Klaus Hartl & Fagner Brack
* Released under the MIT license
*/
!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var o=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=o,t}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}function n(o){function t(n,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(i=e({path:"/"},t.defaults,i)).expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}i.expires=i.expires?i.expires.toUTCString():"";try{/^[\{\[]/.test(c=JSON.stringify(r))&&(r=c)}catch(e){}r=o.write?o.write(r,n):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=(n=(n=encodeURIComponent(String(n))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var s="";for(var f in i)i[f]&&(s+="; "+f,!0!==i[f]&&(s+="="+i[f]));return document.cookie=n+"="+r+s}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],d=/(%[0-9A-Z]{2})+/g,u=0;u<p.length;u++){var l=p[u].split("="),C=l.slice(1).join("=");this.json||'"'!==C.charAt(0)||(C=C.slice(1,-1));try{var g=l[0].replace(d,decodeURIComponent);if(C=o.read?o.read(C,g):o(C,g)||C.replace(d,decodeURIComponent),this.json)try{C=JSON.parse(C)}catch(e){}if(n===g){c=C;break}n||(c[g]=C)}catch(e){}}return c}}return t.set=t,t.get=function(e){return t.call(t,e)},t.getJSON=function(){return t.apply({json:!0},[].slice.call(arguments))},t.defaults={},t.remove=function(n,o){t(n,"",e(o,{expires:-1}))},t.withConverter=n,t}return n(function(){})});

/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
*/
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){var b=a.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(b)}function d(a){return function(b){var d=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(d)for(var f=0,g=d.length;f<g;++f){var h=d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),j=c(h[0]),k=h[1]||"",l=h[3]||"",m=null;h=h[2],i.hasOwnProperty(h)&&(m=i[h],m=Number(a[m])),null!==m&&("!"===k&&(m=e(l,m)),""===k&&m<10&&(m="0"+m.toString()),b=b.replace(j,m.toString()))}return b=b.replace(/%%/,"%")}}function e(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),Math.abs(b)>1?c:d}var f=[],g=[],h={precision:100,elapse:!1,defer:!1};g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var i={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"},j=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.options=a.extend({},h),this.firstTick=!0,this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&("function"==typeof d?(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)):this.options=a.extend({},h,d)),this.setFinalDate(c),this.options.defer===!1&&this.start()};a.extend(j.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){if(0===this.$el.closest("html").length)return void this.remove();var a,b=new Date;return a=this.finalDate.getTime()-b.getTime(),a=Math.ceil(a/1e3),a=!this.options.elapse&&a<0?0:Math.abs(a),this.totalSecsLeft===a||this.firstTick?void(this.firstTick=!1):(this.totalSecsLeft=a,this.elapsed=b>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),weeksToMonth:Math.floor(this.totalSecsLeft/60/60/24/7)%4,months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-b.getFullYear()),totalDays:Math.floor(this.totalSecsLeft/60/60/24),totalHours:Math.floor(this.totalSecsLeft/60/60),totalMinutes:Math.floor(this.totalSecsLeft/60),totalSeconds:this.totalSecsLeft},void(this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish"))))},dispatchEvent:function(b){var c=a.Event(b+".countdown");c.finalDate=this.finalDate,c.elapsed=this.elapsed,c.offset=a.extend({},this.offset),c.strftime=d(this.offset),this.$el.trigger(c)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];j.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new j(this,b[0],b[1])})}});

/*!
* Lred FOS v5.1.2
* https://lred.ru/*
* Copyright 2016, 2017 Lred
* Released under the MIT license
*/
jQuery(document).ready(function($){

    $('.lredform').on('change', '.pasanger', function(event) {
        var fileName = $(this).val().split( '\\' ).pop();
        fileName = fileName == '' ? $(this).closest('label').find('.pasangerTitle').data('deftitle') : fileName;
        $(this).closest('label').find('.pasangerTitle').text(fileName);
        return false;
    });

    $('.close-modal').click(function(event) {
        $('.lredmod.opened').trigger('lredmod:close');
    });
    //Валидация полей
    function validate( input ) {

        var regexp, msg, required;

        switch ( input.attr('name') ) {

            case 'lred_name':
                regexp = /^[А-Яа-яЁё\ ]+$/i;
                msg = '*Допускаются только русские буквы';
                break;

            case 'lred_email':
                regexp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
                msg = '*Неверный формат электронной почты';
                break;

            default:
                regexp = false;
                break;
        }


        if ( input.hasClass('pasanger') ) {

            required = input.hasClass('required') ? true : false;

        } else {

            required = input.prop('required');
        }

        if( required && (input.val() == '' || input.val() === null)){

            if ( input.hasClass('pasanger') ) {

                input.closest('label').find('.pasangerTitle').removeClass('valid').addClass('invalid');
                input.closest('.wrapPasanger').next('p').text('*Это поле не должно быть пустым');

            } else if ( input.hasClass('select_list') ) {

                input.removeClass('valid').addClass('invalid');
                input.next('p').text('*Необходим выбор из списка');

            } else {
                input.removeClass('valid').addClass('invalid');
                input.next('p').text('*Это поле не должно быть пустым');
            }


            return false;

        } else if( input.val() != '' && regexp && !regexp.test(input.val()) ) {

            input.removeClass('valid').addClass('invalid');
            input.next('p').text(msg);

            return false;

        } else {

            if ( input.hasClass('pasanger') ) {

                input.closest('label').find('.pasangerTitle').removeClass('invalid').addClass('valid');
                input.closest('.wrapPasanger').next('p').text('');

            } else {

                input.removeClass('invalid').addClass('valid');
                input.next('p').text('');
            }
        }

        return true;
    }

    //Валидация поля после изменения инвалида (jQuery v1.7)
    if( typeof window.jQuery.fn.on != 'undefined'){

        $('.lredform').on('change', 'input.invalid, textarea.invalid, select.invalid, .wrapPasanger .invalid + input', function(event) {

            validate( $(this) );
        });
    }

    //Маска для телефона
    $('.lredform input[name="lred_phone"]').lredfosmask("+7(999) 999-9999");

    //Отправка формы
    $('.lredform [type="submit"]').click(function(){

        if($(this).hasClass('hidden')){
            return false;
        }

        var status = true, data = new FormData(), form = $(this).closest('form'), subject = form.find('[name="lred_subject"]'), main_btn = $(this, "input[name='lred_btn']").val();

        form.find('input[type="text"],input[type="file"],textarea,select').each(function(index, el) {

            var input_status = validate( $(el) );
            status = !status ? false : input_status;

            data.append('lreddata['+$(el).attr('name')+']',$(el).val());
        });

        if( form.find('.pasanger').length ){

            form.find('.pasanger').each(function(index, el) {

                if ( $(el).prop('files').length ) {

                    data.append('lred_pasanger', $(el).prop('files')[0]);
                }
            });

        }

        if ( status ) {

            if( subject.length ){

                data.append('lreddata[subject]',subject.val());
            }

            if( form.find('.pasanger').length ){

                form.find('.pasanger').each(function(index, el) {

                    if ( $(el).prop('files').length ) {

                        data.append('lred_pasanger', $(el).prop('files')[0]);
                    }
                });

            }

            data.append('screen[width]', screen.width);
            data.append('screen[height]', screen.height);
            data.append('screen[colorDepth]', screen.colorDepth);
            data.append('screen[working][width]', window.innerWidth);
            data.append('screen[working][height]', window.innerHeight);
            data.append('cookie', navigator.cookieEnabled);
            data.append('language', navigator.language);
            data.append('languages', navigator.languages);
            data.append('localDT', new Date);


            $.ajax({
                url: $(this).closest('form').attr('action'),
                type: "POST",
                processData: false,
                contentType: false,
                data: data,
                success: function (data){

                    if (form.hasClass('red-modal')) {
                        form.closest('.lredmod').animate({
                            'opacity' : 0
                        }, 200, function() {
                            $(this).css({'opacity' : 1, 'visibility' : 'hidden'});
                        });
                    }

                    if(data.status == true){

                        if(typeof dataLayer === "object"){

                            var trackEvent = 'rlformsend'+(form.data('tracking') != undefined ? '_'+form.data('tracking') : '');
                            dataLayer.push({'event': trackEvent});
                        }

                        if ( form.hasClass('red-report') ) {

                            form.find('.report_result').html(data.msg).slideDown(400);

                        } else {

                            $('#lredmodSuccess.lredthanks .msg').html(data.msg);
                            $('.lredmod.opened').trigger('lredmod:rotateOut');
                            $('#lredmodSuccess').lredmod({rotate: $('body').hasClass('lredmod-noScroll')});
                        }

                        form.find('input[type="text"],input[type="file"],textarea,select').each(function(index, el) {

                            if($(this).hasClass('pasanger')){

                                $(this).prev('.pasangerTitle').removeClass('valid invalid');

                            } else if ($(this).hasClass('select_list')) {

                                $(this).find('option[selected]').prop('selected', true);
                                $(this).removeClass('valid invalid');

                            } else {

                                $(this).val('').removeClass('valid invalid');
                            }

                            $(this).next('p').text('');
                        });

                        form.find('.pasanger').each(function(index, el) {

                            var pasTitle = $(this).closest('label').find('.pasangerTitle');

                            pasTitle.removeClass('valid invalid');
                            pasTitle.text(pasTitle.data('deftitle'));
                            $(this).val('');
                        });

                        // Для пошаговой формы
                        if(form.hasClass('stepsform')){

                            var blocks = form.find('.formBlocks'),
                                currentTitle = blocks.find('.formBlocksHead .blocktitle'),
                                currentStep = blocks.find('.formBlocksHead .blockstep'),
                                blocksAll = blocks.find('.formBlocksWrap .formBlock');

                            //Установка заголовка первого блока
                            currentTitle.text('');

                            //Установка шаговости
                            currentStep.text('');

                            //Сброс display
                            blocksAll.removeAttr('style');
                        }

                    } else {

                        if ( form.hasClass('red-report') ) {

                            form.find('.report_result').html(data.msg).slideDown(400);

                        } else {

                            $('#lredmodFail.lredthanks .msg').html(data.msg);

                            $('.lredmod.opened').trigger('lredmod:rotateOut');
                            $('#lredmodFail').lredmod({rotate: $('body').hasClass('lredmod-noScroll')});
                        }
                    }

                    if (main_btn == "Получить план открытия") {
                        window.location.replace('https://franch-youvisa.com/templates/your-visa/page/page_plan_open.php');
                    } else if (main_btn == "Получить презентацию") {
                        window.location.replace('https://franch-youvisa.com/templates/your-visa/page/page_prezentation.php');
                    } else if (main_btn == "Получить Безнес-План") {
                        window.location.replace('https://franch-youvisa.com/templates/your-visa/page/page_bizness_plan.php');
                    } else if (main_btn == "Получить финансовую модель") {
                        window.location.replace('https://franch-youvisa.com/templates/your-visa/page/page_fin_model.php');
                    }

                },
                dataType: "json"
            });

        }

        return false;
    });

    //Звездочка для плейсхолдера
    /*$('.lredform :required, .lredform input[type="file"].required').each(function(index, el) {

        var elem = $(el),
            tagName = el.tagName;

        switch(tagName) {
            case 'INPUT':
            case 'TEXTAREA':
                if (elem.attr('type') == 'file') {
                    var fileTitle = elem.parent().find('.pasangerTitle'),
                        filePlaceholder = fileTitle.data('deftitle') + ' *';
                    fileTitle.data('deftitle', filePlaceholder).text(filePlaceholder);
                } else {
                    var placeholder = elem.prop('placeholder') + ' *';
                    elem.prop('placeholder', placeholder);
                }
                break;
            case 'SELECT':
                var placeholder_opt = elem.find(':selected:disabled'),
                    placeholder = placeholder_opt.text() + ' *';
                placeholder_opt.text(placeholder);
                break;
        }
    });*/

    //Agree
    $(document).on('click', '.lredform .redAgree', function(event) {
        /* Act on the event */
        if(event.target.tagName == "A"){
            return;
        }

        var Chekbox = $(this).children('.redChekboxAgree'),
            Button = $(this).closest('form').find('.input_submit');

        if(Chekbox.hasClass('checked')){
            Button.fadeOut(200,function(){
                $(this).addClass('hidden').css({display: 'inline-block', opacity: 0});
            });
            Chekbox.removeClass('checked');

        }else{
            Button.removeClass('hidden').removeAttr('style').css({display: 'none'}).fadeIn(200);
            Chekbox.addClass('checked');
        }
    });

    //Автопоявление
    var autoPopCookie = Cookies.get('autoPopCookie');
        autoPopCookie = autoPopCookie != undefined
            ? JSON.parse(autoPopCookie)
            : new Object(),
        timestamp = Math.round(new Date().getTime() / 1000),
        autopopLendth = $('.lredmod[data-autopop]').length,
        autocloseID = false;

    $('.lredmod[data-autopop]').each(function(i, el) {

        var autopop = parseInt($(el).data('autopop'));

        if(
            (
                (nextPopap = autoPopCookie[$(el).attr('id')]) != undefined && nextPopap < timestamp
            )
            ||
            nextPopap == undefined
        ){
            autoPopCookie[$(el).attr('id')] = timestamp + 86400 + autopop;

            setTimeout(function(){
                $('.lredmod.opened').trigger('lredmod:rotateOut');
                $(el).lredmod({rotate: $('body').hasClass('lredmod-noScroll')});

                // Автозакрытие
                if( $(el).attr("data-autoclose") ){

                    var autoclose = $(el).attr("data-autoclose");

                    if(autocloseID !== false){

                        clearTimeout(autocloseID);
                    }

                    autocloseID =  setTimeout(function(){

                        $(el).trigger('lredmod:close');

                    }, autoclose * 1000);
                }

            }, autopop * 1000);
        }

        if((autopopLendth - 1) == i && !$.isEmptyObject(autoPopCookie)){

            Cookies.set('autoPopCookie', JSON.stringify(autoPopCookie), { expires: 365, path: '/' });
        }
    });

    // Первичная обработка пошаговой формы
    $(document).on('lredmod:open', function( e ){

        var form = $(e.target).find('form');

        if(form.hasClass('stepsform')){

            var blocks = form.find('.formBlocks'),
                currentTitle = blocks.find('.formBlocksHead .blocktitle'),
                currentStep = blocks.find('.formBlocksHead .blockstep'),
                blocksLength = blocks.find('.formBlocksWrap .formBlock').length,
                firstBlock = blocks.find('.formBlocksWrap .formBlock:first');
            //Установка заголовка первого блока
            currentTitle.text(firstBlock.is('[data-blocktitle]')?firstBlock.data('blocktitle'):'');
            //Установка шаговости
            currentStep.text('шаг 1 из '+blocksLength);
        }
    });

    // Сброс блока пошаговой формы при закрытии
    $(document).on('lredmod:close', function( e ){

        var form = $(e.target).find('form');

        if(form.hasClass('stepsform')){

            var blocks = form.find('.formBlocks'),
                currentTitle = blocks.find('.formBlocksHead .blocktitle'),
                currentStep = blocks.find('.formBlocksHead .blockstep'),
                blocksAll = blocks.find('.formBlocksWrap .formBlock');
            //Установка заголовка первого блока
            currentTitle.text('');
            //Установка шаговости
            currentStep.text('');
            //Сброс display
            blocksAll.removeAttr('style');
        }
    });


    //Отмена автозакрытия
    $(document).on('click', '.lredmod[data-closetobtn] .clearAutoClose', function(event) {
        if(autocloseID){
            clearTimeout(autocloseID);
        }
    });

    // Механизм прогулки пошаговой формы
    $('.lredform .stepsform').on('click', '.btnSteps', function(e) {

        var currentBlock = $(this).closest('.formBlock'),

            blocks = currentBlock.closest('.formBlocks'),
            currentTitle = blocks.find('.formBlocksHead .blocktitle'),
            currentStep = blocks.find('.formBlocksHead .blockstep'),
            blocksAll = blocks.find('.formBlocksWrap .formBlock'),
            blocksLength = blocksAll.length,
            isNextStep = $(this).hasClass('next_step'),

            targetBlock = isNextStep ? currentBlock.next() : currentBlock.prev(),
            targetStep = blocksAll.index(targetBlock) + 1,
            status = true;

        if(isNextStep){
            currentBlock.find('input[type="text"],input[type="file"],textarea,select').each(function(index, el) {

                var input_status = validate( $(el) );
                status = !status ? false : input_status;
            });
        }

        if(isNextStep && !status){

            return false;
        }

        currentBlock.add(targetBlock).slideToggle(400,function(){
            //Установка заголовка первого блока
            currentTitle.text(targetBlock.is('[data-blocktitle]')?targetBlock.data('blocktitle'):'');
            //Установка шаговости
            currentStep.text('шаг '+targetStep+' из '+blocksLength);
        });
    });

    /*'<span class="cdt-days">%d</span>'+
    '<span class="cdt-hours">%H</span>'+
    '<span class="cdt-minutes">%M</span>'+
    '<span class="cdt-seconds">%S</span>'*/
    //Обратный отсчет
    $('.lredmod[data-fixdays]').each(function(i, el) {

        var andDay = new Date();
        andDay.setDate(andDay.getDate() + parseInt($(el).data('fixdays'))),
        timerWrap = $(el).find('.countDownWrap:not(.none) .timerWrap');
        timerFormat = $.trim(timerWrap.html());

        timerWrap
            .countdown(andDay, function(event) {

                $(this).html(event.strftime(
                    timerFormat
                ));

        }).on('finish.countdown', function() {

            $(el).trigger('lredmod:close');
        });
    });

    //Появление кнопки при ручном закрытии
    $(document).on('lredmod:manuallyClose', function (e) {
        var modal = $(e.target);

        if(modal.is('[data-closetobtn]')){
            setTimeout(function(){

                $('#'+modal.data('closetobtn')).slideDown().addClass('closedForm');

            }, 200);
        }
    });

    //Скрытие кнопки
    $(document).on('lredmod:open', function( e ){

        var modal = $(e.target);

        if(modal.is('[data-closetobtn]')){

            $('#'+modal.data('closetobtn')).slideUp();
        }
    });

    //Закрытие кнопки
    $(document).on('click', '.closedForm .closeClosed', function(event) {

        $(this).closest('[data-lredmod-id]').slideUp();
        return false;
    });
});
