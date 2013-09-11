/*!
 * Nayuda JavaScript Library v0.0.1
 * http://nayuda.com/
 *
 * Copyright 2012 Nayuda Coporation and other contributors
 * Released under the Nayuda license
 * http://nayuda.com/license
 *
 * Date: Fri Nov 30 2012 15:16:17 GMT+0900 (Asia/Seoul Time)
 */
(function( window, undefined ) {
var
	// Use the correct document accordingly with window argument
	document = window.document,
	location = window.location,
	navigator = window.navigator,

	// Map over Nayuda in case of overwrite
	_nayuda = window.nayuda,

	// Map over the $ in case of overwrite
	_N = window.N,

	// Save a reference to some core methods
	core_push = Array.prototype.push,
	core_slice = Array.prototype.slice,
	core_indexOf = Array.prototype.indexOf,
	core_toString = Object.prototype.toString,
	core_hasOwn = Object.prototype.hasOwnProperty,
	core_trim = String.prototype.trim,

	// Define a local copy
	nayuda = function( selector, context ) {
		return new nayuda.fn.init( selector, context);
	},
	// [[Class]] -> type pairs
	class2type = {};

	nayuda.fn = nayuda.prototype = {
		constructor: nayuda,
		init: function(selector, context) {
			// Handle $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Handle $(DOMElement)
			if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
			}

			this.context = document;
			this.selector = selector;
			return this;

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
			return this;
		},
		getElement: function (){
			if(this.selector[0] == '#'){
				return document.getElementById(this.selector.substr(1));
			}else{
				return document.getElementById(this.selector);
			}

		},
		innerHTML : function(val){
			if(val == null){
				return this.getElement().innerHTML;
			}else{
				this.getElement().innerHTML = val;
			}
		},
		value : function(val){
			if(val == null){
				return this.getElement().value;
			}else{
				this.getElement().value = val;
			}
		},
		append : function(val){
			if(!val){
				return this.getElement().innerHTML;
			}else{
				this.getElement().innerHTML += val;
			}
		},
		prepend : function(val){
			if(!val){
				return this.getElement().innerHTML;
			}else{
				this.getElement().innerHTML = val + this.getElement().innerHTML;
			}
		},
		remove: function(){
			element = this.getElement();
			return (element)?element.parentNode.removeChild(element):false;
		}
	};

	// the init function 
	nayuda.fn.init.prototype = nayuda.fn;

	// Logic borrowed from http://code.jquery.com/jquery-1.8.3.js
	nayuda.exts = nayuda.fn.exts = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !nayuda.isFunction(target) ) {
			target = {};
		}

		// extend nayuda itself if only one argument is passed
		if ( length === i ) {
			target = this;
			--i;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( nayuda.isPlainObject(copy) || (copyIsArray = nayuda.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && nayuda.isArray(src) ? src : [];

						} else {
							clone = src && nayuda.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = nayuda.exts( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
		// Return the modified object
		return target;
	};

	nayuda.exts({
		noConflict: function( deep ) {
			if ( window.$ === nayuda ) {
				window.$ = _$;
			}

			if ( deep && window.nayuda === nayuda ) {
				window.nayuda = _nayuda;
			}

			return nayuda;
		},
		isFunction: function( obj ) {
			return nayuda.type(obj) === "function";
		},
		isArray: Array.isArray || function( obj ) {
			return nayuda.type(obj) === "array";
		},

		isWindow: function( obj ) {
			return obj != null && obj == obj.window;
		},

		isNumeric: function( obj ) {
			return !isNaN( parseFloat(obj) ) && isFinite( obj );
		},

		type: function( obj ) {
			return obj == null ?
				String( obj ) :
				class2type[ core_toString.call(obj) ] || "object";
		},

		isPlainObject: function( obj ) {
			// Must be an Object.
			// Because of IE, we also have to check the presence of the constructor property.
			// Make sure that DOM nodes and window objects don't pass through, as well
			if ( !obj || nayuda.type(obj) !== "object" || obj.nodeType || nayuda.isWindow( obj ) ) {
				return false;
			}

			try {
				// Not own constructor property must be Object
				if ( obj.constructor &&
					!core_hasOwn.call(obj, "constructor") &&
					!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
					return false;
				}
			} catch ( e ) {
				// IE8,9 Will throw exceptions on certain host objects #9897
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.

			var key;
			for ( key in obj ) {}

			return key === undefined || core_hasOwn.call( obj, key );
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		error: function( msg ) {
			throw new Error( msg );
		},
	});

	window.nayuda = window.N = nayuda;
})( window );


(function(nayuda){
    nayuda.exts({
	trim: function (str, charlist) {
	    var whitespace, l = 0, i = 0;
	    str += '';

	    if (!charlist) {
		    // default list
		    whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
	    } else {
		    // preg_quote custom list
		    charlist += '';
		    whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
	    }

	    l = str.length;
	    for (i = 0; i < l; i++) {
	    	if (whitespace.indexOf(str.charAt(i)) === -1) {
		      str = str.substring(i);
		      break;
		}
	    }

	    l = str.length;
	    for (i = l - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
		      str = str.substring(0, i + 1);
		      break;
		}
	    }
	    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';

	},
	split: function (delimiter, string){
	      return this.explode(delimiter, string);
	},

        strtoupper: function( str ) {
	      return (str + '').toUpperCase();
	},

        strtolower: function( str ) {
	      return (str + '').toLowerCase();
	},

	explode: function(delimiter, string, limit){
	  if ( arguments.length < 2 || typeof delimiter == 'undefined' || typeof string == 'undefined' ) return null;
	  if ( delimiter === '' || delimiter === false || delimiter === null) return false;

	  if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object'){
	    return { 0: '' };
	  }
	  if ( delimiter === true ) delimiter = '1';

	  delimiter += '';
	  string += '';

	  var s = string.split( delimiter );

	  if ( typeof limit === 'undefined' ) return s;

	  if ( limit === 0 ) limit = 1;

	  // Positive limit
	  if ( limit > 0 ){
	    if ( limit >= s.length ) return s;
	    return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
	  }

	  // Negative limit
	  if ( -limit >= s.length ) return [];

	  s.splice( s.length + limit );
	  return s;
	},

	md5 :function (str) {
	  var xl;

	  var rotateLeft = function (lValue, iShiftBits) {
	    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	  };

	  var addUnsigned = function (lX, lY) {
	    var lX4, lY4, lX8, lY8, lResult;
	    lX8 = (lX & 0x80000000);
	    lY8 = (lY & 0x80000000);
	    lX4 = (lX & 0x40000000);
	    lY4 = (lY & 0x40000000);
	    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
	    if (lX4 & lY4) {
	      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
	    }
	    if (lX4 | lY4) {
	      if (lResult & 0x40000000) {
		return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
	      } else {
		return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
	      }
	    } else {
	      return (lResult ^ lX8 ^ lY8);
	    }
	  };

	  var _F = function (x, y, z) {
	    return (x & y) | ((~x) & z);
	  };
	  var _G = function (x, y, z) {
	    return (x & z) | (y & (~z));
	  };
	  var _H = function (x, y, z) {
	    return (x ^ y ^ z);
	  };
	  var _I = function (x, y, z) {
	    return (y ^ (x | (~z)));
	  };

	  var _FF = function (a, b, c, d, x, s, ac) {
	    a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
	    return addUnsigned(rotateLeft(a, s), b);
	  };

	  var _GG = function (a, b, c, d, x, s, ac) {
	    a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
	    return addUnsigned(rotateLeft(a, s), b);
	  };

	  var _HH = function (a, b, c, d, x, s, ac) {
	    a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
	    return addUnsigned(rotateLeft(a, s), b);
	  };

	  var _II = function (a, b, c, d, x, s, ac) {
	    a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
	    return addUnsigned(rotateLeft(a, s), b);
	  };

	  var convertToWordArray = function (str) {
	    var lWordCount;
	    var lMessageLength = str.length;
	    var lNumberOfWords_temp1 = lMessageLength + 8;
	    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
	    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
	    var lWordArray = new Array(lNumberOfWords - 1);
	    var lBytePosition = 0;
	    var lByteCount = 0;
	    while (lByteCount < lMessageLength) {
	      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
	      lBytePosition = (lByteCount % 4) * 8;
	      lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
	      lByteCount++;
	    }
	    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
	    lBytePosition = (lByteCount % 4) * 8;
	    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
	    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
	    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
	    return lWordArray;
	  };

	  var wordToHex = function (lValue) {
	    var wordToHexValue = "",
	      wordToHexValue_temp = "",
	      lByte, lCount;
	    for (lCount = 0; lCount <= 3; lCount++) {
	      lByte = (lValue >>> (lCount * 8)) & 255;
	      wordToHexValue_temp = "0" + lByte.toString(16);
	      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
	    }
	    return wordToHexValue;
	  };

	  var x = [],
	    k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
	    S12 = 12,
	    S13 = 17,
	    S14 = 22,
	    S21 = 5,
	    S22 = 9,
	    S23 = 14,
	    S24 = 20,
	    S31 = 4,
	    S32 = 11,
	    S33 = 16,
	    S34 = 23,
	    S41 = 6,
	    S42 = 10,
	    S43 = 15,
	    S44 = 21;

	  str = this.utf8_encode(str);
	  x = convertToWordArray(str);
	  a = 0x67452301;
	  b = 0xEFCDAB89;
	  c = 0x98BADCFE;
	  d = 0x10325476;

	  xl = x.length;
	  for (k = 0; k < xl; k += 16) {
	    AA = a;
	    BB = b;
	    CC = c;
	    DD = d;
	    a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
	    d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
	    c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
	    b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
	    a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
	    d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
	    c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
	    b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
	    a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
	    d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
	    c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
	    b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
	    a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
	    d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
	    c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
	    b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
	    a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
	    d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
	    c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
	    b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
	    a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
	    d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
	    c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
	    b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
	    a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
	    d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
	    c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
	    b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
	    a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
	    d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
	    c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
	    b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
	    a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
	    d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
	    c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
	    b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
	    a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
	    d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
	    c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
	    b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
	    a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
	    d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
	    c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
	    b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
	    a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
	    d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
	    c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
	    b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
	    a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
	    d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
	    c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
	    b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
	    a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
	    d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
	    c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
	    b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
	    a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
	    d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
	    c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
	    b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
	    a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
	    d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
	    c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
	    b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
	    a = addUnsigned(a, AA);
	    b = addUnsigned(b, BB);
	    c = addUnsigned(c, CC);
	    d = addUnsigned(d, DD);
	  }

	  var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

	  return temp.toLowerCase();
	}

    });
})(nayuda);

