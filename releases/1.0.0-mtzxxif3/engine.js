(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // ../ipad/node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "../ipad/node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // ../ipad/node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "../ipad/node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // ../ipad/node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "../ipad/node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer2;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer2.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer2.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function Buffer2(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer2.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer2.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer2.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer2, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer2.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer2.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer2.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer2.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer2.alloc(+length);
      }
      Buffer2.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer2.prototype;
      };
      Buffer2.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
        if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer2.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer2.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer2.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer2.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer2.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer2.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer2.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer2.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer2.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer2.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
      Buffer2.prototype.equals = function equals(b) {
        if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer2.compare(this, b) === 0;
      };
      Buffer2.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
      }
      Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer2.from(target, target.offset, target.byteLength);
        }
        if (!Buffer2.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer2.from(val, encoding);
        }
        if (Buffer2.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer2.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer2.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer2.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer2.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer2.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      })();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // ../ipad/engine/host.cjs
  var require_host = __commonJS({
    "../ipad/engine/host.cjs"(exports, module) {
      function host(action, payload = {}) {
        const result = JSON.parse(globalThis.__posHost(action, JSON.stringify(payload)));
        if (!result.ok) {
          const error = new Error(result.error || "\u0E01\u0E32\u0E23\u0E17\u0E33\u0E07\u0E32\u0E19\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08");
          error.status = result.status || 503;
          throw error;
        }
        return result.value;
      }
      module.exports = { host };
    }
  });

  // ../ipad/engine/router.cjs
  var require_router = __commonJS({
    "../ipad/engine/router.cjs"(exports, module) {
      function Router() {
        const layers = [];
        const router = { layers };
        router.use = (...args) => {
          const path = typeof args[0] === "string" ? args.shift() : "/";
          layers.push({ path, method: null, handlers: args.flat() });
          return router;
        };
        for (const method of ["get", "post", "put", "patch", "delete"]) router[method] = (path, ...handlers) => {
          layers.push({ path, method: method.toUpperCase(), handlers: handlers.flat() });
          return router;
        };
        router.handle = (req, res, done) => {
          let index = 0;
          const nextLayer = (error) => {
            if (error) return done(error);
            const layer = layers[index++];
            if (!layer) return done();
            if (layer.method && layer.method !== req.method) return nextLayer();
            const expected = layer.path.split("/").filter(Boolean);
            const actual = req.path.split("/").filter(Boolean);
            if (actual.length < expected.length || layer.method && actual.length !== expected.length) return nextLayer();
            const params = {};
            for (let i = 0; i < expected.length; i++) {
              if (expected[i].startsWith(":")) params[expected[i].slice(1)] = decodeURIComponent(actual[i]);
              else if (expected[i] !== actual[i]) return nextLayer();
            }
            const oldParams = req.params;
            req.params = { ...oldParams, ...params };
            let handlerIndex = 0;
            const next = (error2) => {
              if (error2) return done(error2);
              const handler = layer.handlers[handlerIndex++];
              if (!handler) {
                req.params = oldParams;
                return nextLayer();
              }
              try {
                if (handler?.handle) {
                  const oldPath = req.path;
                  req.path = "/" + actual.slice(expected.length).join("/");
                  handler.handle(req, res, (error3) => {
                    req.path = oldPath;
                    next(error3);
                  });
                } else {
                  const result = handler(req, res, next);
                  if (result?.then) result.catch(done);
                }
              } catch (error3) {
                done(error3);
              }
            };
            next();
          };
          nextLayer();
        };
        return router;
      }
      module.exports = { Router };
    }
  });

  // ../ipad/engine/sqlite.cjs
  var require_sqlite = __commonJS({
    "../ipad/engine/sqlite.cjs"(exports, module) {
      var { host } = require_host();
      var DatabaseSync = class {
        constructor() {
          host("db.open");
        }
        exec(sql) {
          host("db.exec", { sql });
        }
        prepare(sql) {
          return Object.fromEntries(["get", "all", "run"].map((mode) => [mode, (...params) => {
            const result = host("db.query", { sql, params, mode });
            return mode === "get" && result === null ? void 0 : result;
          }]));
        }
        close() {
          host("db.close");
        }
      };
      module.exports = { DatabaseSync };
    }
  });

  // ../ipad/engine/path.cjs
  var require_path = __commonJS({
    "../ipad/engine/path.cjs"(exports, module) {
      module.exports = { resolve: () => "/pos", join: (...parts) => parts.join("/").replace(/\/+/g, "/") };
    }
  });

  // ../ipad/engine/files.cjs
  var require_files = __commonJS({
    "../ipad/engine/files.cjs"(exports, module) {
      var { host } = require_host();
      module.exports = {
        existsSync: (path) => path === "/pos" || host("backup.exists", { name: String(path).split("/").pop() }),
        mkdirSync: () => {
        }
        // Application Support is created by the native host before boot.
      };
    }
  });

  // ../server/expenseSchema.js
  var require_expenseSchema = __commonJS({
    "../server/expenseSchema.js"(exports, module) {
      function initExpenses(db) {
        db.exec(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    expense_date TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL,
    amount INTEGER NOT NULL CHECK(amount>0 AND amount<=10000000),
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE','VOID')),
    payment_source TEXT NOT NULL DEFAULT 'UNPAID' CHECK(payment_source IN ('UNPAID','DRAWER','EXTERNAL')),
    drawer_shift_id INTEGER REFERENCES shifts(id), paid_business_date TEXT, paid_at TEXT,
    created_by_id INTEGER, created_by_name TEXT NOT NULL, created_at TEXT NOT NULL,
    paid_by_id INTEGER, paid_by_name TEXT, voided_by_id INTEGER, voided_by_name TEXT,
    voided_at TEXT, void_reason TEXT,
    client_request_id TEXT NOT NULL UNIQUE, request_fingerprint TEXT NOT NULL,
    CHECK((payment_source='UNPAID' AND paid_at IS NULL AND drawer_shift_id IS NULL AND paid_business_date IS NULL)
      OR (payment_source='DRAWER' AND drawer_shift_id IS NOT NULL AND paid_at IS NOT NULL AND paid_business_date IS NOT NULL)
      OR (payment_source='EXTERNAL' AND drawer_shift_id IS NULL AND paid_at IS NOT NULL AND paid_business_date IS NOT NULL))
  );
  CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date,status);
  CREATE INDEX IF NOT EXISTS idx_expenses_drawer ON expenses(drawer_shift_id,status);`);
      }
      module.exports = { initExpenses };
    }
  });

  // ../server/sheetOutboxSchema.js
  var require_sheetOutboxSchema = __commonJS({
    "../server/sheetOutboxSchema.js"(exports, module) {
      function initSheetOutbox(db) {
        db.exec(`
    CREATE TABLE IF NOT EXISTS sheet_sync_clock (id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL);
    INSERT OR IGNORE INTO sheet_sync_clock VALUES (1, 0);
    CREATE TABLE IF NOT EXISTS sheet_sync_outbox (
      business_date TEXT PRIMARY KEY, revision INTEGER NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0, next_attempt_at INTEGER NOT NULL DEFAULT 0,
      last_error TEXT NOT NULL DEFAULT '', warnings TEXT NOT NULL DEFAULT '[]'
    );
  `);
        db.prepare("UPDATE sheet_sync_clock SET revision = MAX(revision + 1, ?) WHERE id=1").run(Date.now() * 1e3);
        const dirty = (select) => `
    UPDATE sheet_sync_clock SET revision = revision + 1 WHERE id=1;
    INSERT INTO sheet_sync_outbox(business_date, revision)
      SELECT business_date, (SELECT revision FROM sheet_sync_clock WHERE id=1) FROM (${select}) WHERE business_date IS NOT NULL
      ON CONFLICT(business_date) DO UPDATE SET revision=excluded.revision, attempts=0, next_attempt_at=0, last_error='', warnings='[]';
    UPDATE shifts SET synced_to_sheets=0 WHERE business_date IN (${select});
  `;
        for (const table of ["orders", "order_items", "shifts", "commission_payouts", "expenses"]) {
          for (const event of ["INSERT", "UPDATE", "DELETE"]) {
            const refs = event === "UPDATE" ? ["OLD", "NEW"] : [event === "DELETE" ? "OLD" : "NEW"];
            const selects = refs.flatMap((ref) => {
              if (table === "expenses") return [
                `SELECT ${ref}.expense_date AS business_date`,
                `SELECT ${ref}.paid_business_date AS business_date`,
                `SELECT business_date FROM shifts WHERE id=${ref}.drawer_shift_id`
              ];
              if (table === "order_items") return [`SELECT business_date FROM orders WHERE id=${ref}.order_id`];
              if (table === "commission_payouts") return [
                `SELECT ${ref}.business_date AS business_date`,
                `SELECT business_date FROM shifts WHERE id=${ref}.shift_id`
              ];
              return [`SELECT ${ref}.business_date AS business_date`];
            });
            selects.push(`SELECT MAX(business_date) AS business_date FROM (
        SELECT business_date FROM orders UNION SELECT business_date FROM shifts
        UNION SELECT business_date FROM commission_payouts UNION SELECT expense_date AS business_date FROM expenses)`);
            const update = table === "shifts" && event === "UPDATE" ? "UPDATE OF business_date, shift_type, status, cash_start, cash_end, cash_diff, notes, total_cash_payout, total_cash_expense" : event;
            db.exec(`DROP TRIGGER IF EXISTS sheet_dirty_${table}_${event.toLowerCase()}`);
            db.exec(`CREATE TRIGGER IF NOT EXISTS sheet_dirty_${table}_${event.toLowerCase()}
        AFTER ${update} ON ${table} BEGIN ${dirty(selects.join(" UNION "))} END;`);
          }
        }
        for (const event of ["INSERT", "UPDATE", "DELETE"]) {
          const ref = event === "DELETE" ? "OLD" : "NEW";
          db.exec(`DROP TRIGGER IF EXISTS sheet_destination_${event.toLowerCase()}`);
          db.exec(`CREATE TRIGGER IF NOT EXISTS sheet_destination_${event.toLowerCase()} AFTER ${event} ON settings
      WHEN ${ref}.key IN ('google_sheet_webhook_url','google_sheet_webhook_secret','google_sheet_id')
      ${event === "UPDATE" ? "AND OLD.value IS NOT NEW.value" : ""}
      BEGIN ${dirty("SELECT business_date FROM orders UNION SELECT business_date FROM shifts UNION SELECT business_date FROM commission_payouts UNION SELECT business_date FROM sheet_sync_outbox UNION SELECT expense_date AS business_date FROM expenses")} END;`);
        }
      }
      module.exports = { initSheetOutbox };
    }
  });

  // ../server/closeJobSchema.js
  var require_closeJobSchema = __commonJS({
    "../server/closeJobSchema.js"(exports, module) {
      var COLUMNS = `shift_id INTEGER NOT NULL REFERENCES shifts(id),
  kind TEXT NOT NULL CHECK(kind IN ('backup','telegram')),
  job_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK(status IN ('PENDING','DONE','BLOCKED','SKIPPED','FAILED')),
  attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt_at INTEGER NOT NULL DEFAULT 0,
  last_error TEXT NOT NULL DEFAULT '',
  completed_at TEXT,
  backup_file TEXT,
  local_completed_at TEXT,
  destination_hash TEXT NOT NULL DEFAULT '',
  last_code TEXT NOT NULL DEFAULT '',
  managed_by TEXT,
  managed_at TEXT`;
      function initCloseJobs(db) {
        const existing = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='shift_close_jobs'").get();
        if (!existing) {
          db.exec(`CREATE TABLE shift_close_jobs (${COLUMNS}, PRIMARY KEY(shift_id,kind))`);
          return;
        }
        const columns = db.prepare("PRAGMA table_info(shift_close_jobs)").all().map((c) => c.name);
        if (existing.sql.includes("'FAILED'") && ["backup_file", "local_completed_at", "destination_hash", "last_code", "managed_by", "managed_at"].every((c) => columns.includes(c))) return;
        db.transaction(() => {
          db.exec(`CREATE TABLE shift_close_jobs_upgrade (${COLUMNS}, PRIMARY KEY(shift_id,kind))`);
          const current = db.prepare("PRAGMA table_info(shift_close_jobs_upgrade)").all().map((c) => c.name);
          const common = current.filter((c) => columns.includes(c)).join(",");
          db.exec(`INSERT INTO shift_close_jobs_upgrade (${common}) SELECT ${common} FROM shift_close_jobs`);
          db.exec("DROP TABLE shift_close_jobs");
          db.exec("ALTER TABLE shift_close_jobs_upgrade RENAME TO shift_close_jobs");
        })();
      }
      module.exports = { initCloseJobs };
    }
  });

  // ../server/statusGuards.js
  var require_statusGuards = __commonJS({
    "../server/statusGuards.js"(exports, module) {
      function initStatusGuards(db) {
        const fields = [
          ["orders", "payment_method", ["CASH", "PROMPTPAY", "CREDIT_CARD"]],
          ["commission_payouts", "payment_method", ["CASH", "PROMPTPAY", "CREDIT_CARD"]],
          ["orders", "status", ["IN_SERVICE", "COMPLETED", "CANCELLED"]],
          ["shifts", "status", ["OPEN", "CLOSED"]],
          ["commission_payouts", "status", ["PAID", "VOID"]],
          ["order_items", "payout_status", ["PAID", "UNPAID"]],
          ["therapists", "status", ["AVAILABLE", "IN_SERVICE", "ON_BREAK", "OFF"]],
          ["rooms", "status", ["AVAILABLE", "IN_USE", "CLEANING", "MAINTENANCE"]]
        ];
        for (const [table, field, allowed] of fields) {
          for (const event of ["INSERT", `UPDATE OF ${field}`]) {
            const name = `guard_${table}_${field}_${event.startsWith("INSERT") ? "insert" : "update"}`;
            db.exec(`CREATE TRIGGER IF NOT EXISTS ${name} BEFORE ${event} ON ${table}
        WHEN NEW.${field} IS NULL OR NEW.${field} NOT IN (${allowed.map((s) => `'${s}'`).join(",")})
        BEGIN SELECT RAISE(ABORT, 'invalid ${table}.${field}'); END;`);
          }
          const count = db.prepare(`SELECT COUNT(*) AS c FROM ${table} WHERE ${field} IS NULL OR ${field} NOT IN (${allowed.map((s) => `'${s}'`).join(",")})`).get().c;
          if (count) console.warn(`[DB status audit] ${table}.${field}: ${count} legacy invalid rows; left unchanged for review`);
        }
      }
      module.exports = { initStatusGuards };
    }
  });

  // ../server/financialAuditSchema.js
  var require_financialAuditSchema = __commonJS({
    "../server/financialAuditSchema.js"(exports, module) {
      function initFinancialAudit(db) {
        db.exec(`
    CREATE TABLE IF NOT EXISTS payout_requests (
      client_request_id TEXT PRIMARY KEY,
      request_json TEXT NOT NULL,
      response_json TEXT NOT NULL,
      business_date TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS shift_cash_adjustments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      shift_id INTEGER NOT NULL REFERENCES shifts(id),
      cash_before REAL,
      cash_after REAL NOT NULL,
      adjusted_by_id INTEGER,
      adjusted_by_name TEXT NOT NULL,
      adjusted_at TEXT NOT NULL,
      reason TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'LIVE' CHECK(source IN ('LIVE','LEGACY_LAST'))
    );
    CREATE INDEX IF NOT EXISTS idx_shift_cash_adjustments_shift ON shift_cash_adjustments(shift_id, id);
    CREATE TRIGGER IF NOT EXISTS cash_adjustment_no_update BEFORE UPDATE ON shift_cash_adjustments
      BEGIN SELECT RAISE(ABORT, 'Cash adjustment history is immutable'); END;
    CREATE TRIGGER IF NOT EXISTS cash_adjustment_no_delete BEFORE DELETE ON shift_cash_adjustments
      BEGIN SELECT RAISE(ABORT, 'Cash adjustment history is immutable'); END;
  `);
        db.exec(`INSERT INTO shift_cash_adjustments
    (shift_id,cash_before,cash_after,adjusted_by_name,adjusted_at,reason,source)
    SELECT s.id,NULL,s.cash_end,COALESCE(s.cash_adjusted_by,'\u0E44\u0E21\u0E48\u0E17\u0E23\u0E32\u0E1A (\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E23\u0E38\u0E48\u0E19\u0E40\u0E14\u0E34\u0E21)'),
      s.cash_adjusted_at,COALESCE(s.cash_adjust_reason,'\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E14\u0E34\u0E21'),'LEGACY_LAST'
    FROM shifts s WHERE s.cash_adjusted_at IS NOT NULL
      AND NOT EXISTS(SELECT 1 FROM shift_cash_adjustments a WHERE a.shift_id=s.id)`);
      }
      module.exports = { initFinancialAudit };
    }
  });

  // ../server/db.js
  var require_db = __commonJS({
    "../server/db.js"(exports, module) {
      var { DatabaseSync } = require_sqlite();
      var path = require_path();
      var fs = require_files();
      var dbDir = "/pos" ? path.resolve("/pos") : path.join("/pos", "..", "data");
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }
      var dbPath = path.join(dbDir, "pos.sqlite");
      var db = null;
      var txDepth = 0;
      function getDb() {
        if (!db) {
          db = new DatabaseSync(dbPath);
          try {
            db.exec("PRAGMA journal_mode = WAL");
            db.exec("PRAGMA synchronous = FULL");
            db.exec("PRAGMA foreign_keys = ON");
            db.exec("PRAGMA busy_timeout = 5000");
            db.transaction = function(fn) {
              if (typeof fn !== "function") {
                throw new TypeError("db.transaction \u0E15\u0E49\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E1F\u0E31\u0E07\u0E01\u0E4C\u0E0A\u0E31\u0E19");
              }
              if (fn.constructor && fn.constructor.name === "AsyncFunction") {
                throw new TypeError(
                  "db.transaction \u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E1F\u0E31\u0E07\u0E01\u0E4C\u0E0A\u0E31\u0E19\u0E41\u0E1A\u0E1A synchronous \u2014 \u0E1F\u0E31\u0E07\u0E01\u0E4C\u0E0A\u0E31\u0E19 async \u0E08\u0E30\u0E17\u0E33\u0E43\u0E2B\u0E49 COMMIT \u0E40\u0E01\u0E34\u0E14\u0E01\u0E48\u0E2D\u0E19\u0E07\u0E32\u0E19\u0E08\u0E23\u0E34\u0E07\u0E40\u0E2A\u0E23\u0E47\u0E08 \u0E43\u0E2B\u0E49\u0E17\u0E33\u0E07\u0E32\u0E19 async \u0E43\u0E2B\u0E49\u0E08\u0E1A\u0E01\u0E48\u0E2D\u0E19 \u0E41\u0E25\u0E49\u0E27\u0E04\u0E48\u0E2D\u0E22\u0E40\u0E1B\u0E34\u0E14\u0E17\u0E23\u0E32\u0E19\u0E41\u0E0B\u0E01\u0E0A\u0E31\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E02\u0E35\u0E22\u0E19\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27"
                );
              }
              return function(...args) {
                const isOuter = txDepth === 0;
                const savepoint = `sp_${txDepth}`;
                if (isOuter) {
                  db.exec("BEGIN");
                } else {
                  db.exec(`SAVEPOINT ${savepoint}`);
                }
                txDepth++;
                try {
                  const result = fn(...args);
                  if (result && typeof result.then === "function") {
                    throw new TypeError(
                      "db.transaction \u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E1F\u0E31\u0E07\u0E01\u0E4C\u0E0A\u0E31\u0E19\u0E17\u0E35\u0E48\u0E04\u0E37\u0E19 Promise \u2014 \u0E17\u0E23\u0E32\u0E19\u0E41\u0E0B\u0E01\u0E0A\u0E31\u0E19\u0E16\u0E39\u0E01\u0E22\u0E49\u0E2D\u0E19\u0E01\u0E25\u0E31\u0E1A\u0E41\u0E25\u0E49\u0E27 \u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07 await \u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E2D\u0E01\u0E17\u0E23\u0E32\u0E19\u0E41\u0E0B\u0E01\u0E0A\u0E31\u0E19"
                    );
                  }
                  if (isOuter) {
                    db.exec("COMMIT");
                  } else {
                    db.exec(`RELEASE ${savepoint}`);
                  }
                  return result;
                } catch (err) {
                  try {
                    if (isOuter) {
                      db.exec("ROLLBACK");
                    } else {
                      db.exec(`ROLLBACK TO ${savepoint}`);
                      db.exec(`RELEASE ${savepoint}`);
                    }
                  } catch (rollbackErr) {
                    console.error("[DB Rollback Error]", rollbackErr.message, "| Original error:", err.message);
                  }
                  throw err;
                } finally {
                  txDepth--;
                }
              };
            };
            initTables(db);
            require_expenseSchema().initExpenses(db);
            runMigrations(db);
            seedInitialData(db);
            initIndexes(db);
            require_sheetOutboxSchema().initSheetOutbox(db);
            require_closeJobSchema().initCloseJobs(db);
            require_statusGuards().initStatusGuards(db);
            require_financialAuditSchema().initFinancialAudit(db);
          } catch (error) {
            try {
              db.close();
            } catch (closeError) {
              console.error("[DB Init Cleanup]", closeError.message);
            }
            db = null;
            txDepth = 0;
            throw error;
          }
        }
        return db;
      }
      function hasColumn(database, table, column) {
        try {
          const cols = database.prepare(`PRAGMA table_info(${table})`).all();
          return cols.some((c) => c.name === column);
        } catch {
          return false;
        }
      }
      function addColumnIfMissing(database, table, column, definition) {
        if (!hasColumn(database, table, column)) {
          database.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
        }
      }
      var MIGRATIONS = [
        {
          version: 17,
          name: "payout confirmations and cash adjustment history",
          up(database) {
            require_financialAuditSchema().initFinancialAudit(database);
          }
        },
        {
          version: 16,
          name: "order actors, therapist snapshots and expense ledger",
          up(database) {
            ensureCriticalColumns(database);
            require_expenseSchema().initExpenses(database);
          }
        },
        {
          version: 15,
          name: "immutable room identity on orders",
          up(database) {
            ensureCriticalColumns(database);
          }
        },
        {
          version: 14,
          name: "separate local snapshot and bounded delivery jobs",
          up(database) {
            ensureCriticalColumns(database);
            require_closeJobSchema().initCloseJobs(database);
            require_statusGuards().initStatusGuards(database);
          }
        },
        {
          version: 13,
          name: "durable close jobs and unpaid override evidence",
          up(database) {
            addColumnIfMissing(database, "shifts", "unpaid_skip_reason", "TEXT NOT NULL DEFAULT ''");
            addColumnIfMissing(database, "shifts", "unpaid_skip_total", "REAL NOT NULL DEFAULT 0");
            addColumnIfMissing(database, "shifts", "unpaid_skip_details", "TEXT NOT NULL DEFAULT '[]'");
            require_closeJobSchema().initCloseJobs(database);
            require_statusGuards().initStatusGuards(database);
          }
        },
        {
          version: 12,
          name: "durable Sheets reconciliation queue",
          up(database) {
            require_sheetOutboxSchema().initSheetOutbox(database);
            database.exec(`INSERT OR IGNORE INTO sheet_sync_outbox(business_date,revision)
        SELECT business_date, (SELECT revision FROM sheet_sync_clock WHERE id=1)
        FROM (SELECT business_date FROM orders UNION SELECT business_date FROM shifts UNION SELECT business_date FROM commission_payouts)`);
          }
        },
        {
          version: 2,
          name: "order idempotency + audit columns",
          up(database) {
            addColumnIfMissing(database, "orders", "client_request_id", "TEXT");
            database.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_client_request_id
                     ON orders(client_request_id) WHERE client_request_id IS NOT NULL`);
            addColumnIfMissing(database, "orders", "cancelled_at", "TEXT");
            addColumnIfMissing(database, "orders", "cancelled_by", "TEXT");
            addColumnIfMissing(database, "orders", "cancel_reason", "TEXT");
          }
        },
        {
          version: 3,
          name: "payout void support",
          up(database) {
            addColumnIfMissing(database, "commission_payouts", "voided_at", "TEXT");
            addColumnIfMissing(database, "commission_payouts", "voided_by", "TEXT");
            addColumnIfMissing(database, "commission_payouts", "void_reason", "TEXT");
          }
        },
        {
          version: 4,
          name: "shift cash correction audit",
          up(database) {
            addColumnIfMissing(database, "shifts", "cash_adjusted_at", "TEXT");
            addColumnIfMissing(database, "shifts", "cash_adjusted_by", "TEXT");
            addColumnIfMissing(database, "shifts", "cash_adjust_reason", "TEXT");
            addColumnIfMissing(database, "shifts", "cash_end_original", "REAL");
          }
        },
        {
          version: 8,
          name: "shift cash payout tracking",
          up(database) {
            addColumnIfMissing(database, "shifts", "total_cash_payout", "REAL DEFAULT 0");
          }
        },
        {
          version: 7,
          name: "google drive offsite backup settings",
          up(database) {
            const ins = database.prepare(`INSERT OR IGNORE INTO settings (key, value, description) VALUES (?, ?, ?)`);
            ins.run("gdrive_backup_enabled", "true", "\u0E2A\u0E48\u0E07\u0E2A\u0E33\u0E40\u0E19\u0E32\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19 Google Drive \u0E1C\u0E48\u0E32\u0E19 Apps Script");
            ins.run("gdrive_retention_count", "30", "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E40\u0E01\u0E47\u0E1A\u0E44\u0E27\u0E49\u0E1A\u0E19 Google Drive");
          }
        },
        {
          version: 6,
          name: "shift net/discount totals (gross vs net reconciliation)",
          up(database) {
            addColumnIfMissing(database, "shifts", "total_net_sales", "REAL DEFAULT 0");
            addColumnIfMissing(database, "shifts", "total_discount", "REAL DEFAULT 0");
            addColumnIfMissing(database, "shifts", "total_surcharge", "REAL DEFAULT 0");
          }
        },
        {
          version: 9,
          name: "per-user accounts (owner / manager)",
          up(database) {
            const nowIso = (/* @__PURE__ */ new Date()).toISOString();
            const existing = database.prepare(`SELECT COUNT(*) as c FROM users`).get();
            if (!existing || existing.c === 0) {
              const row = database.prepare(`SELECT value FROM settings WHERE key = 'auth_pin_hash'`).get();
              if (row && typeof row.value === "string" && row.value.startsWith("scrypt$")) {
                database.prepare(`
            INSERT INTO users (name, role, pin_hash, is_active, created_at, updated_at)
            VALUES (?, 'OWNER', ?, 1, ?, ?)
          `).run("\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19", row.value, nowIso, nowIso);
                console.log('[DB] \u0E22\u0E49\u0E32\u0E22\u0E23\u0E2B\u0E31\u0E2A PIN \u0E40\u0E14\u0E34\u0E21\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19\u0E21\u0E32\u0E40\u0E1B\u0E47\u0E19\u0E1A\u0E31\u0E0D\u0E0A\u0E35 "\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19" \u0E41\u0E25\u0E49\u0E27 (\u0E43\u0E0A\u0E49\u0E23\u0E2B\u0E31\u0E2A\u0E40\u0E14\u0E34\u0E21\u0E40\u0E02\u0E49\u0E32\u0E23\u0E30\u0E1A\u0E1A\u0E44\u0E14\u0E49\u0E40\u0E25\u0E22)');
              }
            }
            database.prepare(`DELETE FROM settings WHERE key = 'auth_pin_hash'`).run();
          }
        },
        {
          version: 10,
          name: "drive backup retention counted in days",
          up(database) {
            const nowIso = (/* @__PURE__ */ new Date()).toISOString();
            database.prepare(`
        INSERT INTO settings (key, value, description, updated_at)
        VALUES ('gdrive_retention_days', '90', '\u0E08\u0E33\u0E19\u0E27\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E01\u0E47\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E44\u0E27\u0E49\u0E1A\u0E19 Google Drive', ?)
        ON CONFLICT(key) DO NOTHING
      `).run(nowIso);
            database.prepare(`DELETE FROM settings WHERE key = 'gdrive_retention_count'`).run();
          }
        },
        {
          version: 11,
          name: "configurable shift times + drop order notification",
          up(database) {
            const nowIso = (/* @__PURE__ */ new Date()).toISOString();
            const put = (key, value, description) => {
              database.prepare(`
          INSERT INTO settings (key, value, description, updated_at)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(key) DO NOTHING
        `).run(key, value, description, nowIso);
            };
            put("shift_day_start", "10:00", "\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E30 1");
            put("shift_night_start", "20:00", "\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E30 2 (\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E25\u0E32\u0E08\u0E1A\u0E01\u0E30 1 \u0E14\u0E49\u0E27\u0E22)");
            put("shift_night_end", "05:00", "\u0E40\u0E27\u0E25\u0E32\u0E08\u0E1A\u0E01\u0E30 2 \u0E41\u0E25\u0E30\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E25\u0E32\u0E15\u0E31\u0E14\u0E23\u0E2D\u0E1A\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23");
            database.prepare(`DELETE FROM settings WHERE key = 'telegram_notify_order'`).run();
          }
        },
        {
          version: 5,
          name: "auth salt + webhook secret settings",
          up(database) {
            const ins = database.prepare(`INSERT OR IGNORE INTO settings (key, value, description) VALUES (?, ?, ?)`);
            ins.run("google_sheet_webhook_secret", "", "\u0E23\u0E2B\u0E31\u0E2A\u0E25\u0E31\u0E1A\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A POS_WEBHOOK_SECRET \u0E43\u0E19 Apps Script");
            database.prepare(`DELETE FROM settings WHERE key = 'auth_pin_hash' AND value NOT LIKE 'scrypt$%'`).run();
          }
        }
      ];
      function runMigrations(database) {
        database.exec(`CREATE TABLE IF NOT EXISTS schema_version (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    version INTEGER NOT NULL,
    updated_at TEXT
  )`);
        let row = database.prepare(`SELECT version FROM schema_version WHERE id = 1`).get();
        if (!row) {
          database.prepare(`INSERT INTO schema_version (id, version, updated_at) VALUES (1, 1, ?)`).run((/* @__PURE__ */ new Date()).toISOString());
          row = { version: 1 };
        }
        const ordered = [...MIGRATIONS].sort((a, b) => a.version - b.version);
        for (const migration of ordered) {
          if (migration.version <= row.version) continue;
          try {
            migration.up(database);
            database.prepare(`UPDATE schema_version SET version = ?, updated_at = ? WHERE id = 1`).run(migration.version, (/* @__PURE__ */ new Date()).toISOString());
            row.version = migration.version;
            console.log(`[DB] Migration v${migration.version} (${migration.name}) applied`);
          } catch (e) {
            console.error(`[DB] Migration v${migration.version} FAILED:`, e.message);
            throw e;
          }
        }
        ensureCriticalColumns(database);
      }
      function ensureCriticalColumns(database) {
        const required = [
          ["orders", "created_by_id", "INTEGER"],
          ["orders", "created_by_name", "TEXT"],
          ["orders", "discount_by_id", "INTEGER"],
          ["orders", "discount_by_name", "TEXT"],
          ["orders", "discount_reason", "TEXT"],
          ["order_items", "therapist_code_snapshot", "TEXT"],
          ["order_items", "therapist_name_snapshot", "TEXT"],
          ["order_items", "therapist_nickname_snapshot", "TEXT"],
          ["shifts", "total_cash_expense", "REAL NOT NULL DEFAULT 0"],
          ["orders", "room_name_snapshot", "TEXT"],
          ["orders", "room_number_snapshot", "INTEGER"],
          ["rooms", "is_active", "INTEGER DEFAULT 1"],
          ["orders", "client_request_id", "TEXT"],
          ["orders", "cancelled_at", "TEXT"],
          ["orders", "cancelled_by", "TEXT"],
          ["orders", "cancel_reason", "TEXT"],
          ["commission_payouts", "voided_at", "TEXT"],
          ["commission_payouts", "voided_by", "TEXT"],
          ["commission_payouts", "void_reason", "TEXT"],
          ["shifts", "cash_adjusted_at", "TEXT"],
          ["shifts", "cash_adjusted_by", "TEXT"],
          ["shifts", "cash_adjust_reason", "TEXT"],
          ["shifts", "cash_end_original", "REAL"],
          ["shifts", "total_net_sales", "REAL DEFAULT 0"],
          ["shifts", "total_discount", "REAL DEFAULT 0"],
          ["shifts", "total_surcharge", "REAL DEFAULT 0"],
          ["shifts", "total_cash_payout", "REAL DEFAULT 0"],
          ["shifts", "unpaid_skip_reason", "TEXT NOT NULL DEFAULT ''"],
          ["shifts", "unpaid_skip_total", "REAL NOT NULL DEFAULT 0"],
          ["shifts", "unpaid_skip_details", "TEXT NOT NULL DEFAULT '[]'"]
        ];
        const repaired = [];
        for (const [table, column, definition] of required) {
          try {
            if (!hasColumn(database, table, column)) {
              database.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
              repaired.push(`${table}.${column}`);
            }
          } catch (e) {
            console.error(`[DB] \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E2D\u0E25\u0E31\u0E21\u0E19\u0E4C ${table}.${column} \u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08:`, e.message);
            throw e;
          }
        }
        if (repaired.length) {
          console.warn("[DB] \u0E1E\u0E1A\u0E04\u0E2D\u0E25\u0E31\u0E21\u0E19\u0E4C\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E22\u0E44\u0E1B\u0E17\u0E31\u0E49\u0E07\u0E17\u0E35\u0E48\u0E40\u0E25\u0E02\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E0A\u0E31\u0E19\u0E1A\u0E2D\u0E01\u0E27\u0E48\u0E32\u0E21\u0E35\u0E41\u0E25\u0E49\u0E27 \u2014 \u0E0B\u0E48\u0E2D\u0E21\u0E43\u0E2B\u0E49\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34:", repaired.join(", "));
        }
        database.exec(`UPDATE orders SET
    room_name_snapshot=(SELECT name FROM rooms WHERE id=orders.room_id),
    room_number_snapshot=(SELECT room_number FROM rooms WHERE id=orders.room_id)
    WHERE room_id IS NOT NULL AND room_name_snapshot IS NULL`);
        database.exec(`UPDATE order_items SET therapist_name_snapshot=therapist_name,
    therapist_nickname_snapshot='', therapist_code_snapshot='ID-' || therapist_id
    WHERE therapist_name_snapshot IS NULL`);
      }
      function initTables(database) {
        database.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT,
      description TEXT,
      updated_at TEXT
    );
  `);
        database.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      room_number INTEGER NOT NULL UNIQUE,
      room_type TEXT DEFAULT 'THAI',
      capacity INTEGER DEFAULT 1,
      status TEXT DEFAULT 'AVAILABLE',
      current_order_id INTEGER,
      service_start_time TEXT,
      service_end_time TEXT,
      current_therapist_names TEXT,
      current_service_names TEXT,
      notes TEXT,
      is_active INTEGER DEFAULT 1
    );
  `);
        database.exec(`
    CREATE TABLE IF NOT EXISTS therapists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      nickname TEXT NOT NULL,
      phone TEXT,
      avatar_color TEXT DEFAULT '#10b981',
      default_commission_rate REAL DEFAULT 50,
      status TEXT DEFAULT 'OFF',
      active_today INTEGER DEFAULT 0,
      queue_order INTEGER DEFAULT 999,
      is_active INTEGER DEFAULT 1,
      created_at TEXT
    );
  `);
        database.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL,
      price REAL NOT NULL,
      commission_amount REAL NOT NULL,
      required_therapists INTEGER DEFAULT 1,
      color TEXT DEFAULT '#0d9488',
      is_active INTEGER DEFAULT 1,
      display_order INTEGER DEFAULT 0
    );
  `);
        database.exec(`
    CREATE TABLE IF NOT EXISTS service_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      display_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
        database.exec(`
    CREATE TABLE IF NOT EXISTS shifts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      business_date TEXT NOT NULL,
      shift_type TEXT NOT NULL,
      status TEXT DEFAULT 'OPEN',
      opened_at TEXT NOT NULL,
      closed_at TEXT,
      opened_by TEXT DEFAULT 'Cashier',
      closed_by TEXT,
      cash_start REAL DEFAULT 0,
      cash_end REAL DEFAULT 0,
      cash_system_expected REAL DEFAULT 0,
      cash_diff REAL DEFAULT 0,
      total_sales REAL DEFAULT 0,
      total_cash REAL DEFAULT 0,
      total_promptpay REAL DEFAULT 0,
      total_card REAL DEFAULT 0,
      total_commission REAL DEFAULT 0,
      net_shop_revenue REAL DEFAULT 0,
      order_count INTEGER DEFAULT 0,
      notes TEXT,
      synced_to_sheets INTEGER DEFAULT 0,
      synced_to_telegram INTEGER DEFAULT 0,
      backup_completed INTEGER DEFAULT 0
    );
  `);
        database.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_no TEXT UNIQUE NOT NULL,
      shift_id INTEGER,
      business_date TEXT NOT NULL,
      room_id INTEGER,
      customer_name TEXT,
      customer_phone TEXT,
      customer_country TEXT DEFAULT '\u0E44\u0E17\u0E22',
      customer_gender TEXT,
      total_amount REAL NOT NULL,
      discount_amount REAL DEFAULT 0,
      card_surcharge_percent REAL DEFAULT 0,
      card_surcharge_amount REAL DEFAULT 0,
      net_amount REAL NOT NULL,
      therapist_total_commission REAL DEFAULT 0,
      shop_net_revenue REAL DEFAULT 0,
      payment_method TEXT NOT NULL,
      payment_details TEXT,
      amount_received REAL DEFAULT 0,
      change_amount REAL DEFAULT 0,
      status TEXT DEFAULT 'IN_SERVICE',
      start_time TEXT,
      end_time TEXT,
      duration_minutes INTEGER DEFAULT 60,
      created_at TEXT NOT NULL,
      completed_at TEXT,
      notes TEXT,
      FOREIGN KEY (shift_id) REFERENCES shifts(id),
      FOREIGN KEY (room_id) REFERENCES rooms(id)
    );
  `);
        database.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      service_id INTEGER NOT NULL,
      service_name TEXT NOT NULL,
      price REAL NOT NULL,
      duration_minutes INTEGER NOT NULL,
      therapist_id INTEGER NOT NULL,
      therapist_name TEXT NOT NULL,
      commission_amount REAL NOT NULL,
      is_requested INTEGER DEFAULT 0,
      payout_status TEXT DEFAULT 'UNPAID',
      payout_id INTEGER,
      paid_at TEXT,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (therapist_id) REFERENCES therapists(id)
    );
  `);
        database.exec(`
    CREATE TABLE IF NOT EXISTS commission_payouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      payout_no TEXT UNIQUE NOT NULL,
      therapist_id INTEGER NOT NULL,
      shift_id INTEGER,
      business_date TEXT NOT NULL,
      job_count INTEGER NOT NULL,
      total_commission REAL NOT NULL,
      payment_method TEXT DEFAULT 'CASH',
      status TEXT DEFAULT 'PAID',
      paid_at TEXT NOT NULL,
      paid_by TEXT DEFAULT 'Cashier',
      notes TEXT,
      FOREIGN KEY (therapist_id) REFERENCES therapists(id),
      FOREIGN KEY (shift_id) REFERENCES shifts(id)
    );
  `);
        database.exec(`
    CREATE TABLE IF NOT EXISTS therapist_attendances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      shift_id INTEGER NOT NULL,
      therapist_id INTEGER NOT NULL,
      business_date TEXT NOT NULL,
      check_in_time TEXT NOT NULL,
      check_out_time TEXT,
      is_present INTEGER DEFAULT 1,
      queue_order INTEGER DEFAULT 999,
      FOREIGN KEY (shift_id) REFERENCES shifts(id),
      FOREIGN KEY (therapist_id) REFERENCES therapists(id),
      UNIQUE(shift_id, therapist_id)
    );
  `);
        database.exec(`
    CREATE TABLE IF NOT EXISTS auth_attempts (
      client_key TEXT PRIMARY KEY,
      fail_count INTEGER NOT NULL DEFAULT 0,
      first_failed_at TEXT,
      locked_until TEXT
    );
  `);
        database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL CHECK (role IN ('OWNER', 'MANAGER')),
      pin_hash TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      last_login_at TEXT
    );
  `);
      }
      function initIndexes(database) {
        const indexes = [
          "CREATE INDEX IF NOT EXISTS idx_orders_business_date ON orders(business_date)",
          "CREATE INDEX IF NOT EXISTS idx_orders_shift_id ON orders(shift_id)",
          "CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)",
          "CREATE INDEX IF NOT EXISTS idx_orders_order_no ON orders(order_no)",
          "CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)",
          "CREATE INDEX IF NOT EXISTS idx_order_items_therapist_id ON order_items(therapist_id)",
          "CREATE INDEX IF NOT EXISTS idx_order_items_payout_status ON order_items(payout_status)",
          "CREATE INDEX IF NOT EXISTS idx_order_items_payout_id ON order_items(payout_id)",
          "CREATE INDEX IF NOT EXISTS idx_shifts_status ON shifts(status)",
          "CREATE INDEX IF NOT EXISTS idx_shifts_business_date ON shifts(business_date)",
          "CREATE INDEX IF NOT EXISTS idx_payouts_therapist_id ON commission_payouts(therapist_id)",
          "CREATE INDEX IF NOT EXISTS idx_payouts_business_date ON commission_payouts(business_date)",
          "CREATE INDEX IF NOT EXISTS idx_payouts_status ON commission_payouts(status)",
          "CREATE INDEX IF NOT EXISTS idx_attendances_shift_id ON therapist_attendances(shift_id)",
          "CREATE INDEX IF NOT EXISTS idx_attendances_therapist_id ON therapist_attendances(therapist_id)"
        ];
        for (const sql of indexes) {
          try {
            database.exec(sql);
          } catch (e) {
            console.warn("[DB Index Warning]", e.message);
          }
        }
      }
      function seedInitialData(database) {
        const insertSetting = database.prepare(`INSERT OR IGNORE INTO settings (key, value, description) VALUES (?, ?, ?)`);
        insertSetting.run("shop_name", "\u0E23\u0E49\u0E32\u0E19\u0E19\u0E27\u0E14 & \u0E2A\u0E1B\u0E32", "\u0E0A\u0E37\u0E48\u0E2D\u0E23\u0E49\u0E32\u0E19");
        insertSetting.run("shop_branch", "", "\u0E2A\u0E32\u0E02\u0E32");
        insertSetting.run("shop_address", "", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E49\u0E32\u0E19");
        insertSetting.run("shop_phone", "", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E23\u0E49\u0E32\u0E19");
        insertSetting.run("shop_tax_id", "", "\u0E40\u0E25\u0E02\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27\u0E1C\u0E39\u0E49\u0E40\u0E2A\u0E35\u0E22\u0E20\u0E32\u0E29\u0E35");
        insertSetting.run("shop_promptpay_number", "", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E25\u0E02 PromptPay");
        insertSetting.run("shop_promptpay_name", "", "\u0E0A\u0E37\u0E48\u0E2D\u0E1A\u0E31\u0E0D\u0E0A\u0E35 PromptPay");
        insertSetting.run("telegram_bot_token", "", "Telegram Bot Token");
        insertSetting.run("telegram_chat_id", "", "Telegram Group/Channel Chat ID");
        insertSetting.run("telegram_notify_shift_close", "true", "\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E2A\u0E23\u0E38\u0E1B\u0E1B\u0E34\u0E14\u0E01\u0E30");
        insertSetting.run("shift_day_start", "10:00", "\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E30 1");
        insertSetting.run("shift_night_start", "20:00", "\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E30 2 (\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E25\u0E32\u0E08\u0E1A\u0E01\u0E30 1 \u0E14\u0E49\u0E27\u0E22)");
        insertSetting.run("shift_night_end", "05:00", "\u0E40\u0E27\u0E25\u0E32\u0E08\u0E1A\u0E01\u0E30 2 \u0E41\u0E25\u0E30\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E25\u0E32\u0E15\u0E31\u0E14\u0E23\u0E2D\u0E1A\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23");
        insertSetting.run("google_sheet_webhook_url", "", "Google Sheets Webhook URL");
        insertSetting.run("google_sheet_webhook_secret", "", "\u0E23\u0E2B\u0E31\u0E2A\u0E25\u0E31\u0E1A\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A POS_WEBHOOK_SECRET \u0E43\u0E19 Apps Script");
        insertSetting.run("google_sheet_id", "", "Google Spreadsheet ID");
        insertSetting.run("backup_retention_count", "30", "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E40\u0E01\u0E47\u0E1A\u0E44\u0E27\u0E49\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07");
        insertSetting.run("gdrive_backup_enabled", "true", "\u0E2A\u0E48\u0E07\u0E2A\u0E33\u0E40\u0E19\u0E32\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19 Google Drive \u0E1C\u0E48\u0E32\u0E19 Apps Script");
        insertSetting.run("gdrive_retention_days", "90", "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E01\u0E47\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E44\u0E27\u0E49\u0E1A\u0E19 Google Drive");
        const countRooms = database.prepare(`SELECT COUNT(*) as count FROM rooms`).get();
        if (countRooms.count === 0) {
          const insertRoom = database.prepare(`
      INSERT INTO rooms (name, room_number, room_type, capacity, status)
      VALUES (?, ?, ?, ?, 'AVAILABLE')
    `);
          const initialRooms = [
            { name: "\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 1", num: 1, type: "THAI", cap: 1 },
            { name: "\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 2", num: 2, type: "THAI", cap: 1 },
            { name: "\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 3", num: 3, type: "THAI", cap: 1 },
            { name: "\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 4", num: 4, type: "THAI", cap: 1 },
            { name: "\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 5 (\u0E40\u0E15\u0E35\u0E22\u0E07\u0E04\u0E39\u0E48)", num: 5, type: "THAI", cap: 2 },
            { name: "\u0E2B\u0E49\u0E2D\u0E07\u0E2D\u0E42\u0E23\u0E21\u0E48\u0E32\u0E2A\u0E1B\u0E32 1 (VIP)", num: 6, type: "SPA", cap: 1 },
            { name: "\u0E2B\u0E49\u0E2D\u0E07\u0E2D\u0E42\u0E23\u0E21\u0E48\u0E32\u0E2A\u0E1B\u0E32 2 (VIP)", num: 7, type: "SPA", cap: 1 },
            { name: "\u0E2B\u0E49\u0E2D\u0E07\u0E2D\u0E42\u0E23\u0E21\u0E48\u0E32\u0E2A\u0E1B\u0E32 3 (VIP \u0E04\u0E39\u0E48)", num: 8, type: "SPA", cap: 2 },
            { name: "\u0E2B\u0E49\u0E2D\u0E07\u0E02\u0E31\u0E14\u0E1C\u0E34\u0E27 & \u0E2A\u0E04\u0E23\u0E31\u0E1A 1", num: 9, type: "SPA", cap: 1 },
            { name: "\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E27\u0E14\u0E40\u0E17\u0E49\u0E32 & \u0E04\u0E2D\u0E1A\u0E48\u0E32\u0E44\u0E2B\u0E25\u0E48", num: 10, type: "FOOT", cap: 3 }
          ];
          for (const r of initialRooms) {
            insertRoom.run(r.name, r.num, r.type, r.cap);
          }
        }
        const countServices = database.prepare(`SELECT COUNT(*) as count FROM services`).get();
        if (countServices.count === 0) {
          const insertService = database.prepare(`
      INSERT INTO services (category, name, duration_minutes, price, commission_amount, required_therapists, color, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
          const services = [
            { cat: "\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 (Thai Massage)", name: "\u0E19\u0E27\u0E14\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22 (Thai Traditional)", dur: 60, price: 350, comm: 150, req: 1, color: "#059669", order: 1 },
            { cat: "\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 (Thai Massage)", name: "\u0E19\u0E27\u0E14\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22 (Thai Traditional)", dur: 90, price: 500, comm: 220, req: 1, color: "#059669", order: 2 },
            { cat: "\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 (Thai Massage)", name: "\u0E19\u0E27\u0E14\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22 (Thai Traditional)", dur: 120, price: 650, comm: 290, req: 1, color: "#059669", order: 3 },
            { cat: "\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 (Thai Massage)", name: "\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22\u0E1B\u0E23\u0E30\u0E04\u0E1A\u0E2A\u0E21\u0E38\u0E19\u0E44\u0E1E\u0E23 (Herbal Compress)", dur: 90, price: 700, comm: 280, req: 1, color: "#047857", order: 4 },
            { cat: "\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 (Thai Massage)", name: "\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22\u0E1B\u0E23\u0E30\u0E04\u0E1A\u0E2A\u0E21\u0E38\u0E19\u0E44\u0E1E\u0E23 (Herbal Compress)", dur: 120, price: 900, comm: 360, req: 1, color: "#047857", order: 5 },
            { cat: "\u0E19\u0E27\u0E14\u0E40\u0E17\u0E49\u0E32 & \u0E40\u0E09\u0E1E\u0E32\u0E30\u0E08\u0E38\u0E14 (Foot & Focus)", name: "\u0E19\u0E27\u0E14\u0E40\u0E17\u0E49\u0E32\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E (Foot Massage)", dur: 60, price: 350, comm: 150, req: 1, color: "#0891b2", order: 6 },
            { cat: "\u0E19\u0E27\u0E14\u0E40\u0E17\u0E49\u0E32 & \u0E40\u0E09\u0E1E\u0E32\u0E30\u0E08\u0E38\u0E14 (Foot & Focus)", name: "\u0E19\u0E27\u0E14\u0E04\u0E2D \u0E1A\u0E48\u0E32 \u0E44\u0E2B\u0E25\u0E48 (Head, Neck & Shoulder)", dur: 60, price: 400, comm: 170, req: 1, color: "#0284c7", order: 7 },
            { cat: "\u0E19\u0E27\u0E14\u0E40\u0E17\u0E49\u0E32 & \u0E40\u0E09\u0E1E\u0E32\u0E30\u0E08\u0E38\u0E14 (Foot & Focus)", name: "\u0E19\u0E27\u0E14\u0E04\u0E2D \u0E1A\u0E48\u0E32 \u0E44\u0E2B\u0E25\u0E48 (Head, Neck & Shoulder)", dur: 90, price: 550, comm: 240, req: 1, color: "#0284c7", order: 8 },
            { cat: "\u0E19\u0E27\u0E14\u0E19\u0E49\u0E33\u0E21\u0E31\u0E19 & \u0E2A\u0E1B\u0E32 (Oil & Aromatherapy)", name: "\u0E19\u0E27\u0E14\u0E19\u0E49\u0E33\u0E21\u0E31\u0E19\u0E2D\u0E42\u0E23\u0E21\u0E32 (Aromatherapy Oil)", dur: 60, price: 600, comm: 250, req: 1, color: "#7c3aed", order: 9 },
            { cat: "\u0E19\u0E27\u0E14\u0E19\u0E49\u0E33\u0E21\u0E31\u0E19 & \u0E2A\u0E1B\u0E32 (Oil & Aromatherapy)", name: "\u0E19\u0E27\u0E14\u0E19\u0E49\u0E33\u0E21\u0E31\u0E19\u0E2D\u0E42\u0E23\u0E21\u0E32 (Aromatherapy Oil)", dur: 90, price: 850, comm: 360, req: 1, color: "#7c3aed", order: 10 },
            { cat: "\u0E19\u0E27\u0E14\u0E19\u0E49\u0E33\u0E21\u0E31\u0E19 & \u0E2A\u0E1B\u0E32 (Oil & Aromatherapy)", name: "\u0E19\u0E27\u0E14\u0E19\u0E49\u0E33\u0E21\u0E31\u0E19\u0E2D\u0E42\u0E23\u0E21\u0E32 (Aromatherapy Oil)", dur: 120, price: 1100, comm: 480, req: 1, color: "#7c3aed", order: 11 },
            { cat: "\u0E19\u0E27\u0E14\u0E19\u0E49\u0E33\u0E21\u0E31\u0E19 & \u0E2A\u0E1B\u0E32 (Oil & Aromatherapy)", name: "\u0E19\u0E27\u0E14\u0E19\u0E49\u0E33\u0E21\u0E31\u0E19\u0E2D\u0E38\u0E48\u0E19 & \u0E02\u0E31\u0E14\u0E1C\u0E34\u0E27\u0E2A\u0E04\u0E23\u0E31\u0E1A (Body Scrub & Oil)", dur: 90, price: 1e3, comm: 400, req: 1, color: "#9333ea", order: 12 },
            { cat: "\u0E19\u0E27\u0E14\u0E19\u0E49\u0E33\u0E21\u0E31\u0E19 & \u0E2A\u0E1B\u0E32 (Oil & Aromatherapy)", name: "\u0E2A\u0E04\u0E23\u0E31\u0E1A\u0E02\u0E31\u0E14\u0E1C\u0E34\u0E27\u0E2A\u0E21\u0E38\u0E19\u0E44\u0E1E\u0E23 (Herbal Body Scrub)", dur: 60, price: 600, comm: 250, req: 1, color: "#a855f7", order: 13 },
            { cat: "\u0E19\u0E27\u0E14 4 \u0E21\u0E37\u0E2D \u0E2B\u0E21\u0E2D 2 \u0E04\u0E19 (4-Hands Signature)", name: "\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 4 \u0E21\u0E37\u0E2D (4-Hands Thai Massage - 2 \u0E2B\u0E21\u0E2D)", dur: 60, price: 800, comm: 360, req: 2, color: "#d97706", order: 14 },
            { cat: "\u0E19\u0E27\u0E14 4 \u0E21\u0E37\u0E2D \u0E2B\u0E21\u0E2D 2 \u0E04\u0E19 (4-Hands Signature)", name: "\u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 4 \u0E21\u0E37\u0E2D (4-Hands Thai Massage - 2 \u0E2B\u0E21\u0E2D)", dur: 90, price: 1200, comm: 540, req: 2, color: "#d97706", order: 15 },
            { cat: "\u0E19\u0E27\u0E14 4 \u0E21\u0E37\u0E2D \u0E2B\u0E21\u0E2D 2 \u0E04\u0E19 (4-Hands Signature)", name: "\u0E19\u0E27\u0E14\u0E2D\u0E42\u0E23\u0E21\u0E32 4 \u0E21\u0E37\u0E2D (4-Hands Aroma Spa - 2 \u0E2B\u0E21\u0E2D)", dur: 60, price: 1300, comm: 580, req: 2, color: "#e11d48", order: 16 },
            { cat: "\u0E19\u0E27\u0E14 4 \u0E21\u0E37\u0E2D \u0E2B\u0E21\u0E2D 2 \u0E04\u0E19 (4-Hands Signature)", name: "\u0E19\u0E27\u0E14\u0E2D\u0E42\u0E23\u0E21\u0E32 4 \u0E21\u0E37\u0E2D (4-Hands Aroma Spa - 2 \u0E2B\u0E21\u0E2D)", dur: 90, price: 1800, comm: 800, req: 2, color: "#e11d48", order: 17 },
            { cat: "\u0E19\u0E27\u0E14 4 \u0E21\u0E37\u0E2D \u0E2B\u0E21\u0E2D 2 \u0E04\u0E19 (4-Hands Signature)", name: "\u0E19\u0E27\u0E14\u0E2D\u0E42\u0E23\u0E21\u0E32 4 \u0E21\u0E37\u0E2D (4-Hands Aroma Spa - 2 \u0E2B\u0E21\u0E2D)", dur: 120, price: 2300, comm: 1050, req: 2, color: "#e11d48", order: 18 }
          ];
          for (const s of services) {
            insertService.run(s.cat, s.name, s.dur, s.price, s.comm, s.req, s.color, s.order);
          }
        }
        const countTherapists = database.prepare(`SELECT COUNT(*) as count FROM therapists`).get();
        if (countTherapists.count === 0) {
          if (false) {
            const insertTherapist = database.prepare(`
        INSERT INTO therapists (code, name, nickname, phone, avatar_color, status, active_today, queue_order, created_at)
        VALUES (?, ?, ?, ?, ?, 'OFF', 0, 999, ?)
      `);
            const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#06b6d4", "#14b8a6", "#6366f1"];
            const nicknames = ["\u0E01\u0E49\u0E2D\u0E22", "\u0E1F\u0E49\u0E32", "\u0E19\u0E34\u0E48\u0E21", "\u0E08\u0E2D\u0E22", "\u0E1B\u0E2D\u0E22", "\u0E14\u0E32\u0E27", "\u0E41\u0E2D\u0E19", "\u0E21\u0E14", "\u0E40\u0E21\u0E22\u0E4C", "\u0E19\u0E49\u0E33"];
            const nowIso = (/* @__PURE__ */ new Date()).toISOString();
            for (let i = 0; i < nicknames.length; i++) {
              insertTherapist.run(
                `T${String(i + 1).padStart(3, "0")}`,
                `\u0E1E\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19\u0E19\u0E27\u0E14 ${nicknames[i]}`,
                nicknames[i],
                null,
                colors[i % colors.length],
                nowIso
              );
            }
            console.log("[DB] SEED_DEMO=true \u2014 \u0E43\u0E2A\u0E48\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 10 \u0E04\u0E19 (\u0E2B\u0E49\u0E32\u0E21\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E23\u0E49\u0E32\u0E19\u0E08\u0E23\u0E34\u0E07)");
          } else {
            console.log('[DB] \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14 \u2014 \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1E\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19\u0E08\u0E23\u0E34\u0E07\u0E44\u0E14\u0E49\u0E17\u0E35\u0E48\u0E40\u0E21\u0E19\u0E39 "\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14" (\u0E15\u0E31\u0E49\u0E07 SEED_DEMO=true \u0E16\u0E49\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07)');
          }
        }
      }
      function closeDb() {
        if (db) {
          try {
            db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
          } catch (e) {
            console.error("[DB Checkpoint Error]", e.message);
          }
          db.close();
          db = null;
          txDepth = 0;
          console.log("[DB] Database connection closed gracefully");
        }
      }
      module.exports = {
        getDb,
        closeDb,
        dbPath
      };
    }
  });

  // ../ipad/node_modules/@noble/hashes/crypto.js
  var require_crypto = __commonJS({
    "../ipad/node_modules/@noble/hashes/crypto.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.crypto = void 0;
      exports.crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
    }
  });

  // ../ipad/node_modules/@noble/hashes/utils.js
  var require_utils = __commonJS({
    "../ipad/node_modules/@noble/hashes/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.Hash = exports.nextTick = exports.swap32IfBE = exports.byteSwapIfBE = exports.swap8IfBE = exports.isLE = void 0;
      exports.isBytes = isBytes;
      exports.anumber = anumber;
      exports.abytes = abytes;
      exports.ahash = ahash;
      exports.aexists = aexists;
      exports.aoutput = aoutput;
      exports.u8 = u8;
      exports.u32 = u32;
      exports.clean = clean;
      exports.createView = createView;
      exports.rotr = rotr;
      exports.rotl = rotl;
      exports.byteSwap = byteSwap;
      exports.byteSwap32 = byteSwap32;
      exports.bytesToHex = bytesToHex;
      exports.hexToBytes = hexToBytes;
      exports.asyncLoop = asyncLoop;
      exports.utf8ToBytes = utf8ToBytes;
      exports.bytesToUtf8 = bytesToUtf8;
      exports.toBytes = toBytes;
      exports.kdfInputToBytes = kdfInputToBytes;
      exports.concatBytes = concatBytes;
      exports.checkOpts = checkOpts;
      exports.createHasher = createHasher;
      exports.createOptHasher = createOptHasher;
      exports.createXOFer = createXOFer;
      exports.randomBytes = randomBytes;
      var crypto_1 = require_crypto();
      function isBytes(a) {
        return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
      }
      function anumber(n) {
        if (!Number.isSafeInteger(n) || n < 0)
          throw new Error("positive integer expected, got " + n);
      }
      function abytes(b, ...lengths) {
        if (!isBytes(b))
          throw new Error("Uint8Array expected");
        if (lengths.length > 0 && !lengths.includes(b.length))
          throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
      }
      function ahash(h) {
        if (typeof h !== "function" || typeof h.create !== "function")
          throw new Error("Hash should be wrapped by utils.createHasher");
        anumber(h.outputLen);
        anumber(h.blockLen);
      }
      function aexists(instance, checkFinished = true) {
        if (instance.destroyed)
          throw new Error("Hash instance has been destroyed");
        if (checkFinished && instance.finished)
          throw new Error("Hash#digest() has already been called");
      }
      function aoutput(out, instance) {
        abytes(out);
        const min = instance.outputLen;
        if (out.length < min) {
          throw new Error("digestInto() expects output buffer of length at least " + min);
        }
      }
      function u8(arr) {
        return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function u32(arr) {
        return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
      }
      function clean(...arrays) {
        for (let i = 0; i < arrays.length; i++) {
          arrays[i].fill(0);
        }
      }
      function createView(arr) {
        return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      }
      function rotr(word, shift) {
        return word << 32 - shift | word >>> shift;
      }
      function rotl(word, shift) {
        return word << shift | word >>> 32 - shift >>> 0;
      }
      exports.isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
      function byteSwap(word) {
        return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
      }
      exports.swap8IfBE = exports.isLE ? (n) => n : (n) => byteSwap(n);
      exports.byteSwapIfBE = exports.swap8IfBE;
      function byteSwap32(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = byteSwap(arr[i]);
        }
        return arr;
      }
      exports.swap32IfBE = exports.isLE ? (u) => u : byteSwap32;
      var hasHexBuiltin = /* @__PURE__ */ (() => (
        // @ts-ignore
        typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
      ))();
      var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
      function bytesToHex(bytes) {
        abytes(bytes);
        if (hasHexBuiltin)
          return bytes.toHex();
        let hex = "";
        for (let i = 0; i < bytes.length; i++) {
          hex += hexes[bytes[i]];
        }
        return hex;
      }
      var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
      function asciiToBase16(ch) {
        if (ch >= asciis._0 && ch <= asciis._9)
          return ch - asciis._0;
        if (ch >= asciis.A && ch <= asciis.F)
          return ch - (asciis.A - 10);
        if (ch >= asciis.a && ch <= asciis.f)
          return ch - (asciis.a - 10);
        return;
      }
      function hexToBytes(hex) {
        if (typeof hex !== "string")
          throw new Error("hex string expected, got " + typeof hex);
        if (hasHexBuiltin)
          return Uint8Array.fromHex(hex);
        const hl = hex.length;
        const al = hl / 2;
        if (hl % 2)
          throw new Error("hex string expected, got unpadded hex of length " + hl);
        const array = new Uint8Array(al);
        for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
          const n1 = asciiToBase16(hex.charCodeAt(hi));
          const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
          if (n1 === void 0 || n2 === void 0) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
          }
          array[ai] = n1 * 16 + n2;
        }
        return array;
      }
      var nextTick = async () => {
      };
      exports.nextTick = nextTick;
      async function asyncLoop(iters, tick, cb) {
        let ts = Date.now();
        for (let i = 0; i < iters; i++) {
          cb(i);
          const diff = Date.now() - ts;
          if (diff >= 0 && diff < tick)
            continue;
          await (0, exports.nextTick)();
          ts += diff;
        }
      }
      function utf8ToBytes(str) {
        if (typeof str !== "string")
          throw new Error("string expected");
        return new Uint8Array(new TextEncoder().encode(str));
      }
      function bytesToUtf8(bytes) {
        return new TextDecoder().decode(bytes);
      }
      function toBytes(data) {
        if (typeof data === "string")
          data = utf8ToBytes(data);
        abytes(data);
        return data;
      }
      function kdfInputToBytes(data) {
        if (typeof data === "string")
          data = utf8ToBytes(data);
        abytes(data);
        return data;
      }
      function concatBytes(...arrays) {
        let sum = 0;
        for (let i = 0; i < arrays.length; i++) {
          const a = arrays[i];
          abytes(a);
          sum += a.length;
        }
        const res = new Uint8Array(sum);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const a = arrays[i];
          res.set(a, pad);
          pad += a.length;
        }
        return res;
      }
      function checkOpts(defaults, opts) {
        if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
          throw new Error("options should be object or undefined");
        const merged = Object.assign(defaults, opts);
        return merged;
      }
      var Hash = class {
      };
      exports.Hash = Hash;
      function createHasher(hashCons) {
        const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
        const tmp = hashCons();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = () => hashCons();
        return hashC;
      }
      function createOptHasher(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      function createXOFer(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = (opts) => hashCons(opts);
        return hashC;
      }
      exports.wrapConstructor = createHasher;
      exports.wrapConstructorWithOpts = createOptHasher;
      exports.wrapXOFConstructorWithOpts = createXOFer;
      function randomBytes(bytesLength = 32) {
        if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
          return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
        }
        if (crypto_1.crypto && typeof crypto_1.crypto.randomBytes === "function") {
          return Uint8Array.from(crypto_1.crypto.randomBytes(bytesLength));
        }
        throw new Error("crypto.getRandomValues must be defined");
      }
    }
  });

  // ../ipad/node_modules/@noble/hashes/hmac.js
  var require_hmac = __commonJS({
    "../ipad/node_modules/@noble/hashes/hmac.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hmac = exports.HMAC = void 0;
      var utils_ts_1 = require_utils();
      var HMAC = class extends utils_ts_1.Hash {
        constructor(hash, _key) {
          super();
          this.finished = false;
          this.destroyed = false;
          (0, utils_ts_1.ahash)(hash);
          const key = (0, utils_ts_1.toBytes)(_key);
          this.iHash = hash.create();
          if (typeof this.iHash.update !== "function")
            throw new Error("Expected instance of class which extends utils.Hash");
          this.blockLen = this.iHash.blockLen;
          this.outputLen = this.iHash.outputLen;
          const blockLen = this.blockLen;
          const pad = new Uint8Array(blockLen);
          pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
          for (let i = 0; i < pad.length; i++)
            pad[i] ^= 54;
          this.iHash.update(pad);
          this.oHash = hash.create();
          for (let i = 0; i < pad.length; i++)
            pad[i] ^= 54 ^ 92;
          this.oHash.update(pad);
          (0, utils_ts_1.clean)(pad);
        }
        update(buf) {
          (0, utils_ts_1.aexists)(this);
          this.iHash.update(buf);
          return this;
        }
        digestInto(out) {
          (0, utils_ts_1.aexists)(this);
          (0, utils_ts_1.abytes)(out, this.outputLen);
          this.finished = true;
          this.iHash.digestInto(out);
          this.oHash.update(out);
          this.oHash.digestInto(out);
          this.destroy();
        }
        digest() {
          const out = new Uint8Array(this.oHash.outputLen);
          this.digestInto(out);
          return out;
        }
        _cloneInto(to) {
          to || (to = Object.create(Object.getPrototypeOf(this), {}));
          const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
          to = to;
          to.finished = finished;
          to.destroyed = destroyed;
          to.blockLen = blockLen;
          to.outputLen = outputLen;
          to.oHash = oHash._cloneInto(to.oHash);
          to.iHash = iHash._cloneInto(to.iHash);
          return to;
        }
        clone() {
          return this._cloneInto();
        }
        destroy() {
          this.destroyed = true;
          this.oHash.destroy();
          this.iHash.destroy();
        }
      };
      exports.HMAC = HMAC;
      var hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
      exports.hmac = hmac;
      exports.hmac.create = (hash, key) => new HMAC(hash, key);
    }
  });

  // ../ipad/node_modules/@noble/hashes/pbkdf2.js
  var require_pbkdf2 = __commonJS({
    "../ipad/node_modules/@noble/hashes/pbkdf2.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.pbkdf2 = pbkdf2;
      exports.pbkdf2Async = pbkdf2Async;
      var hmac_ts_1 = require_hmac();
      var utils_ts_1 = require_utils();
      function pbkdf2Init(hash, _password, _salt, _opts) {
        (0, utils_ts_1.ahash)(hash);
        const opts = (0, utils_ts_1.checkOpts)({ dkLen: 32, asyncTick: 10 }, _opts);
        const { c, dkLen, asyncTick } = opts;
        (0, utils_ts_1.anumber)(c);
        (0, utils_ts_1.anumber)(dkLen);
        (0, utils_ts_1.anumber)(asyncTick);
        if (c < 1)
          throw new Error("iterations (c) should be >= 1");
        const password = (0, utils_ts_1.kdfInputToBytes)(_password);
        const salt = (0, utils_ts_1.kdfInputToBytes)(_salt);
        const DK = new Uint8Array(dkLen);
        const PRF = hmac_ts_1.hmac.create(hash, password);
        const PRFSalt = PRF._cloneInto().update(salt);
        return { c, dkLen, asyncTick, DK, PRF, PRFSalt };
      }
      function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
        PRF.destroy();
        PRFSalt.destroy();
        if (prfW)
          prfW.destroy();
        (0, utils_ts_1.clean)(u);
        return DK;
      }
      function pbkdf2(hash, password, salt, opts) {
        const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
        let prfW;
        const arr = new Uint8Array(4);
        const view = (0, utils_ts_1.createView)(arr);
        const u = new Uint8Array(PRF.outputLen);
        for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
          const Ti = DK.subarray(pos, pos + PRF.outputLen);
          view.setInt32(0, ti, false);
          (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
          Ti.set(u.subarray(0, Ti.length));
          for (let ui = 1; ui < c; ui++) {
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for (let i = 0; i < Ti.length; i++)
              Ti[i] ^= u[i];
          }
        }
        return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
      }
      async function pbkdf2Async(hash, password, salt, opts) {
        const { c, dkLen, asyncTick, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
        let prfW;
        const arr = new Uint8Array(4);
        const view = (0, utils_ts_1.createView)(arr);
        const u = new Uint8Array(PRF.outputLen);
        for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
          const Ti = DK.subarray(pos, pos + PRF.outputLen);
          view.setInt32(0, ti, false);
          (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
          Ti.set(u.subarray(0, Ti.length));
          await (0, utils_ts_1.asyncLoop)(c - 1, asyncTick, () => {
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for (let i = 0; i < Ti.length; i++)
              Ti[i] ^= u[i];
          });
        }
        return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
      }
    }
  });

  // ../ipad/node_modules/@noble/hashes/_md.js
  var require_md = __commonJS({
    "../ipad/node_modules/@noble/hashes/_md.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SHA512_IV = exports.SHA384_IV = exports.SHA224_IV = exports.SHA256_IV = exports.HashMD = void 0;
      exports.setBigUint64 = setBigUint64;
      exports.Chi = Chi;
      exports.Maj = Maj;
      var utils_ts_1 = require_utils();
      function setBigUint64(view, byteOffset, value, isLE) {
        if (typeof view.setBigUint64 === "function")
          return view.setBigUint64(byteOffset, value, isLE);
        const _32n = BigInt(32);
        const _u32_max = BigInt(4294967295);
        const wh = Number(value >> _32n & _u32_max);
        const wl = Number(value & _u32_max);
        const h = isLE ? 4 : 0;
        const l = isLE ? 0 : 4;
        view.setUint32(byteOffset + h, wh, isLE);
        view.setUint32(byteOffset + l, wl, isLE);
      }
      function Chi(a, b, c) {
        return a & b ^ ~a & c;
      }
      function Maj(a, b, c) {
        return a & b ^ a & c ^ b & c;
      }
      var HashMD = class extends utils_ts_1.Hash {
        constructor(blockLen, outputLen, padOffset, isLE) {
          super();
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE;
          this.buffer = new Uint8Array(blockLen);
          this.view = (0, utils_ts_1.createView)(this.buffer);
        }
        update(data) {
          (0, utils_ts_1.aexists)(this);
          data = (0, utils_ts_1.toBytes)(data);
          (0, utils_ts_1.abytes)(data);
          const { view, buffer, blockLen } = this;
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = (0, utils_ts_1.createView)(data);
              for (; blockLen <= len - pos; pos += blockLen)
                this.process(dataView, pos);
              continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          (0, utils_ts_1.aexists)(this);
          (0, utils_ts_1.aoutput)(out, this);
          this.finished = true;
          const { buffer, view, blockLen, isLE } = this;
          let { pos } = this;
          buffer[pos++] = 128;
          (0, utils_ts_1.clean)(this.buffer.subarray(pos));
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
          setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
          this.process(view, 0);
          const oview = (0, utils_ts_1.createView)(out);
          const len = this.outputLen;
          if (len % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length)
            throw new Error("_sha2: outputLen bigger than state");
          for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE);
        }
        digest() {
          const { buffer, outputLen } = this;
          this.digestInto(buffer);
          const res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const { blockLen, buffer, length, finished, destroyed, pos } = this;
          to.destroyed = destroyed;
          to.finished = finished;
          to.length = length;
          to.pos = pos;
          if (length % blockLen)
            to.buffer.set(buffer);
          return to;
        }
        clone() {
          return this._cloneInto();
        }
      };
      exports.HashMD = HashMD;
      exports.SHA256_IV = Uint32Array.from([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
      exports.SHA224_IV = Uint32Array.from([
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ]);
      exports.SHA384_IV = Uint32Array.from([
        3418070365,
        3238371032,
        1654270250,
        914150663,
        2438529370,
        812702999,
        355462360,
        4144912697,
        1731405415,
        4290775857,
        2394180231,
        1750603025,
        3675008525,
        1694076839,
        1203062813,
        3204075428
      ]);
      exports.SHA512_IV = Uint32Array.from([
        1779033703,
        4089235720,
        3144134277,
        2227873595,
        1013904242,
        4271175723,
        2773480762,
        1595750129,
        1359893119,
        2917565137,
        2600822924,
        725511199,
        528734635,
        4215389547,
        1541459225,
        327033209
      ]);
    }
  });

  // ../ipad/node_modules/@noble/hashes/_u64.js
  var require_u64 = __commonJS({
    "../ipad/node_modules/@noble/hashes/_u64.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toBig = exports.shrSL = exports.shrSH = exports.rotrSL = exports.rotrSH = exports.rotrBL = exports.rotrBH = exports.rotr32L = exports.rotr32H = exports.rotlSL = exports.rotlSH = exports.rotlBL = exports.rotlBH = exports.add5L = exports.add5H = exports.add4L = exports.add4H = exports.add3L = exports.add3H = void 0;
      exports.add = add;
      exports.fromBig = fromBig;
      exports.split = split;
      var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
      var _32n = /* @__PURE__ */ BigInt(32);
      function fromBig(n, le = false) {
        if (le)
          return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
        return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
      }
      function split(lst, le = false) {
        const len = lst.length;
        let Ah = new Uint32Array(len);
        let Al = new Uint32Array(len);
        for (let i = 0; i < len; i++) {
          const { h, l } = fromBig(lst[i], le);
          [Ah[i], Al[i]] = [h, l];
        }
        return [Ah, Al];
      }
      var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
      exports.toBig = toBig;
      var shrSH = (h, _l, s) => h >>> s;
      exports.shrSH = shrSH;
      var shrSL = (h, l, s) => h << 32 - s | l >>> s;
      exports.shrSL = shrSL;
      var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
      exports.rotrSH = rotrSH;
      var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
      exports.rotrSL = rotrSL;
      var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
      exports.rotrBH = rotrBH;
      var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
      exports.rotrBL = rotrBL;
      var rotr32H = (_h, l) => l;
      exports.rotr32H = rotr32H;
      var rotr32L = (h, _l) => h;
      exports.rotr32L = rotr32L;
      var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
      exports.rotlSH = rotlSH;
      var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
      exports.rotlSL = rotlSL;
      var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
      exports.rotlBH = rotlBH;
      var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
      exports.rotlBL = rotlBL;
      function add(Ah, Al, Bh, Bl) {
        const l = (Al >>> 0) + (Bl >>> 0);
        return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
      }
      var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
      exports.add3L = add3L;
      var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
      exports.add3H = add3H;
      var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
      exports.add4L = add4L;
      var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
      exports.add4H = add4H;
      var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
      exports.add5L = add5L;
      var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
      exports.add5H = add5H;
      var u64 = {
        fromBig,
        split,
        toBig,
        shrSH,
        shrSL,
        rotrSH,
        rotrSL,
        rotrBH,
        rotrBL,
        rotr32H,
        rotr32L,
        rotlSH,
        rotlSL,
        rotlBH,
        rotlBL,
        add,
        add3L,
        add3H,
        add4L,
        add4H,
        add5H,
        add5L
      };
      exports.default = u64;
    }
  });

  // ../ipad/node_modules/@noble/hashes/sha2.js
  var require_sha2 = __commonJS({
    "../ipad/node_modules/@noble/hashes/sha2.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha512_224 = exports.sha512_256 = exports.sha384 = exports.sha512 = exports.sha224 = exports.sha256 = exports.SHA512_256 = exports.SHA512_224 = exports.SHA384 = exports.SHA512 = exports.SHA224 = exports.SHA256 = void 0;
      var _md_ts_1 = require_md();
      var u64 = require_u64();
      var utils_ts_1 = require_utils();
      var SHA256_K = /* @__PURE__ */ Uint32Array.from([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
      var SHA256 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 32) {
          super(64, outputLen, 8, false);
          this.A = _md_ts_1.SHA256_IV[0] | 0;
          this.B = _md_ts_1.SHA256_IV[1] | 0;
          this.C = _md_ts_1.SHA256_IV[2] | 0;
          this.D = _md_ts_1.SHA256_IV[3] | 0;
          this.E = _md_ts_1.SHA256_IV[4] | 0;
          this.F = _md_ts_1.SHA256_IV[5] | 0;
          this.G = _md_ts_1.SHA256_IV[6] | 0;
          this.H = _md_ts_1.SHA256_IV[7] | 0;
        }
        get() {
          const { A, B, C, D, E, F, G, H } = this;
          return [A, B, C, D, E, F, G, H];
        }
        // prettier-ignore
        set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, utils_ts_1.rotr)(W15, 7) ^ (0, utils_ts_1.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, utils_ts_1.rotr)(W2, 17) ^ (0, utils_ts_1.rotr)(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
          }
          let { A, B, C, D, E, F, G, H } = this;
          for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils_ts_1.rotr)(E, 6) ^ (0, utils_ts_1.rotr)(E, 11) ^ (0, utils_ts_1.rotr)(E, 25);
            const T1 = H + sigma1 + (0, _md_ts_1.Chi)(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, utils_ts_1.rotr)(A, 2) ^ (0, utils_ts_1.rotr)(A, 13) ^ (0, utils_ts_1.rotr)(A, 22);
            const T2 = sigma0 + (0, _md_ts_1.Maj)(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA256_W);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          (0, utils_ts_1.clean)(this.buffer);
        }
      };
      exports.SHA256 = SHA256;
      var SHA224 = class extends SHA256 {
        constructor() {
          super(28);
          this.A = _md_ts_1.SHA224_IV[0] | 0;
          this.B = _md_ts_1.SHA224_IV[1] | 0;
          this.C = _md_ts_1.SHA224_IV[2] | 0;
          this.D = _md_ts_1.SHA224_IV[3] | 0;
          this.E = _md_ts_1.SHA224_IV[4] | 0;
          this.F = _md_ts_1.SHA224_IV[5] | 0;
          this.G = _md_ts_1.SHA224_IV[6] | 0;
          this.H = _md_ts_1.SHA224_IV[7] | 0;
        }
      };
      exports.SHA224 = SHA224;
      var K512 = /* @__PURE__ */ (() => u64.split([
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817"
      ].map((n) => BigInt(n))))();
      var SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
      var SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
      var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
      var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
      var SHA512 = class extends _md_ts_1.HashMD {
        constructor(outputLen = 64) {
          super(128, outputLen, 16, false);
          this.Ah = _md_ts_1.SHA512_IV[0] | 0;
          this.Al = _md_ts_1.SHA512_IV[1] | 0;
          this.Bh = _md_ts_1.SHA512_IV[2] | 0;
          this.Bl = _md_ts_1.SHA512_IV[3] | 0;
          this.Ch = _md_ts_1.SHA512_IV[4] | 0;
          this.Cl = _md_ts_1.SHA512_IV[5] | 0;
          this.Dh = _md_ts_1.SHA512_IV[6] | 0;
          this.Dl = _md_ts_1.SHA512_IV[7] | 0;
          this.Eh = _md_ts_1.SHA512_IV[8] | 0;
          this.El = _md_ts_1.SHA512_IV[9] | 0;
          this.Fh = _md_ts_1.SHA512_IV[10] | 0;
          this.Fl = _md_ts_1.SHA512_IV[11] | 0;
          this.Gh = _md_ts_1.SHA512_IV[12] | 0;
          this.Gl = _md_ts_1.SHA512_IV[13] | 0;
          this.Hh = _md_ts_1.SHA512_IV[14] | 0;
          this.Hl = _md_ts_1.SHA512_IV[15] | 0;
        }
        // prettier-ignore
        get() {
          const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
        }
        // prettier-ignore
        set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
          this.Ah = Ah | 0;
          this.Al = Al | 0;
          this.Bh = Bh | 0;
          this.Bl = Bl | 0;
          this.Ch = Ch | 0;
          this.Cl = Cl | 0;
          this.Dh = Dh | 0;
          this.Dl = Dl | 0;
          this.Eh = Eh | 0;
          this.El = El | 0;
          this.Fh = Fh | 0;
          this.Fl = Fl | 0;
          this.Gh = Gh | 0;
          this.Gl = Gl | 0;
          this.Hh = Hh | 0;
          this.Hl = Hl | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32(offset += 4);
          }
          for (let i = 16; i < 80; i++) {
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = u64.rotrSH(W15h, W15l, 1) ^ u64.rotrSH(W15h, W15l, 8) ^ u64.shrSH(W15h, W15l, 7);
            const s0l = u64.rotrSL(W15h, W15l, 1) ^ u64.rotrSL(W15h, W15l, 8) ^ u64.shrSL(W15h, W15l, 7);
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = u64.rotrSH(W2h, W2l, 19) ^ u64.rotrBH(W2h, W2l, 61) ^ u64.shrSH(W2h, W2l, 6);
            const s1l = u64.rotrSL(W2h, W2l, 19) ^ u64.rotrBL(W2h, W2l, 61) ^ u64.shrSL(W2h, W2l, 6);
            const SUMl = u64.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = u64.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
          }
          let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
          for (let i = 0; i < 80; i++) {
            const sigma1h = u64.rotrSH(Eh, El, 14) ^ u64.rotrSH(Eh, El, 18) ^ u64.rotrBH(Eh, El, 41);
            const sigma1l = u64.rotrSL(Eh, El, 14) ^ u64.rotrSL(Eh, El, 18) ^ u64.rotrBL(Eh, El, 41);
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            const T1ll = u64.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = u64.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            const sigma0h = u64.rotrSH(Ah, Al, 28) ^ u64.rotrBH(Ah, Al, 34) ^ u64.rotrBH(Ah, Al, 39);
            const sigma0l = u64.rotrSL(Ah, Al, 28) ^ u64.rotrBL(Ah, Al, 34) ^ u64.rotrBL(Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = u64.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = u64.add3L(T1l, sigma0l, MAJl);
            Ah = u64.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
          }
          ({ h: Ah, l: Al } = u64.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
          ({ h: Bh, l: Bl } = u64.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
          ({ h: Ch, l: Cl } = u64.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
          ({ h: Dh, l: Dl } = u64.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
          ({ h: Eh, l: El } = u64.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
          ({ h: Fh, l: Fl } = u64.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
          ({ h: Gh, l: Gl } = u64.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
          ({ h: Hh, l: Hl } = u64.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
          this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
        }
        roundClean() {
          (0, utils_ts_1.clean)(SHA512_W_H, SHA512_W_L);
        }
        destroy() {
          (0, utils_ts_1.clean)(this.buffer);
          this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      };
      exports.SHA512 = SHA512;
      var SHA384 = class extends SHA512 {
        constructor() {
          super(48);
          this.Ah = _md_ts_1.SHA384_IV[0] | 0;
          this.Al = _md_ts_1.SHA384_IV[1] | 0;
          this.Bh = _md_ts_1.SHA384_IV[2] | 0;
          this.Bl = _md_ts_1.SHA384_IV[3] | 0;
          this.Ch = _md_ts_1.SHA384_IV[4] | 0;
          this.Cl = _md_ts_1.SHA384_IV[5] | 0;
          this.Dh = _md_ts_1.SHA384_IV[6] | 0;
          this.Dl = _md_ts_1.SHA384_IV[7] | 0;
          this.Eh = _md_ts_1.SHA384_IV[8] | 0;
          this.El = _md_ts_1.SHA384_IV[9] | 0;
          this.Fh = _md_ts_1.SHA384_IV[10] | 0;
          this.Fl = _md_ts_1.SHA384_IV[11] | 0;
          this.Gh = _md_ts_1.SHA384_IV[12] | 0;
          this.Gl = _md_ts_1.SHA384_IV[13] | 0;
          this.Hh = _md_ts_1.SHA384_IV[14] | 0;
          this.Hl = _md_ts_1.SHA384_IV[15] | 0;
        }
      };
      exports.SHA384 = SHA384;
      var T224_IV = /* @__PURE__ */ Uint32Array.from([
        2352822216,
        424955298,
        1944164710,
        2312950998,
        502970286,
        855612546,
        1738396948,
        1479516111,
        258812777,
        2077511080,
        2011393907,
        79989058,
        1067287976,
        1780299464,
        286451373,
        2446758561
      ]);
      var T256_IV = /* @__PURE__ */ Uint32Array.from([
        573645204,
        4230739756,
        2673172387,
        3360449730,
        596883563,
        1867755857,
        2520282905,
        1497426621,
        2519219938,
        2827943907,
        3193839141,
        1401305490,
        721525244,
        746961066,
        246885852,
        2177182882
      ]);
      var SHA512_224 = class extends SHA512 {
        constructor() {
          super(28);
          this.Ah = T224_IV[0] | 0;
          this.Al = T224_IV[1] | 0;
          this.Bh = T224_IV[2] | 0;
          this.Bl = T224_IV[3] | 0;
          this.Ch = T224_IV[4] | 0;
          this.Cl = T224_IV[5] | 0;
          this.Dh = T224_IV[6] | 0;
          this.Dl = T224_IV[7] | 0;
          this.Eh = T224_IV[8] | 0;
          this.El = T224_IV[9] | 0;
          this.Fh = T224_IV[10] | 0;
          this.Fl = T224_IV[11] | 0;
          this.Gh = T224_IV[12] | 0;
          this.Gl = T224_IV[13] | 0;
          this.Hh = T224_IV[14] | 0;
          this.Hl = T224_IV[15] | 0;
        }
      };
      exports.SHA512_224 = SHA512_224;
      var SHA512_256 = class extends SHA512 {
        constructor() {
          super(32);
          this.Ah = T256_IV[0] | 0;
          this.Al = T256_IV[1] | 0;
          this.Bh = T256_IV[2] | 0;
          this.Bl = T256_IV[3] | 0;
          this.Ch = T256_IV[4] | 0;
          this.Cl = T256_IV[5] | 0;
          this.Dh = T256_IV[6] | 0;
          this.Dl = T256_IV[7] | 0;
          this.Eh = T256_IV[8] | 0;
          this.El = T256_IV[9] | 0;
          this.Fh = T256_IV[10] | 0;
          this.Fl = T256_IV[11] | 0;
          this.Gh = T256_IV[12] | 0;
          this.Gl = T256_IV[13] | 0;
          this.Hh = T256_IV[14] | 0;
          this.Hl = T256_IV[15] | 0;
        }
      };
      exports.SHA512_256 = SHA512_256;
      exports.sha256 = (0, utils_ts_1.createHasher)(() => new SHA256());
      exports.sha224 = (0, utils_ts_1.createHasher)(() => new SHA224());
      exports.sha512 = (0, utils_ts_1.createHasher)(() => new SHA512());
      exports.sha384 = (0, utils_ts_1.createHasher)(() => new SHA384());
      exports.sha512_256 = (0, utils_ts_1.createHasher)(() => new SHA512_256());
      exports.sha512_224 = (0, utils_ts_1.createHasher)(() => new SHA512_224());
    }
  });

  // ../ipad/node_modules/@noble/hashes/scrypt.js
  var require_scrypt = __commonJS({
    "../ipad/node_modules/@noble/hashes/scrypt.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.scrypt = scrypt;
      exports.scryptAsync = scryptAsync;
      var pbkdf2_ts_1 = require_pbkdf2();
      var sha2_ts_1 = require_sha2();
      var utils_ts_1 = require_utils();
      function XorAndSalsa(prev, pi, input, ii, out, oi) {
        let y00 = prev[pi++] ^ input[ii++], y01 = prev[pi++] ^ input[ii++];
        let y02 = prev[pi++] ^ input[ii++], y03 = prev[pi++] ^ input[ii++];
        let y04 = prev[pi++] ^ input[ii++], y05 = prev[pi++] ^ input[ii++];
        let y06 = prev[pi++] ^ input[ii++], y07 = prev[pi++] ^ input[ii++];
        let y08 = prev[pi++] ^ input[ii++], y09 = prev[pi++] ^ input[ii++];
        let y10 = prev[pi++] ^ input[ii++], y11 = prev[pi++] ^ input[ii++];
        let y12 = prev[pi++] ^ input[ii++], y13 = prev[pi++] ^ input[ii++];
        let y14 = prev[pi++] ^ input[ii++], y15 = prev[pi++] ^ input[ii++];
        let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
        for (let i = 0; i < 8; i += 2) {
          x04 ^= (0, utils_ts_1.rotl)(x00 + x12 | 0, 7);
          x08 ^= (0, utils_ts_1.rotl)(x04 + x00 | 0, 9);
          x12 ^= (0, utils_ts_1.rotl)(x08 + x04 | 0, 13);
          x00 ^= (0, utils_ts_1.rotl)(x12 + x08 | 0, 18);
          x09 ^= (0, utils_ts_1.rotl)(x05 + x01 | 0, 7);
          x13 ^= (0, utils_ts_1.rotl)(x09 + x05 | 0, 9);
          x01 ^= (0, utils_ts_1.rotl)(x13 + x09 | 0, 13);
          x05 ^= (0, utils_ts_1.rotl)(x01 + x13 | 0, 18);
          x14 ^= (0, utils_ts_1.rotl)(x10 + x06 | 0, 7);
          x02 ^= (0, utils_ts_1.rotl)(x14 + x10 | 0, 9);
          x06 ^= (0, utils_ts_1.rotl)(x02 + x14 | 0, 13);
          x10 ^= (0, utils_ts_1.rotl)(x06 + x02 | 0, 18);
          x03 ^= (0, utils_ts_1.rotl)(x15 + x11 | 0, 7);
          x07 ^= (0, utils_ts_1.rotl)(x03 + x15 | 0, 9);
          x11 ^= (0, utils_ts_1.rotl)(x07 + x03 | 0, 13);
          x15 ^= (0, utils_ts_1.rotl)(x11 + x07 | 0, 18);
          x01 ^= (0, utils_ts_1.rotl)(x00 + x03 | 0, 7);
          x02 ^= (0, utils_ts_1.rotl)(x01 + x00 | 0, 9);
          x03 ^= (0, utils_ts_1.rotl)(x02 + x01 | 0, 13);
          x00 ^= (0, utils_ts_1.rotl)(x03 + x02 | 0, 18);
          x06 ^= (0, utils_ts_1.rotl)(x05 + x04 | 0, 7);
          x07 ^= (0, utils_ts_1.rotl)(x06 + x05 | 0, 9);
          x04 ^= (0, utils_ts_1.rotl)(x07 + x06 | 0, 13);
          x05 ^= (0, utils_ts_1.rotl)(x04 + x07 | 0, 18);
          x11 ^= (0, utils_ts_1.rotl)(x10 + x09 | 0, 7);
          x08 ^= (0, utils_ts_1.rotl)(x11 + x10 | 0, 9);
          x09 ^= (0, utils_ts_1.rotl)(x08 + x11 | 0, 13);
          x10 ^= (0, utils_ts_1.rotl)(x09 + x08 | 0, 18);
          x12 ^= (0, utils_ts_1.rotl)(x15 + x14 | 0, 7);
          x13 ^= (0, utils_ts_1.rotl)(x12 + x15 | 0, 9);
          x14 ^= (0, utils_ts_1.rotl)(x13 + x12 | 0, 13);
          x15 ^= (0, utils_ts_1.rotl)(x14 + x13 | 0, 18);
        }
        out[oi++] = y00 + x00 | 0;
        out[oi++] = y01 + x01 | 0;
        out[oi++] = y02 + x02 | 0;
        out[oi++] = y03 + x03 | 0;
        out[oi++] = y04 + x04 | 0;
        out[oi++] = y05 + x05 | 0;
        out[oi++] = y06 + x06 | 0;
        out[oi++] = y07 + x07 | 0;
        out[oi++] = y08 + x08 | 0;
        out[oi++] = y09 + x09 | 0;
        out[oi++] = y10 + x10 | 0;
        out[oi++] = y11 + x11 | 0;
        out[oi++] = y12 + x12 | 0;
        out[oi++] = y13 + x13 | 0;
        out[oi++] = y14 + x14 | 0;
        out[oi++] = y15 + x15 | 0;
      }
      function BlockMix(input, ii, out, oi, r) {
        let head = oi + 0;
        let tail = oi + 16 * r;
        for (let i = 0; i < 16; i++)
          out[tail + i] = input[ii + (2 * r - 1) * 16 + i];
        for (let i = 0; i < r; i++, head += 16, ii += 16) {
          XorAndSalsa(out, tail, input, ii, out, head);
          if (i > 0)
            tail += 16;
          XorAndSalsa(out, head, input, ii += 16, out, tail);
        }
      }
      function scryptInit(password, salt, _opts) {
        const opts = (0, utils_ts_1.checkOpts)({
          dkLen: 32,
          asyncTick: 10,
          maxmem: 1024 ** 3 + 1024
        }, _opts);
        const { N, r, p, dkLen, asyncTick, maxmem, onProgress } = opts;
        (0, utils_ts_1.anumber)(N);
        (0, utils_ts_1.anumber)(r);
        (0, utils_ts_1.anumber)(p);
        (0, utils_ts_1.anumber)(dkLen);
        (0, utils_ts_1.anumber)(asyncTick);
        (0, utils_ts_1.anumber)(maxmem);
        if (onProgress !== void 0 && typeof onProgress !== "function")
          throw new Error("progressCb should be function");
        const blockSize = 128 * r;
        const blockSize32 = blockSize / 4;
        const pow32 = Math.pow(2, 32);
        if (N <= 1 || (N & N - 1) !== 0 || N > pow32) {
          throw new Error("Scrypt: N must be larger than 1, a power of 2, and less than 2^32");
        }
        if (p < 0 || p > (pow32 - 1) * 32 / blockSize) {
          throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
        }
        if (dkLen < 0 || dkLen > (pow32 - 1) * 32) {
          throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
        }
        const memUsed = blockSize * (N + p);
        if (memUsed > maxmem) {
          throw new Error("Scrypt: memused is bigger than maxMem. Expected 128 * r * (N + p) > maxmem of " + maxmem);
        }
        const B = (0, pbkdf2_ts_1.pbkdf2)(sha2_ts_1.sha256, password, salt, { c: 1, dkLen: blockSize * p });
        const B32 = (0, utils_ts_1.u32)(B);
        const V = (0, utils_ts_1.u32)(new Uint8Array(blockSize * N));
        const tmp = (0, utils_ts_1.u32)(new Uint8Array(blockSize));
        let blockMixCb = () => {
        };
        if (onProgress) {
          const totalBlockMix = 2 * N * p;
          const callbackPer = Math.max(Math.floor(totalBlockMix / 1e4), 1);
          let blockMixCnt = 0;
          blockMixCb = () => {
            blockMixCnt++;
            if (onProgress && (!(blockMixCnt % callbackPer) || blockMixCnt === totalBlockMix))
              onProgress(blockMixCnt / totalBlockMix);
          };
        }
        return { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick };
      }
      function scryptOutput(password, dkLen, B, V, tmp) {
        const res = (0, pbkdf2_ts_1.pbkdf2)(sha2_ts_1.sha256, password, B, { c: 1, dkLen });
        (0, utils_ts_1.clean)(B, V, tmp);
        return res;
      }
      function scrypt(password, salt, opts) {
        const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb } = scryptInit(password, salt, opts);
        (0, utils_ts_1.swap32IfBE)(B32);
        for (let pi = 0; pi < p; pi++) {
          const Pi = blockSize32 * pi;
          for (let i = 0; i < blockSize32; i++)
            V[i] = B32[Pi + i];
          for (let i = 0, pos = 0; i < N - 1; i++) {
            BlockMix(V, pos, V, pos += blockSize32, r);
            blockMixCb();
          }
          BlockMix(V, (N - 1) * blockSize32, B32, Pi, r);
          blockMixCb();
          for (let i = 0; i < N; i++) {
            const j = B32[Pi + blockSize32 - 16] % N;
            for (let k = 0; k < blockSize32; k++)
              tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k];
            BlockMix(tmp, 0, B32, Pi, r);
            blockMixCb();
          }
        }
        (0, utils_ts_1.swap32IfBE)(B32);
        return scryptOutput(password, dkLen, B, V, tmp);
      }
      async function scryptAsync(password, salt, opts) {
        const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick } = scryptInit(password, salt, opts);
        (0, utils_ts_1.swap32IfBE)(B32);
        for (let pi = 0; pi < p; pi++) {
          const Pi = blockSize32 * pi;
          for (let i = 0; i < blockSize32; i++)
            V[i] = B32[Pi + i];
          let pos = 0;
          await (0, utils_ts_1.asyncLoop)(N - 1, asyncTick, () => {
            BlockMix(V, pos, V, pos += blockSize32, r);
            blockMixCb();
          });
          BlockMix(V, (N - 1) * blockSize32, B32, Pi, r);
          blockMixCb();
          await (0, utils_ts_1.asyncLoop)(N, asyncTick, () => {
            const j = B32[Pi + blockSize32 - 16] % N;
            for (let k = 0; k < blockSize32; k++)
              tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k];
            BlockMix(tmp, 0, B32, Pi, r);
            blockMixCb();
          });
        }
        (0, utils_ts_1.swap32IfBE)(B32);
        return scryptOutput(password, dkLen, B, V, tmp);
      }
    }
  });

  // ../ipad/node_modules/@noble/hashes/sha256.js
  var require_sha256 = __commonJS({
    "../ipad/node_modules/@noble/hashes/sha256.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sha224 = exports.SHA224 = exports.sha256 = exports.SHA256 = void 0;
      var sha2_ts_1 = require_sha2();
      exports.SHA256 = sha2_ts_1.SHA256;
      exports.sha256 = sha2_ts_1.sha256;
      exports.SHA224 = sha2_ts_1.SHA224;
      exports.sha224 = sha2_ts_1.sha224;
    }
  });

  // ../ipad/engine/crypto.cjs
  var require_crypto2 = __commonJS({
    "../ipad/engine/crypto.cjs"(exports, module) {
      var { Buffer: Buffer2 } = require_buffer();
      var { scrypt: derive } = require_scrypt();
      var { sha256 } = require_sha256();
      var { host } = require_host();
      function randomBytes(length) {
        return Buffer2.from(host("random", { length }), "hex");
      }
      function scryptSync(password, salt, length, options) {
        if (options.N !== 16384 || options.r !== 8 || options.p !== 1 || length !== 32) throw new Error("Unsupported PIN format");
        return Buffer2.from(derive(Buffer2.from(password), salt, { N: 16384, r: 8, p: 1, dkLen: 32 }));
      }
      function timingSafeEqual(a, b) {
        if (a.length !== b.length) throw new Error("Invalid comparison length");
        let mismatch = 0;
        for (let i = 0; i < a.length; i++) mismatch |= a[i] ^ b[i];
        return mismatch === 0;
      }
      function createHash(algorithm) {
        if (algorithm !== "sha256") throw new Error("Unsupported digest");
        const hash = sha256.create();
        const api = {
          update(value) {
            hash.update(Buffer2.from(value));
            return api;
          },
          digest(encoding) {
            const bytes = Buffer2.from(hash.digest());
            return encoding ? bytes.toString(encoding) : bytes;
          }
        };
        return api;
      }
      function randomUUID() {
        const bytes = randomBytes(16);
        bytes[6] = bytes[6] & 15 | 64;
        bytes[8] = bytes[8] & 63 | 128;
        const s = bytes.toString("hex");
        return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`;
      }
      module.exports = {
        randomBytes,
        randomUUID,
        createHash,
        timingSafeEqual,
        scryptSync,
        scrypt(password, salt, length, options, callback) {
          try {
            callback(null, scryptSync(password, salt, length, options));
          } catch (e) {
            callback(e);
          }
        }
      };
    }
  });

  // ../ipad/engine/util.cjs
  var require_util = __commonJS({
    "../ipad/engine/util.cjs"(exports, module) {
      module.exports = { promisify: (fn) => (...args) => new Promise((resolve, reject) => fn(...args, (error, value) => error ? reject(error) : resolve(value))) };
    }
  });

  // ../server/middleware/asyncPin.js
  var require_asyncPin = __commonJS({
    "../server/middleware/asyncPin.js"(exports, module) {
      var { scrypt, randomBytes, timingSafeEqual } = require_crypto2();
      var { promisify } = require_util();
      var derive = promisify(scrypt);
      var options = { N: 16384, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };
      async function hashPinAsync(pin) {
        const salt = randomBytes(16);
        const key = await derive(String(pin), salt, 32, options);
        return `scrypt$16384$8$1$${salt.toString("hex")}$${key.toString("hex")}`;
      }
      async function verifyPinAsync(pin, stored) {
        if (typeof pin !== "string" || !/^\d{1,12}$/.test(pin) || typeof stored !== "string") return false;
        const parts = stored.split("$");
        if (parts.length !== 6 || parts.slice(0, 4).join("$") !== "scrypt$16384$8$1" || !/^[a-f0-9]{32}$/.test(parts[4]) || !/^[a-f0-9]{64}$/.test(parts[5])) return false;
        const key = await derive(pin, Buffer.from(parts[4], "hex"), 32, options);
        return timingSafeEqual(key, Buffer.from(parts[5], "hex"));
      }
      module.exports = { hashPinAsync, verifyPinAsync };
    }
  });

  // ../ipad/engine/setup.cjs
  var require_setup = __commonJS({
    "../ipad/engine/setup.cjs"(exports, module) {
      var { getDb } = require_db();
      var fresh = () => !getDb().prepare("SELECT 1 FROM users WHERE role='OWNER' AND is_active=1").get();
      module.exports = { ensureSetupCode: () => null, validSetupCode: () => fresh(), consumeSetupCode: () => {
      } };
    }
  });

  // ../server/middleware/auth.js
  var require_auth = __commonJS({
    "../server/middleware/auth.js"(exports, module) {
      var crypto = require_crypto2();
      var express = require_router();
      var { getDb } = require_db();
      var { hashPinAsync, verifyPinAsync } = require_asyncPin();
      var { ensureSetupCode, validSetupCode, consumeSetupCode } = require_setup();
      var credentialTail = Promise.resolve();
      var credentialPending = 0;
      var authEpoch = 0;
      function credentialRoute(handler, { authenticated = false, owner = false } = {}) {
        return (req, res, next) => {
          if (credentialPending >= 16) return res.status(503).json({ error: "\u0E23\u0E30\u0E1A\u0E1A\u0E15\u0E23\u0E27\u0E08 PIN \u0E21\u0E35\u0E07\u0E32\u0E19\u0E04\u0E49\u0E32\u0E07 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48" });
          credentialPending++;
          const work = credentialTail.then(async () => {
            if (authenticated) {
              const current = resolveUserFromToken(readBearer(req));
              if (!current || owner && current.role !== "OWNER") return res.status(401).json({ error: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E43\u0E2B\u0E21\u0E48" });
              req.user = current;
            }
            const db = getDb();
            const epoch = authEpoch;
            req.assertCredentialsCurrent = () => {
              if (getDb() !== db || epoch !== authEpoch || authenticated && !resolveUserFromToken(readBearer(req))) {
                const e = new Error("\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E23\u0E37\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E15\u0E23\u0E27\u0E08 PIN \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48");
                e.status = 409;
                throw e;
              }
            };
            await handler(req, res, next);
          });
          credentialTail = work.catch(next).finally(() => {
            credentialPending--;
          });
        };
      }
      var SCRYPT_N = 16384;
      var SCRYPT_R = 8;
      var SCRYPT_P = 1;
      var KEY_LEN = 32;
      var TOKEN_EXPIRY_HOURS = 12;
      var MAX_FAILS = 5;
      var FAIL_WINDOW_MS = 5 * 60 * 1e3;
      var LOCK_MS = 5 * 60 * 1e3;
      var MIN_PIN_LENGTH = 6;
      var ROLES = ["OWNER", "MANAGER"];
      var ROLE_LABELS = { OWNER: "\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19", MANAGER: "\u0E1C\u0E39\u0E49\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E23\u0E49\u0E32\u0E19" };
      var PIN_SETTING_KEY = "auth_pin_hash";
      var tokenStore = /* @__PURE__ */ new Map();
      var sweeper = setInterval(() => {
        const now = Date.now();
        for (const [token, data] of tokenStore) {
          if (now > data.expiresAt) tokenStore.delete(token);
        }
      }, 10 * 60 * 1e3);
      if (typeof sweeper.unref === "function") sweeper.unref();
      function hashPin(pin, saltHex = null) {
        const salt = saltHex ? Buffer.from(saltHex, "hex") : crypto.randomBytes(16);
        const derived = crypto.scryptSync(String(pin), salt, KEY_LEN, {
          N: SCRYPT_N,
          r: SCRYPT_R,
          p: SCRYPT_P,
          maxmem: 256 * 1024 * 1024
        });
        return `scrypt$${SCRYPT_N}$${SCRYPT_R}$${SCRYPT_P}$${salt.toString("hex")}$${derived.toString("hex")}`;
      }
      function verifyPin(pin, stored) {
        if (typeof stored !== "string" || !stored.startsWith("scrypt$")) return false;
        const parts = stored.split("$");
        if (parts.length !== 6) return false;
        const [, nStr, rStr, pStr, saltHex, hashHex] = parts;
        let derived;
        try {
          derived = crypto.scryptSync(String(pin), Buffer.from(saltHex, "hex"), KEY_LEN, {
            N: Number(nStr),
            r: Number(rStr),
            p: Number(pStr),
            maxmem: 256 * 1024 * 1024
          });
        } catch {
          return false;
        }
        const expected = Buffer.from(hashHex, "hex");
        if (expected.length !== derived.length) return false;
        return crypto.timingSafeEqual(expected, derived);
      }
      function validatePinFormat(pin) {
        const str = String(pin ?? "");
        if (!/^\d+$/.test(str)) {
          return "\u0E23\u0E2B\u0E31\u0E2A PIN \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19";
        }
        if (str.length < MIN_PIN_LENGTH) {
          return `\u0E23\u0E2B\u0E31\u0E2A PIN \u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 ${MIN_PIN_LENGTH} \u0E2B\u0E25\u0E31\u0E01`;
        }
        if (str.length > 12) {
          return "\u0E23\u0E2B\u0E31\u0E2A PIN \u0E22\u0E32\u0E27\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B (\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 12 \u0E2B\u0E25\u0E31\u0E01)";
        }
        if (/^(\d)\1+$/.test(str)) {
          return "\u0E23\u0E2B\u0E31\u0E2A PIN \u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E25\u0E02\u0E0B\u0E49\u0E33\u0E15\u0E31\u0E27\u0E40\u0E14\u0E35\u0E22\u0E27\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14";
        }
        const digits = str.split("").map(Number);
        const ascending = digits.every((d, i) => i === 0 || d === (digits[i - 1] + 1) % 10);
        const descending = digits.every((d, i) => i === 0 || d === (digits[i - 1] + 9) % 10);
        if (ascending || descending) {
          return "\u0E23\u0E2B\u0E31\u0E2A PIN \u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E25\u0E02\u0E40\u0E23\u0E35\u0E22\u0E07\u0E01\u0E31\u0E19";
        }
        return null;
      }
      function validateUserName(name) {
        const str = String(name ?? "").trim();
        if (!str) return "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19";
        if (str.length < 2) return "\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E2A\u0E31\u0E49\u0E19\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B";
        if (str.length > 50) return "\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E22\u0E32\u0E27\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B (\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 50 \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23)";
        return null;
      }
      function normalizeRole(role) {
        const str = String(role ?? "").toUpperCase();
        return ROLES.includes(str) ? str : null;
      }
      var USER_COLUMNS = `id, name, role, is_active, created_at, updated_at, last_login_at`;
      function listUsers() {
        const db = getDb();
        return db.prepare(`SELECT ${USER_COLUMNS} FROM users ORDER BY role ASC, name ASC`).all();
      }
      function getUserById(id) {
        const db = getDb();
        return db.prepare(`SELECT ${USER_COLUMNS} FROM users WHERE id = ?`).get(id) || null;
      }
      function getUserByName(name) {
        const db = getDb();
        return db.prepare(`SELECT ${USER_COLUMNS} FROM users WHERE name = ?`).get(String(name).trim()) || null;
      }
      function countUsers() {
        const db = getDb();
        return db.prepare(`SELECT COUNT(*) as c FROM users`).get().c;
      }
      function countActiveOwners(excludeId = null) {
        const db = getDb();
        return excludeId === null ? db.prepare(`SELECT COUNT(*) as c FROM users WHERE role = 'OWNER' AND is_active = 1`).get().c : db.prepare(`SELECT COUNT(*) as c FROM users WHERE role = 'OWNER' AND is_active = 1 AND id != ?`).get(excludeId).c;
      }
      async function findActiveUserByPin(pin) {
        const db = getDb();
        const rows = db.prepare(`SELECT id, name, role, pin_hash FROM users WHERE is_active = 1 ORDER BY id ASC`).all();
        for (const row of rows) {
          if (await verifyPinAsync(String(pin), row.pin_hash)) {
            return { id: row.id, name: row.name, role: row.role };
          }
        }
        return null;
      }
      async function pinCollidesWithOtherUser(pin, excludeId = null) {
        const db = getDb();
        const rows = excludeId === null ? db.prepare(`SELECT id, pin_hash FROM users`).all() : db.prepare(`SELECT id, pin_hash FROM users WHERE id != ?`).all(excludeId);
        for (const row of rows) if (await verifyPinAsync(String(pin), row.pin_hash)) return true;
        return false;
      }
      function createUser({ name, role, pin, preparedHash }) {
        const db = getDb();
        const nowIso = (/* @__PURE__ */ new Date()).toISOString();
        const info = db.prepare(`
    INSERT INTO users (name, role, pin_hash, is_active, created_at, updated_at)
    VALUES (?, ?, ?, 1, ?, ?)
  `).run(String(name).trim(), role, preparedHash || hashPin(pin), nowIso, nowIso);
        return getUserById(Number(info.lastInsertRowid));
      }
      function touchUser(id) {
        const db = getDb();
        db.prepare(`UPDATE users SET updated_at = ? WHERE id = ?`).run((/* @__PURE__ */ new Date()).toISOString(), id);
      }
      function setUserPin(id, pin, preparedHash) {
        const db = getDb();
        db.prepare(`UPDATE users SET pin_hash = ?, updated_at = ? WHERE id = ?`).run(preparedHash || hashPin(pin), (/* @__PURE__ */ new Date()).toISOString(), id);
      }
      function getUserPinHash(id) {
        const db = getDb();
        return db.prepare(`SELECT pin_hash FROM users WHERE id = ?`).get(id)?.pin_hash || null;
      }
      function clientKey(req) {
        return String(req.ip || req.socket?.remoteAddress || "unknown").slice(0, 100);
      }
      function getLockState(key) {
        const db = getDb();
        const row = db.prepare(`SELECT * FROM auth_attempts WHERE client_key = ?`).get(key);
        if (!row) return { locked: false, remainingMs: 0, failCount: 0 };
        const now = Date.now();
        if (row.locked_until) {
          const until = Date.parse(row.locked_until);
          if (Number.isFinite(until) && until > now) {
            return { locked: true, remainingMs: until - now, failCount: row.fail_count };
          }
        }
        return { locked: false, remainingMs: 0, failCount: row.fail_count || 0 };
      }
      function recordFailure(key) {
        const db = getDb();
        const now = Date.now();
        const nowIso = new Date(now).toISOString();
        const row = db.prepare(`SELECT * FROM auth_attempts WHERE client_key = ?`).get(key);
        let failCount = 1;
        let firstFailedAt = nowIso;
        if (row) {
          const firstMs = Date.parse(row.first_failed_at || "");
          const withinWindow = Number.isFinite(firstMs) && now - firstMs < FAIL_WINDOW_MS;
          if (withinWindow) {
            failCount = (row.fail_count || 0) + 1;
            firstFailedAt = row.first_failed_at;
          }
        }
        const lockedUntil = failCount >= MAX_FAILS ? new Date(now + LOCK_MS).toISOString() : null;
        db.prepare(`
    INSERT INTO auth_attempts (client_key, fail_count, first_failed_at, locked_until)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(client_key) DO UPDATE SET
      fail_count = excluded.fail_count,
      first_failed_at = excluded.first_failed_at,
      locked_until = excluded.locked_until
  `).run(key, failCount, firstFailedAt, lockedUntil);
        return { failCount, locked: !!lockedUntil, remainingMs: lockedUntil ? LOCK_MS : 0 };
      }
      function clearFailures(key) {
        const db = getDb();
        db.prepare(`DELETE FROM auth_attempts WHERE client_key = ?`).run(key);
      }
      function issueToken(userId) {
        const token = crypto.randomBytes(32).toString("hex");
        tokenStore.set(token, {
          expiresAt: Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1e3,
          userId
        });
        return token;
      }
      function revokeTokensForUser(userId) {
        authEpoch++;
        let removed = 0;
        for (const [token, data] of tokenStore) {
          if (data.userId === userId) {
            tokenStore.delete(token);
            removed++;
          }
        }
        return removed;
      }
      function revokeAllTokens() {
        authEpoch++;
        const count = tokenStore.size;
        tokenStore.clear();
        return count;
      }
      function sessionOf(token) {
        if (!token || typeof token !== "string") return null;
        const data = tokenStore.get(token);
        if (!data) return null;
        if (Date.now() > data.expiresAt) {
          tokenStore.delete(token);
          return null;
        }
        return data;
      }
      function resolveUserFromToken(token) {
        const session = sessionOf(token);
        if (!session) return null;
        const user = getUserById(session.userId);
        if (!user || !user.is_active) {
          tokenStore.delete(token);
          return null;
        }
        return { id: user.id, name: user.name, role: user.role };
      }
      function readBearer(req) {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) return null;
        return header.slice(7).trim() || null;
      }
      function ownerCommitGuard(req) {
        const database = getDb();
        const token = readBearer(req);
        const userId = req.user?.id;
        return () => {
          if (getDb() !== database) {
            const error = new Error("\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E43\u0E2B\u0E21\u0E48");
            error.status = 409;
            throw error;
          }
          const current = resolveUserFromToken(token);
          if (!current || current.id !== userId || current.role !== "OWNER") {
            const error = new Error("\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E43\u0E2B\u0E21\u0E48");
            error.status = 401;
            throw error;
          }
        };
      }
      function requireAuth(req, res, next) {
        const token = readBearer(req);
        if (!token) {
          return res.status(401).json({
            error: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E48\u0E2D\u0E19\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",
            code: "NO_TOKEN"
          });
        }
        let user;
        try {
          user = resolveUserFromToken(token);
        } catch (e) {
          console.error("[Auth] \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49:", e.message);
          return res.status(503).json({ error: "\u0E23\u0E30\u0E1A\u0E1A\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19 (\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32)" });
        }
        if (!user) {
          return res.status(401).json({
            error: "\u0E40\u0E0B\u0E2A\u0E0A\u0E31\u0E19\u0E2B\u0E21\u0E14\u0E2D\u0E32\u0E22\u0E38\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E43\u0E2B\u0E21\u0E48",
            code: "INVALID_TOKEN"
          });
        }
        req.user = user;
        next();
      }
      function requireRole(...allowed) {
        const allowSet = new Set(allowed.map((r) => String(r).toUpperCase()));
        return function roleGate(req, res, next) {
          if (!req.user) {
            return res.status(401).json({ error: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E48\u0E2D\u0E19\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19", code: "NO_TOKEN" });
          }
          if (!allowSet.has(req.user.role)) {
            return res.status(403).json({
              error: "\u0E40\u0E21\u0E19\u0E39\u0E19\u0E35\u0E49\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19",
              code: "FORBIDDEN",
              requiredRole: [...allowSet].join(",")
            });
          }
          next();
        };
      }
      var requireOwner = requireRole("OWNER");
      function isOwner(req) {
        return req.user?.role === "OWNER";
      }
      function actorName(req) {
        return req.user?.name || "\u0E44\u0E21\u0E48\u0E17\u0E23\u0E32\u0E1A\u0E1C\u0E39\u0E49\u0E17\u0E33\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23";
      }
      function createAuthRouter() {
        const router = express.Router();
        ensureSetupCode();
        router.get("/status", (req, res) => {
          let needsSetup;
          let user = null;
          try {
            needsSetup = countActiveOwners() === 0;
            ensureSetupCode();
            user = resolveUserFromToken(readBearer(req));
          } catch (e) {
            console.error("[Auth] \u0E2D\u0E48\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E08\u0E32\u0E01\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49:", e.message);
            return res.status(503).json({ error: "\u0E23\u0E30\u0E1A\u0E1A\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19 (\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32)" });
          }
          res.json({
            needsSetup,
            authenticated: !!user,
            user,
            minPinLength: MIN_PIN_LENGTH
          });
        });
        router.post("/setup", credentialRoute(async (req, res) => {
          try {
            if (countActiveOwners() > 0) {
              return res.status(409).json({ error: "\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E21\u0E35\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27" });
            }
            if (!validSetupCode(req.body?.setupCode)) return res.status(403).json({ error: "\u0E01\u0E23\u0E2D\u0E01\u0E23\u0E2B\u0E31\u0E2A\u0E15\u0E31\u0E49\u0E07\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E08\u0E32\u0E01\u0E2B\u0E19\u0E49\u0E32\u0E15\u0E48\u0E32\u0E07\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C (\u0E2B\u0E21\u0E14\u0E2D\u0E32\u0E22\u0E38\u0E43\u0E19 30 \u0E19\u0E32\u0E17\u0E35)", code: "SETUP_CODE_REQUIRED" });
            const { pin, name } = req.body || {};
            const rawName = name === void 0 || name === null || String(name).trim() === "" ? "\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19" : String(name).trim();
            const nameProblem = validateUserName(rawName);
            if (nameProblem) return res.status(400).json({ error: nameProblem });
            const problem = validatePinFormat(pin);
            if (problem) return res.status(400).json({ error: problem });
            if (getUserByName(rawName)) {
              return res.status(409).json({ error: "\u0E21\u0E35\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E0A\u0E37\u0E48\u0E2D\u0E19\u0E35\u0E49\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27" });
            }
            if (await pinCollidesWithOtherUser(pin)) {
              return res.status(409).json({ error: "\u0E23\u0E2B\u0E31\u0E2A PIN \u0E19\u0E35\u0E49\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2D\u0E37\u0E48\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E43\u0E0A\u0E49\u0E23\u0E2B\u0E31\u0E2A\u0E2D\u0E37\u0E48\u0E19" });
            }
            const preparedHash = await hashPinAsync(pin);
            req.assertCredentialsCurrent();
            if (!validSetupCode(req.body?.setupCode) || countActiveOwners() > 0) return res.status(409).json({ error: "\u0E23\u0E2B\u0E31\u0E2A\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E41\u0E25\u0E49\u0E27" });
            const user = createUser({ name: rawName, role: "OWNER", pin, preparedHash });
            consumeSetupCode();
            tokenStore.clear();
            const token = issueToken(user.id);
            clearFailures(clientKey(req));
            console.log(`[Auth] \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19\u0E04\u0E23\u0E31\u0E49\u0E07\u0E41\u0E23\u0E01: ${user.name}`);
            res.json({
              success: true,
              token,
              user: { id: user.id, name: user.name, role: user.role },
              expiresIn: TOKEN_EXPIRY_HOURS * 3600,
              message: "\u0E15\u0E31\u0E49\u0E07\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"
            });
          } catch (e) {
            console.error("[Auth setup]", e.message);
            res.status(e.status || 503).json({ error: "\u0E15\u0E31\u0E49\u0E07\u0E23\u0E2B\u0E31\u0E2A PIN \u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 \u0E23\u0E30\u0E1A\u0E1A\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32" });
          }
        }));
        router.post("/login", credentialRoute(async (req, res) => {
          const key = clientKey(req);
          let lock;
          let hasOwner;
          try {
            lock = getLockState(key);
            hasOwner = countActiveOwners() > 0;
          } catch (e) {
            console.error("[Auth] \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49:", e.message);
            return res.status(503).json({ error: "\u0E23\u0E30\u0E1A\u0E1A\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19 (\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32)" });
          }
          if (lock.locked) {
            const mins = Math.ceil(lock.remainingMs / 6e4);
            return res.status(429).json({
              error: `\u0E43\u0E2A\u0E48\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E34\u0E14\u0E2B\u0E25\u0E32\u0E22\u0E04\u0E23\u0E31\u0E49\u0E07\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B \u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E2D\u0E2D\u0E35\u0E01 ${mins} \u0E19\u0E32\u0E17\u0E35`,
              code: "LOCKED",
              retryAfterSeconds: Math.ceil(lock.remainingMs / 1e3)
            });
          }
          if (!hasOwner) {
            return res.status(409).json({ error: "\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E15\u0E31\u0E49\u0E07\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19", code: "NEEDS_SETUP" });
          }
          const { pin } = req.body || {};
          if (!pin) {
            return res.status(400).json({ error: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E23\u0E2B\u0E31\u0E2A PIN" });
          }
          let user;
          try {
            user = await findActiveUserByPin(pin);
            req.assertCredentialsCurrent();
          } catch (e) {
            console.error("[Auth] \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49:", e.message);
            return res.status(503).json({ error: "\u0E23\u0E30\u0E1A\u0E1A\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19 (\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32)" });
          }
          if (!user) {
            const result = recordFailure(key);
            const remaining = Math.max(0, MAX_FAILS - result.failCount);
            return res.status(401).json({
              error: result.locked ? `\u0E43\u0E2A\u0E48\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E34\u0E14\u0E04\u0E23\u0E1A ${MAX_FAILS} \u0E04\u0E23\u0E31\u0E49\u0E07 \u0E23\u0E30\u0E1A\u0E1A\u0E25\u0E47\u0E2D\u0E01 5 \u0E19\u0E32\u0E17\u0E35` : `\u0E23\u0E2B\u0E31\u0E2A PIN \u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07 (\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E2D\u0E35\u0E01 ${remaining} \u0E04\u0E23\u0E31\u0E49\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E16\u0E39\u0E01\u0E25\u0E47\u0E2D\u0E01)`,
              code: result.locked ? "LOCKED" : "BAD_PIN"
            });
          }
          clearFailures(key);
          try {
            getDb().prepare(`UPDATE users SET last_login_at = ? WHERE id = ?`).run((/* @__PURE__ */ new Date()).toISOString(), user.id);
          } catch {
          }
          const token = issueToken(user.id);
          res.json({
            success: true,
            token,
            user,
            expiresIn: TOKEN_EXPIRY_HOURS * 3600,
            message: `\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 (${ROLE_LABELS[user.role] || user.role})`
          });
        }));
        router.post("/logout", (req, res) => {
          const token = readBearer(req);
          if (token) tokenStore.delete(token);
          res.json({ success: true });
        });
        router.post("/change-pin", requireAuth, credentialRoute(async (req, res) => {
          try {
            const { currentPin, newPin } = req.body || {};
            if (!currentPin || !newPin) {
              return res.status(400).json({ error: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E23\u0E2B\u0E31\u0E2A PIN \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E41\u0E25\u0E30\u0E23\u0E2B\u0E31\u0E2A\u0E43\u0E2B\u0E21\u0E48" });
            }
            const key = clientKey(req);
            const lock = getLockState(key);
            if (lock.locked) {
              const mins = Math.ceil(lock.remainingMs / 6e4);
              return res.status(429).json({ error: `\u0E43\u0E2A\u0E48\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E34\u0E14\u0E2B\u0E25\u0E32\u0E22\u0E04\u0E23\u0E31\u0E49\u0E07\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B \u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E2D\u0E2D\u0E35\u0E01 ${mins} \u0E19\u0E32\u0E17\u0E35` });
            }
            const storedHash = getUserPinHash(req.user.id);
            if (!storedHash) {
              return res.status(409).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E19\u0E35\u0E49" });
            }
            const currentMatches = await verifyPinAsync(String(currentPin), storedHash);
            req.assertCredentialsCurrent();
            if (!currentMatches) {
              recordFailure(key);
              return res.status(401).json({ error: "\u0E23\u0E2B\u0E31\u0E2A PIN \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" });
            }
            const problem = validatePinFormat(newPin);
            if (problem) return res.status(400).json({ error: problem });
            if (await verifyPinAsync(String(newPin), storedHash)) {
              return res.status(400).json({ error: "\u0E23\u0E2B\u0E31\u0E2A PIN \u0E43\u0E2B\u0E21\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33\u0E01\u0E31\u0E1A\u0E23\u0E2B\u0E31\u0E2A\u0E40\u0E14\u0E34\u0E21" });
            }
            if (await pinCollidesWithOtherUser(newPin, req.user.id)) {
              return res.status(409).json({ error: "\u0E23\u0E2B\u0E31\u0E2A PIN \u0E19\u0E35\u0E49\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2D\u0E37\u0E48\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E43\u0E0A\u0E49\u0E23\u0E2B\u0E31\u0E2A\u0E2D\u0E37\u0E48\u0E19" });
            }
            const preparedHash = await hashPinAsync(newPin);
            req.assertCredentialsCurrent();
            setUserPin(req.user.id, newPin, preparedHash);
            clearFailures(key);
            revokeTokensForUser(req.user.id);
            res.json({ success: true, message: "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E2B\u0E31\u0E2A PIN \u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E43\u0E2B\u0E21\u0E48" });
          } catch (e) {
            console.error("[Auth change-pin]", e.message);
            res.status(503).json({ error: "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E2B\u0E31\u0E2A PIN \u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 \u0E23\u0E30\u0E1A\u0E1A\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32" });
          }
        }, { authenticated: true }));
        return router;
      }
      module.exports = {
        ownerCommitGuard,
        credentialRoute,
        hashPinAsync,
        requireAuth,
        requireRole,
        requireOwner,
        isOwner,
        actorName,
        createAuthRouter,
        hashPin,
        verifyPin,
        validatePinFormat,
        validateUserName,
        normalizeRole,
        listUsers,
        getUserById,
        getUserByName,
        countUsers,
        countActiveOwners,
        createUser,
        setUserPin,
        touchUser,
        pinCollidesWithOtherUser,
        revokeTokensForUser,
        revokeAllTokens,
        ROLES,
        ROLE_LABELS,
        PIN_SETTING_KEY,
        MIN_PIN_LENGTH,
        // เปิดไว้ให้เทสต์เท่านั้น
        _tokenStore: tokenStore
      };
    }
  });

  // ../server/middleware/validators.js
  var require_validators = __commonJS({
    "../server/middleware/validators.js"(exports, module) {
      var VALID_PAYMENT_METHODS = ["CASH", "PROMPTPAY", "CREDIT_CARD"];
      var VALID_THERAPIST_STATUSES = ["AVAILABLE", "IN_SERVICE", "ON_BREAK", "OFF"];
      var VALID_ROOM_STATUSES = ["AVAILABLE", "IN_USE", "CLEANING", "MAINTENANCE"];
      var VALID_ROOM_TYPES = ["THAI", "SPA", "FOOT"];
      var VALID_SHIFT_TYPES = ["DAY", "NIGHT"];
      var ApiError = class extends Error {
        constructor(message, status = 400) {
          super(message);
          this.status = status;
          this.expose = true;
        }
      };
      function badRequest(message) {
        return new ApiError(message, 400);
      }
      function nz(value) {
        return value === void 0 ? null : value;
      }
      function pick(obj, ...keys) {
        if (!obj) return void 0;
        for (const k of keys) {
          if (obj[k] !== void 0 && obj[k] !== null && obj[k] !== "") return obj[k];
        }
        return void 0;
      }
      function validatePaymentMethod(method) {
        if (!method || !VALID_PAYMENT_METHODS.includes(method)) {
          throw badRequest(`\u0E27\u0E34\u0E18\u0E35\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${method} (\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19 ${VALID_PAYMENT_METHODS.join(", ")})`);
        }
        return method;
      }
      function validateTherapistStatus(status) {
        if (!status || !VALID_THERAPIST_STATUSES.includes(status)) {
          throw badRequest(`\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${status} (\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19 ${VALID_THERAPIST_STATUSES.join(", ")})`);
        }
        return status;
      }
      function validateRoomStatus(status) {
        if (!status || !VALID_ROOM_STATUSES.includes(status)) {
          throw badRequest(`\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E2B\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${status} (\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19 ${VALID_ROOM_STATUSES.join(", ")})`);
        }
        return status;
      }
      function validateShiftType(shiftType) {
        if (!shiftType || !VALID_SHIFT_TYPES.includes(shiftType)) {
          throw badRequest(`\u0E23\u0E2D\u0E1A\u0E01\u0E30\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${shiftType} (\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19 DAY \u0E2B\u0E23\u0E37\u0E2D NIGHT)`);
        }
        return shiftType;
      }
      function validateBusinessDate(dateStr, fieldName = "\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23") {
        if (typeof dateStr !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          throw badRequest(`${fieldName} \u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A YYYY-MM-DD (\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A: ${dateStr})`);
        }
        const [y, m, d] = dateStr.split("-").map(Number);
        const probe = new Date(Date.UTC(y, m - 1, d));
        if (probe.getUTCFullYear() !== y || probe.getUTCMonth() + 1 !== m || probe.getUTCDate() !== d) {
          throw badRequest(`${fieldName} \u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E17\u0E35\u0E48\u0E21\u0E35\u0E2D\u0E22\u0E39\u0E48\u0E08\u0E23\u0E34\u0E07: ${dateStr}`);
        }
        return dateStr;
      }
      function validatePositiveNumber(val, fieldName = "value") {
        const num = numericInput(val);
        if (!Number.isFinite(num) || num <= 0) {
          throw badRequest(`${fieldName} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0`);
        }
        return num;
      }
      function validateNonNegativeNumber(val, fieldName = "value") {
        const num = numericInput(val);
        if (!Number.isFinite(num) || num < 0) {
          throw badRequest(`${fieldName} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E15\u0E34\u0E14\u0E25\u0E1A`);
        }
        return num;
      }
      function validateMoney(val, fieldName = "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19", { max = 1e7 } = {}) {
        const num = numericInput(val);
        if (!Number.isFinite(num) || num < 0) {
          throw badRequest(`${fieldName} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E15\u0E34\u0E14\u0E25\u0E1A`);
        }
        if (num > max) {
          throw badRequest(`${fieldName} \u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 (${num}) \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07`);
        }
        return Math.round(num);
      }
      function validateId(val, fieldName = "id") {
        const num = numericInput(val);
        if (!Number.isSafeInteger(num) || num <= 0) {
          throw badRequest(`${fieldName} \u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${val}`);
        }
        return num;
      }
      function numericInput(value) {
        if (typeof value === "number") return value;
        if (typeof value !== "string" || !value.trim()) return NaN;
        return Number(value);
      }
      function validateBoolean(value, fieldName = "value") {
        if (value === true || value === 1 || value === "true" || value === "1") return true;
        if (value === false || value === 0 || value === "false" || value === "0") return false;
        throw badRequest(`${fieldName} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19 true \u0E2B\u0E23\u0E37\u0E2D false`);
      }
      function validateIdArray(val, fieldName = "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23") {
        if (!Array.isArray(val) || val.length === 0) {
          throw badRequest(`${fieldName} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E21\u0E35\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23`);
        }
        if (val.length > 500) {
          throw badRequest(`${fieldName} \u0E21\u0E32\u0E01\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B (\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 500 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07)`);
        }
        return val.map((v, i) => validateId(v, `${fieldName}[${i}]`));
      }
      function clampLimit(limit, max = 200, fallback = 50) {
        const num = Number(limit);
        if (!Number.isFinite(num) || num <= 0) return fallback;
        return Math.max(1, Math.min(Math.floor(num), max));
      }
      function validateRoomNumber(db, roomNumber, excludeId = null) {
        if (roomNumber === void 0 || roomNumber === null) return;
        let query = `SELECT id FROM rooms WHERE room_number = ?`;
        const params = [roomNumber];
        if (excludeId) {
          query += ` AND id != ?`;
          params.push(excludeId);
        }
        const existing = db.prepare(query).get(...params);
        if (existing) {
          throw badRequest(`\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E2B\u0E49\u0E2D\u0E07 ${roomNumber} \u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27`);
        }
      }
      function validateOutboundUrl(rawUrl, allowedHosts, fieldName = "URL") {
        if (!rawUrl || typeof rawUrl !== "string") {
          throw badRequest(`\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01 ${fieldName}`);
        }
        let parsed;
        try {
          parsed = new URL(rawUrl.trim());
        } catch {
          throw badRequest(`${fieldName} \u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48 URL \u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07`);
        }
        if (parsed.protocol !== "https:") {
          throw badRequest(`${fieldName} \u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 https://`);
        }
        const host = parsed.hostname.toLowerCase();
        const ok = allowedHosts.some((h) => host === h || host.endsWith("." + h));
        if (!ok) {
          throw badRequest(`${fieldName} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E42\u0E14\u0E40\u0E21\u0E19\u0E02\u0E2D\u0E07 ${allowedHosts.join(" \u0E2B\u0E23\u0E37\u0E2D ")} \u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19`);
        }
        return parsed.toString();
      }
      module.exports = {
        ApiError,
        badRequest,
        nz,
        pick,
        VALID_PAYMENT_METHODS,
        VALID_THERAPIST_STATUSES,
        VALID_ROOM_STATUSES,
        VALID_ROOM_TYPES,
        VALID_SHIFT_TYPES,
        validatePaymentMethod,
        validateTherapistStatus,
        validateRoomStatus,
        validateShiftType,
        validateBusinessDate,
        validatePositiveNumber,
        validateNonNegativeNumber,
        validateMoney,
        validateId,
        validateIdArray,
        validateBoolean,
        clampLimit,
        validateRoomNumber,
        validateOutboundUrl
      };
    }
  });

  // ../ipad/engine/backups.cjs
  var require_backups = __commonJS({
    "../ipad/engine/backups.cjs"(exports, module) {
      var { host } = require_host();
      var { getDb, closeDb } = require_db();
      var { randomUUID } = require_crypto2();
      function backupDatabase(reason = "manual", options = {}) {
        getDb();
        const fileName = jobBackupName(options.snapshotKey || randomUUID());
        const result = host("backup.create", { name: fileName });
        return { success: true, fileName, timestamp: result.createdAt, offsiteError: "\u0E2A\u0E33\u0E40\u0E19\u0E32\u0E22\u0E31\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19 iPad \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01\u0E40\u0E01\u0E47\u0E1A\u0E19\u0E2D\u0E01\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07", localOnly: true };
      }
      function restoreFromBackup(filename) {
        const db = getDb();
        if (db.prepare("SELECT 1 FROM shifts WHERE status='OPEN'").get()) throw Object.assign(new Error("\u0E1B\u0E34\u0E14\u0E01\u0E30\u0E01\u0E48\u0E2D\u0E19\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"), { status: 409 });
        host("backup.validate", { name: filename });
        const before = backupDatabase("before-restore");
        host("restore.begin", { name: filename, before: before.fileName });
        closeDb();
        try {
          host("backup.restore", { name: filename });
          getDb();
          host("restore.complete");
        } catch (error) {
          closeDb();
          host("backup.restore", { name: before.fileName });
          getDb();
          host("restore.complete");
          throw error;
        }
        return { success: true, message: "\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E43\u0E2B\u0E21\u0E48", preRestoreBackup: before.fileName };
      }
      function jobBackupName(key) {
        if (!/^[a-f0-9-]{36}$/i.test(key)) throw new Error("Invalid backup key");
        return `pos-${key}.sqlite`;
      }
      module.exports = {
        backupDatabase,
        restoreFromBackup,
        jobBackupName,
        listLocalBackups: (limit) => host("backup.list").slice(0, limit),
        jobBackupPath: (name) => name,
        recoverLegacyJobSnapshot: () => null,
        getOffsiteReadiness: () => ({ code: "IPAD_EXPORT_REQUIRED", message: "\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E41\u0E25\u0E49\u0E27 \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01\u0E40\u0E01\u0E47\u0E1A\u0E19\u0E2D\u0E01 iPad" }),
        restoreFromDriveBackup: async () => ({ success: false, error: "\u0E23\u0E38\u0E48\u0E19\u0E19\u0E35\u0E49\u0E43\u0E2B\u0E49\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u0E44\u0E1F\u0E25\u0E4C\u0E1A\u0E19 iPad" })
      };
    }
  });

  // ../ipad/engine/integrations.cjs
  var require_integrations = __commonJS({
    "../ipad/engine/integrations.cjs"(exports, module) {
      var message = "\u0E01\u0E32\u0E23\u0E2A\u0E48\u0E07 Sheets, Drive \u0E41\u0E25\u0E30 Telegram \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E1B\u0E34\u0E14\u0E43\u0E0A\u0E49\u0E43\u0E19\u0E41\u0E2D\u0E1B iPad \u0E23\u0E38\u0E48\u0E19\u0E19\u0E35\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E2D\u0E1B\u0E44\u0E1F\u0E25\u0E4C";
      var unavailable = () => ({ success: false, code: "IPAD_INTEGRATION_UNAVAILABLE", message, error: message, permanent: true });
      module.exports = {
        sendTestNotification: async () => unavailable(),
        sendShiftCloseNotification: async () => unavailable(),
        getShiftNotificationReadiness: () => unavailable(),
        getGoogleSheetConfig: () => ({ webhookUrl: "", webhookSecret: "" }),
        sendToGoogleSheetWebhook: async () => unavailable(),
        testGoogleSheetConnection: async () => unavailable(),
        listDriveBackups: async () => unavailable(),
        sheetOrder: (order) => order,
        getGasTemplate: () => {
          throw Object.assign(new Error(message), { status: 501 });
        }
      };
    }
  });

  // ../server/services/shiftCloseQueue.js
  var require_shiftCloseQueue = __commonJS({
    "../server/services/shiftCloseQueue.js"(exports, module) {
      var fs = require_files();
      var { createHash } = require_crypto2();
      var { getDb } = require_db();
      var { badRequest, ApiError } = require_validators();
      var backupService = require_backups();
      var telegramService = require_integrations();
      var MAX_ATTEMPTS = 20;
      var running = false;
      var timer;
      var inFlight = /* @__PURE__ */ new Set();
      function destination(kind) {
        const keys = kind === "backup" ? ["google_sheet_webhook_url", "google_sheet_webhook_secret", "google_sheet_id", "gdrive_backup_enabled"] : ["telegram_bot_token", "telegram_chat_id", "telegram_notify_shift_close"];
        const values = getDb().prepare("SELECT key,value FROM settings WHERE key IN (" + keys.map(() => "?").join(",") + ") ORDER BY key").all(...keys);
        return createHash("sha256").update(JSON.stringify(values)).digest("hex");
      }
      function finish(db, job, status, code = "", message = "", target = "") {
        db.prepare(`UPDATE shift_close_jobs SET status=?,last_code=?,last_error=?,destination_hash=?,
    next_attempt_at=?,completed_at=? WHERE shift_id=? AND kind=? AND job_key=?`).run(
          status,
          code,
          String(message).slice(0, 1e3),
          target,
          Date.now() + Math.min(3e5, 5e3 * 2 ** Math.min(Math.max(0, job.attempts - 1), 6)),
          ["DONE", "SKIPPED", "FAILED"].includes(status) ? (/* @__PURE__ */ new Date()).toISOString() : null,
          job.shift_id,
          job.kind,
          job.job_key
        );
      }
      function fail(db, job, result, target) {
        const status = result.permanent || job.attempts >= MAX_ATTEMPTS ? "FAILED" : "PENDING";
        finish(db, job, status, result.code || "DELIVERY_ERROR", result.error || result.message || "\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08", target);
      }
      function beginAttempt(db, job) {
        if (job.attempts >= MAX_ATTEMPTS) {
          finish(db, job, "FAILED", "RETRY_EXHAUSTED", job.last_error || "\u0E25\u0E2D\u0E07\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E04\u0E23\u0E1A 20 \u0E04\u0E23\u0E31\u0E49\u0E07\u0E41\u0E25\u0E49\u0E27");
          return false;
        }
        job.attempts++;
        db.prepare("UPDATE shift_close_jobs SET attempts=? WHERE shift_id=? AND kind=?").run(job.attempts, job.shift_id, job.kind);
        return true;
      }
      async function runJob(db, job) {
        let attempted = false;
        if (job.kind === "backup") {
          if (!job.backup_file) {
            const legacy = backupService.recoverLegacyJobSnapshot(job);
            if (legacy?.error) {
              finish(db, job, "FAILED", "LEGACY_SNAPSHOT_MISSING", legacy.error);
              return;
            }
            if (legacy) {
              job.backup_file = legacy.fileName;
              job.local_completed_at = legacy.timestamp;
              db.prepare("UPDATE shift_close_jobs SET backup_file=?,local_completed_at=? WHERE shift_id=? AND kind=?").run(job.backup_file, job.local_completed_at, job.shift_id, job.kind);
            }
          }
          if (!job.backup_file) {
            job.backup_file = backupService.jobBackupName(job.job_key);
            db.prepare("UPDATE shift_close_jobs SET backup_file=? WHERE shift_id=? AND kind=?").run(job.backup_file, job.shift_id, job.kind);
          }
          if (!job.local_completed_at) {
            if (!beginAttempt(db, job)) return;
            attempted = true;
            const local = await backupService.backupDatabase("shift_" + job.shift_id, { offsite: false, snapshotKey: job.job_key });
            if (getDb() !== db) return;
            if (!local.success) {
              fail(db, job, local, "");
              return;
            }
            job.local_completed_at = local.timestamp || (/* @__PURE__ */ new Date()).toISOString();
            db.transaction(() => {
              db.prepare("UPDATE shift_close_jobs SET local_completed_at=? WHERE shift_id=? AND kind=?").run(job.local_completed_at, job.shift_id, job.kind);
              db.prepare("UPDATE shifts SET backup_completed=1 WHERE id=?").run(job.shift_id);
            })();
          }
        }
        const target = destination(job.kind);
        const readiness = job.kind === "backup" ? backupService.getOffsiteReadiness() : telegramService.getShiftNotificationReadiness();
        if (readiness.code !== "READY") {
          finish(db, job, readiness.code === "DISABLED" ? "SKIPPED" : "BLOCKED", readiness.code, readiness.message, target);
          return;
        }
        if (!attempted && !beginAttempt(db, job)) return;
        let result;
        if (job.kind === "backup") {
          let file;
          try {
            file = backupService.jobBackupPath(job.backup_file);
          } catch (e) {
            fail(db, job, { permanent: true, code: "SNAPSHOT_INVALID", error: e.message }, target);
            return;
          }
          if (!fs.existsSync(file)) {
            fail(db, job, { permanent: true, code: "SNAPSHOT_MISSING", error: "\u0E44\u0E1F\u0E25\u0E4C snapshot \u0E40\u0E14\u0E34\u0E21\u0E2B\u0E32\u0E22 \u0E44\u0E21\u0E48\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E33\u0E40\u0E19\u0E32\u0E43\u0E2B\u0E21\u0E48\u0E41\u0E17\u0E19\u0E42\u0E14\u0E22\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34" }, target);
            return;
          }
          const check = backupService.verifyBackupFile(file);
          if (!check.ok) {
            fail(db, job, { permanent: true, code: "SNAPSHOT_INVALID", error: check.error }, target);
            return;
          }
          result = await backupService.sendBackupOffsite(file, job.backup_file);
        } else {
          const shift = db.prepare("SELECT * FROM shifts WHERE id=?").get(job.shift_id);
          result = await telegramService.sendShiftCloseNotification(shift);
        }
        if (getDb() !== db) return;
        if (target !== destination(job.kind)) {
          fail(db, job, { code: "DESTINATION_CHANGED", error: "\u0E1B\u0E25\u0E32\u0E22\u0E17\u0E32\u0E07\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E2A\u0E48\u0E07 \u0E08\u0E30\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E14\u0E49\u0E27\u0E22\u0E04\u0E48\u0E32\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19" }, target);
          return;
        }
        if (result.success) {
          db.transaction(() => {
            finish(db, job, "DONE", "", "", target);
            if (job.kind === "telegram") db.prepare("UPDATE shifts SET synced_to_telegram=1 WHERE id=?").run(job.shift_id);
          })();
        } else if (["DISABLED", "NOT_CONFIGURED", "CONFIG_INVALID"].includes(result.code)) {
          finish(db, job, result.code === "DISABLED" ? "SKIPPED" : "BLOCKED", result.code, result.error || result.message, target);
        } else fail(db, job, result, target);
      }
      async function processCloseJobs() {
        if (running) return;
        running = true;
        try {
          const db = getDb();
          const targets = { backup: destination("backup"), telegram: destination("telegram") };
          for (const kind of ["backup", "telegram"]) db.prepare(`UPDATE shift_close_jobs SET status='PENDING',attempts=0,next_attempt_at=0
      WHERE status='BLOCKED' AND kind=? AND destination_hash<>?`).run(kind, targets[kind]);
          const rows = db.prepare("SELECT shift_id,kind FROM shift_close_jobs WHERE status='PENDING' AND next_attempt_at<=? ORDER BY shift_id,kind LIMIT 4").all(Date.now());
          for (const row of rows) {
            if (getDb() !== db) break;
            const job = db.prepare("SELECT * FROM shift_close_jobs WHERE shift_id=? AND kind=? AND status='PENDING'").get(row.shift_id, row.kind);
            if (!job) continue;
            const attemptsBefore = job.attempts;
            inFlight.add(job.job_key);
            try {
              await runJob(db, job);
            } catch (e) {
              if (getDb() === db) {
                if (job.attempts === attemptsBefore && !beginAttempt(db, job)) continue;
                fail(db, job, { error: e.message }, destination(job.kind));
              }
            } finally {
              inFlight.delete(job.job_key);
            }
          }
        } finally {
          running = false;
        }
      }
      function manageCloseJob(shiftId, kind, action, actor) {
        if (!["backup", "telegram"].includes(kind) || !["retry", "skip"].includes(action)) throw badRequest("\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E07\u0E32\u0E19\u0E2B\u0E25\u0E31\u0E07\u0E1B\u0E34\u0E14\u0E01\u0E30\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
        const db = getDb();
        const job = db.prepare("SELECT * FROM shift_close_jobs WHERE shift_id=? AND kind=?").get(shiftId, kind);
        if (!job) throw badRequest("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E07\u0E32\u0E19\u0E2B\u0E25\u0E31\u0E07\u0E1B\u0E34\u0E14\u0E01\u0E30");
        if (inFlight.has(job.job_key)) throw new ApiError("\u0E07\u0E32\u0E19\u0E19\u0E35\u0E49\u0E01\u0E33\u0E25\u0E31\u0E07\u0E17\u0E33\u0E2D\u0E22\u0E39\u0E48 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E2D\u0E43\u0E2B\u0E49\u0E08\u0E1A\u0E01\u0E48\u0E2D\u0E19", 409);
        if (action === "retry" && !["FAILED", "BLOCKED", "SKIPPED"].includes(job.status)) throw new ApiError("\u0E07\u0E32\u0E19\u0E19\u0E35\u0E49\u0E44\u0E21\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48", 409);
        if (action === "retry" && job.local_completed_at && !fs.existsSync(backupService.jobBackupPath(job.backup_file))) throw new ApiError("snapshot \u0E40\u0E14\u0E34\u0E21\u0E2B\u0E32\u0E22 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E25\u0E2D\u0E07\u0E2A\u0E48\u0E07\u0E43\u0E2B\u0E21\u0E48", 409);
        if (action === "skip" && (job.status === "DONE" || kind === "backup" && !job.local_completed_at)) throw new ApiError("\u0E02\u0E49\u0E32\u0E21\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E2A\u0E33\u0E40\u0E19\u0E32\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E48\u0E2D\u0E19 \u0E41\u0E25\u0E30\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27\u0E44\u0E21\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E49\u0E32\u0E21", 409);
        db.prepare(`UPDATE shift_close_jobs SET status=?,attempts=?,next_attempt_at=0,last_code=?,last_error=?,completed_at=?,managed_by=?,managed_at=?
    WHERE shift_id=? AND kind=?`).run(
          action === "retry" ? "PENDING" : "SKIPPED",
          action === "retry" ? 0 : job.attempts,
          action === "retry" ? "" : "OWNER_SKIPPED",
          action === "retry" ? "" : "\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E02\u0E49\u0E32\u0E21\u0E01\u0E32\u0E23\u0E2A\u0E48\u0E07\u0E07\u0E32\u0E19\u0E19\u0E35\u0E49",
          action === "retry" ? null : (/* @__PURE__ */ new Date()).toISOString(),
          actor,
          (/* @__PURE__ */ new Date()).toISOString(),
          shiftId,
          kind
        );
        return closeJobStatus(shiftId);
      }
      function startCloseJobWorker() {
        if (timer) return;
        timer = setInterval(() => processCloseJobs().catch((e) => console.error("[Close queue]", e.message)), 5e3);
        timer.unref();
      }
      function closeJobStatus(shiftId) {
        return getDb().prepare("SELECT kind,status,attempts,last_code,last_error,completed_at,local_completed_at,backup_file,managed_by,managed_at FROM shift_close_jobs WHERE shift_id=?").all(shiftId);
      }
      module.exports = { processCloseJobs, startCloseJobWorker, closeJobStatus, manageCloseJob, MAX_ATTEMPTS };
    }
  });

  // ../server/routes/users.js
  var require_users = __commonJS({
    "../server/routes/users.js"(exports, module) {
      var express = require_router();
      var router = express.Router();
      var { getDb } = require_db();
      var { badRequest, validateId } = require_validators();
      var {
        requireOwner,
        validatePinFormat,
        validateUserName,
        normalizeRole,
        listUsers,
        getUserById,
        getUserByName,
        countActiveOwners,
        createUser,
        setUserPin,
        pinCollidesWithOtherUser,
        revokeTokensForUser,
        credentialRoute,
        hashPinAsync,
        ROLE_LABELS
      } = require_auth();
      router.use(requireOwner);
      function publicUser(u) {
        if (!u) return null;
        return {
          id: u.id,
          name: u.name,
          role: u.role,
          roleLabel: ROLE_LABELS[u.role] || u.role,
          isActive: !!u.is_active,
          createdAt: u.created_at,
          updatedAt: u.updated_at,
          lastLoginAt: u.last_login_at
        };
      }
      router.get("/", (req, res, next) => {
        try {
          res.json(listUsers().map(publicUser));
        } catch (error) {
          next(error);
        }
      });
      router.post("/", credentialRoute(async (req, res, next) => {
        try {
          const { name, role, pin } = req.body || {};
          const nameProblem = validateUserName(name);
          if (nameProblem) throw badRequest(nameProblem);
          const cleanRole = normalizeRole(role);
          if (!cleanRole) throw badRequest("\u0E1A\u0E17\u0E1A\u0E32\u0E17\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19 OWNER \u0E2B\u0E23\u0E37\u0E2D MANAGER \u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19");
          const pinProblem = validatePinFormat(pin);
          if (pinProblem) throw badRequest(pinProblem);
          if (getUserByName(name)) {
            return res.status(409).json({ error: "\u0E21\u0E35\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E0A\u0E37\u0E48\u0E2D\u0E19\u0E35\u0E49\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27" });
          }
          if (await pinCollidesWithOtherUser(pin)) {
            return res.status(409).json({ error: "\u0E23\u0E2B\u0E31\u0E2A PIN \u0E19\u0E35\u0E49\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2D\u0E37\u0E48\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E43\u0E0A\u0E49\u0E23\u0E2B\u0E31\u0E2A\u0E2D\u0E37\u0E48\u0E19" });
          }
          const preparedHash = await hashPinAsync(pin);
          req.assertCredentialsCurrent();
          const user = createUser({ name, role: cleanRole, pin, preparedHash });
          console.log(`[Users] ${req.user.name} \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49 ${user.name} (${user.role})`);
          res.status(201).json(publicUser(user));
        } catch (error) {
          next(error);
        }
      }, { authenticated: true, owner: true }));
      router.put("/:id", credentialRoute(async (req, res, next) => {
        try {
          const id = validateId(req.params.id, "id");
          const target = getUserById(id);
          if (!target) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E23\u0E32\u0E22\u0E19\u0E35\u0E49" });
          const { name, role, isActive } = req.body || {};
          const db = getDb();
          const sets = [];
          const values = [];
          let roleOrStatusChanged = false;
          if (name !== void 0) {
            const problem = validateUserName(name);
            if (problem) throw badRequest(problem);
            const dup = getUserByName(name);
            if (dup && dup.id !== id) {
              return res.status(409).json({ error: "\u0E21\u0E35\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E0A\u0E37\u0E48\u0E2D\u0E19\u0E35\u0E49\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27" });
            }
            sets.push("name = ?");
            values.push(String(name).trim());
          }
          if (role !== void 0) {
            const cleanRole = normalizeRole(role);
            if (!cleanRole) throw badRequest("\u0E1A\u0E17\u0E1A\u0E32\u0E17\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19 OWNER \u0E2B\u0E23\u0E37\u0E2D MANAGER \u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19");
            if (cleanRole !== target.role) {
              if (id === req.user.id) {
                return res.status(400).json({ error: "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E1A\u0E17\u0E1A\u0E32\u0E17\u0E02\u0E2D\u0E07\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E43\u0E2B\u0E49\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E2D\u0E35\u0E01\u0E04\u0E19\u0E40\u0E1B\u0E47\u0E19\u0E1C\u0E39\u0E49\u0E41\u0E01\u0E49" });
              }
              if (target.role === "OWNER" && countActiveOwners(id) === 0) {
                return res.status(400).json({ error: "\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E04\u0E19\u0E40\u0E2A\u0E21\u0E2D" });
              }
              sets.push("role = ?");
              values.push(cleanRole);
              roleOrStatusChanged = true;
            }
          }
          if (isActive !== void 0) {
            const active = isActive === true || isActive === 1 || isActive === "1" || isActive === "true";
            if (!active) {
              if (id === req.user.id) {
                return res.status(400).json({ error: "\u0E1B\u0E34\u0E14\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E02\u0E2D\u0E07\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49" });
              }
              if (target.role === "OWNER" && countActiveOwners(id) === 0) {
                return res.status(400).json({ error: "\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E04\u0E19\u0E40\u0E2A\u0E21\u0E2D" });
              }
            }
            sets.push("is_active = ?");
            values.push(active ? 1 : 0);
            if (!active) roleOrStatusChanged = true;
          }
          if (sets.length === 0) throw badRequest("\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E08\u0E30\u0E41\u0E01\u0E49\u0E44\u0E02");
          sets.push("updated_at = ?");
          values.push((/* @__PURE__ */ new Date()).toISOString(), id);
          db.prepare(`UPDATE users SET ${sets.join(", ")} WHERE id = ?`).run(...values);
          if (roleOrStatusChanged) revokeTokensForUser(id);
          res.json(publicUser(getUserById(id)));
        } catch (error) {
          next(error);
        }
      }, { authenticated: true, owner: true }));
      router.post("/:id/reset-pin", credentialRoute(async (req, res, next) => {
        try {
          const id = validateId(req.params.id, "id");
          const target = getUserById(id);
          if (!target) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E23\u0E32\u0E22\u0E19\u0E35\u0E49" });
          const { pin } = req.body || {};
          const problem = validatePinFormat(pin);
          if (problem) throw badRequest(problem);
          if (await pinCollidesWithOtherUser(pin, id)) {
            return res.status(409).json({ error: "\u0E23\u0E2B\u0E31\u0E2A PIN \u0E19\u0E35\u0E49\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E01\u0E31\u0E1A\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2D\u0E37\u0E48\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E43\u0E0A\u0E49\u0E23\u0E2B\u0E31\u0E2A\u0E2D\u0E37\u0E48\u0E19" });
          }
          const preparedHash = await hashPinAsync(pin);
          req.assertCredentialsCurrent();
          setUserPin(id, pin, preparedHash);
          revokeTokensForUser(id);
          console.log(`[Users] ${req.user.name} \u0E15\u0E31\u0E49\u0E07\u0E23\u0E2B\u0E31\u0E2A PIN \u0E43\u0E2B\u0E21\u0E48\u0E43\u0E2B\u0E49 ${target.name}`);
          res.json({ success: true, message: `\u0E15\u0E31\u0E49\u0E07\u0E23\u0E2B\u0E31\u0E2A PIN \u0E43\u0E2B\u0E21\u0E48\u0E43\u0E2B\u0E49 ${target.name} \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22` });
        } catch (error) {
          next(error);
        }
      }, { authenticated: true, owner: true }));
      router.delete("/:id", credentialRoute(async (req, res, next) => {
        try {
          const id = validateId(req.params.id, "id");
          const target = getUserById(id);
          if (!target) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E23\u0E32\u0E22\u0E19\u0E35\u0E49" });
          if (id === req.user.id) {
            return res.status(400).json({ error: "\u0E25\u0E1A\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E02\u0E2D\u0E07\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49" });
          }
          if (target.role === "OWNER" && countActiveOwners(id) === 0) {
            return res.status(400).json({ error: "\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E04\u0E19\u0E40\u0E2A\u0E21\u0E2D" });
          }
          getDb().prepare(`DELETE FROM users WHERE id = ?`).run(id);
          revokeTokensForUser(id);
          console.log(`[Users] ${req.user.name} \u0E25\u0E1A\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49 ${target.name}`);
          res.json({ success: true, message: `\u0E25\u0E1A\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49 ${target.name} \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22` });
        } catch (error) {
          next(error);
        }
      }, { authenticated: true, owner: true }));
      module.exports = router;
    }
  });

  // ../server/middleware/textFields.js
  var require_textFields = __commonJS({
    "../server/middleware/textFields.js"(exports, module) {
      var { badRequest } = require_validators();
      var LABELS = { name: "\u0E0A\u0E37\u0E48\u0E2D", nickname: "\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19", phone: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", code: "\u0E23\u0E2B\u0E31\u0E2A\u0E1E\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19", notes: "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38", category: "\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48", color: "\u0E2A\u0E35", avatarColor: "\u0E2A\u0E35\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27", avatar_color: "\u0E2A\u0E35\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E15\u0E31\u0E27" };
      function textField(body, keys, { label = LABELS[keys[0]] || "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", max = 100, required = false, fallback = "", color = false } = {}) {
        const key = keys.find((k) => Object.hasOwn(body, k));
        if (!key) return null;
        const value = body[key];
        if (value !== null && typeof value !== "string") throw badRequest(`${label} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`);
        const text = (value || "").trim();
        if (required && !text) throw badRequest(`\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01${label}`);
        if (text.length > max) throw badRequest(`${label} \u0E22\u0E32\u0E27\u0E44\u0E14\u0E49\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 ${max} \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23`);
        if (color && text && !/^#[0-9a-f]{6}$/i.test(text)) throw badRequest(`${label} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E2A\u0E35 #RRGGBB`);
        return text || fallback;
      }
      module.exports = { textField };
    }
  });

  // ../server/routes/rooms.js
  var require_rooms = __commonJS({
    "../server/routes/rooms.js"(exports, module) {
      var { textField } = require_textFields();
      var express = require_router();
      var router = express.Router();
      var { requireOwner } = require_auth();
      var { getDb } = require_db();
      var {
        badRequest,
        ApiError,
        nz,
        validateRoomStatus,
        validateRoomNumber,
        validateId,
        validatePositiveNumber,
        VALID_ROOM_TYPES
      } = require_validators();
      var MAX_EXTEND_MINUTES = 240;
      function roomFields(body, db, id = null) {
        if (Object.hasOwn(body, "is_active") || Object.hasOwn(body, "isActive")) {
          throw badRequest("\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E2B\u0E49\u0E2D\u0E07\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E0A\u0E49\u0E1B\u0E38\u0E48\u0E21\u0E0B\u0E48\u0E2D\u0E19/\u0E40\u0E2D\u0E32\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32");
        }
        const value = (...keys) => {
          const key = keys.find((k) => Object.hasOwn(body, k));
          return key === void 0 ? void 0 : body[key];
        };
        const integer = (v, label, max = Number.MAX_SAFE_INTEGER) => {
          if (!["number", "string"].includes(typeof v) || !/^\d+$/.test(String(v)) || !Number.isSafeInteger(Number(v)) || Number(v) < 1 || Number(v) > max) {
            throw badRequest(`${label}\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E15\u0E47\u0E21\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 1-${max}`);
          }
          return Number(v);
        };
        const name = textField(body, ["name"], { label: "\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E49\u0E2D\u0E07", max: 100, required: true });
        if (id === null && !name) throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E49\u0E2D\u0E07");
        let roomType = value("room_type", "roomType");
        if (roomType === void 0 && id === null) roomType = "THAI";
        if (roomType !== void 0 && !VALID_ROOM_TYPES.includes(roomType)) throw badRequest("\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E2B\u0E49\u0E2D\u0E07\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19 \u0E19\u0E27\u0E14\u0E44\u0E17\u0E22 \u0E2D\u0E42\u0E23\u0E21\u0E32\u0E2A\u0E1B\u0E32 \u0E2B\u0E23\u0E37\u0E2D\u0E19\u0E27\u0E14\u0E40\u0E17\u0E49\u0E32");
        let capacity = value("capacity");
        if (capacity === void 0 && id === null) capacity = 1;
        if (capacity !== void 0) capacity = integer(capacity, "\u0E04\u0E27\u0E32\u0E21\u0E08\u0E38\u0E2B\u0E49\u0E2D\u0E07", 10);
        let roomNumber = value("room_number", "roomNumber");
        if (roomNumber !== void 0 || id === null) {
          roomNumber = integer(roomNumber, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E2B\u0E49\u0E2D\u0E07");
          validateRoomNumber(db, roomNumber, id);
        }
        return [name, nz(roomType), nz(capacity), nz(roomNumber), textField(body, ["notes"], { max: 500 })];
      }
      router.get("/", (req, res, next) => {
        try {
          const db = getDb();
          const includeInactive = req.query.includeInactive === "true";
          if (includeInactive && req.user?.role !== "OWNER") throw new ApiError("\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19\u0E17\u0E35\u0E48\u0E14\u0E39\u0E2B\u0E49\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E0B\u0E48\u0E2D\u0E19\u0E44\u0E27\u0E49\u0E44\u0E14\u0E49", 403);
          const rooms = db.prepare(`SELECT * FROM rooms ${includeInactive ? "" : "WHERE is_active = 1"} ORDER BY room_number ASC`).all();
          const now = /* @__PURE__ */ new Date();
          const getOrder = db.prepare(`SELECT * FROM orders WHERE id = ?`);
          const getItems = db.prepare(`SELECT * FROM order_items WHERE order_id = ?`);
          const enrichedRooms = rooms.map((room) => {
            let remainingMinutes = 0;
            let elapsedMinutes = 0;
            let totalDurationMinutes = 0;
            let percentComplete = 0;
            let isOverdue = false;
            let isNearEnd = false;
            if (room.status === "IN_USE" && room.service_start_time && room.service_end_time) {
              const start = new Date(room.service_start_time);
              const end = new Date(room.service_end_time);
              if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                totalDurationMinutes = Math.max(1, Math.round((end.getTime() - start.getTime()) / 6e4));
                elapsedMinutes = Math.max(0, Math.round((now.getTime() - start.getTime()) / 6e4));
                remainingMinutes = Math.round((end.getTime() - now.getTime()) / 6e4);
                if (remainingMinutes <= 0) {
                  isOverdue = true;
                  percentComplete = 100;
                } else {
                  percentComplete = Math.min(100, Math.max(0, Math.round(elapsedMinutes / totalDurationMinutes * 100)));
                  isNearEnd = remainingMinutes <= 15;
                }
              }
            }
            let activeOrder = null;
            if (room.current_order_id) {
              activeOrder = getOrder.get(room.current_order_id) || null;
              if (activeOrder) activeOrder.items = getItems.all(activeOrder.id);
            }
            return {
              ...room,
              remainingMinutes,
              elapsedMinutes,
              totalDurationMinutes,
              percentComplete,
              isOverdue,
              isNearEnd,
              activeOrder
            };
          });
          res.json(enrichedRooms);
        } catch (error) {
          next(error);
        }
      });
      router.post("/", requireOwner, (req, res, next) => {
        try {
          const db = getDb();
          const room = db.transaction(() => {
            const fields = roomFields(req.body || {}, db);
            const result = db.prepare(`INSERT INTO rooms (name,room_type,capacity,room_number,notes,status,is_active,current_order_id)
        VALUES (?,?,?,?,?,'AVAILABLE',1,NULL)`).run(...fields);
            return db.prepare("SELECT * FROM rooms WHERE id=?").get(result.lastInsertRowid);
          })();
          res.status(201).json(room);
        } catch (error) {
          next(error);
        }
      });
      router.delete("/:id", requireOwner, (req, res, next) => {
        try {
          const id = validateId(req.params.id, "room id");
          const db = getDb();
          const result = db.transaction(() => {
            const room = db.prepare("SELECT * FROM rooms WHERE id=?").get(id);
            if (!room) throw new ApiError("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E49\u0E2D\u0E07", 404);
            if (room.is_active !== 1) throw new ApiError("\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E16\u0E39\u0E01\u0E0B\u0E48\u0E2D\u0E19\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27", 409);
            const order = db.prepare("SELECT order_no FROM orders WHERE status='IN_SERVICE' AND (room_id=? OR id=?) LIMIT 1").get(id, room.current_order_id);
            if (room.status === "IN_USE" || order) throw new ApiError(`\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E22\u0E31\u0E07\u0E21\u0E35${order ? "\u0E1A\u0E34\u0E25 " + order.order_no : "\u0E07\u0E32\u0E19"}\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E39\u0E48 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E1A\u0E34\u0E25\u0E01\u0E48\u0E2D\u0E19`, 409);
            if (db.prepare("SELECT COUNT(*) AS n FROM rooms WHERE is_active=1").get().n <= 1) throw new ApiError("\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E2B\u0E49\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E2B\u0E49\u0E2D\u0E07", 409);
            db.prepare(`UPDATE rooms SET is_active=0,status='MAINTENANCE',current_order_id=NULL,
        service_start_time=NULL,service_end_time=NULL,current_therapist_names=NULL,current_service_names=NULL WHERE id=?`).run(id);
            return db.prepare("SELECT * FROM rooms WHERE id=?").get(id);
          })();
          res.json(result);
        } catch (error) {
          next(error);
        }
      });
      router.post("/:id/restore", requireOwner, (req, res, next) => {
        try {
          const id = validateId(req.params.id, "room id");
          const db = getDb();
          const result = db.transaction(() => {
            const room = db.prepare("SELECT * FROM rooms WHERE id=?").get(id);
            if (!room) throw new ApiError("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E49\u0E2D\u0E07", 404);
            if (room.is_active === 1) throw new ApiError("\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27", 409);
            try {
              validateRoomNumber(db, room.room_number, id);
            } catch (error) {
              if (error.status !== 400) throw error;
              throw new ApiError("\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E2B\u0E49\u0E2D\u0E07\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E41\u0E01\u0E49\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E2B\u0E49\u0E2D\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E2D\u0E32\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E43\u0E0A\u0E49", 409);
            }
            db.prepare("UPDATE rooms SET is_active=1,status='AVAILABLE' WHERE id=?").run(id);
            return db.prepare("SELECT * FROM rooms WHERE id=?").get(id);
          })();
          res.json(result);
        } catch (error) {
          next(error);
        }
      });
      router.put("/:id/status", (req, res, next) => {
        try {
          const id = validateId(req.params.id, "room id");
          const { status, notes } = req.body || {};
          const db = getDb();
          validateRoomStatus(status);
          const room = db.prepare(`SELECT * FROM rooms WHERE id = ?`).get(id);
          if (!room) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E49\u0E2D\u0E07" });
          if (room.is_active !== 1) throw badRequest("\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E16\u0E39\u0E01\u0E0B\u0E48\u0E2D\u0E19\u0E44\u0E27\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E43\u0E2B\u0E49\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E40\u0E2D\u0E32\u0E2B\u0E49\u0E2D\u0E07\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E43\u0E0A\u0E49\u0E01\u0E48\u0E2D\u0E19");
          if (room.current_order_id && status !== "IN_USE") {
            const order = db.prepare(`SELECT order_no, status FROM orders WHERE id = ?`).get(room.current_order_id);
            if (order && order.status === "IN_SERVICE") {
              throw badRequest(`${room.name} \u0E22\u0E31\u0E07\u0E21\u0E35\u0E1A\u0E34\u0E25 ${order.order_no} \u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E39\u0E48 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E1A\u0E34\u0E25\u0E01\u0E48\u0E2D\u0E19`);
            }
          }
          if (status === "IN_USE") {
            throw badRequest('\u0E2A\u0E16\u0E32\u0E19\u0E30 "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19" \u0E16\u0E39\u0E01\u0E15\u0E31\u0E49\u0E07\u0E42\u0E14\u0E22\u0E23\u0E30\u0E1A\u0E1A\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E40\u0E1B\u0E34\u0E14\u0E1A\u0E34\u0E25\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19');
          }
          if (status === "AVAILABLE" || status === "CLEANING") {
            db.prepare(`
        UPDATE rooms SET status = ?, current_order_id = NULL, service_start_time = NULL,
          service_end_time = NULL, current_therapist_names = NULL, current_service_names = NULL,
          notes = COALESCE(?, notes)
        WHERE id = ?
      `).run(status, nz(notes), id);
          } else {
            db.prepare(`UPDATE rooms SET status = ?, notes = COALESCE(?, notes) WHERE id = ?`).run(status, nz(notes), id);
          }
          res.json(db.prepare(`SELECT * FROM rooms WHERE id = ?`).get(id));
        } catch (error) {
          next(error);
        }
      });
      router.post("/:id/extend-time", (req, res, next) => {
        try {
          const id = validateId(req.params.id, "room id");
          const { extraMinutes } = req.body || {};
          const db = getDb();
          const minutes = extraMinutes === void 0 || extraMinutes === null || extraMinutes === "" ? 15 : Math.round(validatePositiveNumber(extraMinutes, "\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E15\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21"));
          if (minutes < 1 || minutes > MAX_EXTEND_MINUTES) {
            throw badRequest(`\u0E15\u0E48\u0E2D\u0E40\u0E27\u0E25\u0E32\u0E44\u0E14\u0E49\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E30 1-${MAX_EXTEND_MINUTES} \u0E19\u0E32\u0E17\u0E35`);
          }
          const room = db.prepare(`SELECT * FROM rooms WHERE id = ?`).get(id);
          if (!room || room.is_active !== 1 || !room.service_end_time || room.status !== "IN_USE") {
            throw badRequest("\u0E2B\u0E49\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19");
          }
          const currentEnd = new Date(room.service_end_time);
          const validCurrentTime = isNaN(currentEnd.getTime()) ? Date.now() : currentEnd.getTime();
          const newEnd = new Date(Math.max(Date.now(), validCurrentTime) + minutes * 6e4);
          db.transaction(() => {
            db.prepare(`UPDATE rooms SET service_end_time = ? WHERE id = ?`).run(newEnd.toISOString(), id);
            if (room.current_order_id) {
              const endTimeStr = new Intl.DateTimeFormat("en-GB", {
                timeZone: "Asia/Bangkok",
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23"
              }).format(newEnd);
              db.prepare(`UPDATE orders SET end_time = ?, duration_minutes = duration_minutes + ? WHERE id = ?`).run(endTimeStr, minutes, room.current_order_id);
            }
          })();
          res.json({ success: true, newEndTime: newEnd.toISOString(), addedMinutes: minutes });
        } catch (error) {
          next(error);
        }
      });
      router.put("/:id", requireOwner, (req, res, next) => {
        try {
          const id = validateId(req.params.id, "room id");
          const body = req.body || {};
          const db = getDb();
          if (!db.prepare(`SELECT id FROM rooms WHERE id = ?`).get(id)) {
            return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E49\u0E2D\u0E07" });
          }
          const fields = roomFields(body, db, id);
          db.prepare(`
      UPDATE rooms SET
        name = COALESCE(?, name),
        room_type = COALESCE(?, room_type),
        capacity = COALESCE(?, capacity),
        room_number = COALESCE(?, room_number),
        notes = COALESCE(?, notes)
      WHERE id = ?
    `).run(...fields, id);
          res.json(db.prepare(`SELECT * FROM rooms WHERE id = ?`).get(id));
        } catch (error) {
          next(error);
        }
      });
      module.exports = router;
    }
  });

  // ../server/reportAggregates.js
  var require_reportAggregates = __commonJS({
    "../server/reportAggregates.js"(exports, module) {
      function getPayableCommissions(db, businessDate) {
        return db.prepare(`
    SELECT t.id as therapist_id, t.code, t.name, t.nickname,
           COUNT(oi.id) as job_count,
           COALESCE(SUM(oi.commission_amount), 0) as unpaid_commission
    FROM therapists t
    JOIN order_items oi ON oi.therapist_id = t.id
    JOIN orders o ON o.id = oi.order_id
    WHERE o.business_date = ?
      AND o.status = 'COMPLETED'
      AND (oi.payout_status != 'PAID' OR oi.payout_status IS NULL)
    GROUP BY t.id
    HAVING unpaid_commission > 0
    ORDER BY unpaid_commission DESC
  `).all(businessDate);
      }
      var ORDER_AGG = `
  COUNT(*) as order_count,
  COALESCE(SUM(total_amount), 0)               as gross_sales,
  COALESCE(SUM(discount_amount), 0)            as total_discount,
  COALESCE(SUM(card_surcharge_amount), 0)      as total_surcharge,
  COALESCE(SUM(net_amount), 0)                 as net_sales,
  COALESCE(SUM(therapist_total_commission), 0) as total_commission,
  COALESCE(SUM(shop_net_revenue), 0)           as shop_net_revenue,
  COALESCE(SUM(CASE WHEN payment_method = 'CASH'        THEN net_amount ELSE 0 END), 0) as total_cash,
  COALESCE(SUM(CASE WHEN payment_method = 'PROMPTPAY'   THEN net_amount ELSE 0 END), 0) as total_promptpay,
  COALESCE(SUM(CASE WHEN payment_method = 'CREDIT_CARD' THEN net_amount ELSE 0 END), 0) as total_card
`;
      function getDailySummary(db, businessDate) {
        const sales = db.prepare(`
    SELECT ${ORDER_AGG} FROM orders WHERE business_date = ? AND status != 'CANCELLED'
  `).get(businessDate);
        const cancelled = db.prepare(`
    SELECT COUNT(*) as cancelled_count, COALESCE(SUM(net_amount), 0) as cancelled_amount
    FROM orders WHERE business_date = ? AND status = 'CANCELLED'
  `).get(businessDate);
        const shiftInfo = db.prepare(`
    SELECT COUNT(*) as shift_count,
           COALESCE(SUM(total_cash),0) as closed_cash_sales,
           COALESCE(SUM(total_cash_expense),0) as cash_expense_total,
           COALESCE(SUM(cash_start), 0)   as cash_start_total,
           COALESCE(SUM(cash_end), 0)     as cash_end_total,
           COALESCE(SUM(cash_diff), 0)    as cash_diff_total,
           COALESCE(SUM(total_cash_payout), 0) as cash_payout_total
    FROM shifts WHERE business_date = ? AND status = 'CLOSED'
  `).get(businessDate);
        const commission = db.prepare(`
    SELECT COUNT(DISTINCT oi.therapist_id) as therapist_count,
           COALESCE(SUM(oi.commission_amount), 0) as commission_total,
           COUNT(oi.id) as job_count
    FROM order_items oi JOIN orders o ON o.id = oi.order_id
    WHERE o.business_date = ? AND o.status != 'CANCELLED'
  `).get(businessDate);
        const paid = db.prepare(`
    SELECT COALESCE(SUM(total_commission), 0) as paid_total,
           COUNT(*) as voucher_count
    FROM commission_payouts WHERE business_date = ? AND status = 'PAID'
  `).get(businessDate);
        const topService = db.prepare(`
    SELECT oi.service_name, COUNT(*) as c
    FROM order_items oi JOIN orders o ON o.id = oi.order_id
    WHERE o.business_date = ? AND o.status != 'CANCELLED'
    GROUP BY oi.service_name ORDER BY c DESC, oi.service_name ASC LIMIT 1
  `).get(businessDate);
        const topTherapist = db.prepare(`
    SELECT oi.therapist_name, COALESCE(SUM(oi.commission_amount), 0) as amt
    FROM order_items oi JOIN orders o ON o.id = oi.order_id
    WHERE o.business_date = ? AND o.status != 'CANCELLED'
    GROUP BY oi.therapist_id ORDER BY amt DESC LIMIT 1
  `).get(businessDate);
        const orderCount = sales.order_count || 0;
        const expenses = db.prepare("SELECT COALESCE(SUM(amount),0) total FROM expenses WHERE expense_date=? AND status='ACTIVE'").get(businessDate).total;
        const openShifts = db.prepare("SELECT COUNT(*) n FROM shifts WHERE business_date=? AND status='OPEN'").get(businessDate).n;
        return {
          business_date: businessDate,
          ...sales,
          ...cancelled,
          ...shiftInfo,
          operating_expenses: expenses,
          net_profit: sales.shop_net_revenue - expenses,
          open_shift_count: openShifts,
          therapist_count: commission.therapist_count || 0,
          job_count: commission.job_count || 0,
          commission_paid: paid.paid_total || 0,
          commission_payable: getPayableCommissions(db, businessDate).reduce((sum, r) => sum + r.unpaid_commission, 0),
          commission_unpaid: Math.max(0, (commission.commission_total || 0) - (paid.paid_total || 0)),
          voucher_count: paid.voucher_count || 0,
          avg_per_bill: orderCount ? Math.round(sales.net_sales / orderCount * 100) / 100 : 0,
          top_service: topService?.service_name || "-",
          top_service_count: topService?.c || 0,
          top_therapist: topTherapist?.therapist_name || "-",
          top_therapist_commission: topTherapist?.amt || 0
        };
      }
      function getMonthlySummary(db, month) {
        const like = `${month}-%`;
        const sales = db.prepare(`
    SELECT ${ORDER_AGG},
           COUNT(DISTINCT business_date) as days_open
    FROM orders WHERE business_date LIKE ? AND status != 'CANCELLED'
  `).get(like);
        const cancelled = db.prepare(`
    SELECT COUNT(*) as cancelled_count, COALESCE(SUM(net_amount), 0) as cancelled_amount
    FROM orders WHERE business_date LIKE ? AND status = 'CANCELLED'
  `).get(like);
        const shiftInfo = db.prepare(`
    SELECT COUNT(*) as shift_count,
           COALESCE(SUM(cash_diff), 0) as cash_diff_total,
           COALESCE(SUM(total_cash_payout), 0) as cash_payout_total
    FROM shifts WHERE business_date LIKE ? AND status = 'CLOSED'
  `).get(like);
        const best = db.prepare(`
    SELECT business_date, COALESCE(SUM(net_amount), 0) as net
    FROM orders WHERE business_date LIKE ? AND status != 'CANCELLED'
    GROUP BY business_date ORDER BY net DESC LIMIT 1
  `).get(like);
        const topService = db.prepare(`
    SELECT oi.service_name, COUNT(*) as c
    FROM order_items oi JOIN orders o ON o.id = oi.order_id
    WHERE o.business_date LIKE ? AND o.status != 'CANCELLED'
    GROUP BY oi.service_name ORDER BY c DESC, oi.service_name ASC LIMIT 1
  `).get(like);
        const topTherapist = db.prepare(`
    SELECT oi.therapist_name, COALESCE(SUM(oi.commission_amount), 0) as amt
    FROM order_items oi JOIN orders o ON o.id = oi.order_id
    WHERE o.business_date LIKE ? AND o.status != 'CANCELLED'
    GROUP BY oi.therapist_id ORDER BY amt DESC LIMIT 1
  `).get(like);
        const orderCount = sales.order_count || 0;
        const daysOpen = sales.days_open || 0;
        const expenses = db.prepare("SELECT COALESCE(SUM(amount),0) total FROM expenses WHERE expense_date LIKE ? AND status='ACTIVE'").get(like).total;
        const commission = db.prepare(`
    SELECT COUNT(DISTINCT oi.therapist_id) AS therapist_count, COUNT(*) AS job_count,
           COALESCE(SUM(oi.commission_amount), 0) AS commission_total
    FROM order_items oi JOIN orders o ON o.id=oi.order_id
    WHERE o.business_date LIKE ? AND o.status != 'CANCELLED'
  `).get(like);
        const paid = db.prepare(`SELECT COALESCE(SUM(total_commission),0) AS paid_total,
    COUNT(*) AS voucher_count FROM commission_payouts WHERE business_date LIKE ? AND status='PAID'`).get(like);
        return {
          month,
          operating_expenses: expenses,
          net_profit: sales.shop_net_revenue - expenses,
          therapist_count: commission.therapist_count,
          job_count: commission.job_count,
          commission_paid: paid.paid_total,
          commission_unpaid: Math.max(0, commission.commission_total - paid.paid_total),
          voucher_count: paid.voucher_count,
          ...sales,
          ...cancelled,
          ...shiftInfo,
          avg_per_bill: orderCount ? Math.round(sales.net_sales / orderCount * 100) / 100 : 0,
          avg_per_day: daysOpen ? Math.round(sales.net_sales / daysOpen * 100) / 100 : 0,
          best_day: best?.business_date || "-",
          best_day_net: best?.net || 0,
          top_service: topService?.service_name || "-",
          top_service_count: topService?.c || 0,
          top_therapist: topTherapist?.therapist_name || "-",
          top_therapist_commission: topTherapist?.amt || 0
        };
      }
      var COMMISSION_SELECT = `
  SELECT t.id as therapist_id, MIN(oi.id) as identity_item_id,
         COALESCE(oi.therapist_code_snapshot,t.code) as code,
         COALESCE(oi.therapist_name_snapshot,oi.therapist_name) as name,
         COALESCE(oi.therapist_nickname_snapshot,'') as nickname,
         COUNT(oi.id) as job_count,
         COALESCE(SUM(oi.duration_minutes), 0) as total_minutes,
         COALESCE(SUM(oi.commission_amount), 0) as total_commission,
         COALESCE(SUM(CASE WHEN oi.payout_status = 'PAID' THEN oi.commission_amount ELSE 0 END), 0) as paid_commission
  FROM therapists t
  JOIN order_items oi ON oi.therapist_id = t.id
  JOIN orders o ON o.id = oi.order_id
  WHERE o.status != 'CANCELLED'
`;
      function getDailyCommissions(db, businessDate) {
        return db.prepare(
          `${COMMISSION_SELECT} AND o.business_date = ? GROUP BY t.id ORDER BY total_commission DESC`
        ).all(businessDate);
      }
      function getShiftCommissions(db, shiftId) {
        return db.prepare(
          `${COMMISSION_SELECT} AND o.shift_id = ? GROUP BY t.id ORDER BY total_commission DESC`
        ).all(shiftId);
      }
      function monthOf(businessDate) {
        return String(businessDate).slice(0, 7);
      }
      module.exports = { getPayableCommissions, getDailySummary, getMonthlySummary, getDailyCommissions, getShiftCommissions, monthOf };
    }
  });

  // ../server/shiftManager.js
  var require_shiftManager = __commonJS({
    "../server/shiftManager.js"(exports, module) {
      var { getDb } = require_db();
      var { badRequest, validateBusinessDate, validateShiftType, validateMoney } = require_validators();
      function getBangkokTime() {
        const now = /* @__PURE__ */ new Date();
        const parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Bangkok",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          // ตรึง h23 ไว้ ไม่พึ่ง hour12:false อย่างเดียว
          // ถ้า ICU ของเครื่องไหน resolve เป็น h24 เที่ยงคืนจะออกมาเป็น 24 แทน 00
          // แล้ว `bk.hours < 5` จะเป็นเท็จ วันทำการช่วง 00:00-00:59 จะเลื่อนไปข้างหน้าหนึ่งวัน
          hourCycle: "h23"
        }).formatToParts(now);
        const get = (type) => parts.find((p) => p.type === type)?.value;
        const year = get("year");
        const month = get("month");
        const day = get("day");
        const hour = get("hour");
        const min = get("minute");
        const sec = get("second");
        return {
          hours: parseInt(hour, 10),
          minutes: parseInt(min, 10),
          seconds: parseInt(sec, 10),
          dateString: `${year}-${month}-${day}`,
          timeString: `${hour}:${min}`,
          isoString: `${year}-${month}-${day}T${hour}:${min}:${sec}+07:00`,
          toDate: () => now
        };
      }
      function addDays(dateStr, delta) {
        const [y, m, d] = dateStr.split("-").map(Number);
        const dt = new Date(Date.UTC(y, m - 1, d));
        dt.setUTCDate(dt.getUTCDate() + delta);
        return dt.toISOString().slice(0, 10);
      }
      var DEFAULT_SHIFT_TIMES = { dayStart: "10:00", nightStart: "20:00", nightEnd: "05:00" };
      function parseHM(value) {
        const m = /^(\d{1,2}):(\d{2})$/.exec(String(value == null ? "" : value).trim());
        if (!m) return null;
        const h = Number(m[1]);
        const min = Number(m[2]);
        if (h > 23 || min > 59) return null;
        return h * 100 + min;
      }
      function formatHM(num) {
        const h = Math.floor(num / 100);
        const m = num % 100;
        return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
      }
      function getShiftTimes() {
        let raw = {};
        try {
          const rows = getDb().prepare(`
      SELECT key, value FROM settings
      WHERE key IN ('shift_day_start', 'shift_night_start', 'shift_night_end')
    `).all();
          for (const row of rows) raw[row.key] = row.value;
        } catch (error) {
          console.warn("[Shift] \u0E2D\u0E48\u0E32\u0E19\u0E40\u0E27\u0E25\u0E32\u0E01\u0E30\u0E08\u0E32\u0E01\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E43\u0E0A\u0E49\u0E04\u0E48\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E41\u0E17\u0E19:", error.message);
        }
        const dayStart = parseHM(raw.shift_day_start) ?? parseHM(DEFAULT_SHIFT_TIMES.dayStart);
        const nightStart = parseHM(raw.shift_night_start) ?? parseHM(DEFAULT_SHIFT_TIMES.nightStart);
        let nightEnd = parseHM(raw.shift_night_end) ?? parseHM(DEFAULT_SHIFT_TIMES.nightEnd);
        if (nightEnd === nightStart) nightEnd = parseHM(DEFAULT_SHIFT_TIMES.nightEnd);
        return {
          dayStart,
          nightStart,
          nightEnd,
          dayStartText: formatHM(dayStart),
          nightStartText: formatHM(nightStart),
          nightEndText: formatHM(nightEnd)
        };
      }
      function shiftLabel(shiftType, times = getShiftTimes()) {
        return shiftType === "NIGHT" ? `\u0E01\u0E30 2 (${times.nightStartText} - ${times.nightEndText})` : `\u0E01\u0E30 1 (${times.dayStartText} - ${times.nightStartText})`;
      }
      function getCalculatedBusinessDate() {
        const bk = getBangkokTime();
        return computeShiftFor(bk.hours * 100 + bk.minutes, bk.dateString, getShiftTimes());
      }
      function computeShiftFor(timeNum, dateString, times) {
        const crossesMidnight = times.nightEnd < times.nightStart;
        let shiftType;
        let businessDateStr;
        if (crossesMidnight) {
          shiftType = timeNum >= times.nightStart || timeNum < times.nightEnd ? "NIGHT" : "DAY";
          businessDateStr = timeNum < times.nightEnd ? addDays(dateString, -1) : dateString;
        } else {
          shiftType = timeNum >= times.nightStart && timeNum < times.nightEnd ? "NIGHT" : "DAY";
          businessDateStr = dateString;
        }
        return {
          businessDate: businessDateStr,
          shiftType,
          calculatedShiftName: shiftLabel(shiftType, times),
          shiftTimes: {
            dayStart: times.dayStartText,
            nightStart: times.nightStartText,
            nightEnd: times.nightEndText
          }
        };
      }
      var SHIFT_STATS_SQL = `
  SELECT
    COUNT(*) as order_count,
    COALESCE(SUM(total_amount), 0) as total_sales,
    COALESCE(SUM(net_amount), 0) as total_net_sales,
    COALESCE(SUM(discount_amount), 0) as total_discount,
    COALESCE(SUM(card_surcharge_amount), 0) as total_surcharge,
    COALESCE(SUM(CASE WHEN payment_method = 'CASH' THEN net_amount ELSE 0 END), 0) as total_cash,
    COALESCE(SUM(CASE WHEN payment_method = 'PROMPTPAY' THEN net_amount ELSE 0 END), 0) as total_promptpay,
    COALESCE(SUM(CASE WHEN payment_method = 'CREDIT_CARD' THEN net_amount ELSE 0 END), 0) as total_card,
    COALESCE(SUM(therapist_total_commission), 0) as total_commission,
    COALESCE(SUM(shop_net_revenue), 0) as net_shop_revenue
  FROM orders
  WHERE shift_id = ? AND status != 'CANCELLED'
`;
      function getShiftStats(db, shiftId) {
        return db.prepare(SHIFT_STATS_SQL).get(shiftId);
      }
      function getShiftCashPayout(db, shiftId) {
        const row = db.prepare(`
    SELECT COALESCE(SUM(total_commission), 0) as cash_payout
    FROM commission_payouts
    WHERE shift_id = ? AND status = 'PAID' AND payment_method = 'CASH'
  `).get(shiftId);
        return Number(row?.cash_payout) || 0;
      }
      function getShiftCashExpense(db, shiftId) {
        return db.prepare("SELECT COALESCE(SUM(amount),0) total FROM expenses WHERE drawer_shift_id=? AND status='ACTIVE' AND payment_source='DRAWER'").get(shiftId).total;
      }
      function getActiveShift() {
        const db = getDb();
        const openShiftRow = db.prepare(`SELECT * FROM shifts WHERE status = 'OPEN' ORDER BY id DESC LIMIT 1`).get();
        if (!openShiftRow) return null;
        const stats = getShiftStats(db, openShiftRow.id);
        const cashPayout = getShiftCashPayout(db, openShiftRow.id);
        const cashExpense = getShiftCashExpense(db, openShiftRow.id);
        return {
          ...openShiftRow,
          live_stats: { ...stats, total_cash_payout: cashPayout },
          cash_payout: cashPayout,
          cash_expense: cashExpense,
          expected_cash: (openShiftRow.cash_start || 0) + (stats.total_cash || 0) - cashPayout - cashExpense
        };
      }
      function getUnpaidCommissions(db, businessDate) {
        return require_reportAggregates().getPayableCommissions(db, businessDate);
      }
      var RECENT_CLOSE_WINDOW_MS = 12 * 60 * 60 * 1e3;
      function getRecentlyClosedShift() {
        const db = getDb();
        const last = db.prepare(`SELECT id, business_date, status, closed_at FROM shifts ORDER BY id DESC LIMIT 1`).get();
        if (!last || last.status !== "CLOSED" || !last.closed_at) return null;
        const closedAt = Date.parse(last.closed_at);
        if (!Number.isFinite(closedAt)) return null;
        const elapsed = Date.now() - closedAt;
        if (elapsed < 0 || elapsed > RECENT_CLOSE_WINDOW_MS) return null;
        return last;
      }
      function getOpenOrders(db, shiftId) {
        return db.prepare(`
    SELECT o.id, o.order_no, o.customer_name, COALESCE(o.room_name_snapshot,r.name) as room_name
    FROM orders o
    LEFT JOIN rooms r ON r.id = o.room_id
    WHERE o.shift_id = ? AND o.status = 'IN_SERVICE'
    ORDER BY o.id ASC
  `).all(shiftId);
      }
      function openShift({ businessDate, shiftType, cashStart = 0, openedBy = "Cashier" }) {
        const db = getDb();
        const date = validateBusinessDate(businessDate, "\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23");
        const today = getCalculatedBusinessDate().businessDate;
        if (date < addDays(today, -1) || date > addDays(today, 1)) {
          throw badRequest(
            `\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23 ${date} \u0E2B\u0E48\u0E32\u0E07\u0E08\u0E32\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E04\u0E33\u0E19\u0E27\u0E13\u0E44\u0E14\u0E49 (${today}) \u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B \u0E40\u0E1B\u0E34\u0E14\u0E01\u0E30\u0E44\u0E14\u0E49\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E0A\u0E48\u0E27\u0E07 ${addDays(today, -1)} \u0E16\u0E36\u0E07 ${addDays(today, 1)}`
          );
        }
        const type = validateShiftType(shiftType);
        const cash = validateMoney(cashStart, "\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E40\u0E1B\u0E34\u0E14\u0E01\u0E30", { max: 1e6 });
        const openTx = db.transaction(() => {
          const currentOpen = db.prepare(`SELECT id FROM shifts WHERE status = 'OPEN'`).get();
          if (currentOpen) {
            throw badRequest(`\u0E22\u0E31\u0E07\u0E21\u0E35\u0E01\u0E30\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E34\u0E14\u0E04\u0E49\u0E32\u0E07\u0E2D\u0E22\u0E39\u0E48 (\u0E01\u0E30 #${currentOpen.id}) \u0E01\u0E23\u0E38\u0E13\u0E32\u0E1B\u0E34\u0E14\u0E01\u0E30\u0E40\u0E14\u0E34\u0E21\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E1B\u0E34\u0E14\u0E01\u0E30\u0E43\u0E2B\u0E21\u0E48`);
          }
          const nowIso = (/* @__PURE__ */ new Date()).toISOString();
          const info = db.prepare(`
      INSERT INTO shifts (business_date, shift_type, status, opened_at, opened_by, cash_start)
      VALUES (?, ?, 'OPEN', ?, ?, ?)
    `).run(date, type, nowIso, String(openedBy).slice(0, 50), cash);
          const newShiftId = info.lastInsertRowid;
          const activeTherapists = db.prepare(
            `SELECT id, queue_order FROM therapists WHERE active_today = 1 AND is_active = 1`
          ).all();
          const insertAttendance = db.prepare(`
      INSERT OR REPLACE INTO therapist_attendances (
        shift_id, therapist_id, business_date, check_in_time, is_present, queue_order
      ) VALUES (?, ?, ?, ?, 1, ?)
    `);
          for (const t of activeTherapists) {
            insertAttendance.run(newShiftId, t.id, date, nowIso, t.queue_order);
          }
        });
        openTx();
        return getActiveShift();
      }
      function closeShift({
        shiftId,
        cashEnd,
        closedBy = "Cashier",
        notes = "",
        force = false,
        forceUnpaidCommission = false,
        unpaidReason = ""
      }) {
        const db = getDb();
        const cash = validateMoney(cashEnd, "\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E19\u0E31\u0E1A\u0E08\u0E23\u0E34\u0E07\u0E15\u0E2D\u0E19\u0E1B\u0E34\u0E14\u0E01\u0E30", { max: 1e7 });
        let forcedOrders = [];
        const closeTx = db.transaction(() => {
          const shift = db.prepare(`SELECT * FROM shifts WHERE id = ?`).get(shiftId);
          if (!shift) throw badRequest("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E23\u0E2D\u0E1A\u0E01\u0E30");
          if (shift.status === "CLOSED") throw badRequest("\u0E23\u0E2D\u0E1A\u0E01\u0E30\u0E19\u0E35\u0E49\u0E16\u0E39\u0E01\u0E1B\u0E34\u0E14\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27");
          const openOrders = getOpenOrders(db, shiftId);
          if (openOrders.length > 0 && !force) {
            const err = badRequest(
              `\u0E22\u0E31\u0E07\u0E21\u0E35\u0E1A\u0E34\u0E25\u0E17\u0E35\u0E48\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E39\u0E48 ${openOrders.length} \u0E1A\u0E34\u0E25 (${openOrders.map((o) => o.order_no).join(", ")}) \u0E01\u0E23\u0E38\u0E13\u0E32\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E01\u0E48\u0E2D\u0E19\u0E1B\u0E34\u0E14\u0E01\u0E30`
            );
            err.status = 409;
            err.openOrders = openOrders;
            err.code = "OPEN_ORDERS";
            throw err;
          }
          if (openOrders.length > 0) {
            const nowComplete = (/* @__PURE__ */ new Date()).toISOString();
            const markDone = db.prepare(
              `UPDATE orders SET status = 'COMPLETED', completed_at = ?,
         notes = COALESCE(notes || ' ', '') || '[\u0E1B\u0E34\u0E14\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E15\u0E2D\u0E19\u0E1B\u0E34\u0E14\u0E01\u0E30]' WHERE id = ? AND status = 'IN_SERVICE'`
            );
            const freeRoom = db.prepare(`
        UPDATE rooms SET status = 'AVAILABLE', current_order_id = NULL, service_start_time = NULL,
          service_end_time = NULL, current_therapist_names = NULL, current_service_names = NULL
        WHERE current_order_id = ?
      `);
            const freeTherapist = db.prepare(`
        UPDATE therapists SET status = CASE WHEN active_today = 1 THEN 'AVAILABLE' ELSE 'OFF' END
        WHERE id IN (SELECT therapist_id FROM order_items WHERE order_id = ?)
          AND status = 'IN_SERVICE'
      `);
            for (const o of openOrders) {
              markDone.run(nowComplete, o.id);
              freeRoom.run(o.id);
              freeTherapist.run(o.id);
            }
            forcedOrders = openOrders;
          }
          let unpaidNote = "";
          let unpaidAudit = { reason: "", total: 0, details: [] };
          if (shift.shift_type === "NIGHT") {
            const unpaid = getUnpaidCommissions(db, shift.business_date);
            if (unpaid.length > 0) {
              const total = unpaid.reduce((sum, r) => sum + Number(r.unpaid_commission || 0), 0);
              if (!forceUnpaidCommission) {
                const err = badRequest(
                  `\u0E22\u0E31\u0E07\u0E21\u0E35\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E04\u0E49\u0E32\u0E07\u0E08\u0E48\u0E32\u0E22\u0E02\u0E2D\u0E07\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23 ${shift.business_date} \u0E23\u0E27\u0E21 ${total.toLocaleString("th-TH")} \u0E1A\u0E32\u0E17 (${unpaid.length} \u0E04\u0E19: ${unpaid.map((r) => r.nickname || r.name).join(", ")}) \u0E01\u0E23\u0E38\u0E13\u0E32\u0E08\u0E48\u0E32\u0E22\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E01\u0E48\u0E2D\u0E19\u0E1B\u0E34\u0E14\u0E01\u0E30 2`
                );
                err.status = 409;
                err.code = "UNPAID_COMMISSION";
                err.unpaidTherapists = unpaid;
                err.unpaidTotal = total;
                throw err;
              }
              const reason = String(unpaidReason || "").trim();
              if (typeof unpaidReason !== "string" || reason.length < 3 || reason.length > 500) {
                throw badRequest(
                  "\u0E02\u0E49\u0E32\u0E21\u0E01\u0E32\u0E23\u0E08\u0E48\u0E32\u0E22\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E44\u0E14\u0E49 \u0E41\u0E15\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E23\u0E30\u0E1A\u0E38\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25 (3\u2013500 \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23) \u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E08\u0E30\u0E16\u0E39\u0E01\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E44\u0E27\u0E49\u0E43\u0E19\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38\u0E02\u0E2D\u0E07\u0E01\u0E30\u0E16\u0E32\u0E27\u0E23"
                );
              }
              unpaidAudit = { reason, total, details: unpaid };
              unpaidNote = `[\u0E1B\u0E34\u0E14\u0E01\u0E30\u0E17\u0E31\u0E49\u0E07\u0E17\u0E35\u0E48\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E04\u0E49\u0E32\u0E07\u0E08\u0E48\u0E32\u0E22 ${total} \u0E1A\u0E32\u0E17 (${unpaid.map((r) => `${r.nickname || r.name} ${r.unpaid_commission}`).join(", ")}) \u0E42\u0E14\u0E22 ${closedBy}: ${reason}]`;
              console.warn(`[Shift Close] ${closedBy} \u0E1B\u0E34\u0E14\u0E01\u0E30 #${shiftId} \u0E42\u0E14\u0E22\u0E02\u0E49\u0E32\u0E21\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E04\u0E49\u0E32\u0E07\u0E08\u0E48\u0E32\u0E22 ${total} \u0E1A\u0E32\u0E17 \u2014 ${reason}`);
            }
          }
          const stats = getShiftStats(db, shiftId);
          const cashPayout = getShiftCashPayout(db, shiftId);
          const cashStart = Number(shift.cash_start) || 0;
          const cashExpense = getShiftCashExpense(db, shiftId);
          const expectedCash = cashStart + (Number(stats.total_cash) || 0) - cashPayout - cashExpense;
          const cashDiff = cash - expectedCash;
          const nowIso = (/* @__PURE__ */ new Date()).toISOString();
          db.prepare(`
      UPDATE shifts SET
        status = 'CLOSED', closed_at = ?, closed_by = ?,
        cash_end = ?, cash_system_expected = ?, cash_diff = ?,
        total_sales = ?, total_net_sales = ?, total_discount = ?, total_surcharge = ?,
        total_cash = ?, total_promptpay = ?, total_card = ?, total_cash_payout = ?,
        total_commission = ?, net_shop_revenue = ?, order_count = ?, notes = ?
      WHERE id = ? AND status = 'OPEN'
    `).run(
            nowIso,
            String(closedBy).slice(0, 50),
            cash,
            expectedCash,
            cashDiff,
            stats.total_sales,
            stats.total_net_sales,
            stats.total_discount,
            stats.total_surcharge,
            stats.total_cash,
            stats.total_promptpay,
            stats.total_card,
            cashPayout,
            stats.total_commission,
            stats.net_shop_revenue,
            stats.order_count,
            [String(notes || ""), unpaidNote].filter(Boolean).join(" ").slice(0, 1e3),
            shiftId
          );
          db.prepare("UPDATE shifts SET unpaid_skip_reason=?, unpaid_skip_total=?, unpaid_skip_details=? WHERE id=?").run(unpaidAudit.reason, unpaidAudit.total, JSON.stringify(unpaidAudit.details), shiftId);
          db.prepare("UPDATE shifts SET total_cash_expense=? WHERE id=?").run(cashExpense, shiftId);
          const insertJob = db.prepare("INSERT INTO shift_close_jobs(shift_id,kind,job_key) VALUES (?,?,?)");
          for (const kind of ["backup", "telegram"]) insertJob.run(shiftId, kind, require_crypto2().randomUUID());
          db.prepare(`UPDATE therapists SET active_today = 0, status = 'OFF', queue_order = 999 WHERE active_today = 1`).run();
          db.prepare(`UPDATE therapists SET status = 'OFF', queue_order = 999 WHERE status = 'IN_SERVICE'`).run();
          db.prepare(`
      UPDATE therapist_attendances SET check_out_time = ?
      WHERE shift_id = ? AND (check_out_time IS NULL OR check_out_time = '')
    `).run(nowIso, shiftId);
        });
        closeTx();
        if (forcedOrders.length) console.warn(`[Shift Close] \u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${forcedOrders.length} \u0E1A\u0E34\u0E25\u0E43\u0E19\u0E01\u0E30 #${shiftId} \u0E2B\u0E25\u0E31\u0E07 commit`);
        const closed = db.prepare(`SELECT * FROM shifts WHERE id = ?`).get(shiftId);
        closed.forced_orders = forcedOrders;
        return closed;
      }
      function adjustShiftCash({ shiftId, cashEnd, adjustedBy = "Cashier", adjustedById = null, reason }) {
        const db = getDb();
        const cash = validateMoney(cashEnd, "\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E19\u0E31\u0E1A\u0E08\u0E23\u0E34\u0E07", { max: 1e7 });
        if (!reason || String(reason).trim().length < 3) {
          throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E17\u0E35\u0E48\u0E41\u0E01\u0E49\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14 (\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 3 \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23)");
        }
        const adjustTx = db.transaction(() => {
          const shift = db.prepare(`SELECT * FROM shifts WHERE id = ?`).get(shiftId);
          if (!shift) throw badRequest("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E23\u0E2D\u0E1A\u0E01\u0E30");
          if (shift.status !== "CLOSED") throw badRequest("\u0E41\u0E01\u0E49\u0E22\u0E2D\u0E14\u0E44\u0E14\u0E49\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E01\u0E30\u0E17\u0E35\u0E48\u0E1B\u0E34\u0E14\u0E41\u0E25\u0E49\u0E27\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19");
          const expected = Number(shift.cash_system_expected) || 0;
          const nowIso = (/* @__PURE__ */ new Date()).toISOString();
          db.prepare(`INSERT INTO shift_cash_adjustments
      (shift_id, cash_before, cash_after, adjusted_by_id, adjusted_by_name, adjusted_at, reason)
      VALUES (?, ?, ?, ?, ?, ?, ?)`).run(shiftId, shift.cash_end, cash, adjustedById, String(adjustedBy).slice(0, 50), nowIso, String(reason).trim().slice(0, 500));
          db.prepare(`
      UPDATE shifts SET
        cash_end_original = COALESCE(cash_end_original, cash_end),
        cash_end = ?,
        cash_diff = ?,
        cash_adjusted_at = ?,
        cash_adjusted_by = ?,
        cash_adjust_reason = ?
      WHERE id = ?
    `).run(cash, cash - expected, nowIso, String(adjustedBy).slice(0, 50), String(reason).slice(0, 500), shiftId);
        });
        adjustTx();
        return db.prepare(`SELECT * FROM shifts WHERE id = ?`).get(shiftId);
      }
      module.exports = {
        getShiftTimes,
        shiftLabel,
        computeShiftFor,
        parseHM,
        getBangkokTime,
        getRecentlyClosedShift,
        getUnpaidCommissions,
        getShiftCashPayout,
        getCalculatedBusinessDate,
        getActiveShift,
        getOpenOrders,
        getShiftStats,
        openShift,
        closeShift,
        adjustShiftCash,
        addDays
      };
    }
  });

  // ../server/routes/therapists.js
  var require_therapists = __commonJS({
    "../server/routes/therapists.js"(exports, module) {
      var { textField } = require_textFields();
      var express = require_router();
      var router = express.Router();
      var { getDb } = require_db();
      var { getCalculatedBusinessDate, getActiveShift } = require_shiftManager();
      var {
        badRequest,
        nz,
        pick,
        validateTherapistStatus,
        validateId,
        validateIdArray,
        validateNonNegativeNumber,
        validateBoolean
      } = require_validators();
      router.get("/", (req, res, next) => {
        try {
          const db = getDb();
          const businessDate = getActiveShift()?.business_date || getCalculatedBusinessDate().businessDate;
          const therapists = db.prepare(`
      SELECT
        t.*,
        COALESCE(stats.today_jobs, 0) as today_jobs,
        COALESCE(stats.today_commission, 0) as today_commission,
        current_service.service_name as current_service_name,
        current_service.room_name as current_room_name
      FROM therapists t
      LEFT JOIN (
        SELECT oi.therapist_id,
               COUNT(oi.id) as today_jobs,
               SUM(oi.commission_amount) as today_commission
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        WHERE o.business_date = ? AND o.status != 'CANCELLED'
        GROUP BY oi.therapist_id
      ) stats ON stats.therapist_id = t.id
      LEFT JOIN (
        SELECT oi.therapist_id,
               MAX(o.id) as latest_order_id,
               GROUP_CONCAT(oi.service_name, ', ') as service_name,
               MAX(r.name) as room_name
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        LEFT JOIN rooms r ON r.id = o.room_id
        WHERE o.status = 'IN_SERVICE'
        GROUP BY oi.therapist_id
      ) current_service ON current_service.therapist_id = t.id
      WHERE t.is_active = 1
      ORDER BY t.active_today DESC, t.queue_order ASC, t.id ASC
    `).all(businessDate);
          res.json(therapists);
        } catch (error) {
          next(error);
        }
      });
      router.post("/:id/toggle-attendance", (req, res, next) => {
        try {
          const id = validateId(req.params.id, "therapist id");
          const { activeToday } = req.body || {};
          const db = getDb();
          const current = db.prepare(`SELECT * FROM therapists WHERE id = ?`).get(id);
          if (!current || !current.is_active) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14" });
          const newActiveState = activeToday !== void 0 ? validateBoolean(activeToday, "activeToday") ? 1 : 0 : current.active_today ? 0 : 1;
          if (newActiveState === current.active_today) return res.json(current);
          if (newActiveState === 0 && current.status === "IN_SERVICE") {
            throw badRequest(`${current.nickname || current.name} \u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E39\u0E48 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E0B\u0E47\u0E19\u0E40\u0E2D\u0E32\u0E15\u0E4C`);
          }
          let newQueueOrder = 999;
          let newStatus = "OFF";
          if (newActiveState === 1) {
            const maxQueue = db.prepare(
              `SELECT COALESCE(MAX(queue_order), 0) as max_q FROM therapists WHERE active_today = 1 AND queue_order < 999`
            ).get();
            newQueueOrder = (maxQueue.max_q || 0) + 1;
            newStatus = "AVAILABLE";
          }
          db.transaction(() => {
            db.prepare(`UPDATE therapists SET active_today = ?, queue_order = ?, status = ? WHERE id = ?`).run(newActiveState, newQueueOrder, newStatus, id);
            const activeShift = db.prepare(
              `SELECT id, business_date FROM shifts WHERE status = 'OPEN' ORDER BY id DESC LIMIT 1`
            ).get();
            if (!activeShift) return;
            const nowIso = (/* @__PURE__ */ new Date()).toISOString();
            if (newActiveState === 1) {
              db.prepare(`
          INSERT OR REPLACE INTO therapist_attendances (
            shift_id, therapist_id, business_date, check_in_time, is_present, queue_order
          ) VALUES (?, ?, ?, ?, 1, ?)
        `).run(activeShift.id, id, activeShift.business_date, nowIso, newQueueOrder);
            } else {
              db.prepare(`
          UPDATE therapist_attendances SET check_out_time = ?
          WHERE shift_id = ? AND therapist_id = ?
        `).run(nowIso, activeShift.id, id);
            }
          })();
          res.json(db.prepare(`SELECT * FROM therapists WHERE id = ?`).get(id));
        } catch (error) {
          next(error);
        }
      });
      router.post("/bulk-attendance", (req, res, next) => {
        try {
          const { therapistIds, activeToday } = req.body || {};
          const db = getDb();
          const ids = [...new Set(validateIdArray(therapistIds, "\u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14"))];
          const isPresent = validateBoolean(activeToday, "activeToday") ? 1 : 0;
          const selected = db.prepare(`SELECT id, active_today FROM therapists
      WHERE id IN (${ids.map(() => "?").join(",")}) AND is_active = 1`).all(...ids);
          if (selected.length !== ids.length) throw badRequest("\u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14\u0E21\u0E35\u0E04\u0E19\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E23\u0E37\u0E2D\u0E1B\u0E34\u0E14\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27");
          const busyRows = db.prepare(`
      SELECT id, nickname, name FROM therapists
      WHERE id IN (${ids.map(() => "?").join(",")}) AND status = 'IN_SERVICE'
    `).all(...ids);
          const busyIds = new Set(busyRows.map((b) => b.id));
          const targetIds = ids.filter((id) => !busyIds.has(id));
          if (targetIds.length === 0) {
            throw badRequest(
              `\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E39\u0E48\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (${busyRows.map((b) => b.nickname || b.name).join(", ")}) \u0E01\u0E23\u0E38\u0E13\u0E32\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E01\u0E48\u0E2D\u0E19`
            );
          }
          const updated = [];
          db.transaction(() => {
            const maxQueue = db.prepare(
              `SELECT COALESCE(MAX(queue_order), 0) as max_q FROM therapists WHERE active_today = 1 AND queue_order < 999`
            ).get();
            let nextRank = (maxQueue.max_q || 0) + 1;
            const setActive = db.prepare(
              `UPDATE therapists SET active_today = 1, status = 'AVAILABLE', queue_order = ? WHERE id = ? AND is_active = 1`
            );
            const setInactive = db.prepare(
              `UPDATE therapists SET active_today = 0, status = 'OFF', queue_order = 999 WHERE id = ?`
            );
            const activeShift = db.prepare(
              `SELECT id, business_date FROM shifts WHERE status = 'OPEN' ORDER BY id DESC LIMIT 1`
            ).get();
            const nowIso = (/* @__PURE__ */ new Date()).toISOString();
            const insertAtt = db.prepare(`
        INSERT OR REPLACE INTO therapist_attendances (
          shift_id, therapist_id, business_date, check_in_time, is_present, queue_order
        ) VALUES (?, ?, ?, ?, 1, ?)
      `);
            const updateCheckout = db.prepare(
              `UPDATE therapist_attendances SET check_out_time = ? WHERE shift_id = ? AND therapist_id = ?`
            );
            for (const tid of targetIds) {
              if (selected.find((row) => row.id === tid).active_today === isPresent) continue;
              if (isPresent === 1) {
                const rank = nextRank++;
                setActive.run(rank, tid);
                if (activeShift) insertAtt.run(activeShift.id, tid, activeShift.business_date, nowIso, rank);
              } else {
                setInactive.run(tid);
                if (activeShift) updateCheckout.run(nowIso, activeShift.id, tid);
              }
              updated.push(tid);
            }
          })();
          res.json({
            success: true,
            count: updated.length,
            skippedBusy: busyRows.map((b) => ({ id: b.id, name: b.nickname || b.name })),
            message: busyRows.length ? `\u0E02\u0E49\u0E32\u0E21 ${busyRows.length} \u0E04\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E39\u0E48: ${busyRows.map((b) => b.nickname || b.name).join(", ")}` : void 0
          });
        } catch (error) {
          next(error);
        }
      });
      router.put("/:id/status", (req, res, next) => {
        try {
          const id = validateId(req.params.id, "therapist id");
          const { status } = req.body || {};
          const db = getDb();
          validateTherapistStatus(status);
          const current = db.prepare(`SELECT * FROM therapists WHERE id = ?`).get(id);
          if (!current) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14" });
          if (status === "IN_SERVICE") {
            throw badRequest('\u0E2A\u0E16\u0E32\u0E19\u0E30 "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23" \u0E16\u0E39\u0E01\u0E15\u0E31\u0E49\u0E07\u0E42\u0E14\u0E22\u0E23\u0E30\u0E1A\u0E1A\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E40\u0E1B\u0E34\u0E14\u0E1A\u0E34\u0E25\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19');
          }
          if (current.status === "IN_SERVICE") {
            throw badRequest(`${current.nickname || current.name} \u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E39\u0E48 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E2A\u0E16\u0E32\u0E19\u0E30`);
          }
          db.prepare(`UPDATE therapists SET status = ? WHERE id = ?`).run(status, id);
          res.json(db.prepare(`SELECT * FROM therapists WHERE id = ?`).get(id));
        } catch (error) {
          next(error);
        }
      });
      router.post("/", (req, res, next) => {
        try {
          const body = req.body || {};
          const db = getDb();
          const name = textField(body, ["name"], { required: true, max: 100 });
          const nickname = textField(body, ["nickname"], { required: true, max: 50 });
          if (typeof name !== "string" || !name.trim() || typeof nickname !== "string" || !nickname.trim()) {
            throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E0A\u0E37\u0E48\u0E2D\u0E41\u0E25\u0E30\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19");
          }
          const phone = textField(body, ["phone"], { max: 30 });
          const commissionRate = pick(body, "defaultCommissionRate", "default_commission_rate");
          const activeToday = body.activeToday ?? body.active_today;
          const avatarColor = textField(body, ["avatarColor", "avatar_color"], { color: true });
          let finalCode = textField(body, ["code"], { max: 30 });
          finalCode = finalCode ? String(finalCode).trim() : null;
          if (finalCode && db.prepare(`SELECT id FROM therapists WHERE code = ?`).get(finalCode)) {
            throw badRequest(`\u0E23\u0E2B\u0E31\u0E2A\u0E1E\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19 ${finalCode} \u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27`);
          }
          if (!finalCode) {
            const highest = db.prepare(
              `SELECT code FROM therapists WHERE code GLOB 'T[0-9]*' ORDER BY CAST(SUBSTR(code, 2) AS INTEGER) DESC LIMIT 1`
            ).get();
            let nextNum = 1;
            if (highest && highest.code) {
              const numPart = parseInt(highest.code.slice(1), 10);
              if (!isNaN(numPart)) nextNum = numPart + 1;
            }
            finalCode = `T${String(nextNum).padStart(3, "0")}`;
            while (db.prepare(`SELECT id FROM therapists WHERE code = ?`).get(finalCode)) {
              nextNum++;
              finalCode = `T${String(nextNum).padStart(3, "0")}`;
            }
          }
          const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#06b6d4", "#14b8a6", "#6366f1"];
          const color = avatarColor || colors[Math.floor(Math.random() * colors.length)];
          const isActive = activeToday === void 0 ? 0 : validateBoolean(activeToday, "activeToday") ? 1 : 0;
          const status = isActive ? "AVAILABLE" : "OFF";
          let queueOrder = 999;
          if (isActive) {
            const maxQueue = db.prepare(
              `SELECT COALESCE(MAX(queue_order), 0) as max_q FROM therapists WHERE active_today = 1 AND queue_order < 999`
            ).get();
            queueOrder = (maxQueue.max_q || 0) + 1;
          }
          const info = db.prepare(`
      INSERT INTO therapists (code, name, nickname, phone, avatar_color, default_commission_rate,
                              status, active_today, queue_order, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
            finalCode,
            String(name).trim(),
            String(nickname).trim(),
            nz(phone),
            color,
            commissionRate !== void 0 ? validateNonNegativeNumber(commissionRate, "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D") : 50,
            status,
            isActive,
            queueOrder,
            (/* @__PURE__ */ new Date()).toISOString()
          );
          res.status(201).json(db.prepare(`SELECT * FROM therapists WHERE id = ?`).get(info.lastInsertRowid));
        } catch (error) {
          next(error);
        }
      });
      router.put("/:id", (req, res, next) => {
        try {
          const id = validateId(req.params.id, "therapist id");
          const body = req.body || {};
          const db = getDb();
          const existing = db.prepare(`SELECT * FROM therapists WHERE id = ?`).get(id);
          if (!existing) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14" });
          const code = textField(body, ["code"], { required: true, max: 30 });
          if (code && code !== existing.code) {
            if (db.prepare(`SELECT id FROM therapists WHERE code = ? AND id != ?`).get(code, id)) {
              throw badRequest(`\u0E23\u0E2B\u0E31\u0E2A\u0E1E\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19 ${code} \u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27`);
            }
          }
          const rate = pick(body, "defaultCommissionRate", "default_commission_rate");
          db.prepare(`
      UPDATE therapists SET
        name = COALESCE(?, name),
        nickname = COALESCE(?, nickname),
        phone = COALESCE(?, phone),
        code = COALESCE(?, code),
        default_commission_rate = COALESCE(?, default_commission_rate),
        avatar_color = COALESCE(?, avatar_color)
      WHERE id = ?
    `).run(
            textField(body, ["name"], { label: "\u0E0A\u0E37\u0E48\u0E2D", required: true, max: 100 }),
            textField(body, ["nickname"], { label: "\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19", required: true, max: 50 }),
            textField(body, ["phone"], { label: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", max: 30 }),
            nz(code),
            rate !== void 0 ? validateNonNegativeNumber(rate, "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D") : null,
            textField(body, ["avatarColor", "avatar_color"], { color: true, fallback: "#10b981" }),
            id
          );
          res.json(db.prepare(`SELECT * FROM therapists WHERE id = ?`).get(id));
        } catch (error) {
          next(error);
        }
      });
      router.delete("/:id", (req, res, next) => {
        try {
          const id = validateId(req.params.id, "therapist id");
          const db = getDb();
          const therapist = db.prepare(`SELECT * FROM therapists WHERE id = ?`).get(id);
          if (!therapist) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14" });
          if (therapist.status === "IN_SERVICE") {
            throw badRequest(`${therapist.nickname || therapist.name} \u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E39\u0E48 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E01\u0E48\u0E2D\u0E19`);
          }
          const unpaid = db.prepare(`
      SELECT COUNT(*) as c FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      WHERE oi.therapist_id = ? AND o.status != 'CANCELLED'
        AND (oi.payout_status != 'PAID' OR oi.payout_status IS NULL)
    `).get(id);
          if (unpaid.c > 0) {
            throw badRequest(`${therapist.nickname || therapist.name} \u0E22\u0E31\u0E07\u0E21\u0E35\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E04\u0E49\u0E32\u0E07\u0E08\u0E48\u0E32\u0E22 ${unpaid.c} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E08\u0E48\u0E32\u0E22\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E01\u0E48\u0E2D\u0E19`);
          }
          db.prepare(`UPDATE therapists SET is_active = 0, active_today = 0, status = 'OFF', queue_order = 999 WHERE id = ?`).run(id);
          res.json({ success: true, message: `\u0E19\u0E33 ${therapist.nickname || therapist.name} \u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22 (\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E22\u0E31\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E04\u0E23\u0E1A)` });
        } catch (error) {
          next(error);
        }
      });
      module.exports = router;
    }
  });

  // ../server/routes/services.js
  var require_services = __commonJS({
    "../server/routes/services.js"(exports, module) {
      var { textField } = require_textFields();
      var express = require_router();
      var router = express.Router();
      var { requireOwner } = require_auth();
      var { getDb } = require_db();
      var {
        badRequest,
        nz,
        pick,
        validatePositiveNumber,
        validateNonNegativeNumber,
        validateMoney,
        validateId
      } = require_validators();
      function validateRequiredTherapists(value) {
        const num = Number(value);
        if (![1, 2].includes(num)) {
          throw badRequest("\u0E08\u0E33\u0E19\u0E27\u0E19\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E0A\u0E49\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19 1 \u0E2B\u0E23\u0E37\u0E2D 2 \u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19");
        }
        return num;
      }
      router.get("/", (req, res, next) => {
        try {
          const db = getDb();
          const includeInactive = req.query.includeInactive === "true";
          const sql = includeInactive ? `SELECT * FROM services ORDER BY display_order ASC, id ASC` : `SELECT * FROM services WHERE is_active = 1 ORDER BY display_order ASC, id ASC`;
          res.json(db.prepare(sql).all());
        } catch (error) {
          next(error);
        }
      });
      router.get("/categories", (req, res, next) => {
        try {
          const db = getDb();
          const categories = db.prepare(`
      SELECT sc.id, sc.name, sc.display_order,
             (SELECT COUNT(*) FROM services s WHERE s.category = sc.name AND s.is_active = 1) as service_count
      FROM service_categories sc
      ORDER BY sc.display_order ASC, sc.id ASC
    `).all();
          res.json(categories);
        } catch (error) {
          next(error);
        }
      });
      router.post("/categories", requireOwner, (req, res, next) => {
        try {
          const db = getDb();
          const rawName = pick(req.body, "name");
          if (!rawName || !String(rawName).trim()) {
            throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48");
          }
          const name = String(rawName).trim();
          const existing = db.prepare(`SELECT id FROM service_categories WHERE name = ?`).get(name);
          if (existing) {
            throw badRequest("\u0E21\u0E35\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48\u0E19\u0E35\u0E49\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A");
          }
          const lastOrder = db.prepare(`SELECT MAX(display_order) as max_ord FROM service_categories`).get();
          const displayOrder = (lastOrder?.max_ord || 0) + 1;
          const info = db.prepare(`
      INSERT INTO service_categories (name, display_order)
      VALUES (?, ?)
    `).run(name, displayOrder);
          const created = db.prepare(`SELECT * FROM service_categories WHERE id = ?`).get(info.lastInsertRowid);
          res.status(201).json(created);
        } catch (error) {
          next(error);
        }
      });
      router.put("/categories/:id", requireOwner, (req, res, next) => {
        try {
          const id = validateId(req.params.id, "category id");
          const rawName = pick(req.body, "name");
          if (!rawName || !String(rawName).trim()) {
            throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48");
          }
          const newName = String(rawName).trim();
          const db = getDb();
          const existing = db.prepare(`SELECT * FROM service_categories WHERE id = ?`).get(id);
          if (!existing) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48\u0E19\u0E35\u0E49" });
          const duplicate = db.prepare(`SELECT id FROM service_categories WHERE name = ? AND id != ?`).get(newName, id);
          if (duplicate) {
            throw badRequest("\u0E21\u0E35\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48\u0E0A\u0E37\u0E48\u0E2D\u0E19\u0E35\u0E49\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A");
          }
          const oldName = existing.name;
          db.transaction(() => {
            db.prepare(`UPDATE service_categories SET name = ? WHERE id = ?`).run(newName, id);
            db.prepare(`UPDATE services SET category = ? WHERE category = ?`).run(newName, oldName);
          })();
          res.json({ success: true, message: `\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48\u0E40\u0E1B\u0E47\u0E19 "${newName}" \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27`, id, name: newName });
        } catch (error) {
          next(error);
        }
      });
      router.delete("/categories/:id", requireOwner, (req, res, next) => {
        try {
          const id = validateId(req.params.id, "category id");
          const db = getDb();
          const targetCategory = pick(req.body, "targetCategory") || "\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B";
          const existing = db.prepare(`SELECT * FROM service_categories WHERE id = ?`).get(id);
          if (!existing) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48\u0E19\u0E35\u0E49" });
          const oldName = existing.name;
          db.transaction(() => {
            db.prepare(`DELETE FROM service_categories WHERE id = ?`).run(id);
            db.prepare(`UPDATE services SET category = ? WHERE category = ?`).run(targetCategory, oldName);
          })();
          res.json({ success: true, message: `\u0E25\u0E1A\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48 "${oldName}" \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27` });
        } catch (error) {
          next(error);
        }
      });
      router.post("/categories/clear-all", requireOwner, (req, res, next) => {
        try {
          const db = getDb();
          const targetCategory = pick(req.body, "targetCategory") || "\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B";
          db.transaction(() => {
            db.prepare(`DELETE FROM service_categories`).run();
            db.prepare(`UPDATE services SET category = ?`).run(targetCategory);
          })();
          res.json({ success: true, message: "\u0E25\u0E49\u0E32\u0E07\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27" });
        } catch (error) {
          next(error);
        }
      });
      router.post("/", requireOwner, (req, res, next) => {
        try {
          const body = req.body || {};
          const db = getDb();
          const name = pick(body, "name");
          if (typeof name !== "string" || !name.trim()) throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E0A\u0E37\u0E48\u0E2D\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23");
          const price = validateMoney(pick(body, "price"), "\u0E23\u0E32\u0E04\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23", { max: 1e5 });
          if (price <= 0) throw badRequest("\u0E23\u0E32\u0E04\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0");
          const commission = validateMoney(pick(body, "commission_amount", "commissionAmount") ?? 0, "\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E2B\u0E21\u0E2D", { max: 1e5 });
          if (commission > price) {
            throw badRequest(`\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E2B\u0E21\u0E2D (${commission}) \u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19\u0E23\u0E32\u0E04\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (${price})`);
          }
          const duration = Math.round(validatePositiveNumber(pick(body, "duration_minutes", "durationMinutes") ?? 60, "\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"));
          if (duration < 1 || duration > 600) throw badRequest("\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 1-600 \u0E19\u0E32\u0E17\u0E35");
          const required = validateRequiredTherapists(pick(body, "required_therapists", "requiredTherapists") ?? 1);
          const lastOrder = db.prepare(`SELECT MAX(display_order) as max_ord FROM services`).get();
          const displayOrder = (lastOrder.max_ord || 0) + 1;
          const info = db.prepare(`
      INSERT INTO services (category, name, duration_minutes, price, commission_amount,
                            required_therapists, color, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
            textField(body, ["category"], { fallback: "\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B" }) || "\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B",
            String(name).trim(),
            duration,
            price,
            commission,
            required,
            textField(body, ["color"], { color: true, fallback: "#0d9488" }) || "#0d9488",
            displayOrder
          );
          res.status(201).json(db.prepare(`SELECT * FROM services WHERE id = ?`).get(info.lastInsertRowid));
        } catch (error) {
          next(error);
        }
      });
      router.put("/:id", requireOwner, (req, res, next) => {
        try {
          const id = validateId(req.params.id, "service id");
          const body = req.body || {};
          const db = getDb();
          const existing = db.prepare(`SELECT * FROM services WHERE id = ?`).get(id);
          if (!existing) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23" });
          const rawPrice = pick(body, "price");
          const rawCommission = pick(body, "commission_amount", "commissionAmount");
          const rawDuration = pick(body, "duration_minutes", "durationMinutes");
          const rawRequired = pick(body, "required_therapists", "requiredTherapists");
          const price = rawPrice !== void 0 ? validateMoney(rawPrice, "\u0E23\u0E32\u0E04\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23", { max: 1e5 }) : null;
          if (price !== null && price <= 0) throw badRequest("\u0E23\u0E32\u0E04\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0");
          const commission = rawCommission !== void 0 ? validateMoney(rawCommission, "\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E2B\u0E21\u0E2D", { max: 1e5 }) : null;
          const finalPrice = price !== null ? price : Number(existing.price);
          const finalCommission = commission !== null ? commission : Number(existing.commission_amount);
          if (finalCommission > finalPrice) {
            throw badRequest(`\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E2B\u0E21\u0E2D (${finalCommission}) \u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19\u0E23\u0E32\u0E04\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (${finalPrice})`);
          }
          const duration = rawDuration !== void 0 ? Math.round(validatePositiveNumber(rawDuration, "\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23")) : null;
          if (duration !== null && (duration < 1 || duration > 600)) {
            throw badRequest("\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 1-600 \u0E19\u0E32\u0E17\u0E35");
          }
          if (body.name !== void 0 && (typeof body.name !== "string" || !body.name.trim())) {
            throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E0A\u0E37\u0E48\u0E2D\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23");
          }
          const required = rawRequired !== void 0 ? validateRequiredTherapists(rawRequired) : null;
          db.prepare(`
      UPDATE services SET
        category = COALESCE(?, category),
        name = COALESCE(?, name),
        duration_minutes = COALESCE(?, duration_minutes),
        price = COALESCE(?, price),
        commission_amount = COALESCE(?, commission_amount),
        required_therapists = COALESCE(?, required_therapists),
        color = COALESCE(?, color)
      WHERE id = ?
    `).run(
            textField(body, ["category"], { fallback: "\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B" }),
            textField(body, ["name"], { label: "\u0E0A\u0E37\u0E48\u0E2D", required: true, max: 100 }),
            duration,
            price,
            commission,
            required,
            textField(body, ["color"], { color: true, fallback: "#0d9488" }),
            id
          );
          res.json(db.prepare(`SELECT * FROM services WHERE id = ?`).get(id));
        } catch (error) {
          next(error);
        }
      });
      router.delete("/:id", requireOwner, (req, res, next) => {
        try {
          const id = validateId(req.params.id, "service id");
          const db = getDb();
          const service = db.prepare(`SELECT * FROM services WHERE id = ?`).get(id);
          if (!service) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23" });
          const inUse = db.prepare(`
      SELECT COUNT(*) as c FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      WHERE oi.service_id = ? AND o.status = 'IN_SERVICE'
    `).get(id);
          if (inUse.c > 0) {
            throw badRequest(`\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E19\u0E35\u0E49\u0E01\u0E33\u0E25\u0E31\u0E07\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48 ${inUse.c} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E01\u0E48\u0E2D\u0E19`);
          }
          db.prepare(`UPDATE services SET is_active = 0 WHERE id = ?`).run(id);
          res.json({ success: true, message: "\u0E1B\u0E34\u0E14\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22 (\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E02\u0E32\u0E22\u0E22\u0E31\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E04\u0E23\u0E1A)" });
        } catch (error) {
          next(error);
        }
      });
      module.exports = router;
    }
  });

  // ../server/middleware/dataScope.js
  var require_dataScope = __commonJS({
    "../server/middleware/dataScope.js"(exports, module) {
      var { getCalculatedBusinessDate, getActiveShift, getRecentlyClosedShift } = require_shiftManager();
      var { ApiError, validateId, badRequest, validateBusinessDate } = require_validators();
      function allowedBusinessDates(req) {
        const dates = /* @__PURE__ */ new Set();
        try {
          dates.add(getCalculatedBusinessDate().businessDate);
        } catch {
        }
        try {
          const active = getActiveShift();
          if (active && active.business_date) dates.add(active.business_date);
        } catch {
        }
        try {
          const justClosed = getRecentlyClosedShift();
          if (justClosed && justClosed.business_date) dates.add(justClosed.business_date);
        } catch {
        }
        return dates;
      }
      function isOwnerReq(req) {
        return req.user?.role === "OWNER";
      }
      function assertDateAllowed(req, businessDate) {
        if (isOwnerReq(req)) return businessDate;
        const allowed = allowedBusinessDates(req);
        if (!allowed.has(businessDate)) {
          const err = new ApiError("\u0E1C\u0E39\u0E49\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E23\u0E49\u0E32\u0E19\u0E14\u0E39\u0E22\u0E2D\u0E14\u0E41\u0E25\u0E30\u0E17\u0E33\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E44\u0E14\u0E49\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19", 403);
          err.code = "FORBIDDEN_DATE";
          throw err;
        }
        return businessDate;
      }
      function assertShiftAllowed(req, db, shiftId) {
        const id = validateId(shiftId, "shiftId");
        const shift = db.prepare("SELECT id, business_date FROM shifts WHERE id = ?").get(id);
        if (!shift) throw badRequest(`\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E23\u0E2D\u0E1A\u0E01\u0E30 #${id}`);
        assertDateAllowed(req, shift.business_date);
        return shift;
      }
      function assertDateRangeAllowed(req, from, to) {
        validateBusinessDate(from);
        validateBusinessDate(to);
        if (from > to) throw badRequest("\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14");
        if (isOwnerReq(req)) return;
        const cursor = /* @__PURE__ */ new Date(`${from}T00:00:00.000Z`);
        for (let date = from; date <= to; date = cursor.toISOString().slice(0, 10)) {
          assertDateAllowed(req, date);
          cursor.setUTCDate(cursor.getUTCDate() + 1);
        }
      }
      module.exports = { allowedBusinessDates, assertDateAllowed, assertShiftAllowed, assertDateRangeAllowed, isOwnerReq };
    }
  });

  // ../server/routes/shifts.js
  var require_shifts = __commonJS({
    "../server/routes/shifts.js"(exports, module) {
      var express = require_router();
      var router = express.Router();
      var { getDb } = require_db();
      var {
        getCalculatedBusinessDate,
        getActiveShift,
        getOpenOrders,
        openShift,
        closeShift,
        adjustShiftCash
      } = require_shiftManager();
      var { closeJobStatus, manageCloseJob } = require_shiftCloseQueue();
      var { badRequest, clampLimit, validateId, validateBusinessDate } = require_validators();
      var { getShiftCommissions } = require_reportAggregates();
      var { requireOwner, actorName, revokeTokensForUser } = require_auth();
      var { allowedBusinessDates, isOwnerReq, assertDateAllowed } = require_dataScope();
      router.get("/current", (req, res, next) => {
        try {
          const activeShift = getActiveShift();
          const recommendation = getCalculatedBusinessDate();
          const db = getDb();
          res.json({
            activeShift,
            recommendation,
            allowedBusinessDates: [...allowedBusinessDates(req)],
            isShiftOpen: !!activeShift,
            openOrders: activeShift ? getOpenOrders(db, activeShift.id) : []
          });
        } catch (error) {
          next(error);
        }
      });
      router.post("/open", (req, res, next) => {
        try {
          const { businessDate, shiftType, cashStart } = req.body || {};
          const recommendation = getCalculatedBusinessDate();
          const date = assertDateAllowed(req, validateBusinessDate(businessDate || recommendation.businessDate));
          const shift = openShift({
            businessDate: date,
            shiftType: shiftType || recommendation.shiftType,
            cashStart: cashStart ?? 0,
            openedBy: actorName(req)
          });
          res.json({ success: true, shift });
        } catch (error) {
          next(error);
        }
      });
      router.post("/close", async (req, res, next) => {
        try {
          const { shiftId, cashEnd, notes, force, forceUnpaidCommission, unpaidReason } = req.body || {};
          const db = getDb();
          if (!shiftId) throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38 shiftId");
          if (cashEnd === void 0 || cashEnd === null || cashEnd === "") {
            throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E17\u0E35\u0E48\u0E19\u0E31\u0E1A\u0E44\u0E14\u0E49\u0E08\u0E23\u0E34\u0E07\u0E15\u0E2D\u0E19\u0E1B\u0E34\u0E14\u0E01\u0E30");
          }
          const closedShift = closeShift({
            shiftId: validateId(shiftId, "shiftId"),
            cashEnd,
            closedBy: actorName(req),
            notes: notes || "",
            force: force === true,
            // ข้ามด่านค่ามือค้างจ่ายต้องส่งมาแบบตั้งใจเป็นธงของตัวเอง ไม่ใช้ธงเดียวกับ force
            // ไม่งั้นคนที่กดยืนยันเพื่อจบบิลค้าง จะข้ามด่านค่ามือไปด้วยโดยไม่รู้ตัว
            forceUnpaidCommission: forceUnpaidCommission === true,
            unpaidReason: unpaidReason || ""
          });
          const revoked = req.user?.id ? revokeTokensForUser(req.user.id) : 0;
          if (revoked > 0) {
            console.log(`[Shift Close] \u0E08\u0E1A\u0E40\u0E0B\u0E2A\u0E0A\u0E31\u0E19\u0E02\u0E2D\u0E07 ${actorName(req)} \u0E2B\u0E25\u0E31\u0E07\u0E1B\u0E34\u0E14\u0E01\u0E30 #${closedShift.id} (${revoked} \u0E40\u0E0B\u0E2A\u0E0A\u0E31\u0E19)`);
          }
          const therapistCommissions = getShiftCommissions(db, closedShift.id);
          const warnings = ["\u0E07\u0E32\u0E19\u0E2A\u0E48\u0E07\u0E0A\u0E35\u0E15 \u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19 \u0E41\u0E25\u0E30\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E04\u0E34\u0E27 \u0E15\u0E23\u0E27\u0E08\u0E1C\u0E25\u0E44\u0E14\u0E49\u0E43\u0E19\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E30\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A"];
          res.json({
            success: true,
            shift: db.prepare(`SELECT * FROM shifts WHERE id = ?`).get(closedShift.id),
            forcedOrders: closedShift.forced_orders || [],
            therapistCommissions,
            warnings,
            // บอกหน้าจอให้เด้งออกเอง ไม่ต้องรอ 401 จากคำขอถัดไป (ซึ่งอาจนานถึง 10 วิ)
            sessionEnded: revoked > 0,
            integrations: closeJobStatus(closedShift.id)
          });
        } catch (error) {
          if (error.code === "OPEN_ORDERS") {
            return res.status(409).json({ error: error.message, code: error.code, openOrders: error.openOrders });
          }
          if (error.code === "UNPAID_COMMISSION") {
            return res.status(409).json({
              error: error.message,
              code: error.code,
              unpaidTherapists: error.unpaidTherapists,
              unpaidTotal: error.unpaidTotal
            });
          }
          next(error);
        }
      });
      router.post("/adjust-cash", requireOwner, (req, res, next) => {
        try {
          const { shiftId, cashEnd, reason } = req.body || {};
          if (!shiftId) throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38 shiftId");
          if (cashEnd === void 0 || cashEnd === null || cashEnd === "") {
            throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E17\u0E35\u0E48\u0E19\u0E31\u0E1A\u0E44\u0E14\u0E49\u0E08\u0E23\u0E34\u0E07");
          }
          const shift = adjustShiftCash({
            shiftId: validateId(shiftId, "shiftId"),
            cashEnd,
            adjustedBy: actorName(req),
            adjustedById: req.user.id,
            reason
          });
          res.json({ success: true, shift, message: "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22 (\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E22\u0E2D\u0E14\u0E40\u0E14\u0E34\u0E21\u0E44\u0E27\u0E49\u0E41\u0E25\u0E49\u0E27)" });
        } catch (error) {
          next(error);
        }
      });
      router.post("/:id/jobs/:kind/:action", requireOwner, (req, res, next) => {
        try {
          const integrations = manageCloseJob(validateId(req.params.id, "shiftId"), req.params.kind, req.params.action, actorName(req));
          res.json({ success: true, integrations });
        } catch (e) {
          next(e);
        }
      });
      var withJobs = (shift) => ({
        ...shift,
        integration_jobs: closeJobStatus(shift.id),
        cash_adjustments: getDb().prepare("SELECT * FROM shift_cash_adjustments WHERE shift_id = ? ORDER BY id").all(shift.id)
      });
      router.get("/history", (req, res, next) => {
        try {
          const db = getDb();
          const limit = clampLimit(req.query.limit, 365, 30);
          if (isOwnerReq(req)) {
            return res.json(db.prepare(`SELECT * FROM shifts ORDER BY id DESC LIMIT ?`).all(limit).map(withJobs));
          }
          const dates = [...allowedBusinessDates(req)];
          if (dates.length === 0) return res.json([]);
          const placeholders = dates.map(() => "?").join(",");
          res.json(db.prepare(
            `SELECT * FROM shifts WHERE business_date IN (${placeholders}) ORDER BY id DESC LIMIT ?`
          ).all(...dates, limit).map(withJobs));
        } catch (error) {
          next(error);
        }
      });
      module.exports = router;
    }
  });

  // ../server/routes/orders.js
  var require_orders = __commonJS({
    "../server/routes/orders.js"(exports, module) {
      var express = require_router();
      var router = express.Router();
      var { actorName } = require_auth();
      var { getDb } = require_db();
      var { getActiveShift, getBangkokTime } = require_shiftManager();
      var {
        badRequest,
        ApiError,
        validatePaymentMethod,
        validateRoomStatus,
        clampLimit,
        validateMoney,
        validateId,
        validateBusinessDate,
        validateNonNegativeNumber
      } = require_validators();
      var { assertDateAllowed, assertShiftAllowed, allowedBusinessDates, isOwnerReq } = require_dataScope();
      var MAX_SURCHARGE_PERCENT = 20;
      function releaseTherapists(db, orderId) {
        const therapistIds = db.prepare(
          `SELECT DISTINCT therapist_id FROM order_items WHERE order_id = ?`
        ).all(orderId);
        const stillBusy = db.prepare(`
    SELECT 1 FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    WHERE oi.therapist_id = ? AND o.status = 'IN_SERVICE' AND o.id != ?
    LIMIT 1
  `);
        const maxQueue = db.prepare(
          `SELECT COALESCE(MAX(queue_order), 0) as max_q FROM therapists WHERE active_today = 1 AND queue_order < 999`
        ).get();
        let nextQueueRank = (maxQueue.max_q || 0) + 1;
        for (const row of therapistIds) {
          if (stillBusy.get(row.therapist_id, orderId)) continue;
          const therapist = db.prepare(`SELECT active_today FROM therapists WHERE id = ?`).get(row.therapist_id);
          if (therapist && therapist.active_today === 1) {
            db.prepare(`UPDATE therapists SET status = 'AVAILABLE', queue_order = ? WHERE id = ?`).run(nextQueueRank++, row.therapist_id);
          } else {
            db.prepare(`UPDATE therapists SET status = 'OFF', queue_order = 999 WHERE id = ?`).run(row.therapist_id);
          }
        }
      }
      function releaseRoom(db, roomId, orderId, nextStatus) {
        if (!roomId) return;
        const room = db.prepare(`SELECT current_order_id FROM rooms WHERE id = ?`).get(roomId);
        if (!room) return;
        if (room.current_order_id !== null && Number(room.current_order_id) !== Number(orderId)) return;
        db.prepare(`
    UPDATE rooms SET
      status = ?,
      current_order_id = NULL,
      service_start_time = NULL,
      service_end_time = NULL,
      current_therapist_names = NULL,
      current_service_names = NULL
    WHERE id = ?
  `).run(nextStatus, roomId);
      }
      router.get("/", (req, res, next) => {
        try {
          const db = getDb();
          const { status, shift_id, business_date, room_id, limit: rawLimit, page: rawPage, search = "" } = req.query;
          const limit = clampLimit(rawLimit, 200, 50);
          const page = rawPage === void 0 ? null : validateId(rawPage, "page");
          if (page > 1e6) throw badRequest("page \u0E21\u0E32\u0E01\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B");
          if (typeof search !== "string" || search.length > 120) throw badRequest("\u0E04\u0E33\u0E04\u0E49\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 120 \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23");
          let query = `
      SELECT o.*, COALESCE(o.room_name_snapshot, r.name) as room_name,
        COALESCE(o.room_number_snapshot, r.room_number) as room_number,
        s.status as shift_status,
        EXISTS(SELECT 1 FROM order_items paid WHERE paid.order_id=o.id AND paid.payout_status='PAID') as has_paid_payout
      FROM orders o
      LEFT JOIN rooms r ON r.id = o.room_id
      LEFT JOIN shifts s ON s.id = o.shift_id
      WHERE 1=1
    `;
          const params = [];
          if (status !== void 0 && (typeof status !== "string" || !["ALL", "IN_SERVICE", "COMPLETED", "CANCELLED"].includes(status))) throw badRequest("status \u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
          if (status && status !== "ALL") {
            query += ` AND o.status = ?`;
            params.push(status);
          }
          if (shift_id) {
            query += ` AND o.shift_id = ?`;
            params.push(assertShiftAllowed(req, db, shift_id).id);
          }
          if (business_date) {
            query += ` AND o.business_date = ?`;
            params.push(assertDateAllowed(req, validateBusinessDate(business_date, "\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23")));
          }
          if (!isOwnerReq(req)) {
            const dates = [...allowedBusinessDates(req)];
            query += ` AND o.business_date IN (${dates.map(() => "?").join(",")})`;
            params.push(...dates);
          }
          if (room_id) {
            query += ` AND o.room_id = ?`;
            params.push(validateId(room_id, "room_id"));
          }
          if (search.trim()) {
            query += ` AND (instr(lower(o.order_no), ?) > 0 OR instr(lower(COALESCE(o.customer_name,'')), ?) > 0
        OR instr(lower(COALESCE(o.customer_country,'')), ?) > 0
        OR instr(lower(COALESCE(o.room_name_snapshot,r.name,'')), ?) > 0)`;
            params.push(...Array(4).fill(search.trim().toLowerCase()));
          }
          const total = page === null ? null : db.prepare(`SELECT COUNT(*) as total FROM (${query})`).get(...params).total;
          query += ` ORDER BY o.id DESC LIMIT ?`;
          params.push(limit);
          if (page !== null) {
            query += " OFFSET ?";
            params.push((page - 1) * limit);
          }
          const orders = db.prepare(query).all(...params);
          const getItems = db.prepare(`
      SELECT oi.*, COALESCE(oi.therapist_nickname_snapshot,'') as therapist_nickname,
        COALESCE(oi.therapist_code_snapshot,'ID-' || oi.therapist_id) as therapist_code
      FROM order_items oi
      LEFT JOIN therapists t ON t.id = oi.therapist_id
      WHERE oi.order_id = ?
    `);
          const rows = orders.map((order) => ({
            ...order,
            items: getItems.all(order.id),
            can_cancel: ["IN_SERVICE", "COMPLETED"].includes(order.status) && (!order.shift_id || order.shift_status === "OPEN") && !order.has_paid_payout
          }));
          res.json(page === null ? rows : { orders: rows, total, page, pageSize: limit });
        } catch (error) {
          next(error);
        }
      });
      router.post("/", (req, res, next) => {
        try {
          const {
            roomId,
            customerName,
            customerPhone,
            customerCountry,
            customerGender,
            items = [],
            paymentMethod = "CASH",
            paymentDetails,
            amountReceived,
            discountAmount = 0,
            discountReason = "",
            cardSurchargePercent = 0,
            cardSurchargeAmount,
            notes,
            clientRequestId,
            expectedNetAmount
          } = req.body || {};
          const db = getDb();
          validatePaymentMethod(paymentMethod);
          if (clientRequestId) {
            if (typeof clientRequestId !== "string" || clientRequestId.length > 100) {
              throw badRequest("clientRequestId \u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
            }
            const existing = db.prepare(`SELECT * FROM orders WHERE client_request_id = ?`).get(clientRequestId);
            if (existing) {
              assertDateAllowed(req, existing.business_date);
              existing.items = db.prepare(`SELECT * FROM order_items WHERE order_id = ?`).all(existing.id);
              existing.room_name = existing.room_name_snapshot;
              existing.room_number = existing.room_number_snapshot;
              const requestItems = Array.isArray(items) ? items.flatMap((item) => {
                if (!item || typeof item !== "object" || Array.isArray(item)) return [];
                const ids = [item.therapistId];
                if (item.therapist2Id !== void 0 && item.therapist2Id !== null && item.therapist2Id !== "") ids.push(item.therapist2Id);
                return ids.map((tid) => [Number(item.serviceId), Number(tid), item.isRequested ? 1 : 0]);
              }) : [];
              const savedItems = existing.items.map((item) => [item.service_id, item.therapist_id, item.is_requested]);
              const requestedPercent = paymentMethod === "CREDIT_CARD" ? validateNonNegativeNumber(cardSurchargePercent, "\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21\u0E1A\u0E31\u0E15\u0E23") : 0;
              const requestedSurcharge = paymentMethod === "CREDIT_CARD" && cardSurchargeAmount != null && cardSurchargeAmount !== "" ? validateMoney(cardSurchargeAmount, "\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21\u0E1A\u0E31\u0E15\u0E23") : 0;
              const expectedSurcharge = requestedSurcharge > 0 ? requestedSurcharge : Math.round((existing.total_amount - existing.discount_amount) * requestedPercent / 100);
              const savedNotes = existing.status === "COMPLETED" ? existing.notes?.replace(/\s?\[จบบริการโดย [\s\S]*\]$/, "") || null : existing.notes;
              const changed = JSON.stringify(requestItems) !== JSON.stringify(savedItems) || Number(existing.room_id || 0) !== Number(roomId || 0) || existing.discount_amount !== validateMoney(discountAmount ?? 0, "\u0E2A\u0E48\u0E27\u0E19\u0E25\u0E14") || (existing.discount_reason || "") !== (Number(discountAmount) > 0 ? String(discountReason || "").trim() : "") || existing.payment_method !== paymentMethod || existing.card_surcharge_percent !== requestedPercent || existing.card_surcharge_amount !== expectedSurcharge || existing.customer_name !== String(customerName || "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E23\u0E49\u0E32\u0E19 (Walk-in)").slice(0, 120) || existing.customer_phone !== (customerPhone ? String(customerPhone).slice(0, 30) : null) || existing.customer_country !== String(customerCountry || "\u0E44\u0E17\u0E22").slice(0, 60) || existing.customer_gender !== (customerGender ? String(customerGender).slice(0, 20) : null) || savedNotes !== (notes ? String(notes).slice(0, 1e3) : null) || existing.payment_details !== (paymentDetails ? JSON.stringify(paymentDetails).slice(0, 2e3) : null) || amountReceived !== void 0 && amountReceived !== null && amountReceived !== "" && existing.amount_received !== validateMoney(amountReceived, "\u0E40\u0E07\u0E34\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E21\u0E32");
              if (changed) {
                return res.status(409).json({
                  error: `\u0E1A\u0E34\u0E25 ${existing.order_no} \u0E16\u0E39\u0E01\u0E40\u0E1B\u0E34\u0E14\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27\u0E14\u0E49\u0E27\u0E22\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E0A\u0E38\u0E14\u0E40\u0E14\u0E34\u0E21 \u0E16\u0E49\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E41\u0E01\u0E49 \u0E43\u0E2B\u0E49\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E1A\u0E34\u0E25\u0E19\u0E31\u0E49\u0E19\u0E41\u0E25\u0E49\u0E27\u0E40\u0E1B\u0E34\u0E14\u0E43\u0E2B\u0E21\u0E48`,
                  code: "DUPLICATE_CHANGED",
                  order: existing
                });
              }
              return res.status(200).json({
                success: true,
                order: existing,
                duplicate: true,
                message: "\u0E1A\u0E34\u0E25\u0E19\u0E35\u0E49\u0E16\u0E39\u0E01\u0E40\u0E1B\u0E34\u0E14\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27 (\u0E01\u0E31\u0E19\u0E01\u0E32\u0E23\u0E01\u0E14\u0E0B\u0E49\u0E33)"
              });
            }
          }
          const createdOrder = db.transaction(() => {
            const activeShift = getActiveShift();
            if (!activeShift) {
              throw badRequest("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E01\u0E30\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E34\u0E14\u0E2D\u0E22\u0E39\u0E48 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E1B\u0E34\u0E14\u0E01\u0E30\u0E01\u0E48\u0E2D\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E34\u0E14\u0E1A\u0E34\u0E25");
            }
            const businessDate = activeShift.business_date;
            if (!Array.isArray(items) || items.length === 0) {
              throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23");
            }
            if (items.length > 20) {
              throw badRequest("\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D\u0E1A\u0E34\u0E25\u0E21\u0E32\u0E01\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B (\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 20 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23)");
            }
            let targetRoom = null;
            if (roomId !== void 0 && roomId !== null && roomId !== "") {
              const rid = validateId(roomId, "roomId");
              targetRoom = db.prepare(`SELECT * FROM rooms WHERE id = ?`).get(rid);
              if (!targetRoom) throw badRequest(`\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E49\u0E2D\u0E07 ID: ${rid}`);
              if (targetRoom.is_active !== 1) throw badRequest(`${targetRoom.name} \u0E16\u0E39\u0E01\u0E0B\u0E48\u0E2D\u0E19\u0E44\u0E27\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2B\u0E49\u0E2D\u0E07\u0E2D\u0E37\u0E48\u0E19`);
              if (targetRoom.status === "IN_USE" && targetRoom.current_order_id) {
                throw badRequest(`${targetRoom.name} \u0E22\u0E31\u0E07\u0E21\u0E35\u0E1A\u0E34\u0E25\u0E04\u0E49\u0E32\u0E07\u0E2D\u0E22\u0E39\u0E48 (\u0E1A\u0E34\u0E25 #${targetRoom.current_order_id}) \u0E01\u0E23\u0E38\u0E13\u0E32\u0E1B\u0E34\u0E14\u0E1A\u0E34\u0E25\u0E40\u0E14\u0E34\u0E21\u0E01\u0E48\u0E2D\u0E19`);
              }
              if (targetRoom.status === "MAINTENANCE") {
                throw badRequest(`${targetRoom.name} \u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E34\u0E14\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07`);
              }
              if (targetRoom.status !== "AVAILABLE") throw badRequest(`${targetRoom.name} \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E17\u0E33\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E30\u0E2D\u0E32\u0E14\u0E41\u0E25\u0E30\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E40\u0E1B\u0E47\u0E19\u0E27\u0E48\u0E32\u0E07\u0E01\u0E48\u0E2D\u0E19`);
            }
            let totalGross = 0;
            let totalCommission = 0;
            let maxDuration = 0;
            const enrichedItems = [];
            const busyTherapists = /* @__PURE__ */ new Set();
            const findService = db.prepare(`SELECT * FROM services WHERE id = ?`);
            const findTherapist = db.prepare(`SELECT * FROM therapists WHERE id = ?`);
            const isTherapistBusy = db.prepare(`
      SELECT o.order_no FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      WHERE oi.therapist_id = ? AND o.status = 'IN_SERVICE'
      LIMIT 1
    `);
            const takeTherapist = (id, label) => {
              const tid = validateId(id, label);
              const therapist = findTherapist.get(tid);
              if (!therapist) throw badRequest(`\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14 ID: ${tid}`);
              if (therapist.is_active === 0) throw badRequest(`${therapist.nickname || therapist.name} \u0E16\u0E39\u0E01\u0E1B\u0E34\u0E14\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27`);
              if (therapist.active_today !== 1) {
                throw badRequest(`${therapist.nickname || therapist.name} \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E25\u0E07\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E02\u0E49\u0E32\u0E07\u0E32\u0E19\u0E43\u0E19\u0E01\u0E30\u0E19\u0E35\u0E49`);
              }
              if (busyTherapists.has(tid)) {
                throw badRequest(`${therapist.nickname || therapist.name} \u0E16\u0E39\u0E01\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E0B\u0E49\u0E33\u0E43\u0E19\u0E1A\u0E34\u0E25\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19`);
              }
              const busy = isTherapistBusy.get(tid);
              if (busy) {
                throw badRequest(`${therapist.nickname || therapist.name} \u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E1A\u0E34\u0E25 ${busy.order_no} \u0E2D\u0E22\u0E39\u0E48`);
              }
              if (therapist.status !== "AVAILABLE") {
                throw badRequest(`${therapist.nickname || therapist.name} \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E07\u0E32\u0E19 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E40\u0E1B\u0E47\u0E19\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E1B\u0E34\u0E14\u0E1A\u0E34\u0E25`);
              }
              busyTherapists.add(tid);
              return therapist;
            };
            const displayName = (t) => t.nickname ? `${t.name} (${t.nickname})` : t.name;
            for (const item of items) {
              if (!item || typeof item !== "object" || Array.isArray(item)) throw badRequest("\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
              const service = findService.get(validateId(item.serviceId, "serviceId"));
              if (!service) throw badRequest(`\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ID: ${item.serviceId}`);
              if (service.is_active === 0) throw badRequest(`\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 "${service.name}" \u0E16\u0E39\u0E01\u0E1B\u0E34\u0E14\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27`);
              const quote = item.confirmedService;
              if (!quote || typeof quote !== "object" || Array.isArray(quote) || expectedNetAmount === void 0) {
                const error = new ApiError("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E42\u0E2B\u0E25\u0E14\u0E23\u0E32\u0E04\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E21\u0E48\u0E41\u0E25\u0E30\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E22\u0E2D\u0E14\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E1B\u0E34\u0E14\u0E1A\u0E34\u0E25", 409);
                error.code = "QUOTE_REQUIRED";
                throw error;
              }
              if (["price", "duration_minutes", "required_therapists", "commission_amount"].some((key) => typeof quote[key] !== "number" || quote[key] !== Number(service[key]))) {
                const error = new ApiError("\u0E23\u0E32\u0E04\u0E32\u0E2B\u0E23\u0E37\u0E2D\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E2B\u0E21\u0E48 \u0E15\u0E23\u0E27\u0E08\u0E22\u0E2D\u0E14\u0E41\u0E25\u0E30\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07", 409);
                error.code = "QUOTE_CHANGED";
                throw error;
              }
              const itemDuration = Number(service.duration_minutes) || 60;
              if (itemDuration > maxDuration) maxDuration = itemDuration;
              const itemPrice = Math.round(Number(service.price));
              const itemCommission = Math.round(Number(service.commission_amount));
              totalGross += itemPrice;
              totalCommission += itemCommission;
              const therapist = takeTherapist(item.therapistId, "therapistId");
              if (Number(service.required_therapists) === 2) {
                if (item.therapist2Id === void 0 || item.therapist2Id === null || item.therapist2Id === "") {
                  throw badRequest(`"${service.name}" \u0E15\u0E49\u0E2D\u0E07\u0E43\u0E0A\u0E49\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14 2 \u0E04\u0E19 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14\u0E04\u0E19\u0E17\u0E35\u0E48 2`);
                }
                if (Number(item.therapist2Id) === Number(item.therapistId)) {
                  throw badRequest(`"${service.name}" \u0E15\u0E49\u0E2D\u0E07\u0E43\u0E0A\u0E49\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14 2 \u0E04\u0E19\u0E17\u0E35\u0E48\u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19`);
                }
                const therapist2 = takeTherapist(item.therapist2Id, "therapist2Id");
                const halfPrice1 = Math.ceil(itemPrice / 2);
                const halfPrice2 = itemPrice - halfPrice1;
                const halfCommission1 = Math.ceil(itemCommission / 2);
                const halfCommission2 = itemCommission - halfCommission1;
                enrichedItems.push({
                  service_id: service.id,
                  service_name: `${service.name} (\u0E2B\u0E21\u0E2D 1)`,
                  price: halfPrice1,
                  duration_minutes: itemDuration,
                  therapist_id: therapist.id,
                  therapist_name: displayName(therapist),
                  commission_amount: halfCommission1,
                  is_requested: item.isRequested ? 1 : 0
                });
                enrichedItems.push({
                  service_id: service.id,
                  service_name: `${service.name} (\u0E2B\u0E21\u0E2D 2)`,
                  price: halfPrice2,
                  duration_minutes: itemDuration,
                  therapist_id: therapist2.id,
                  therapist_name: displayName(therapist2),
                  commission_amount: halfCommission2,
                  is_requested: item.isRequested ? 1 : 0
                });
              } else {
                enrichedItems.push({
                  service_id: service.id,
                  service_name: service.name,
                  price: itemPrice,
                  duration_minutes: itemDuration,
                  therapist_id: therapist.id,
                  therapist_name: displayName(therapist),
                  commission_amount: itemCommission,
                  is_requested: item.isRequested ? 1 : 0
                });
              }
            }
            const discount = validateMoney(discountAmount ?? 0, "\u0E2A\u0E48\u0E27\u0E19\u0E25\u0E14");
            if (discount > 0 && (typeof discountReason !== "string" || discountReason.trim().length < 3 || discountReason.trim().length > 500)) {
              throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E2A\u0E48\u0E27\u0E19\u0E25\u0E14 3\u2013500 \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23");
            }
            if (discount > totalGross) {
              throw badRequest(`\u0E2A\u0E48\u0E27\u0E19\u0E25\u0E14 (${discount}) \u0E40\u0E01\u0E34\u0E19\u0E22\u0E2D\u0E14\u0E1A\u0E34\u0E25 (${totalGross}) \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07`);
            }
            const baseAfterDiscount = totalGross - discount;
            if (baseAfterDiscount < totalCommission) {
              throw badRequest(
                `\u0E22\u0E2D\u0E14\u0E2B\u0E25\u0E31\u0E07\u0E2B\u0E31\u0E01\u0E2A\u0E48\u0E27\u0E19\u0E25\u0E14 (${baseAfterDiscount}) \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E2B\u0E21\u0E2D\u0E23\u0E27\u0E21 (${totalCommission}) \u0E23\u0E49\u0E32\u0E19\u0E08\u0E30\u0E02\u0E32\u0E14\u0E17\u0E38\u0E19 ${totalCommission - baseAfterDiscount} \u0E1A\u0E32\u0E17 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E25\u0E14\u0E2B\u0E23\u0E37\u0E2D\u0E41\u0E01\u0E49\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E01\u0E48\u0E2D\u0E19`
              );
            }
            let surchargePercent = 0;
            let surchargeAmount = 0;
            if (paymentMethod === "CREDIT_CARD") {
              surchargePercent = validateNonNegativeNumber(cardSurchargePercent, "\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21\u0E1A\u0E31\u0E15\u0E23");
              if (surchargePercent < 0 || surchargePercent > MAX_SURCHARGE_PERCENT) {
                throw badRequest(`\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21\u0E1A\u0E31\u0E15\u0E23\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 0-${MAX_SURCHARGE_PERCENT}%`);
              }
              const explicitSurcharge = cardSurchargeAmount !== void 0 && cardSurchargeAmount !== null && cardSurchargeAmount !== "" ? validateMoney(cardSurchargeAmount, "\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21\u0E1A\u0E31\u0E15\u0E23") : 0;
              if (explicitSurcharge > 0) {
                surchargeAmount = explicitSurcharge;
                const ceiling = Math.round(baseAfterDiscount * MAX_SURCHARGE_PERCENT / 100);
                if (surchargeAmount > ceiling) {
                  throw badRequest(`\u0E04\u0E48\u0E32\u0E18\u0E23\u0E23\u0E21\u0E40\u0E19\u0E35\u0E22\u0E21\u0E1A\u0E31\u0E15\u0E23 (${surchargeAmount}) \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19 ${MAX_SURCHARGE_PERCENT}% \u0E02\u0E2D\u0E07\u0E22\u0E2D\u0E14\u0E1A\u0E34\u0E25`);
                }
              } else if (surchargePercent > 0) {
                surchargeAmount = Math.round(baseAfterDiscount * surchargePercent / 100);
              }
            }
            const netAmount = baseAfterDiscount + surchargeAmount;
            const shopNetRevenue = netAmount - totalCommission;
            if (validateMoney(expectedNetAmount, "\u0E22\u0E2D\u0E14\u0E17\u0E35\u0E48\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19") !== netAmount) {
              const error = new ApiError("\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E22\u0E2D\u0E14\u0E41\u0E25\u0E30\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07", 409);
              error.code = "QUOTE_CHANGED";
              throw error;
            }
            let received = netAmount;
            if (amountReceived !== void 0 && amountReceived !== null && amountReceived !== "") {
              received = validateMoney(amountReceived, "\u0E40\u0E07\u0E34\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E21\u0E32");
            }
            if (paymentMethod === "CASH" && received < netAmount) {
              throw badRequest(`\u0E40\u0E07\u0E34\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E21\u0E32 (${received}) \u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E22\u0E2D\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E0A\u0E33\u0E23\u0E30 (${netAmount})`);
            }
            if (paymentMethod !== "CASH" && received !== netAmount) {
              throw badRequest(`\u0E22\u0E2D\u0E14\u0E23\u0E31\u0E1A\u0E42\u0E2D\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E1A\u0E31\u0E15\u0E23 (${received}) \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30 (${netAmount})`);
            }
            const change = Math.max(0, received - netAmount);
            const now = /* @__PURE__ */ new Date();
            const bkNow = getBangkokTime();
            const startTimeStr = bkNow.timeString;
            const endDate = new Date(now.getTime() + maxDuration * 6e4);
            const endTimeStr = new Intl.DateTimeFormat("en-GB", {
              timeZone: "Asia/Bangkok",
              hour: "2-digit",
              minute: "2-digit",
              hourCycle: "h23"
            }).format(endDate);
            let createdOrderId = null;
            const createOrderTx = db.transaction(() => {
              const todayPrefix = businessDate.replace(/-/g, "");
              const lastOrder = db.prepare(
                `SELECT order_no FROM orders WHERE business_date = ? ORDER BY id DESC LIMIT 1`
              ).get(businessDate);
              let nextSeqNum = 1;
              if (lastOrder && lastOrder.order_no) {
                const lastNum = parseInt(lastOrder.order_no.split("-").pop(), 10);
                if (!isNaN(lastNum)) nextSeqNum = lastNum + 1;
              }
              let orderNo = `BILL-${todayPrefix}-${String(nextSeqNum).padStart(3, "0")}`;
              while (db.prepare(`SELECT id FROM orders WHERE order_no = ?`).get(orderNo)) {
                nextSeqNum++;
                orderNo = `BILL-${todayPrefix}-${String(nextSeqNum).padStart(3, "0")}`;
              }
              const orderInsert = db.prepare(`
        INSERT INTO orders (
          order_no, shift_id, business_date, room_id, room_name_snapshot, room_number_snapshot, customer_name, customer_phone, customer_country, customer_gender,
          total_amount, discount_amount, card_surcharge_percent, card_surcharge_amount, net_amount,
          therapist_total_commission, shop_net_revenue,
          payment_method, payment_details, amount_received, change_amount, status,
          start_time, end_time, duration_minutes, created_at, notes, client_request_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'IN_SERVICE', ?, ?, ?, ?, ?, ?)
      `).run(
                orderNo,
                activeShift.id,
                businessDate,
                targetRoom ? targetRoom.id : null,
                targetRoom ? targetRoom.name : null,
                targetRoom ? targetRoom.room_number : null,
                String(customerName || "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E23\u0E49\u0E32\u0E19 (Walk-in)").slice(0, 120),
                customerPhone ? String(customerPhone).slice(0, 30) : null,
                String(customerCountry || "\u0E44\u0E17\u0E22").slice(0, 60),
                customerGender ? String(customerGender).slice(0, 20) : null,
                totalGross,
                discount,
                surchargePercent,
                surchargeAmount,
                netAmount,
                totalCommission,
                shopNetRevenue,
                paymentMethod,
                paymentDetails ? JSON.stringify(paymentDetails).slice(0, 2e3) : null,
                received,
                change,
                startTimeStr,
                endTimeStr,
                maxDuration,
                now.toISOString(),
                notes ? String(notes).slice(0, 1e3) : null,
                clientRequestId || null
              );
              createdOrderId = orderInsert.lastInsertRowid;
              db.prepare(`UPDATE orders SET created_by_id=?,created_by_name=?,discount_by_id=?,discount_by_name=?,discount_reason=? WHERE id=?`).run(
                req.user.id,
                actorName(req),
                discount > 0 ? req.user.id : null,
                discount > 0 ? actorName(req) : null,
                discount > 0 ? discountReason.trim() : null,
                createdOrderId
              );
              const itemInsert = db.prepare(`
        INSERT INTO order_items (
          order_id, service_id, service_name, price, duration_minutes,
          therapist_id, therapist_name, commission_amount, is_requested
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
              const setBusy = db.prepare(`UPDATE therapists SET status = 'IN_SERVICE' WHERE id = ?`);
              for (const item of enrichedItems) {
                itemInsert.run(
                  createdOrderId,
                  item.service_id,
                  item.service_name,
                  item.price,
                  item.duration_minutes,
                  item.therapist_id,
                  item.therapist_name,
                  item.commission_amount,
                  item.is_requested
                );
                db.prepare(`UPDATE order_items SET therapist_code_snapshot=(SELECT code FROM therapists WHERE id=?),
          therapist_name_snapshot=(SELECT name FROM therapists WHERE id=?),
          therapist_nickname_snapshot=(SELECT nickname FROM therapists WHERE id=?)
          WHERE order_id=? AND therapist_id=?`).run(item.therapist_id, item.therapist_id, item.therapist_id, createdOrderId, item.therapist_id);
                setBusy.run(item.therapist_id);
              }
              if (targetRoom) {
                db.prepare(`
          UPDATE rooms SET
            status = 'IN_USE',
            current_order_id = ?,
            service_start_time = ?,
            service_end_time = ?,
            current_therapist_names = ?,
            current_service_names = ?
          WHERE id = ?
        `).run(
                  createdOrderId,
                  now.toISOString(),
                  endDate.toISOString(),
                  enrichedItems.map((i) => i.therapist_name).join(", "),
                  enrichedItems.map((i) => i.service_name).join(", "),
                  targetRoom.id
                );
              }
            });
            createOrderTx();
            const createdOrder2 = db.prepare(`SELECT * FROM orders WHERE id = ?`).get(createdOrderId);
            createdOrder2.items = enrichedItems;
            createdOrder2.shift_type = activeShift.shift_type;
            createdOrder2.room_name = createdOrder2.room_name_snapshot;
            createdOrder2.room_number = createdOrder2.room_number_snapshot;
            return createdOrder2;
          })();
          res.status(201).json({
            success: true,
            order: createdOrder,
            message: "\u0E40\u0E1B\u0E34\u0E14\u0E1A\u0E34\u0E25\u0E41\u0E25\u0E30\u0E40\u0E23\u0E34\u0E48\u0E21\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"
          });
        } catch (error) {
          next(error);
        }
      });
      router.post("/:id/complete", (req, res, next) => {
        try {
          const id = validateId(req.params.id, "order id");
          const { nextRoomStatus = "CLEANING" } = req.body || {};
          validateRoomStatus(nextRoomStatus);
          if (nextRoomStatus === "IN_USE") {
            throw badRequest('\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E2B\u0E49\u0E2D\u0E07\u0E2B\u0E25\u0E31\u0E07\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48 "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19"');
          }
          const db = getDb();
          const order = db.prepare(`SELECT * FROM orders WHERE id = ?`).get(id);
          if (!order) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1A\u0E34\u0E25" });
          assertDateAllowed(req, order.business_date);
          if (order.status !== "IN_SERVICE") {
            return res.status(409).json({
              error: order.status === "COMPLETED" ? "\u0E1A\u0E34\u0E25\u0E19\u0E35\u0E49\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27" : `\u0E1A\u0E34\u0E25\u0E19\u0E35\u0E49\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E2A\u0E16\u0E32\u0E19\u0E30 ${order.status} \u0E08\u0E36\u0E07\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49`
            });
          }
          const nowIso = (/* @__PURE__ */ new Date()).toISOString();
          db.transaction(() => {
            db.prepare(`
        UPDATE orders SET status = 'COMPLETED', completed_at = ?, notes = ?
        WHERE id = ? AND status = 'IN_SERVICE'
      `).run(
              nowIso,
              `${order.notes ? order.notes + " " : ""}[\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E42\u0E14\u0E22 ${actorName(req).slice(0, 50)}]`,
              id
            );
            releaseRoom(db, order.room_id, id, nextRoomStatus);
            releaseTherapists(db, id);
          })();
          res.json({ success: true, message: "\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E25\u0E30\u0E40\u0E04\u0E25\u0E35\u0E22\u0E23\u0E4C\u0E2B\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22" });
        } catch (error) {
          next(error);
        }
      });
      router.post("/:id/cancel", (req, res, next) => {
        try {
          const id = validateId(req.params.id, "order id");
          const { reason } = req.body || {};
          const db = getDb();
          const order = db.prepare(`SELECT * FROM orders WHERE id = ?`).get(id);
          if (!order) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1A\u0E34\u0E25" });
          assertDateAllowed(req, order.business_date);
          if (order.status === "CANCELLED") {
            return res.status(409).json({ error: "\u0E1A\u0E34\u0E25\u0E19\u0E35\u0E49\u0E16\u0E39\u0E01\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27" });
          }
          if (order.shift_id) {
            const shift = db.prepare(`SELECT id, status, business_date FROM shifts WHERE id = ?`).get(order.shift_id);
            if (shift && shift.status === "CLOSED") {
              return res.status(409).json({
                error: `\u0E1A\u0E34\u0E25\u0E19\u0E35\u0E49\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E01\u0E30 #${shift.id} (${shift.business_date}) \u0E17\u0E35\u0E48\u0E1B\u0E34\u0E14\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27 \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E40\u0E1E\u0E23\u0E32\u0E30\u0E22\u0E2D\u0E14\u0E2A\u0E23\u0E38\u0E1B\u0E01\u0E30\u0E16\u0E39\u0E01\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E2D\u0E2D\u0E01\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27 \u2014 \u0E43\u0E2B\u0E49\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E04\u0E37\u0E19\u0E40\u0E07\u0E34\u0E19\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E41\u0E17\u0E19`,
                code: "SHIFT_CLOSED"
              });
            }
          }
          const paidItems = db.prepare(`
      SELECT oi.payout_id, cp.payout_no
      FROM order_items oi
      LEFT JOIN commission_payouts cp ON cp.id = oi.payout_id
      WHERE oi.order_id = ? AND oi.payout_status = 'PAID'
    `).all(id);
          if (paidItems.length > 0) {
            const vouchers = [...new Set(paidItems.map((p) => p.payout_no).filter(Boolean))];
            return res.status(409).json({
              error: `\u0E1A\u0E34\u0E25\u0E19\u0E35\u0E49\u0E08\u0E48\u0E32\u0E22\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27 (\u0E43\u0E1A\u0E08\u0E48\u0E32\u0E22 ${vouchers.join(", ") || "-"}) \u0E15\u0E49\u0E2D\u0E07\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E43\u0E1A\u0E08\u0E48\u0E32\u0E22\u0E17\u0E35\u0E48\u0E2B\u0E19\u0E49\u0E32 "\u0E08\u0E48\u0E32\u0E22\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D" \u0E01\u0E48\u0E2D\u0E19\u0E08\u0E36\u0E07\u0E08\u0E30\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E1A\u0E34\u0E25\u0E44\u0E14\u0E49`,
              code: "PAYOUT_EXISTS",
              payoutNos: vouchers
            });
          }
          if (!reason || String(reason).trim().length < 3) {
            throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E17\u0E35\u0E48\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E1A\u0E34\u0E25 (\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 3 \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23)");
          }
          const nowIso = (/* @__PURE__ */ new Date()).toISOString();
          db.transaction(() => {
            db.prepare(`
        UPDATE orders SET
          status = 'CANCELLED',
          cancelled_at = ?,
          cancelled_by = ?,
          cancel_reason = ?
        WHERE id = ?
      `).run(nowIso, actorName(req).slice(0, 50), String(reason).slice(0, 500), id);
            releaseRoom(db, order.room_id, id, "AVAILABLE");
            releaseTherapists(db, id);
          })();
          res.json({ success: true, message: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E1A\u0E34\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22" });
        } catch (error) {
          next(error);
        }
      });
      module.exports = router;
    }
  });

  // ../server/routes/payouts.js
  var require_payouts = __commonJS({
    "../server/routes/payouts.js"(exports, module) {
      var express = require_router();
      var router = express.Router();
      var { actorName } = require_auth();
      var { getDb } = require_db();
      var { getCalculatedBusinessDate, getActiveShift } = require_shiftManager();
      var {
        ApiError,
        badRequest,
        validatePaymentMethod,
        validateBusinessDate,
        validateId,
        validateIdArray,
        validateMoney
      } = require_validators();
      var { assertDateAllowed, assertShiftAllowed, allowedBusinessDates, isOwnerReq } = require_dataScope();
      function defaultBusinessDate() {
        const active = getActiveShift();
        return active?.business_date || getCalculatedBusinessDate().businessDate;
      }
      function resolvePayoutScope(db, { shiftId, businessDate }) {
        const active = getActiveShift();
        if (shiftId !== void 0 && shiftId !== null && shiftId !== "") {
          const id = validateId(shiftId, "shiftId");
          const shift = db.prepare(`SELECT id, business_date, status FROM shifts WHERE id = ?`).get(id);
          if (!shift) throw badRequest(`\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E23\u0E2D\u0E1A\u0E01\u0E30 #${id}`);
          return {
            scope: { shiftId: shift.id, date: shift.business_date },
            businessDate: shift.business_date,
            drawerShiftId: active?.id ?? null,
            crossDrawer: !!(active && active.id !== shift.id)
          };
        }
        const date = businessDate ? validateBusinessDate(businessDate, "\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23") : defaultBusinessDate();
        return {
          scope: { shiftId: null, date },
          businessDate: date,
          drawerShiftId: active?.id ?? null,
          crossDrawer: !!(active && active.business_date !== date)
        };
      }
      function auditPayoutScope({ paymentMethod, drawerShiftId, businessDate, crossDrawer, actor }) {
        if (paymentMethod === "CASH" && !drawerShiftId) {
          const error = new ApiError("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E1B\u0E34\u0E14\u0E01\u0E30\u0E01\u0E48\u0E2D\u0E19\u0E08\u0E48\u0E32\u0E22\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E40\u0E07\u0E34\u0E19\u0E17\u0E35\u0E48\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E25\u0E34\u0E49\u0E19\u0E0A\u0E31\u0E01\u0E41\u0E25\u0E30\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E22\u0E2D\u0E14\u0E43\u0E2B\u0E49\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07", 409);
          error.code = "CASH_DRAWER_REQUIRED";
          throw error;
        } else if (paymentMethod === "CASH" && crossDrawer) {
          console.warn(`[Payout] ${actor} \u0E08\u0E48\u0E32\u0E22\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E02\u0E2D\u0E07\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23 ${businessDate} \u0E41\u0E15\u0E48\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E25\u0E34\u0E49\u0E19\u0E0A\u0E31\u0E01\u0E02\u0E2D\u0E07\u0E01\u0E30 #${drawerShiftId} \u0E0B\u0E36\u0E48\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E04\u0E19\u0E25\u0E30\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23 \u2014 \u0E15\u0E31\u0E49\u0E07\u0E43\u0E08\u0E43\u0E2B\u0E49\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E1A\u0E1A\u0E19\u0E35\u0E49 (\u0E08\u0E48\u0E32\u0E22\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E02\u0E49\u0E32\u0E21\u0E27\u0E31\u0E19) \u0E41\u0E15\u0E48\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E44\u0E27\u0E49\u0E43\u0E2B\u0E49\u0E15\u0E23\u0E27\u0E08\u0E22\u0E49\u0E2D\u0E19\u0E44\u0E14\u0E49`);
        }
      }
      function generateVoucherNo(db, date) {
        const todayPrefix = date.replace(/-/g, "");
        const lastPayout = db.prepare(
          `SELECT payout_no FROM commission_payouts WHERE payout_no LIKE ? ORDER BY id DESC LIMIT 1`
        ).get(`VOUCH-${todayPrefix}-%`);
        let nextSeqNum = 1;
        if (lastPayout && lastPayout.payout_no) {
          const lastNum = parseInt(lastPayout.payout_no.split("-").pop(), 10);
          if (!isNaN(lastNum)) nextSeqNum = lastNum + 1;
        }
        let payoutNo = `VOUCH-${todayPrefix}-${String(nextSeqNum).padStart(3, "0")}`;
        while (db.prepare(`SELECT id FROM commission_payouts WHERE payout_no = ?`).get(payoutNo)) {
          nextSeqNum++;
          payoutNo = `VOUCH-${todayPrefix}-${String(nextSeqNum).padStart(3, "0")}`;
        }
        return payoutNo;
      }
      function findPayableItems(db, therapistId, { shiftId, date }) {
        let sql = `
    SELECT oi.id, oi.commission_amount, o.status
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    WHERE oi.therapist_id = ?
      AND (oi.payout_status != 'PAID' OR oi.payout_status IS NULL)
      AND o.status != 'CANCELLED'
  `;
        const params = [therapistId];
        if (shiftId) {
          sql += ` AND o.shift_id = ?`;
          params.push(shiftId);
        } else {
          sql += ` AND o.business_date = ?`;
          params.push(date);
        }
        const rows = db.prepare(sql).all(...params);
        return {
          payable: rows.filter((r) => r.status === "COMPLETED"),
          pending: rows.filter((r) => r.status === "IN_SERVICE")
        };
      }
      router.get("/", (req, res, next) => {
        try {
          const db = getDb();
          const shift = req.query.shiftId ? assertShiftAllowed(req, db, req.query.shiftId) : null;
          const date = shift ? shift.business_date : assertDateAllowed(req, req.query.date ? validateBusinessDate(req.query.date, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48") : defaultBusinessDate());
          const shiftId = shift?.id ?? null;
          let query = `
      SELECT
        t.id as therapist_id, t.code, t.name, t.nickname, t.phone, t.avatar_color,
        COUNT(oi.id) as job_count,
        COALESCE(SUM(oi.duration_minutes), 0) as total_minutes,
        COALESCE(SUM(oi.commission_amount), 0) as total_commission,
        COALESCE(SUM(oi.price), 0) as total_service_sales,
        COALESCE(SUM(CASE WHEN oi.payout_status = 'PAID' THEN oi.commission_amount ELSE 0 END), 0) as paid_commission,
        COALESCE(SUM(CASE WHEN oi.payout_status != 'PAID' OR oi.payout_status IS NULL THEN oi.commission_amount ELSE 0 END), 0) as unpaid_commission,
        COALESCE(SUM(CASE WHEN oi.payout_status = 'PAID' THEN 1 ELSE 0 END), 0) as paid_job_count,
        COALESCE(SUM(CASE WHEN oi.payout_status != 'PAID' OR oi.payout_status IS NULL THEN 1 ELSE 0 END), 0) as unpaid_job_count,
        COALESCE(SUM(CASE WHEN o.status = 'IN_SERVICE' THEN oi.commission_amount ELSE 0 END), 0) as in_service_commission
      FROM therapists t
      JOIN order_items oi ON oi.therapist_id = t.id
      JOIN orders o ON o.id = oi.order_id
      WHERE o.status != 'CANCELLED'
    `;
          const params = [];
          if (shiftId) {
            query += ` AND o.shift_id = ?`;
            params.push(shiftId);
          } else {
            query += ` AND o.business_date = ?`;
            params.push(date);
          }
          query += ` GROUP BY t.id ORDER BY total_commission DESC`;
          const rawTherapists = db.prepare(query).all(...params);
          const jobFilter = shiftId ? "o.shift_id = ?" : "o.business_date = ?";
          const getJobItems = db.prepare(`
      SELECT oi.id as order_item_id, oi.order_id, oi.service_name, oi.price, oi.duration_minutes,
             oi.commission_amount, oi.is_requested,
             COALESCE(oi.payout_status, 'UNPAID') as payout_status, oi.paid_at,
             o.order_no, o.status as order_status, o.start_time, o.end_time,
             COALESCE(o.room_name_snapshot,r.name) as room_name
      FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      LEFT JOIN rooms r ON r.id = o.room_id
      WHERE oi.therapist_id = ? AND ${jobFilter} AND o.status != 'CANCELLED'
      ORDER BY o.id ASC
    `);
          const voucherDates = isOwnerReq(req) ? [] : [...allowedBusinessDates(req)];
          const voucherScope = isOwnerReq(req) ? "" : ` AND business_date IN (${voucherDates.map(() => "?").join(",")})`;
          const getPayoutRecords = shiftId ? db.prepare(`SELECT * FROM commission_payouts
                    WHERE therapist_id = ? AND shift_id = ? AND status = 'PAID'
                    ${voucherScope} ORDER BY id DESC`) : db.prepare(`SELECT * FROM commission_payouts
                    WHERE therapist_id = ? AND business_date = ? AND status = 'PAID'
                    ORDER BY id DESC`);
          const therapistsWithDetails = rawTherapists.map((t) => {
            const jobs = shiftId ? getJobItems.all(t.therapist_id, shiftId) : getJobItems.all(t.therapist_id, date);
            const payouts = shiftId ? getPayoutRecords.all(t.therapist_id, shiftId, ...voucherDates) : getPayoutRecords.all(t.therapist_id, date);
            let status = "UNPAID";
            if (t.total_commission > 0 && t.unpaid_commission === 0) status = "PAID";
            else if (t.paid_commission > 0 && t.unpaid_commission > 0) status = "PARTIAL";
            return {
              ...t,
              status,
              // ยอดที่กดจ่ายได้ตอนนี้ = ค้างจ่าย ลบส่วนที่ยังนวดไม่เสร็จ
              payable_commission: Math.max(0, t.unpaid_commission - t.in_service_commission),
              jobs,
              payouts,
              latestPayout: payouts[0] || null
            };
          });
          const sum = (key) => therapistsWithDetails.reduce((acc, t) => acc + (t[key] || 0), 0);
          res.json({
            business_date: date,
            shift_id: shiftId,
            summary: {
              total_commission_all: sum("total_commission"),
              total_paid_all: sum("paid_commission"),
              total_unpaid_all: sum("unpaid_commission"),
              total_payable_all: sum("payable_commission"),
              total_jobs_all: sum("job_count"),
              therapists_count: therapistsWithDetails.length,
              unpaid_therapists_count: therapistsWithDetails.filter((t) => t.unpaid_commission > 0).length
            },
            therapists: therapistsWithDetails
          });
        } catch (error) {
          next(error);
        }
      });
      function payConfirmed(req, bulk) {
        const db = getDb();
        const body = req.body || {};
        const { paymentMethod = "CASH", notes = "", businessDate, shiftId = null, clientRequestId } = body;
        validatePaymentMethod(paymentMethod);
        const ids = bulk ? validateIdArray(body.therapistIds, "\u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14") : [validateId(body.therapistId, "therapistId")];
        if (new Set(ids).size !== ids.length) throw badRequest("\u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14\u0E0B\u0E49\u0E33");
        if (shiftId) assertShiftAllowed(req, db, shiftId);
        if (businessDate) assertDateAllowed(req, validateBusinessDate(businessDate));
        const initialScope = resolvePayoutScope(db, { shiftId, businessDate });
        assertDateAllowed(req, initialScope.businessDate);
        if (typeof clientRequestId !== "string" || !db.prepare("SELECT 1 FROM payout_requests WHERE client_request_id=?").get(clientRequestId)) {
          auditPayoutScope({ ...initialScope, paymentMethod, actor: actorName(req) });
        }
        const conflict = () => {
          const error = new ApiError("\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E2D\u0E14\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E41\u0E25\u0E30\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E08\u0E48\u0E32\u0E22\u0E43\u0E2B\u0E21\u0E48", 409);
          error.code = "PAYOUT_CHANGED";
          return error;
        };
        const selections = bulk ? body.selections : [{ therapistId: ids[0], orderItemIds: body.orderItemIds, expectedAmount: body.expectedAmount }];
        if (typeof clientRequestId !== "string" || !clientRequestId.trim() || clientRequestId.length > 100 || !Array.isArray(selections) || selections.length !== ids.length) throw conflict();
        const confirmed = selections.map((selection) => {
          if (!selection || typeof selection !== "object") throw badRequest("\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
          const tid = validateId(selection.therapistId, "therapistId");
          if (!ids.includes(tid)) throw badRequest("\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14");
          const itemIds = validateIdArray(selection.orderItemIds, "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19").sort((a, b) => a - b);
          if (new Set(itemIds).size !== itemIds.length) throw badRequest("\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E07\u0E32\u0E19\u0E0B\u0E49\u0E33");
          return { therapistId: tid, itemIds, amount: validateMoney(selection.expectedAmount, "\u0E22\u0E2D\u0E14\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E17\u0E35\u0E48\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19") };
        }).sort((a, b) => a.therapistId - b.therapistId);
        if (new Set(confirmed.map((s) => s.therapistId)).size !== ids.length) throw badRequest("\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E2B\u0E21\u0E2D\u0E19\u0E27\u0E14\u0E0B\u0E49\u0E33");
        const requestJson = JSON.stringify({
          bulk,
          confirmed,
          businessDate: businessDate || null,
          shiftId: shiftId ? validateId(shiftId, "shiftId") : null,
          paymentMethod,
          notes: String(notes).slice(0, 500)
        });
        return db.transaction(() => {
          const saved = db.prepare("SELECT * FROM payout_requests WHERE client_request_id = ?").get(clientRequestId);
          if (saved) {
            assertDateAllowed(req, saved.business_date);
            if (saved.request_json !== requestJson) throw conflict();
            const response2 = JSON.parse(saved.response_json);
            if (response2.payout) response2.payout = db.prepare("SELECT * FROM commission_payouts WHERE id=?").get(response2.payout.id);
            return { ...response2, duplicate: true };
          }
          const { scope, businessDate: date, drawerShiftId: sid, crossDrawer } = resolvePayoutScope(db, { shiftId, businessDate });
          assertDateAllowed(req, date);
          auditPayoutScope({ paymentMethod, drawerShiftId: sid, businessDate: date, crossDrawer, actor: actorName(req) });
          const nowIso = (/* @__PURE__ */ new Date()).toISOString();
          const results = [];
          for (const selection of confirmed) {
            const tid = selection.therapistId;
            const therapist = db.prepare("SELECT nickname, name FROM therapists WHERE id=?").get(tid);
            if (!therapist) throw conflict();
            const { payable, pending } = findPayableItems(db, tid, scope);
            const total = payable.reduce((sum, item) => sum + item.commission_amount, 0);
            if (!payable.length || total !== selection.amount || JSON.stringify(payable.map((item) => item.id).sort((a, b) => a - b)) !== JSON.stringify(selection.itemIds)) throw conflict();
            const payoutNo = generateVoucherNo(db, date);
            const info = db.prepare(`
        INSERT INTO commission_payouts (payout_no,therapist_id,shift_id,business_date,job_count,
          total_commission,payment_method,status,paid_at,paid_by,notes)
        VALUES (?,?,?,?,?,?,?,'PAID',?,?,?)`).run(payoutNo, tid, sid, date, payable.length, total, paymentMethod, nowIso, actorName(req).slice(0, 50), String(notes).slice(0, 500));
            const payoutId = Number(info.lastInsertRowid);
            const update = db.prepare(`UPDATE order_items SET payout_status='PAID',payout_id=?,paid_at=?
        WHERE id=? AND (payout_status!='PAID' OR payout_status IS NULL)`);
            for (const item of payable) if (Number(update.run(payoutId, nowIso, item.id).changes) !== 1) throw conflict();
            results.push({
              therapistId: tid,
              name: therapist.nickname || therapist.name,
              payoutNo,
              totalPaid: total,
              jobs: payable.length,
              payoutId,
              skippedInService: pending.length
            });
          }
          const first = results[0];
          const response = bulk ? { success: true, count: results.length, details: results, skipped: [] } : {
            success: true,
            message: "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E08\u0E48\u0E32\u0E22\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22",
            payout: db.prepare("SELECT * FROM commission_payouts WHERE id=?").get(first.payoutId),
            totalPaid: first.totalPaid,
            jobsCount: first.jobs,
            skippedInService: first.skippedInService
          };
          db.prepare("INSERT INTO payout_requests VALUES (?,?,?,?,?)").run(clientRequestId, requestJson, JSON.stringify(response), date, nowIso);
          return response;
        })();
      }
      for (const [route, bulk] of [["/pay-therapist", false], ["/pay-bulk", true]]) {
        router.post(route, (req, res, next) => {
          try {
            res.json(payConfirmed(req, bulk));
          } catch (error) {
            next(error);
          }
        });
      }
      router.post("/:id/void", (req, res, next) => {
        try {
          const id = validateId(req.params.id, "payout id");
          const { reason } = req.body || {};
          const db = getDb();
          if (!reason || String(reason).trim().length < 3) {
            throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E17\u0E35\u0E48\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E43\u0E1A\u0E08\u0E48\u0E32\u0E22 (\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 3 \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23)");
          }
          const payout = db.prepare(`SELECT * FROM commission_payouts WHERE id = ?`).get(id);
          if (!payout) return res.status(404).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E43\u0E1A\u0E08\u0E48\u0E32\u0E22\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D" });
          assertDateAllowed(req, payout.business_date);
          if (payout.status === "VOID") return res.status(409).json({ error: "\u0E43\u0E1A\u0E08\u0E48\u0E32\u0E22\u0E19\u0E35\u0E49\u0E16\u0E39\u0E01\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27" });
          if (payout.payment_method === "CASH") {
            const drawer = payout.shift_id ? db.prepare("SELECT status FROM shifts WHERE id = ?").get(payout.shift_id) : null;
            if (!drawer || drawer.status !== "OPEN") {
              return res.status(409).json({
                error: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E43\u0E1A\u0E08\u0E48\u0E32\u0E22\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E19\u0E35\u0E49\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E40\u0E1E\u0E23\u0E32\u0E30\u0E01\u0E30\u0E17\u0E35\u0E48\u0E08\u0E48\u0E32\u0E22\u0E40\u0E07\u0E34\u0E19\u0E1B\u0E34\u0E14\u0E41\u0E25\u0E49\u0E27\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E25\u0E34\u0E49\u0E19\u0E0A\u0E31\u0E01 \u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E16\u0E39\u0E01\u0E1B\u0E34\u0E14\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E43\u0E2B\u0E49\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E41\u0E25\u0E30\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19\u0E04\u0E37\u0E19\u0E41\u0E22\u0E01\u0E15\u0E48\u0E32\u0E07\u0E2B\u0E32\u0E01",
                code: "CASH_DRAWER_CLOSED"
              });
            }
          }
          const nowIso = (/* @__PURE__ */ new Date()).toISOString();
          db.transaction(() => {
            db.prepare(`
        UPDATE commission_payouts SET
          status = 'VOID', voided_at = ?, voided_by = ?, void_reason = ?
        WHERE id = ? AND status = 'PAID'
      `).run(nowIso, actorName(req).slice(0, 50), String(reason).slice(0, 500), id);
            db.prepare(`
        UPDATE order_items SET payout_status = 'UNPAID', payout_id = NULL, paid_at = NULL
        WHERE payout_id = ?
      `).run(id);
          })();
          res.json({
            success: true,
            message: `\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E43\u0E1A\u0E08\u0E48\u0E32\u0E22 ${payout.payout_no} \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22 \u2014 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E01\u0E25\u0E31\u0E1A\u0E44\u0E1B\u0E40\u0E1B\u0E47\u0E19\u0E04\u0E49\u0E32\u0E07\u0E08\u0E48\u0E32\u0E22`,
            payout: db.prepare(`SELECT * FROM commission_payouts WHERE id = ?`).get(id)
          });
        } catch (error) {
          next(error);
        }
      });
      router.get("/vouchers", (req, res, next) => {
        try {
          const db = getDb();
          const { date, therapistId } = req.query;
          let sql = `
      SELECT cp.*, t.name as therapist_name, t.nickname as therapist_nickname
      FROM commission_payouts cp
      LEFT JOIN therapists t ON t.id = cp.therapist_id
      WHERE 1=1
    `;
          const params = [];
          if (date) {
            sql += ` AND cp.business_date = ?`;
            params.push(assertDateAllowed(req, validateBusinessDate(date, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48")));
          } else if (!isOwnerReq(req)) {
            const dates = [...allowedBusinessDates(req)];
            sql += ` AND cp.business_date IN (${dates.map(() => "?").join(",")})`;
            params.push(...dates);
          }
          if (therapistId) {
            sql += ` AND cp.therapist_id = ?`;
            params.push(validateId(therapistId, "therapistId"));
          }
          sql += ` ORDER BY cp.id DESC LIMIT 200`;
          res.json(db.prepare(sql).all(...params));
        } catch (error) {
          next(error);
        }
      });
      module.exports = router;
    }
  });

  // ../server/routes/expenses.js
  var require_expenses = __commonJS({
    "../server/routes/expenses.js"(exports, module) {
      var router = require_router().Router();
      var { getDb } = require_db();
      var { requireOwner, actorName } = require_auth();
      var { badRequest, ApiError, validateMoney, validateBusinessDate, validateId } = require_validators();
      var { getActiveShift, getCalculatedBusinessDate } = require_shiftManager();
      var CATEGORIES = ["RENT", "UTILITIES", "SUPPLIES", "SALARY", "PAYMENT_FEES", "OTHER"];
      router.use(requireOwner);
      function text(value, label) {
        if (typeof value !== "string" || value.trim().length < 3 || value.trim().length > 500) throw badRequest(label + " \u0E15\u0E49\u0E2D\u0E07\u0E22\u0E32\u0E27 3\u2013500 \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23");
        return value.trim();
      }
      function source(value) {
        if (!["UNPAID", "DRAWER", "EXTERNAL"].includes(value)) throw badRequest("\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E40\u0E07\u0E34\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
        return value;
      }
      function payment(paymentSource, paidDate) {
        if (paymentSource === "UNPAID") return { shiftId: null, date: null };
        if (paymentSource === "DRAWER") {
          const shift = getActiveShift();
          if (!shift) throw new ApiError("\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E34\u0E14\u0E01\u0E30\u0E01\u0E48\u0E2D\u0E19\u0E08\u0E48\u0E32\u0E22\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E08\u0E32\u0E01\u0E25\u0E34\u0E49\u0E19\u0E0A\u0E31\u0E01", 409);
          if (paidDate && paidDate !== shift.business_date) throw badRequest("\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E08\u0E48\u0E32\u0E22\u0E2A\u0E14\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E01\u0E30\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E34\u0E14\u0E2D\u0E22\u0E39\u0E48");
          return { shiftId: shift.id, date: shift.business_date };
        }
        return { shiftId: null, date: validateBusinessDate(paidDate || getCalculatedBusinessDate().businessDate) };
      }
      router.get("/", (req, res, next) => {
        try {
          const from = validateBusinessDate(req.query.from), to = validateBusinessDate(req.query.to || req.query.from);
          if (from > to) throw badRequest("\u0E0A\u0E48\u0E27\u0E07\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
          const rows = getDb().prepare("SELECT * FROM expenses WHERE expense_date BETWEEN ? AND ? ORDER BY expense_date DESC,id DESC").all(from, to);
          res.json({ rows, totalExpense: rows.filter((r) => r.status === "ACTIVE").reduce((s, r) => s + r.amount, 0) });
        } catch (e) {
          next(e);
        }
      });
      router.post("/", (req, res, next) => {
        try {
          const b = req.body || {}, db = getDb();
          const date = validateBusinessDate(b.expenseDate), amount = validateMoney(b.amount, "\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22", { max: 1e7 });
          if (!Number.isInteger(Number(b.amount))) throw badRequest("\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E15\u0E47\u0E21\u0E1A\u0E32\u0E17 \u0E44\u0E21\u0E48\u0E1B\u0E31\u0E14\u0E40\u0E28\u0E29\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34");
          if (amount <= 0) throw badRequest("\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0");
          if (!CATEGORIES.includes(b.category)) throw badRequest("\u0E2B\u0E21\u0E27\u0E14\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
          const description = text(b.description, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14"), src = source(b.paymentSource || "UNPAID");
          if (typeof b.clientRequestId !== "string" || !/^[A-Za-z0-9_-]{16,100}$/.test(b.clientRequestId)) throw badRequest("\u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E42\u0E2B\u0E25\u0E14\u0E2B\u0E19\u0E49\u0E32\u0E43\u0E2B\u0E21\u0E48");
          const paidDate = b.paidDate ? validateBusinessDate(b.paidDate) : null;
          const fingerprint = JSON.stringify([date, b.category, description, amount, src, paidDate]);
          const existing = db.prepare("SELECT * FROM expenses WHERE client_request_id=?").get(b.clientRequestId);
          if (existing) {
            if (existing.request_fingerprint !== fingerprint) throw new ApiError("\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E19\u0E35\u0E49\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E41\u0E25\u0E49\u0E27\u0E14\u0E49\u0E27\u0E22\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E14\u0E34\u0E21 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E42\u0E2B\u0E25\u0E14\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E01\u0E48\u0E2D\u0E19\u0E17\u0E33\u0E43\u0E2B\u0E21\u0E48", 409);
            return res.json(existing);
          }
          const row = db.transaction(() => {
            const p = payment(src, paidDate), now = (/* @__PURE__ */ new Date()).toISOString(), paid = src !== "UNPAID";
            const id = db.prepare(`INSERT INTO expenses(expense_date,category,description,amount,payment_source,drawer_shift_id,
      paid_business_date,paid_at,created_by_id,created_by_name,created_at,paid_by_id,paid_by_name,client_request_id,request_fingerprint)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
              date,
              b.category,
              description,
              amount,
              src,
              p.shiftId,
              p.date,
              paid ? now : null,
              req.user.id,
              actorName(req),
              now,
              paid ? req.user.id : null,
              paid ? actorName(req) : null,
              b.clientRequestId,
              fingerprint
            ).lastInsertRowid;
            return db.prepare("SELECT * FROM expenses WHERE id=?").get(id);
          })();
          res.status(201).json(row);
        } catch (e) {
          next(e);
        }
      });
      router.post("/:id/pay", (req, res, next) => {
        try {
          const db = getDb(), id = validateId(req.params.id), src = source(req.body?.paymentSource);
          if (src === "UNPAID") throw badRequest("\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E40\u0E07\u0E34\u0E19\u0E17\u0E35\u0E48\u0E08\u0E48\u0E32\u0E22\u0E08\u0E23\u0E34\u0E07");
          const row = db.transaction(() => {
            const current = db.prepare("SELECT * FROM expenses WHERE id=?").get(id);
            if (!current) throw new ApiError("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22", 404);
            if (current.status !== "ACTIVE") throw new ApiError("\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E19\u0E35\u0E49\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E41\u0E25\u0E49\u0E27", 409);
            if (current.payment_source !== "UNPAID") {
              if (current.payment_source !== src || req.body.paidDate && req.body.paidDate !== current.paid_business_date) throw new ApiError("\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E19\u0E35\u0E49\u0E08\u0E48\u0E32\u0E22\u0E41\u0E25\u0E49\u0E27\u0E14\u0E49\u0E27\u0E22\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2D\u0E37\u0E48\u0E19", 409);
              return current;
            }
            const p = payment(src, req.body.paidDate);
            db.prepare(`UPDATE expenses SET payment_source=?,drawer_shift_id=?,paid_business_date=?,paid_at=?,paid_by_id=?,paid_by_name=? WHERE id=?`).run(src, p.shiftId, p.date, (/* @__PURE__ */ new Date()).toISOString(), req.user.id, actorName(req), id);
            return db.prepare("SELECT * FROM expenses WHERE id=?").get(id);
          })();
          res.json(row);
        } catch (e) {
          next(e);
        }
      });
      router.post("/:id/void", (req, res, next) => {
        try {
          const db = getDb(), id = validateId(req.params.id), reason = text(req.body?.reason, "\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01");
          const row = db.transaction(() => {
            const current = db.prepare("SELECT * FROM expenses WHERE id=?").get(id);
            if (!current) throw new ApiError("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22", 404);
            if (current.status === "VOID") return current;
            if (current.payment_source !== "UNPAID" && req.body.confirmReturned !== true) throw badRequest("\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E08\u0E48\u0E32\u0E22\u0E41\u0E25\u0E49\u0E27 \u0E15\u0E49\u0E2D\u0E07\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19\u0E04\u0E37\u0E19\u0E01\u0E48\u0E2D\u0E19\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01");
            if (current.drawer_shift_id && db.prepare("SELECT status FROM shifts WHERE id=?").get(current.drawer_shift_id)?.status !== "OPEN") {
              throw new ApiError("\u0E40\u0E07\u0E34\u0E19\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E01\u0E30\u0E17\u0E35\u0E48\u0E1B\u0E34\u0E14\u0E41\u0E25\u0E49\u0E27 \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E17\u0E31\u0E1A\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49", 409);
            }
            db.prepare(`UPDATE expenses SET status='VOID',void_reason=?,voided_by_id=?,voided_by_name=?,voided_at=? WHERE id=?`).run(reason, req.user.id, actorName(req), (/* @__PURE__ */ new Date()).toISOString(), id);
            return db.prepare("SELECT * FROM expenses WHERE id=?").get(id);
          })();
          res.json(row);
        } catch (e) {
          next(e);
        }
      });
      module.exports = router;
    }
  });

  // ../server/services/commissionValidation.js
  var require_commissionValidation = __commonJS({
    "../server/services/commissionValidation.js"(exports, module) {
      function validateCommissionSnapshot(data) {
        var tolerance = 0.02;
        function nonnegative(value, label) {
          if (typeof value !== "number" || !isFinite(value) || value < 0) throw new Error("\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: " + label);
        }
        [data.daily, data.monthly].forEach(function(summary) {
          if (!summary) throw new Error("\u0E44\u0E21\u0E48\u0E21\u0E35\u0E2A\u0E23\u0E38\u0E1B\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D");
          ["total_commission", "commission_paid", "commission_unpaid"].forEach(function(key) {
            nonnegative(summary[key], key);
          });
          if (Math.abs(summary.total_commission - summary.commission_paid - summary.commission_unpaid) > tolerance) throw new Error("\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E23\u0E27\u0E21\u0E44\u0E21\u0E48\u0E40\u0E17\u0E48\u0E32\u0E01\u0E31\u0E1A\u0E08\u0E48\u0E32\u0E22\u0E41\u0E25\u0E49\u0E27\u0E41\u0E25\u0E30\u0E04\u0E49\u0E32\u0E07\u0E08\u0E48\u0E32\u0E22");
        });
        nonnegative(data.daily.commission_payable, "commission_payable");
        if (data.daily.commission_payable - data.daily.commission_unpaid > tolerance) throw new Error("\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E17\u0E35\u0E48\u0E08\u0E48\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E01\u0E34\u0E19\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E04\u0E49\u0E32\u0E07\u0E08\u0E48\u0E32\u0E22");
        if (!Array.isArray(data.therapists) || !Array.isArray(data.orders)) throw new Error("\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D");
        var total = 0, paid = 0;
        data.therapists.forEach(function(therapist) {
          nonnegative(therapist.total_commission, "\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E23\u0E32\u0E22\u0E04\u0E19");
          nonnegative(therapist.paid_commission, "\u0E08\u0E48\u0E32\u0E22\u0E41\u0E25\u0E49\u0E27\u0E23\u0E32\u0E22\u0E04\u0E19");
          if (therapist.paid_commission - therapist.total_commission > tolerance) throw new Error("\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E08\u0E48\u0E32\u0E22\u0E41\u0E25\u0E49\u0E27\u0E23\u0E32\u0E22\u0E04\u0E19\u0E40\u0E01\u0E34\u0E19\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E23\u0E27\u0E21");
          total += therapist.total_commission;
          paid += therapist.paid_commission;
        });
        if (Math.abs(total - data.daily.total_commission) > tolerance || Math.abs(paid - data.daily.commission_paid) > tolerance) throw new Error("\u0E22\u0E2D\u0E14\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E23\u0E32\u0E22\u0E04\u0E19\u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E32\u0E22\u0E27\u0E31\u0E19");
        var completed = data.orders.filter(function(order) {
          return order.status === "COMPLETED";
        }).reduce(function(sum, order) {
          nonnegative(order.therapist_total_commission, "\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E1A\u0E19\u0E1A\u0E34\u0E25");
          return sum + order.therapist_total_commission;
        }, 0);
        if (Math.abs(completed - paid - data.daily.commission_payable) > tolerance) throw new Error("\u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D\u0E17\u0E35\u0E48\u0E08\u0E48\u0E32\u0E22\u0E44\u0E14\u0E49\u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E1A\u0E34\u0E25\u0E17\u0E35\u0E48\u0E08\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23");
      }
      module.exports = { validateCommissionSnapshot };
    }
  });

  // ../server/services/sheetSyncQueue.js
  var require_sheetSyncQueue = __commonJS({
    "../server/services/sheetSyncQueue.js"(exports, module) {
      var { getDb } = require_db();
      var { getDailySummary, getMonthlySummary, getDailyCommissions, monthOf } = require_reportAggregates();
      var { getGoogleSheetConfig, sendToGoogleSheetWebhook, sheetOrder } = require_integrations();
      var { validateCommissionSnapshot } = require_commissionValidation();
      var tail = Promise.resolve();
      var timer;
      var ticking = false;
      function enqueueDate(date) {
        const db = getDb();
        db.transaction(() => {
          db.prepare("UPDATE sheet_sync_clock SET revision=MAX(revision+1,?) WHERE id=1").run(Date.now() * 1e3);
          db.prepare(`INSERT INTO sheet_sync_outbox(business_date,revision) VALUES(?,(SELECT revision FROM sheet_sync_clock WHERE id=1))
      ON CONFLICT(business_date) DO UPDATE SET revision=excluded.revision, attempts=0, next_attempt_at=0, last_error='', warnings='[]'`).run(date);
        })();
      }
      function buildSnapshot(date) {
        const db = getDb();
        return db.transaction(() => {
          const revision = db.prepare("SELECT revision FROM sheet_sync_clock WHERE id=1").get().revision;
          const orders = db.prepare(`SELECT o.*, s.shift_type, COALESCE(o.room_name_snapshot,r.name) AS room_name FROM orders o
      LEFT JOIN shifts s ON s.id=o.shift_id LEFT JOIN rooms r ON r.id=o.room_id
      WHERE o.business_date=? ORDER BY o.id`).all(date).map((order) => sheetOrder(
            order,
            db.prepare("SELECT * FROM order_items WHERE order_id=? ORDER BY id").all(order.id),
            order.room_name ? { name: order.room_name } : null
          ));
          const snapshot = {
            action: "sync_business_date",
            protocol: 3,
            expenseVersion: 1,
            revision,
            business_date: date,
            orders,
            expenses: db.prepare("SELECT * FROM expenses WHERE expense_date=? ORDER BY id").all(date),
            shifts: db.prepare("SELECT * FROM shifts WHERE business_date=? AND status='CLOSED' ORDER BY id").all(date),
            therapists: getDailyCommissions(db, date),
            daily: getDailySummary(db, date),
            monthly: getMonthlySummary(db, monthOf(date))
          };
          validateCommissionSnapshot(snapshot);
          return snapshot;
        })();
      }
      async function sendDate(date) {
        const pending = getDb().prepare("SELECT * FROM sheet_sync_outbox WHERE business_date=?").get(date);
        if (!pending) return { success: true, businessDate: date, month: monthOf(date), pending: false, warnings: [] };
        let payload;
        try {
          payload = buildSnapshot(date);
        } catch (error2) {
          getDb().prepare("UPDATE sheet_sync_outbox SET attempts=attempts+1,next_attempt_at=?,last_error=? WHERE business_date=? AND revision=?").run(Date.now() + 3e5, String(error2.message).slice(0, 1e3), date, pending.revision);
          return { success: false, pending: true, businessDate: date, error: error2.message };
        }
        const connection = getDb();
        const destination = JSON.stringify(getGoogleSheetConfig());
        const result = await sendToGoogleSheetWebhook(payload, null, { timeout: 45e3 });
        if (getDb() !== connection) return { success: false, pending: true, error: "\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E2A\u0E48\u0E07 \u0E01\u0E33\u0E25\u0E31\u0E07\u0E23\u0E2D\u0E2A\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E25\u0E31\u0E07\u0E01\u0E32\u0E23\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19" };
        if (JSON.stringify(getGoogleSheetConfig()) !== destination) {
          enqueueDate(date);
          return { success: false, pending: true, error: "\u0E1B\u0E25\u0E32\u0E22\u0E17\u0E32\u0E07 Google Sheet \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E2A\u0E48\u0E07 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E04\u0E34\u0E27\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1B\u0E25\u0E32\u0E22\u0E17\u0E32\u0E07\u0E43\u0E2B\u0E21\u0E48" };
        }
        const warnings = result.warnings || [];
        const accepted = result.success && result.data?.details?.protocol === 3 && result.data.details.revision === payload.revision && result.data.details.expenseVersion === 1;
        const error = !accepted && result.success ? "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E27\u0E32\u0E07 Apps Script v4 \u0E09\u0E1A\u0E31\u0E1A\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E41\u0E25\u0E30 Deploy \u0E43\u0E2B\u0E21\u0E48" : result.error || result.message || "";
        const complete = accepted && warnings.length === 0;
        const db = getDb();
        if (complete) {
          db.transaction(() => {
            const removed = db.prepare("DELETE FROM sheet_sync_outbox WHERE business_date=? AND revision=?").run(date, pending.revision);
            if (removed.changes) db.prepare("UPDATE shifts SET synced_to_sheets=1 WHERE business_date=? AND status='CLOSED'").run(date);
          })();
        } else {
          const delay = Math.min(3e5, 5e3 * 2 ** Math.min(pending.attempts, 6));
          db.prepare(`UPDATE sheet_sync_outbox SET attempts=attempts+1, next_attempt_at=?, last_error=?, warnings=?
      WHERE business_date=? AND revision=?`).run(Date.now() + delay, String(error).slice(0, 1e3), JSON.stringify(warnings), date, pending.revision);
        }
        return {
          success: accepted,
          businessDate: date,
          month: monthOf(date),
          warnings,
          pending: !!db.prepare("SELECT 1 FROM sheet_sync_outbox WHERE business_date=?").get(date),
          ...accepted ? {} : { error }
        };
      }
      function serialize(fn) {
        const job = tail.then(fn);
        tail = job.catch(() => {
        });
        return job;
      }
      async function syncDate(date, { waitMs = 5e4 } = {}) {
        enqueueDate(date);
        let timeout;
        try {
          return await Promise.race([
            serialize(() => sendDate(date)),
            new Promise((resolve) => {
              timeout = setTimeout(() => resolve({
                success: true,
                queued: true,
                pending: true,
                businessDate: date,
                month: monthOf(date),
                warnings: ["\u0E22\u0E31\u0E07\u0E2A\u0E48\u0E07\u0E44\u0E21\u0E48\u0E40\u0E2A\u0E23\u0E47\u0E08 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E04\u0E34\u0E27\u0E41\u0E25\u0E30\u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E30\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34"]
              }), waitMs);
            })
          ]);
        } finally {
          clearTimeout(timeout);
        }
      }
      function processPending({ limit = 3 } = {}) {
        return serialize(async () => {
          const config = getGoogleSheetConfig();
          if (!config.webhookUrl || !config.webhookSecret) return [];
          const dates = getDb().prepare(`SELECT business_date FROM sheet_sync_outbox WHERE next_attempt_at<=?
      ORDER BY next_attempt_at, revision LIMIT ?`).all(Date.now(), limit);
          const results = [];
          for (const { business_date } of dates) results.push(await sendDate(business_date));
          return results;
        });
      }
      function startSheetSyncWorker() {
        if (timer) return;
        timer = setInterval(async () => {
          if (ticking) return;
          ticking = true;
          try {
            await processPending();
          } catch (error) {
            console.error("[Sheet queue]", error.message);
          } finally {
            ticking = false;
          }
        }, 5e3);
        timer.unref();
      }
      function queueStatus(dates = null) {
        const config = getGoogleSheetConfig();
        const where = dates ? `WHERE business_date IN (${dates.map(() => "?").join(",") || "NULL"})` : "";
        const rows = getDb().prepare(`SELECT business_date,attempts,last_error,warnings,next_attempt_at FROM sheet_sync_outbox ${where}
    ORDER BY business_date DESC`).all(...dates || []);
        return {
          configured: !!(config.webhookUrl && config.webhookSecret),
          pendingCount: rows.length,
          failedCount: rows.filter((r) => r.attempts > 0).length,
          dates: rows.slice(0, 100)
        };
      }
      module.exports = { enqueueDate, buildSnapshot, syncDate, processPending, startSheetSyncWorker, queueStatus };
    }
  });

  // ../server/routes/reports.js
  var require_reports = __commonJS({
    "../server/routes/reports.js"(exports, module) {
      var express = require_router();
      var router = express.Router();
      var { getDb } = require_db();
      var { getCalculatedBusinessDate } = require_shiftManager();
      var { badRequest, validateBusinessDate, clampLimit } = require_validators();
      var { getDailySummary, getMonthlySummary, getDailyCommissions, monthOf } = require_reportAggregates();
      var { syncDate, queueStatus, enqueueDate } = require_sheetSyncQueue();
      var { requireOwner } = require_auth();
      var { assertDateAllowed, assertShiftAllowed, assertDateRangeAllowed, allowedBusinessDates, isOwnerReq } = require_dataScope();
      function validateMonth(value) {
        if (typeof value !== "string" || !/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
          throw badRequest(`\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A YYYY-MM (\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A: ${value})`);
        }
        return value;
      }
      router.get("/daily-summary", (req, res, next) => {
        try {
          const db = getDb();
          const date = assertDateAllowed(req, req.query.date ? validateBusinessDate(req.query.date, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48") : getCalculatedBusinessDate().businessDate);
          const shifts = db.prepare(`SELECT * FROM shifts WHERE business_date = ? ORDER BY id ASC`).all(date);
          const salesSummary = db.prepare(`
      SELECT
        COUNT(*) as total_orders,
        COALESCE(SUM(total_amount), 0) as gross_sales,
        COALESCE(SUM(discount_amount), 0) as total_discounts,
        COALESCE(SUM(card_surcharge_amount), 0) as total_card_surcharge,
        COALESCE(SUM(net_amount), 0) as net_sales,
        COALESCE(SUM(therapist_total_commission), 0) as total_commissions,
        COALESCE(SUM(shop_net_revenue), 0) as shop_net_revenue,
        COALESCE(SUM(CASE WHEN payment_method = 'CASH' THEN net_amount ELSE 0 END), 0) as cash_total,
        COALESCE(SUM(CASE WHEN payment_method = 'PROMPTPAY' THEN net_amount ELSE 0 END), 0) as promptpay_total,
        COALESCE(SUM(CASE WHEN payment_method = 'CREDIT_CARD' THEN net_amount ELSE 0 END), 0) as card_total
      FROM orders
      WHERE business_date = ? AND status != 'CANCELLED'
    `).get(date);
          const cancelled = db.prepare(`
      SELECT COUNT(*) as cancelled_orders, COALESCE(SUM(net_amount), 0) as cancelled_amount
      FROM orders WHERE business_date = ? AND status = 'CANCELLED'
    `).get(date);
          const topServices = db.prepare(`
      SELECT COALESCE(s.name, oi.service_name) as service_name,
             COUNT(oi.id) as service_count,
             SUM(oi.price) as total_revenue,
             SUM(oi.commission_amount) as total_commission
      FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      LEFT JOIN services s ON s.id = oi.service_id
      WHERE o.business_date = ? AND o.status != 'CANCELLED'
      GROUP BY COALESCE(s.name, oi.service_name)
      ORDER BY service_count DESC
      LIMIT 10
    `).all(date);
          res.json({
            business_date: date,
            summary: {
              ...salesSummary,
              ...cancelled,
              operating_expenses: getDailySummary(db, date).operating_expenses,
              net_profit: getDailySummary(db, date).net_profit
            },
            shifts,
            topServices
          });
        } catch (error) {
          next(error);
        }
      });
      router.get("/therapist-commissions", (req, res, next) => {
        try {
          const db = getDb();
          const { startDate, endDate, shiftId, businessDate } = req.query;
          let query = `
      SELECT t.id as therapist_id, MIN(oi.id) as identity_item_id,
             COALESCE(oi.therapist_code_snapshot,t.code) as code,
             COALESCE(oi.therapist_name_snapshot,oi.therapist_name) as name,
             COALESCE(oi.therapist_nickname_snapshot,'') as nickname, t.phone,
             COUNT(oi.id) as job_count,
             COALESCE(SUM(oi.duration_minutes), 0) as total_minutes,
             COALESCE(SUM(oi.commission_amount), 0) as total_commission,
             COALESCE(SUM(oi.price), 0) as total_service_sales,
             COALESCE(SUM(CASE WHEN oi.payout_status = 'PAID' THEN oi.commission_amount ELSE 0 END), 0) as paid_commission
      FROM therapists t
      JOIN order_items oi ON oi.therapist_id = t.id
      JOIN orders o ON o.id = oi.order_id
      WHERE o.status != 'CANCELLED'
    `;
          const params = [];
          if (shiftId) {
            query += ` AND o.shift_id = ?`;
            params.push(assertShiftAllowed(req, db, shiftId).id);
          } else if (businessDate) {
            query += ` AND o.business_date = ?`;
            params.push(assertDateAllowed(req, validateBusinessDate(businessDate, "\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23")));
          } else if (startDate && endDate) {
            const from = validateBusinessDate(startDate, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19");
            const to = validateBusinessDate(endDate, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14");
            if (from > to) throw badRequest("\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14");
            assertDateRangeAllowed(req, from, to);
            query += ` AND o.business_date BETWEEN ? AND ?`;
            params.push(from, to);
          } else if (startDate || endDate) {
            throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E41\u0E25\u0E30\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A");
          } else {
            query += ` AND o.business_date = ?`;
            params.push(assertDateAllowed(req, getCalculatedBusinessDate().businessDate));
          }
          query += ` GROUP BY t.id ORDER BY total_commission DESC LIMIT ?`;
          params.push(clampLimit(req.query.limit, 500, 200));
          res.json(db.prepare(query).all(...params));
        } catch (error) {
          next(error);
        }
      });
      router.get("/monthly-summary", requireOwner, (req, res, next) => {
        try {
          const db = getDb();
          const month = req.query.month ? validateMonth(req.query.month) : monthOf(getCalculatedBusinessDate().businessDate);
          const summary = getMonthlySummary(db, month);
          const days = db.prepare(`SELECT business_date FROM orders WHERE business_date LIKE ?
      UNION SELECT expense_date AS business_date FROM expenses WHERE expense_date LIKE ? AND status='ACTIVE'
      ORDER BY business_date`).all(`${month}-%`, `${month}-%`).map((r) => getDailySummary(db, r.business_date));
          res.json({ month, summary, days });
        } catch (error) {
          next(error);
        }
      });
      router.get("/daily-detail", (req, res, next) => {
        try {
          const db = getDb();
          const date = assertDateAllowed(req, req.query.date ? validateBusinessDate(req.query.date, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48") : getCalculatedBusinessDate().businessDate);
          res.json({
            summary: getDailySummary(db, date),
            commissions: getDailyCommissions(db, date)
          });
        } catch (error) {
          next(error);
        }
      });
      router.post("/sync-sheet", async (req, res, next) => {
        try {
          const date = assertDateAllowed(req, req.body?.businessDate ? validateBusinessDate(req.body.businessDate, "\u0E27\u0E31\u0E19\u0E17\u0E33\u0E01\u0E32\u0E23") : getCalculatedBusinessDate().businessDate);
          const summaryRes = await syncDate(date);
          if (!summaryRes.success) {
            return res.status(502).json({ success: false, error: summaryRes.error, businessDate: date });
          }
          res.json({
            ...summaryRes,
            message: summaryRes.queued ? `\u0E40\u0E02\u0E49\u0E32\u0E04\u0E34\u0E27\u0E2A\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 ${date} \u0E41\u0E25\u0E49\u0E27 \u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E33\u0E25\u0E31\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23` : summaryRes.pending ? `\u0E2A\u0E48\u0E07\u0E15\u0E32\u0E23\u0E32\u0E07\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 ${date} \u0E41\u0E25\u0E49\u0E27 \u0E41\u0E15\u0E48\u0E22\u0E31\u0E07\u0E21\u0E35\u0E07\u0E32\u0E19\u0E04\u0E49\u0E32\u0E07 \u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E30\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34` : `\u0E2A\u0E48\u0E07\u0E1A\u0E34\u0E25 \u0E01\u0E30 \u0E04\u0E48\u0E32\u0E21\u0E37\u0E2D \u0E41\u0E25\u0E30\u0E2A\u0E23\u0E38\u0E1B\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 ${date} \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E14\u0E37\u0E2D\u0E19 ${summaryRes.month} \u0E04\u0E23\u0E1A\u0E41\u0E25\u0E49\u0E27`
          });
        } catch (error) {
          next(error);
        }
      });
      router.get("/sheet-sync-status", (req, res, next) => {
        try {
          res.json(queueStatus(isOwnerReq(req) ? null : [...allowedBusinessDates(req)]));
        } catch (error) {
          next(error);
        }
      });
      router.post("/sync-sheet-month", requireOwner, (req, res, next) => {
        try {
          const month = validateMonth(req.body?.month);
          const dates = getDb().prepare(`SELECT business_date FROM orders WHERE business_date LIKE ?
      UNION SELECT business_date FROM shifts WHERE business_date LIKE ?
      UNION SELECT business_date FROM commission_payouts WHERE business_date LIKE ?
      UNION SELECT business_date FROM sheet_sync_outbox WHERE business_date LIKE ?`).all(...Array(4).fill(`${month}-%`));
          for (const row of getDb().prepare("SELECT DISTINCT expense_date AS business_date FROM expenses WHERE expense_date LIKE ?").all(`${month}-%`)) {
            if (!dates.some((r) => r.business_date === row.business_date)) dates.push(row);
          }
          if (!dates.length) dates.push({ business_date: `${month}-01` });
          getDb().transaction(() => {
            for (const { business_date } of dates) enqueueDate(business_date);
          })();
          res.status(202).json({ success: true, pending: true, message: `\u0E40\u0E02\u0E49\u0E32\u0E04\u0E34\u0E27\u0E2A\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E04\u0E23\u0E1A ${dates.length} \u0E27\u0E31\u0E19\u0E02\u0E2D\u0E07\u0E40\u0E14\u0E37\u0E2D\u0E19 ${month} \u0E41\u0E25\u0E49\u0E27 \u0E15\u0E23\u0E27\u0E08\u0E04\u0E27\u0E32\u0E21\u0E04\u0E37\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E44\u0E14\u0E49\u0E43\u0E19\u0E2B\u0E19\u0E49\u0E32\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19` });
        } catch (error) {
          next(error);
        }
      });
      module.exports = router;
    }
  });

  // ../server/routes/settings.js
  var require_settings = __commonJS({
    "../server/routes/settings.js"(exports, module) {
      var express = require_router();
      var router = express.Router();
      var { getDb } = require_db();
      var { sendTestNotification } = require_integrations();
      var { testGoogleSheetConnection, getGasTemplate } = require_integrations();
      var { backupDatabase, restoreFromBackup, restoreFromDriveBackup, listLocalBackups } = require_backups();
      var { listDriveBackups } = require_integrations();
      var { badRequest, validateOutboundUrl, clampLimit } = require_validators();
      var { requireOwner, isOwner, revokeAllTokens, ownerCommitGuard } = require_auth();
      var SETTINGS_WHITELIST = [
        "shop_name",
        "shop_branch",
        "shop_address",
        "shop_phone",
        "shop_tax_id",
        "shop_promptpay_number",
        "shop_promptpay_name",
        "telegram_bot_token",
        "telegram_chat_id",
        "telegram_notify_shift_close",
        "google_sheet_webhook_url",
        "google_sheet_webhook_secret",
        "google_sheet_id",
        "backup_retention_count",
        "gdrive_backup_enabled",
        "gdrive_retention_days",
        "shift_day_start",
        "shift_night_start",
        "shift_night_end"
      ];
      var SHIFT_TIME_KEYS = ["shift_day_start", "shift_night_start", "shift_night_end"];
      function parseHM(value) {
        const m = /^(\d{1,2}):(\d{2})$/.exec(String(value == null ? "" : value).trim());
        if (!m) return null;
        const h = Number(m[1]);
        const min = Number(m[2]);
        if (h > 23 || min > 59) return null;
        return h * 100 + min;
      }
      var INTERNAL_KEYS = /* @__PURE__ */ new Set(["auth_pin_hash"]);
      var SENSITIVE_KEYS = /* @__PURE__ */ new Set([
        "telegram_bot_token",
        "google_sheet_webhook_url",
        "google_sheet_webhook_secret"
      ]);
      var MASK_PREFIX = "\u2022\u2022\u2022\u2022";
      function maskValue(value) {
        if (!value) return "";
        const str = String(value);
        if (str.length < 8) return MASK_PREFIX;
        return MASK_PREFIX + str.slice(-4);
      }
      function isMasked(value) {
        return typeof value === "string" && value.startsWith(MASK_PREFIX);
      }
      var MANAGER_READABLE_PREFIXES = ["shop_"];
      function canManagerRead(key) {
        return MANAGER_READABLE_PREFIXES.some((prefix) => key.startsWith(prefix));
      }
      router.get("/", (req, res, next) => {
        try {
          const db = getDb();
          const rows = db.prepare(`SELECT key, value FROM settings`).all();
          const settingsMap = {};
          const ownerView = isOwner(req);
          for (const r of rows) {
            if (INTERNAL_KEYS.has(r.key)) continue;
            if (!ownerView && !canManagerRead(r.key)) continue;
            if (SENSITIVE_KEYS.has(r.key)) {
              settingsMap[r.key] = maskValue(r.value);
              settingsMap[r.key + "_configured"] = !!(r.value && r.value.length > 0);
            } else {
              settingsMap[r.key] = r.value;
            }
          }
          res.json(settingsMap);
        } catch (error) {
          next(error);
        }
      });
      router.post("/", requireOwner, (req, res, next) => {
        try {
          const settingsObj = req.body || {};
          const db = getDb();
          const nowIso = (/* @__PURE__ */ new Date()).toISOString();
          const incoming = Object.keys(settingsObj).filter((k) => SETTINGS_WHITELIST.includes(k));
          if (incoming.length === 0) {
            throw badRequest("\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E17\u0E35\u0E48\u0E2D\u0E19\u0E38\u0E0D\u0E32\u0E15\u0E43\u0E2B\u0E49\u0E41\u0E01\u0E49\u0E44\u0E02");
          }
          const keys = incoming.filter((k) => !isMasked(settingsObj[k]));
          const skipped = incoming.filter((k) => isMasked(settingsObj[k]));
          if (keys.length === 0) {
            return res.json({ success: true, message: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07", skipped });
          }
          for (const k of keys) {
            const raw = settingsObj[k];
            if (k === "google_sheet_webhook_url" && raw) {
              validateOutboundUrl(raw, ["script.google.com", "script.googleusercontent.com"], "Google Sheet Webhook URL");
            }
            if (k === "backup_retention_count") {
              const n = Number(raw);
              if (!Number.isFinite(n) || n < 3 || n > 365) {
                throw badRequest("\u0E08\u0E33\u0E19\u0E27\u0E19\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E40\u0E01\u0E47\u0E1A\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 3-365");
              }
            }
            if (k === "gdrive_retention_days") {
              const n = Number(raw);
              if (!Number.isFinite(n) || n < 3 || n > 3650) {
                throw badRequest("\u0E08\u0E33\u0E19\u0E27\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E01\u0E47\u0E1A\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E1A\u0E19 Drive \u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 3-3650");
              }
            }
            if (k === "gdrive_backup_enabled" && !["true", "false"].includes(String(raw))) {
              throw badRequest("\u0E04\u0E48\u0E32\u0E40\u0E1B\u0E34\u0E14/\u0E1B\u0E34\u0E14\u0E01\u0E32\u0E23\u0E2A\u0E48\u0E07\u0E2A\u0E33\u0E40\u0E19\u0E32\u0E02\u0E36\u0E49\u0E19 Drive \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19 true \u0E2B\u0E23\u0E37\u0E2D false");
            }
            if (SHIFT_TIME_KEYS.includes(k) && parseHM(raw) === null) {
              throw badRequest(`\u0E40\u0E27\u0E25\u0E32\u0E01\u0E30\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A \u0E0A\u0E21:\u0E19\u0E32\u0E17\u0E35 \u0E40\u0E0A\u0E48\u0E19 20:00 (\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A "${String(raw)}")`);
            }
          }
          if (keys.some((k) => SHIFT_TIME_KEYS.includes(k))) {
            const current = {};
            for (const row of db.prepare(`
        SELECT key, value FROM settings WHERE key IN ('shift_day_start', 'shift_night_start', 'shift_night_end')
      `).all()) current[row.key] = row.value;
            const merged = {};
            for (const k of SHIFT_TIME_KEYS) {
              merged[k] = keys.includes(k) ? settingsObj[k] : current[k];
            }
            const dayStart = parseHM(merged.shift_day_start);
            const nightStart = parseHM(merged.shift_night_start);
            const nightEnd = parseHM(merged.shift_night_end);
            if (dayStart === null || nightStart === null || nightEnd === null) {
              throw badRequest("\u0E40\u0E27\u0E25\u0E32\u0E01\u0E30\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A \u0E0A\u0E21:\u0E19\u0E32\u0E17\u0E35 \u0E04\u0E23\u0E1A\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E32\u0E21\u0E0A\u0E48\u0E2D\u0E07");
            }
            const overlapsNight = nightStart < nightEnd ? dayStart >= nightStart && dayStart < nightEnd : dayStart >= nightStart || dayStart < nightEnd;
            if (overlapsNight) throw badRequest("\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E30 1 \u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E19\u0E2D\u0E01\u0E0A\u0E48\u0E27\u0E07\u0E01\u0E30 2 (\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E23\u0E07\u0E40\u0E27\u0E25\u0E32\u0E08\u0E1A\u0E01\u0E30 2 \u0E44\u0E14\u0E49)");
            if (dayStart === nightStart) {
              throw badRequest("\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E30 1 \u0E01\u0E31\u0E1A\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E30 2 \u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E19 \u0E44\u0E21\u0E48\u0E07\u0E31\u0E49\u0E19\u0E01\u0E30 1 \u0E08\u0E30\u0E22\u0E32\u0E27 0 \u0E19\u0E32\u0E17\u0E35");
            }
            if (nightStart === nightEnd) {
              throw badRequest("\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E30 2 \u0E01\u0E31\u0E1A\u0E40\u0E27\u0E25\u0E32\u0E08\u0E1A\u0E01\u0E30 2 \u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E19 \u0E44\u0E21\u0E48\u0E07\u0E31\u0E49\u0E19\u0E01\u0E30 2 \u0E08\u0E30\u0E01\u0E34\u0E19\u0E17\u0E31\u0E49\u0E07\u0E27\u0E31\u0E19");
            }
          }
          const finalUrl = keys.includes("google_sheet_webhook_url") ? settingsObj.google_sheet_webhook_url : db.prepare(`SELECT value FROM settings WHERE key = 'google_sheet_webhook_url'`).get()?.value || "";
          const finalSecret = keys.includes("google_sheet_webhook_secret") ? settingsObj.google_sheet_webhook_secret : db.prepare(`SELECT value FROM settings WHERE key = 'google_sheet_webhook_secret'`).get()?.value || "";
          if (finalUrl && String(finalUrl).trim() && !String(finalSecret).trim()) {
            throw badRequest("\u0E15\u0E31\u0E49\u0E07 Google Sheet Webhook URL \u0E41\u0E25\u0E49\u0E27\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E23\u0E2D\u0E01\u0E23\u0E2B\u0E31\u0E2A\u0E25\u0E31\u0E1A (Secret) \u0E14\u0E49\u0E27\u0E22 \u2014 \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E27\u0E49\u0E19 URL \u0E27\u0E48\u0E32\u0E07\u0E44\u0E27\u0E49\u0E16\u0E49\u0E32\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E49");
          }
          if (finalSecret && !/^[A-Za-z0-9_-]{16,200}$/.test(String(finalSecret).trim())) {
            throw badRequest("\u0E23\u0E2B\u0E31\u0E2A\u0E25\u0E31\u0E1A (Secret) \u0E15\u0E49\u0E2D\u0E07\u0E22\u0E32\u0E27 16-200 \u0E15\u0E31\u0E27 \u0E41\u0E25\u0E30\u0E43\u0E0A\u0E49\u0E44\u0E14\u0E49\u0E40\u0E09\u0E1E\u0E32\u0E30 A-Z a-z 0-9 _ - \u0E43\u0E2B\u0E49\u0E43\u0E0A\u0E49\u0E23\u0E2B\u0E31\u0E2A\u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E23\u0E31\u0E19\u0E1F\u0E31\u0E07\u0E01\u0E4C\u0E0A\u0E31\u0E19 setupPosWebhookSecret \u0E43\u0E19 Apps Script");
          }
          const upsert = db.prepare(`
      INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
    `);
          db.transaction(() => {
            for (const k of keys) {
              const v = settingsObj[k];
              upsert.run(k, v === null || v === void 0 ? "" : String(v), nowIso);
            }
          })();
          res.json({
            success: true,
            message: "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22",
            updated: keys,
            skipped
          });
        } catch (error) {
          next(error);
        }
      });
      router.post("/test-telegram", requireOwner, async (req, res, next) => {
        try {
          const { token, chatId } = req.body || {};
          const result = await sendTestNotification(
            isMasked(token) ? null : token,
            isMasked(chatId) ? null : chatId
          );
          res.json(result);
        } catch (error) {
          next(error);
        }
      });
      router.post("/test-google-sheet", requireOwner, async (req, res, next) => {
        try {
          const { webhookUrl } = req.body || {};
          const url = !webhookUrl || isMasked(webhookUrl) ? null : validateOutboundUrl(webhookUrl, ["script.google.com", "script.googleusercontent.com"], "Google Sheet Webhook URL");
          const result = await testGoogleSheetConnection(url);
          res.json(result);
        } catch (error) {
          next(error);
        }
      });
      router.get("/gas-template", requireOwner, (req, res, next) => {
        try {
          res.type("text/plain").send(getGasTemplate());
        } catch (error) {
          next(error);
        }
      });
      router.post("/backup-now", async (req, res, next) => {
        try {
          const result = await backupDatabase("manual");
          res.status(result.success ? 200 : 500).json(result);
        } catch (error) {
          next(error);
        }
      });
      router.post("/backups", async (req, res, next) => {
        try {
          const result = await backupDatabase("manual");
          res.status(result.success ? 200 : 500).json(result);
        } catch (error) {
          next(error);
        }
      });
      router.post("/backups/restore", requireOwner, (req, res, next) => {
        try {
          const { filename, confirm } = req.body || {};
          if (!filename) throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19");
          if (confirm !== "RESTORE") {
            throw badRequest('\u0E01\u0E32\u0E23\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19\u0E08\u0E30\u0E17\u0E31\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E48\u0E07 confirm = "RESTORE" \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19');
          }
          const result = restoreFromBackup(filename);
          if (result.success) revokeAllTokens();
          res.status(result.success ? 200 : 400).json(result);
        } catch (error) {
          next(error);
        }
      });
      router.get("/drive-backups", requireOwner, async (req, res, next) => {
        try {
          const result = await listDriveBackups();
          res.status(result.success ? 200 : 502).json(result);
        } catch (error) {
          next(error);
        }
      });
      router.post("/drive-backups/restore", requireOwner, async (req, res, next) => {
        try {
          const { fileId, confirm } = req.body || {};
          if (!fileId || typeof fileId !== "string") throw badRequest("\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E1A\u0E19 Drive \u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19");
          if (confirm !== "RESTORE") {
            throw badRequest('\u0E01\u0E32\u0E23\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19\u0E08\u0E30\u0E17\u0E31\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E48\u0E07 confirm = "RESTORE" \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19');
          }
          const result = await restoreFromDriveBackup(fileId, { beforeCommit: ownerCommitGuard(req) });
          if (result.success) revokeAllTokens();
          res.status(result.success ? 200 : 400).json(result);
        } catch (error) {
          next(error);
        }
      });
      router.get("/backups", requireOwner, (req, res, next) => {
        try {
          res.json(listLocalBackups(clampLimit(req.query.limit, 365, 100)));
        } catch (error) {
          next(error);
        }
      });
      module.exports = router;
    }
  });

  // ../ipad/engine/main.cjs
  var require_main = __commonJS({
    "../ipad/engine/main.cjs"() {
      globalThis.Buffer = require_buffer().Buffer;
      var { host } = require_host();
      var { Router } = require_router();
      var { getDb, closeDb } = require_db();
      var auth = require_auth();
      var { processCloseJobs } = require_shiftCloseQueue();
      var app = Router();
      var financialPaths = /* @__PURE__ */ new Set(["/orders", "/payouts/pay-therapist", "/payouts/pay-bulk"]);
      var financial = (req) => req.method === "POST" && financialPaths.has(req.path);
      function canonical(value) {
        if (Array.isArray(value)) return value.map(canonical);
        if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
        return value;
      }
      function init() {
        const db = getDb();
        db.exec(`CREATE TABLE IF NOT EXISTS ipad_pending_requests (
    request_id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, path TEXT NOT NULL, payload TEXT NOT NULL,
    response TEXT, created_at TEXT NOT NULL)`);
        return db;
      }
      app.use("/auth", auth.createAuthRouter());
      app.use(auth.requireAuth);
      app.get("/runtime/status", (req, res) => res.json({
        platform: "ipad",
        localDatabase: true,
        integrationsAvailable: false,
        schemaVersion: getDb().prepare("SELECT version FROM schema_version WHERE id=1").get().version
      }));
      app.get("/runtime/pending", (req, res) => res.json(init().prepare(
        "SELECT request_id,path,payload,response,created_at FROM ipad_pending_requests WHERE user_id=? ORDER BY created_at"
      ).all(req.user.id).map((r) => ({ ...r, payload: JSON.parse(r.payload), response: r.response ? JSON.parse(r.response) : null }))));
      app.post("/runtime/ack", (req, res) => {
        const row = init().prepare("SELECT response FROM ipad_pending_requests WHERE request_id=? AND user_id=?").get(req.body?.requestId, req.user.id);
        if (!row?.response) return res.status(409).json({ error: "\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E27\u0E08\u0E1C\u0E25\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E14\u0E34\u0E21\u0E01\u0E48\u0E2D\u0E19\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19" });
        init().prepare("DELETE FROM ipad_pending_requests WHERE request_id=? AND user_id=?").run(req.body.requestId, req.user.id);
        res.json({ success: true });
      });
      app.post("/runtime/resume", async (req, res, next) => {
        try {
          await processCloseJobs();
          res.json({ success: true });
        } catch (e) {
          next(e);
        }
      });
      app.post("/runtime/export", auth.requireOwner, (req, res) => {
        host("backup.validate", { name: req.body?.name });
        res.json({ success: true, nativeAction: "export", name: req.body.name });
      });
      app.post("/runtime/import", auth.requireOwner, (req, res) => res.json({ success: true, nativeAction: "import" }));
      app.use((req, res, next) => {
        if (/^\/reports\/sync-sheet/.test(req.path) || /^\/settings\/(test-|gas-template|drive-backups)/.test(req.path)) {
          return res.status(501).json({ error: "\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E20\u0E32\u0E22\u0E19\u0E2D\u0E01\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E1B\u0E34\u0E14\u0E43\u0E0A\u0E49\u0E43\u0E19\u0E41\u0E2D\u0E1B iPad \u0E23\u0E38\u0E48\u0E19\u0E19\u0E35\u0E49" });
        }
        if (financial(req)) {
          const id = req.body?.clientRequestId;
          if (typeof id !== "string" || !/^[a-zA-Z0-9_-]{8,100}$/.test(id)) return res.status(400).json({ error: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E23\u0E2B\u0E31\u0E2A\u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" });
          const db = init();
          const prior = db.prepare("SELECT * FROM ipad_pending_requests WHERE request_id=?").get(id);
          const payload = JSON.stringify(canonical(req.body));
          if (prior) {
            if (prior.user_id !== req.user.id || prior.path !== req.path || prior.payload !== payload) return res.status(409).json({ error: "\u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E19\u0E35\u0E49\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E14\u0E34\u0E21\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27 \u0E2B\u0E49\u0E32\u0E21\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E22\u0E2D\u0E14\u0E2B\u0E23\u0E37\u0E2D\u0E1C\u0E39\u0E49\u0E17\u0E33\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23" });
            req.nativeRequestId = id;
            if (prior.response) {
              const saved = JSON.parse(prior.response);
              if (saved.data?.order?.id) {
                const current = db.prepare("SELECT * FROM orders WHERE id=?").get(saved.data.order.id);
                if (!current) return res.status(409).json({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1A\u0E34\u0E25\u0E40\u0E14\u0E34\u0E21\u0E43\u0E19\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E48\u0E2D\u0E19\u0E17\u0E33\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23" });
                saved.data.order = { ...saved.data.order, ...current };
              }
              if (saved.data?.payout?.id) saved.data.payout = db.prepare("SELECT * FROM commission_payouts WHERE id=?").get(saved.data.payout.id);
              return res.status(saved.status).json(saved.data);
            }
          } else {
            if (db.prepare("SELECT 1 FROM ipad_pending_requests WHERE user_id=?").get(req.user.id)) return res.status(409).json({ error: "\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E1C\u0E25 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E14\u0E34\u0E21\u0E01\u0E48\u0E2D\u0E19\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E21\u0E48" });
            db.prepare("INSERT INTO ipad_pending_requests (request_id,user_id,path,payload,created_at) VALUES (?,?,?,?,?)").run(id, req.user.id, req.path, payload, (/* @__PURE__ */ new Date()).toISOString());
          }
          req.nativeRequestId = id;
        }
        next();
      });
      app.use("/users", require_users());
      app.use("/rooms", require_rooms());
      app.use("/therapists", require_therapists());
      app.use("/services", require_services());
      app.use("/shifts", require_shifts());
      app.use("/orders", require_orders());
      app.use("/payouts", require_payouts());
      app.use("/expenses", require_expenses());
      app.use("/reports", require_reports());
      app.use("/settings", require_settings());
      var tail = Promise.resolve();
      function dispatch(input) {
        return new Promise((resolve) => {
          let finished = false;
          const headers = Object.fromEntries(Object.entries(input.headers || {}).map(([k, v]) => [k.toLowerCase(), v]));
          const req = {
            method: String(input.method || "GET").toUpperCase(),
            path: input.path,
            body: input.body || {},
            query: input.query || {},
            params: {},
            headers,
            ip: "local-ipad",
            socket: { remoteAddress: "local-ipad" }
          };
          let status = 200;
          const responseHeaders = {};
          const finish = (data) => {
            if (finished) return;
            finished = true;
            try {
              if (req.nativeRequestId && (status < 400 || status < 500 && ![401, 403, 408, 429].includes(status))) {
                init().prepare("UPDATE ipad_pending_requests SET response=? WHERE request_id=?").run(JSON.stringify({ status, data }), req.nativeRequestId);
              }
              resolve({ status, data, headers: responseHeaders, ...req.nativeRequestId ? { nativeRequestId: req.nativeRequestId } : {} });
            } catch (e) {
              resolve({ status: 503, data: { error: "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E1C\u0E25\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E14\u0E34\u0E21" } });
            }
          };
          const res = {
            status(code) {
              status = code;
              return res;
            },
            json: finish,
            send: finish,
            type(value) {
              responseHeaders["content-type"] = value;
              return res;
            }
          };
          const fail = (e) => {
            status = e?.status || 500;
            finish({ error: status >= 500 ? "\u0E23\u0E30\u0E1A\u0E1A\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E17\u0E33\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E1C\u0E25\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E14\u0E34\u0E21" : e.message });
          };
          try {
            if (typeof req.path !== "string" || !/^\/[a-zA-Z0-9/_-]*$/.test(req.path)) {
              status = 400;
              return finish({ error: "\u0E40\u0E2A\u0E49\u0E19\u0E17\u0E32\u0E07\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" });
            }
            if (JSON.stringify(input).length > 1024 * 1024) {
              status = 413;
              return finish({ error: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B" });
            }
            init();
            app.handle(req, res, (error) => {
              if (error) return fail(error);
              status = 404;
              finish({ error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E19\u0E35\u0E49" });
            });
          } catch (e) {
            fail(e);
          }
        });
      }
      globalThis.POSNative = {
        request(input) {
          const work = tail.then(async () => {
            const response = await dispatch(input);
            if (input.path === "/shifts/close" && response.status === 200) {
              try {
                await processCloseJobs();
              } catch (_) {
              }
              response.data.warnings = ["\u0E15\u0E23\u0E27\u0E08\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E43\u0E19\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32 \u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01\u0E40\u0E01\u0E47\u0E1A\u0E19\u0E2D\u0E01 iPad; \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E20\u0E32\u0E22\u0E19\u0E2D\u0E01\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E1B\u0E34\u0E14\u0E43\u0E0A\u0E49\u0E43\u0E19\u0E23\u0E38\u0E48\u0E19\u0E19\u0E35\u0E49"];
            }
            return response;
          });
          tail = work.catch(() => {
          });
          return work;
        },
        close() {
          auth.revokeAllTokens();
          closeDb();
        },
        lock() {
          auth.revokeAllTokens();
        }
      };
    }
  });
  require_main();
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
