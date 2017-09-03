// JavaScript Document

/*$(document).ready(function(){
	$(".lngd").click(function(){
		var lang = $(this).attr("lang");
		translate(lang);
	});
});*/

function googleTranslateElementInit() {
	new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,de,fr,es,ru,it,pt,ja,zh-CN', autoDisplay: false}, 'google_translate_element'); //remove the layout
}

function triggerHtmlEvent(element, eventName){
    var event;
    if(document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, true);
        element.dispatchEvent(event);
    }
    else {
    	event = document.createEventObject();
        event.eventType = eventName;
        element.fireEvent('on' + event.eventType, event);
    }
}

$(document).ready(function() {
	$(".lang-change").click(function(e){
		e.preventDefault();		
		var lang = $(this).data('lang');
		$.cookie("selectedlanguage", lang);
		
		if ((lang == "Russian") || (lang == "French") || (lang == "German") || (lang == "Italian") || (lang == "Spanish")){
			$("ul.nav-menu").addClass("navlan");
		}else{
			$("ul.nav-menu").removeClass("navlan");
		}
		
		$(".language li").removeClass("active");
		$(this).parent().parent().addClass("active");
		
		$('#google_translate_element select option').each(function(){
			if($(this).text().indexOf(lang) > -1) {
				$(this).parent().val($(this).val());
				var container = document.getElementById('google_translate_element');
				var select = container.getElementsByTagName('select')[0];
				triggerHtmlEvent(select, 'change');
			}
		});
	}); 
	
	//---
	var getlancookie = $.cookie("selectedlanguage");
	if ((getlancookie != "") && (typeof(getlancookie) != "undefined")){
		$(".language li").removeClass("active");
		$("." + getlancookie).parent().parent().addClass("active");
		
		if ((getlancookie == "Russian") || (getlancookie == "French") || (getlancookie == "German") || (getlancookie == "Italian") || (getlancookie == "Spanish")){
			$("ul.nav-menu").addClass("navlan");
		}else{
			$("ul.nav-menu").removeClass("navlan");
		}
	}
});