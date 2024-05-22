function trimSpace(str)
{
	while(str && str.indexOf(" ") == 0)
		str = str.substring(1);
	while(str && str.lastIndexOf(" ") == str.length-1)
		str = str.substring(0, str.length-1);
	while(str && str.indexOf)
	return str;
}
function trimEnter(str) {
    while (str && (str.startsWith("\n") || str.startsWith("\r")))
        str = str.substring(1);
    while (str && (str.endsWith("\n") || str.endsWith("\r")))
        str = str.substring(0, str.length - 1);
    return str;
}

function trimData(data) {
    if(typeof(data)=='number') data += "";
    return trimSpace(data);
}
function trimData2(data) {
    if(typeof(data)=='number') data += '';
    data = trimSpace(data);
    data = trimEnter(data);
    if(data && (data.indexOf(" ") == 0 || data.lastIndexOf(" ") == data.length-1 || (data.startsWith("\n") || data.startsWith("\r"))|| (data.endsWith("\n") || data.endsWith("\r")))) trimdata2(data);
    return data;
}


