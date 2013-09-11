(function(nayuda){

    var g_http = null;
    nayuda.exts({

	getXMLHttpRequest: function(){
	    if(window.ActiveXObject){
            try{
                // IE Upper version
                return new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(e1){
                try{
                // IE lower version
                return new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch(e2){
                return null;
                }
            }
	    }

	    if(window.XMLHttpRequest){
            return new XMLHttpRequest();
	    }else{
            alert('We do not support old browser');
            return null;
	    }
	},

    ajax: function(url, options) {
	    g_http = this.getXMLHttpRequest();
	    g_http.onreadystatechange = function(){
            if(g_http.readyState == 4 && g_http.status == 200){
                var data = g_http.responseText;
                if(N.strtoupper(options.type) == "JSON"){
                    data = JSON.parse(g_http.responseText);
                }
                options.onSuccess(data);
		    }
	    }

	    var contentType = "application/x-www-form-urlencoded; charset=UTF-8";

	    if(N.strtoupper(options.method) == "POST"){
		    var param = options.param;
		    g_http.open("POST", url, true);
		    g_http.setRequestHeader("Content-Type", contentType);
		    g_http.send(param);

	    }else{
		    var param = "?"+options.param;
		    g_http.open("GET", url + param, true);
		    g_http.setRequestHeader("Content-Type", contentType);
		    g_http.send(null);
	    }
	},

    each: function(jsonText, callback_func){
         var arrItem = JSON.parse(jsonText);

         for(var i=0; i<arrItem.length; i++){
             callback_func(arrItem[i]);
         } 
    }

    });

})(nayuda);
