
Typr._bin = {
	readFixed : function(data, o)
	{
		return ((data[o]<<8) | data[o+1]) +  (((data[o+2]<<8)|data[o+3])/(256*256+4));
	},
	readF2dot14 : function(data, o)
	{
		var num = Typr._bin.readShort(data, o);
		return num / 16384;
	},
	readInt : function(buff, p)
	{
		return Typr._bin._view(buff).getInt32(p);
	},
	readInt8 : function(buff, p)
	{
		return Typr._bin._view(buff).getInt8(p);
	},
	readShort : function(buff, p)
	{
		return Typr._bin._view(buff).getInt16(p);
	},
	readUshort : function(buff, p)
	{
		return Typr._bin._view(buff).getUint16(p);
	},
	readUshorts : function(buff, p, len)
	{
		var arr = [];
		for(var i=0; i<len; i++) arr.push(Typr._bin.readUshort(buff, p+i*2));
		return arr;
	},
	readUint : function(buff, p)
	{
		return Typr._bin._view(buff).getUint32(p);
	},
	readUint64 : function(buff, p)
	{
		//if(p>=buff.length) throw "error";
		return (Typr._bin.readUint(buff, p)*(0xffffffff+1)) + Typr._bin.readUint(buff, p+4);
	},
	readASCII : function(buff, p, l)	// l : length in Characters (not Bytes)
	{
		//if(p>=buff.length) throw "error";
		var s = "";
		for(var i = 0; i < l; i++) s += String.fromCharCode(buff[p+i]);
		return s;
	},
	readUnicode : function(buff, p, l)
	{
		//if(p>=buff.length) throw "error";
		var s = "";
		for(var i = 0; i < l; i++)	
		{
			var c = (buff[p++]<<8) | buff[p++];
			s += String.fromCharCode(c);
		}
		return s;
	},
	_tdec : function() {
		return typeof window !== 'undefined' && window["TextDecoder"] ? new window["TextDecoder"]() : null;
	},
	readUTF8 : function(buff, p, l) {
		var tdec = Typr._bin._tdec;
		if(tdec && p==0 && l==buff.length) return tdec["decode"](buff);
		return Typr._bin.readASCII(buff,p,l);
	},
	readBytes : function(buff, p, l)
	{
		//if(p>=buff.length) throw "error";
		var arr = [];
		for(var i=0; i<l; i++) arr.push(buff[p+i]);
		return arr;
	},
	readASCIIArray : function(buff, p, l)	// l : length in Characters (not Bytes)
	{
		//if(p>=buff.length) throw "error";
		var s = [];
		for(var i = 0; i < l; i++)	
			s.push(String.fromCharCode(buff[p+i]));
		return s;
	},
	_view: function(buff) {
		return buff._dataView || (buff._dataView = buff.buffer ?
			new DataView(buff.buffer, buff.byteOffset, buff.byteLength) :
			new DataView(new Uint8Array(buff).buffer)
		);
	}
};
