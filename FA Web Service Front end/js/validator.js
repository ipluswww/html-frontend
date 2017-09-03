// JavaScript Document

/***************************	Validating Email	***************************/
function emailCheck (emailStr) {
var emailPat=/^(.+)@(.+)$/
var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
var validChars="\[^\\s" + specialChars + "\]"
var quotedUser="(\"[^\"]*\")"
var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
var atom=validChars + '+'
var word="(" + atom + "|" + quotedUser + ")"
var userPat=new RegExp("^" + word + "(\\." + word + ")*$")
var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")
var matchArray=emailStr.match(emailPat)
if (matchArray==null) {
	alert("Email address seems incorrect (check @ and .'s)")
	return false
}
var user=matchArray[1]
var domain=matchArray[2]
if (user.match(userPat)==null) {
    alert("The username doesn't seem to be valid.")
    return false
}
var IPArray=domain.match(ipDomainPat)
if (IPArray!=null) {
    // this is an IP address
	  for (var i=1;i<=4;i++) {
	    if (IPArray[i]>255) {
	        alert("Destination IP address is invalid!")
		return false
	    }
    }
    return true
}
var domainArray=domain.match(domainPat)
if (domainArray==null) {
	alert("The domain name doesn't seem to be valid.")
    return false
}
var atomPat=new RegExp(atom,"g")
var domArr=domain.match(atomPat)
var len=domArr.length
if (domArr[domArr.length-1].length<2 || 
    domArr[domArr.length-1].length>4) {
   alert("Email address must end in a valid domain, or two letter country.")
   return false
}
if (len<2) {
   var errStr="Email address is missing a hostname!"
   alert(errStr)
   return false
}

   var str=emailStr; 
   if (emailStr.indexOf(" ")>=0)
		{
		alert ("Blank space not allowed inside email!");
		return false;
		}
	
		if (emailStr.indexOf("@",1) == -1)
		{
			alert("Invalid E-Mail address");
			return(false);
		}
		if (emailStr.indexOf("@") == 0)
		{
			alert("Invalid E-Mail address");
			return(false);
		}
		if (emailStr.indexOf(".",5) == -1)
		{
			alert("Invalid E-Mail address");
			return(false);
		}
		if (emailStr.indexOf(".") == 0)
		{
			alert("Invalid E-Mail address");
			return(false);
		}
		
		if ((emailStr.lastIndexOf(".")) -(emailStr.indexOf("@"))<3 )
		{
		
			alert("Invalid E-Mail address");
			return(false);
		}
		
		if ((emailStr.length)-(emailStr.indexOf("."))<2)
		{
			alert("Invalid E-Mail address");
			return(false);
		}

		var posat=str.indexOf("@");
		var posdot=str.indexOf(".");
		var rposdot=str.lastIndexOf(".");
		//alert(posat); 
		//alert(posdot);
		//alert(rposdot);
		
		
		if(rposdot==posdot)
		if((posdot < posat) || (posdot-posat < 3))
		{
		//alert("needs at last 3 cars between @ and . sign");
		alert("Invalid E-Mail address");
		return false;
		}
		
		if(str.charAt(str.length-1)==".")
		{
		//alert("cannot end with .");
		alert("Invalid E-Mail address");
		return false;
		}
		
		if(str.charAt(str.length-1)=="@")
		{
		//alert("cannot end with @");
		alert("Invalid E-Mail address");
		return false;
		}
		
		var j=0;
		for( var i=0;i<str.length;i++)
		{
		if(str.charAt(i) == "@")
		j++;
		}
		if(j > 1)
		{
		//alert("only one @ sign allowed");
		alert("Invalid E-Mail address");
		return false;
		}

return true;
}

function validate_email(email,mandatory,errmsg)
{
	if (mandatory==1 && email.value=='')
	{
		alert(errmsg);
		email.focus();
		return (false);
	}
	if (email.value!='' && !emailCheck (email.value) )
	{
		email.focus();
		email.select();
		return (false);
	}
	return(true);
}
/***************************	/Validating Email	***************************/

/***************************	/Validating Email	***************************/

function validate_email_noalert(email,mandatory,errmsg)
{
    if (mandatory==1 && email.value=='')
    {
        //alert(errmsg);
        //email.focus();
        return (false);
    }
    if (email.value!='' && !emailCheck (email.value) )
    {
        //email.focus();
        //email.select();
        return (false);
    }
    return(true);
}
/***************************	/Validating Email	***************************/

/***************************	Validating Text	***************************/
function validate_text(data,mandatory,errmsg)
{
	if (mandatory==1 && data.value=='')
	{
		alert(errmsg);
		data.focus();
		//data.select();
		return (false);
	}
	
	if (data.value!='' && (data.value.replace(/^\s+|\s+$/, '').length<=0) )
	{
		alert(errmsg);
		data.focus();
		//data.select();
		return (false);
	}
	return(true);
}
/***************************	/Validating Text	***************************/

/***************************	Validating Text	***************************/
function validate_text_noalert(data,mandatory,errmsg)
{
    if (mandatory==1 && data.value=='')
    {
        //alert(errmsg);
        //data.focus();
        //data.select();
        return (false);
    }

    if (data.value!='' && (data.value.replace(/^\s+|\s+$/, '').length<=0) )
    {
        //alert(errmsg);
        //data.focus();
        //data.select();
        return (false);
    }
    return(true);
}
/***************************	/Validating Text	***************************/

/***************************	Validating Text with no focus	***************************/
function validate_text_no_focus(data,mandatory,errmsg)
{
	if (mandatory==1 && data.value=='')
	{
		alert(errmsg);
		return (false);
	}
	
	if (data.value!='' && (data.value.replace(/^\s+|\s+$/, '').length<=0) )
	{
		alert(errmsg);
		return (false);
	}
	return(true);
}
/***************************	/Validating Text with no focus	***************************/


/***************************	Validating Numeric	***************************/
function validate_numeric(data,mandatory,errmsg)
{
	if (mandatory==1 && data.value=='')
	{
        if (errmsg != "n"){
            alert(errmsg);
            data.focus();
        }
		return (false);
	}
	if (data.value!='' && (isNaN(data.value) || (data.value<0) || (data.value.replace(/^\s+|\s+$/, '').length<=0)) )
	{
        if (errmsg != "n"){
            alert(errmsg);
            data.focus();
            data.select();
        }
		return (false);
	}
	return(true);
}
/***************************	/Validating Numeric	***************************/

/***************************	Validating PNumeric	***************************/
function validate_pnumeric(data,mandatory,errmsg)
{
	if (mandatory==1 && data.value=='')
	{
        if (errmsg != "n"){
            alert(errmsg);
            data.focus();
        }
		return (false);
	}
	if (data.value!='' && (isNaN(data.value) || (data.value<=0) || (data.value.replace(/^\s+|\s+$/, '').length<=0)) )
	{
        if (errmsg != "n"){
            alert(errmsg);
            data.focus();
            data.select();
        }
		return (false);
	}
	return(true);
}
/***************************	/Validating Numeric	***************************/

/***************************	Validating Numeric	***************************/
function validate_numeric_ng(data,mandatory,errmsg)
{
	if (mandatory==1 && data.value=='')
	{
		alert(errmsg);
		data.focus();
		return (false);
	}
	if (data.value!='' && (isNaN(data.value) || (data.value.replace(/^\s+|\s+$/, '').length<=0)) )
	{
		alert(errmsg);
		data.focus();
		data.select();
		return (false);
	}
	return(true);
}
/***************************	/Validating Numeric	***************************/


/***************************	Validating Integer	***************************/
function validate_integer(data,mandatory,errmsg)
{
	if (mandatory==1 && data.value=='')
	{
		alert(errmsg);
		data.focus();
		return (false);
	}
	if (   data.value!='' && (   isNaN(data.value) || (data.value<0) || (data.value.replace(/^\s+|\s+$/, '').length<=0) || (data.value.indexOf('.')!=-1)   )   )
	{
		alert(errmsg);
		data.focus();
		data.select();
		return (false);
	}
	return(true);
}
/***************************	/Validating Integer	***************************/


/***************************	Check Minimum Length	***************************/
function validate_min_length(data,len,errmsg)
{
	if (   data.value!='' && (data.value.length<len) )
	{
		alert(errmsg);
		data.focus();
		data.select();
		return (false);
	}
	return(true);
}
/***************************	/Check Minimum Length	***************************/


/***************************	Check Maximum Length	***************************/
function validate_max_length(data,len,errmsg)
{
	if (   data.value!='' && (data.value.length>len) )
	{
		alert(errmsg);
		data.focus();
		data.select();
		return (false);
	}
	return(true);
}
/***************************	/Check Maximum Length	***************************/



/***************************	Phone number validation	***************************/

/**
 * DHTML phone number validation script. Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/)
 */

// Declaring required variables
var digits = "0123456789";
// non-digit characters which are allowed in phone numbers
var phoneNumberDelimiters = "()- ";
// characters which are allowed in international phone numbers
// (a leading + is OK)
var validWorldPhoneChars = phoneNumberDelimiters + "+";
// Minimum no of digits in an international phone no.
var minDigitsInIPhoneNumber = 10;

function isInteger(s)
{   var i;
    for (i = 0; i < s.length; i++)
    {   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag)
{   var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++)
    {   
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function checkInternationalPhone(strPhone){
s=stripCharsInBag(strPhone,validWorldPhoneChars);
return (isInteger(s) && s.length >= minDigitsInIPhoneNumber);
}

function validate_phone_no(data,mandatory,errmsg){
	var Phone=data
	
	if (mandatory==1 && data.value=='')
	{
		alert(errmsg);
		data.focus();
		return (false);
	}
	if (   data.value!='' && checkInternationalPhone(Phone.value)==false){
		alert(errmsg);
		Phone.focus();
		Phone.select();
		return false
	}
	return true
 }
/***************************	/Phone number validation	***************************/

/***************************	Credit Card Validation	******************************/
function validateCreditCard(s) {
var v = "0123456789";
var w = "";
for (var i=0; i < s.length; i++) {
x = s.charAt(i);
if (v.indexOf(x,0) != -1)
w += x;
}
var j = w.length / 2;
if (j < 6.5 || j > 8 || j == 7) return false;
var k = Math.floor(j);
var m = Math.ceil(j) - k;
var c = 0;
for (var i=0; i<k; i++) {
a = w.charAt(i*2+m) * 2;
c += a > 9 ? Math.floor(a/10 + a%10) : a;
}
for (var i=0; i<k+m; i++) c += w.charAt(i*2+1-m) * 1;
return (c%10 == 0);
}

function validate_credit_card(data,mandatory,errmsg)
{
	if (mandatory==1 && data.value=='')
	{
		alert(errmsg);
		data.focus();
		return (false);
	}
	
	if (data.value!='' && (validateCreditCard(data.value)==false) )
	{
		alert(errmsg);
		data.focus();
		data.select();
		return (false);
	}
	return(true);
}

/***************************	Credit Card Validation	******************************/







//Manual...............................

// Email Verification
		//return validate_email(document.FormName.FieldName,0);	//2nd arg=if mandatory then 1 else 0
// Text Verification
		//return validate_text(document.FormName.FieldName,0,"Message..");	//2nd arg=if mandatory then 1 else 0
// Min Length Verification
		//return validate_min_length(document.FormName.FieldName,MinLen,"Message..");	//2nd arg=if mandatory then 1 else 0
// Max Length Verification
		//return validate_max_length(document.FormName.FieldName,MaxLen,"Message..");	//2nd arg=if mandatory then 1 else 0
// Numeric Verification
		//return validate_numeric(document.FormName.FieldName,0,"Message..");	//2nd arg=if mandatory then 1 else 0
// Integer Verification
		//return validate_integer(document.FormName.FieldName,0,"Message..");	//2nd arg=if mandatory then 1 else 0
// Phone number Verification
		//return validate_phone_no(document.FormName.FieldName,0,"Message..");	//2nd arg=if mandatory then 1 else 0
// Credit Card Verification
		//return validate_credit_card(document.FormName.FieldName,0,"Message..");	//2nd arg=if mandatory then 1 else 0


//-- all other common function -- may be delete for new pro

function allTrim(sString) 
{
	while (sString.substring(0,1) == ' ')
	{
	sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' ')
	{
	sString = sString.substring(0,sString.length-1);
	}
return sString;
}

function numeric_chk(dtt,mss){

   if(dtt=="")
        {
          alert("Enter " + mss);          
          return false;
        }
    if(isNaN(dtt))
        {
          alert("Enter Numeric Value For " + mss);          
          return false;
        } 
    if(eval(dtt)<0)
        {
          alert("Enter Positive Value For " + mss);          
          return false;
        }

    return true
}

function sch_ck(){

  var a=document.skey.pkeyword.value
      //a=a.trim
  var b=a.length
  if (b<3){
    alert("Please input atleast 3 alphabets")
    document.skey.pkeyword.focus()
    return false
  }else{
    return true
  }
}

function taLimit(ele,mlen) {
	//var taObj=event.srcElement;
	var taObj=document.getElementById(ele);	
	//if (taObj.value.length==mlen*1) return false;
	if (taObj.value.length == (mlen+1)*1) return false;
}

function taCount(ele,visCnt,mlen) { 
	//var taObj=event.srcElement;
	var taObj=document.getElementById(ele);	
	if (taObj.value.length>mlen*1) taObj.value=taObj.value.substring(0,mlen*1);	
	if (visCnt) document.getElementById(visCnt).innerHTML=mlen-taObj.value.length;
}

function Show_MQ(Element){

  var oId=document.getElementById(Element)
  oId.style.visibility = "visible";
  oId.style.display = "";
 }

 function Hide_MQ(Element){

  var oId=document.getElementById(Element)
  oId.style.visibility = "hidden";
  oId.style.display = "none";
 } 

 function check_past_date(dt, mn, yr, errmsg){
	var selecteddate = new Date(yr.value, eval(mn.value)-1, dt.value);
	var chkdate = new Date();
	var difference = selecteddate - chkdate;
	var formatdifference = Math.round(difference/1000/60/60/24)
	if (formatdifference < 0){ 
	    alert(errmsg);
		dt.focus();		
		return (false);
	} else { 
	  return true; 
	}
 }
 
function check_file_valid(asc, f_ext, f_mess, whreq){
	 if (whreq == "y"){
		 if (asc == ""){
			alert("Please select File for Upload");  
			return false;
		 }
	 }
	 
	 if (asc != ""){
	   var le = asc.length;
	   var poin = asc.lastIndexOf(".");
	   var accu1 = asc.substring(poin,le);				
	   var accu = accu1.toLowerCase();
	   
	   if (accu != f_ext){
		 alert ("Please select " + f_mess + " file");
		 allok = "n";
		 return false;
	  }
	 }
	 
	 return true;
}

function image_validation(asc, whreq, allowedext, optn){
     if(typeof(optn)==='undefined') optn = 1;
	 if (whreq == "y"){
		 if (asc == ""){
             if (optn == 1){
                 alert("Please select image");
             }
			return false;
		 }
	 }
	 
	 if (asc != ""){
	   if (allowedext == ""){
	   	   allowedext = ".jpg, .jpeg, .gif, .png";
	   }
	   
	   temp = new Array();
	   temp = allowedext.split(", ");
	   //templen = temp.length;	   
	   
	   var le = asc.length;
	   var poin = asc.lastIndexOf(".");
	   var accu1 = asc.substring(poin,le);				
	   var accu = accu1.toLowerCase();
	   
	   iffound = jQuery.inArray(accu, temp);
	   if (iffound < 0){
           if (optn == 1){
               alert ("Please select valid Image file ("+allowedext+")");
           }
		   return false;
	   }
	 }	 
	 return true;
}

function file_validation(asc, whreq, allowedext, optn){
    if(typeof(optn)==='undefined') optn = 1;
	 if (whreq == "y"){
		 if (asc == ""){
             if (optn == 1){
                 alert("Please select file");
             }
			 return false;
		 }
	 }
	 
	 if (asc != ""){
	   if (allowedext == ""){
	   	   allowedext = ".pdf, .doc, .docx, .ppt, .zip";
	   }
	   
	   temp = new Array();
	   temp = allowedext.split(", ");
	   //templen = temp.length;	   
	   
	   var le = asc.length;
	   var poin = asc.lastIndexOf(".");
	   var accu1 = asc.substring(poin,le);				
	   var accu = accu1.toLowerCase();
	   
	   iffound = jQuery.inArray(accu, temp);
	   if (iffound < 0){
           if (optn == 1){
               alert ("Please select valid file ("+allowedext+")");
           }
		   return false;
	   }
	 }	 
	 return true;
}
 
function editor_validation(inst, msg){
	var oEditor = CKEDITOR.instances[inst];
	message_val = oEditor.getData();		
	if (message_val == ""){
		alert ("Please enter " + msg);
		oEditor.focus();
		return false;
	}	
	return true;
}

function editor_data_set(inst, msg){
	var oEditor = CKEDITOR.instances[inst];
	oEditor.setData(msg);	
	return true;
}

function field_validation(pass_vl, minlen, fieldcap, whmessage){
	 var pass_len = pass_vl.length;
	 if (pass_len < minlen){
         if (fieldcap != ""){
             alert ( fieldcap + " must be at least " + minlen + " character");
         }
		 return false; 
	 }
	 return true;
}

function username_validation(){
	 if(!validate_text(document.ff.d_username,1,"Please enter Username")){
	    return false;
	 }
     dt = document.ff.d_username;
     if (field_validation(dt.value, 6, 'Username')==false){
        dt.focus();
        return false;
     }
	 return true;
}
 
function password_validation(){
	 if(!validate_text(document.ff.d_password,1,"Please enter Password")){
	    return false;
	 }
	 
	 dt = document.ff.d_password;
	 if (field_validation(dt.value, 6, 'Password')==false){
		  dt.focus();
		  return false;
	 }
	 
	 if(!validate_text(document.ff.cd_password,1,"Please confirm your Password")){
	    return false;
	 }
	 
	 if(allTrim(document.ff.d_password.value) != allTrim(document.ff.cd_password.value)){
          alert("Password doesn't match");
          document.ff.d_password.value = "";
          document.ff.cd_password.value = "";
          document.ff.d_password.focus();
          return false;
     }
	 
	 return true;
}

function datefield_validation(fieldname, fieldcaption, whreq){
	 dt = document.getElementById(fieldname);
	 if (whreq == "y"){
		 if(!validate_text(document.getElementById(fieldname),1,"Please enter " + fieldcaption)){
		    return false;
		 }		 
	 }
	 
	 if (dt.value != ""){	 
		 if (isDate(dt.value)==false){
			 dt.focus();
			 return false;
		 }
	 }
	 return true;
}

function field_validation_border(fieldid, fieldtype){
    capt = $('#' + fieldid).attr('capt');
    if (fieldtype == 1){
        if(!validate_text_noalert(document.getElementById(fieldid),1,"", "n")){
            $("#" + capt).addClass("requiredfield");
            return false;
        }else{
            $("#" + capt).removeClass("requiredfield");
            return true;
        }
    }

    if (fieldtype == 2){
        if(!validate_email_noalert(document.getElementById(fieldid),1,"", "n")){
            $("#" + capt).addClass("requiredfield");
            return false;
        }else{
            $("#" + capt).removeClass("requiredfield");
            return true;
        }
    }
}

function make_round(ab){
    val=""+Math.round(100*ab);
    while (val.length <= 2) {
        val="0"+val;
    }
    var dec_point = val.length-2;
    var first_part = val.substring(0,dec_point);
    var second_part = val.substring(dec_point,val.length);
    var result = first_part+"."+second_part;
    return result;
}

function number_round(cnumber){
    cnumber = Math.round(cnumber*Math.pow(10,2))/Math.pow(10,2);
    return cnumber;

}

//-- date part
var dtCh= "/";
var minYear=1900;
var maxYear=2100;

function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this
}

function isDate(dtStr){
	var daysInMonth = DaysArray(12)
	var pos1=dtStr.indexOf(dtCh)
	var pos2=dtStr.indexOf(dtCh,pos1+1)
	
	var strMonth=dtStr.substring(0,pos1)
	var strDay=dtStr.substring(pos1+1,pos2)
	var strYear=dtStr.substring(pos2+1)
	
	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	month=parseInt(strMonth)
	day=parseInt(strDay)
	year=parseInt(strYr)
	if (pos1==-1 || pos2==-1){
		alert("The date format should be : MM/DD/YYYY")
		return false
	}
	if (strMonth.length<1 || month<1 || month>12){
		alert("Please enter a valid month")
		return false
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		alert("Please enter a valid day")
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
		return false
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		alert("Please enter a valid date")
		return false
	}
return true
}
//--