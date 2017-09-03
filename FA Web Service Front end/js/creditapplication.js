$(document).ready(function(){
	
	//credit application	
	$("#application_type_id").change(function(){
		var application_type_id = $(this).val();
		
		$(".corp_llc_trust").addClass("com_none");
		
		if (application_type_id == 2){
			$(".s2").show();
			$(".jointapplicant").show();
		}else{
			$(".s2").hide();
			$(".jointapplicant").hide();
			
			if (application_type_id == 3){
				$(".corp_llc_trust").removeClass("com_none");
			}
		}
	});	
	
	$("#us_citizen").click(function(){
		if($(this).is(':checked')){
			$(".citizencountry").hide();
		}else{
			$(".citizencountry").show();
		}
	});	
	
	 $("#address_year").keyup(function(){
		 var addressyear = $(this).val();
		 addressyear = parseInt(addressyear);
		 if (addressyear < 3){
			 $('#pevious_address').show();
		 }else{
			 $('#pevious_address').hide();
		 }
	 });
	 
	 $(".prior_bankruptcy").click(function(){
		var selected_opt = $('input[name=prior_bankruptcy]:radio:checked').val(); 
		if(selected_opt == 1){
			$(".bankruptcyyear").show();
		}else{
			$(".bankruptcyyear").hide();
		}
	});
	
	$("#engine_no, #tradein_engine_no").change(function(){
		var fieldvalue = $(this).attr("fieldvalue");
        horsepower_individual_calculate(fieldvalue);
    });

    $("#horsepower_individual, #tradein_horsepower_individual").blur(function(){
		var fieldvalue = $(this).attr("fieldvalue");
        horsepower_individual_calculate(fieldvalue);
    });
	
	$("#tradein").click(function(){
		if($(this).is(':checked')){
			$(".tradeinclass").show();
		}else{
			$(".tradeinclass").hide();
			$('#trade_amount').val("");
			$('#trade_payoff').val("");
		}
		$(this).loanamount();
	});
	 
	 $("#emp_year").keyup(function(){
		 var empyear = $(this).val();
		 empyear = parseInt(empyear);
		 if (empyear < 3){
			 $('#pevious_employer').show();
		 }else{
			 $('#pevious_employer').hide();
		 }
	 });
	 
	 $("#co_app_address_year").keyup(function(){
		 var addressyear = $(this).val();
		 addressyear = parseInt(addressyear);
		 if (addressyear < 3){
			 $('#co_app_pevious_address').show();
		 }else{
			 $('#co_app_pevious_address').hide();
		 }
	 });
	 
	 $("#co_app_emp_year").keyup(function(){
		 var empyear = $(this).val();
		 empyear = parseInt(empyear);
		 if (empyear < 3){
			 $('#co_app_pevious_employer').show();
		 }else{
			 $('#co_app_pevious_employer').hide();
		 }
	 });
	 	  
	 $.fn.loanamount = function(){
		 var purchase_price = parseFloat($('#purchase_price').val());
		 var estimated_tax_rate = parseFloat($('#estimated_tax_rate').val());
		 var estimated_tax_pay = (purchase_price * estimated_tax_rate)/100;
		 estimated_tax_pay = number_round(estimated_tax_pay);
		 if(isNaN(estimated_tax_pay)) { estimated_tax_pay = 0; }
		 $(".estimated_tax_pay").html(digits("$" + estimated_tax_pay));
		 
		 var cash_down = parseFloat($('#cash_down').val());
		 var cash_down_per = $("#cash_down_per").val();
		 cash_down_per = parseInt(cash_down_per);
		 if (cash_down_per > 0){
			cash_down = (purchase_price * cash_down_per) / 100;
			cash_down = number_round(cash_down);	
			$("#cash_down").val(cash_down);
		 }else{
			 if(isNaN(cash_down)) { cash_down = 0; }
		 }
			 
		 var net_purchase_amount = purchase_price + estimated_tax_pay - cash_down;
		 if(isNaN(net_purchase_amount)) { net_purchase_amount = 0; }
		 $(".net_purchase_amount").html(digits("$" + net_purchase_amount));
		 
		 var trade_amount = parseFloat($('#trade_amount').val());
		 var trade_payoff = parseFloat($('#trade_payoff').val());
		
		 if(isNaN(trade_amount)) { trade_amount = 0; }
		 if(isNaN(trade_payoff)) { trade_payoff = 0; }
		 
		 var desired_loan_amount = net_purchase_amount - trade_amount + trade_payoff;
		 if(isNaN(desired_loan_amount)) { desired_loan_amount = 0; }
		 $(".desired_loan_amount").html(digits("$" + desired_loan_amount));
	 }	 
	 
	 $("#cash_down_per").change(function(){
		 $(this).loanamount();
	 });
	 
	 $("#purchase_price, #estimated_tax_rate, #cash_down, #trade_amount, #trade_payoff").keyup(function(){
		 $(this).loanamount();
	 });
	 

	$.fn.step1 = function(){
		var all_ok = "y";
		var setfocus = 'n';
		
		/*Applicant*/
		if (!field_validation_border("application_type_id", 3, 1)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'application_type_id_heading');
        }
		
		if (!field_validation_border("fname", 1, 1)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'fname');
        }
		
		if (!field_validation_border("lname", 1, 1)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'lname');
        }
		
		if (!datefield_validation_border("dob", "", 0)){ 
			all_ok = "n"; 
			setfocus = set_field_focus(setfocus, 'dob'); 		   
	    }
		
		if (!field_validation_border("social_security", 1, 1)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'social_security');
        }
		
		if (!field_validation_border("drivers_license", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'drivers_license');
        }
		
		if (!field_validation_border("drivers_license_state", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'drivers_license_state');
        }
		
		if (!field_validation_border("email", 2, 1)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'email');
        }
		
		if(!$("#us_citizen").is(':checked')){
			if (!field_validation_border("citizen_country", 3, 1)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'citizen_country_heading');
			}
		}
		/*end*/
		
		/*Current Address*/
		if (!field_validation_border("address", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'address');
        }
		
		if (!field_validation_border("city", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'city');
        }
		
		if (!field_validation_border("state", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'state');
        }
		
		if (!field_validation_border("zip", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'zip');
        }
		
		if (!field_validation_border("country", 3, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'country_heading');
        }
			
		if (!field_validation_border("address_year", 5, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'address_year');
		}
		
		if (!field_validation_border("address_month", 5, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'address_month');
		}
		
		if (!field_validation_border("monthly_payment", 4, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'monthly_payment');
		}
		
		yr = $("#address_year").val();
		mn = $("#address_month").val();		
		yr = parseInt(yr);
		mn = parseInt(mn);
		if ((yr == 0) && (mn == 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'address_year');
		}		
		/*end*/
		
		/*Previous Address*/
		var addressyear = $("#address_year").val();
		addressyear = parseInt(addressyear);
		if (addressyear < 3){
			 if (!field_validation_border("prev_address", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_address');
			}
			
			if (!field_validation_border("prev_city", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_city');
			}
			
			if (!field_validation_border("prev_state", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_state');
			}
			
			if (!field_validation_border("prev_zip", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_zip');
			}
			
			if (!field_validation_border("prev_country", 3, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_country_heading');
			}
				
			if (!field_validation_border("prev_address_year", 5, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_address_year');
			}
			
			if (!field_validation_border("prev_address_month", 5, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_address_month');
			}
			
			if (!field_validation_border("prev_monthly_payment", 4, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_monthly_payment');
			}
			
			yr = $("#prev_address_year").val();
			mn = $("#prev_address_month").val();		
			yr = parseInt(yr);
			mn = parseInt(mn);
			if ((yr == 0) && (mn == 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_address_year');
			}
		}
		/*end*/
		
		/*Current Employer*/
		if (!field_validation_border("employer", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'employer');
		}
		
		if (!field_validation_border("emp_address", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'emp_address');
		}
		
		if (!field_validation_border("emp_city", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'emp_city');
		}
		
		if (!field_validation_border("emp_state", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'emp_state');
		}
		
		if (!field_validation_border("emp_zip", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'emp_zip');
		}
		
		if (!field_validation_border("emp_country", 3, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'emp_country_heading');
		}

		if (!field_validation_border("emp_year", 5, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'emp_year');
		}
		
		if (!field_validation_border("emp_month", 5, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'emp_month');
		}
		
		if (!field_validation_border("emp_position", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'emp_position');
		}
		
		yr = $("#emp_year").val();
		mn = $("#emp_month").val();		
		yr = parseInt(yr);
		mn = parseInt(mn);
		if ((yr == 0) && (mn == 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'emp_year');
		}
		/*end*/
		
		/*Previous Employer*/
		var empyear = $("#emp_year").val();
		empyear = parseInt(empyear);
		if (empyear < 3){
			if (!field_validation_border("prev_employer", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_employer');
			}
			
			if (!field_validation_border("prev_emp_address", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_emp_address');
			}
			
			if (!field_validation_border("prev_emp_city", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_emp_city');
			}
			
			if (!field_validation_border("prev_emp_state", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_emp_state');
			}
			
			if (!field_validation_border("prev_emp_zip", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_emp_zip');
			}
			
			if (!field_validation_border("prev_emp_country", 3, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_emp_country_heading');
			}
			
			if (!field_validation_border("prev_emp_year", 5, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_emp_year');
			}
			
			if (!field_validation_border("prev_emp_month", 5, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_emp_month');
			}
			
			yr = $("#prev_emp_year").val();
			mn = $("#prev_emp_month").val();		
			yr = parseInt(yr);
			mn = parseInt(mn);
			if ((yr == 0) && (mn == 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'prev_emp_year');
			}
		}
		/*end*/
		
		/*Income*/
		if (!field_validation_border("wages", 4, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'wages');
		}
		
		if (!field_validation_border("oth_income", 4, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'oth_income');
		}
		/*end*/
		
		/*Other Information*/		
		if($("#prior_bankruptcy").is(':checked')){
			if (!field_validation_border("bankruptcy_year", 5, 1)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'bankruptcy_year');
			}
		}
		/*end*/
		
		if (all_ok == "n"){            
            return false;
        }
        return true;
	}
	
	$.fn.step2 = function(){
		var all_ok = "y";
		var setfocus = 'n';
		
		/*Co-Applicant*/
		if (!field_validation_border("co_app_fname", 1, 1)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'co_app_fname');
        }
		
		if (!field_validation_border("co_app_lname", 1, 1)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'co_app_lname');
        }
		
		if (!datefield_validation_border("co_app_dob", "", 0)){ 
			all_ok = "n"; 
			setfocus = set_field_focus(setfocus, 'co_app_dob'); 		   
	    }
		
		if (!field_validation_border("co_app_social_security", 1, 1)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'co_app_social_security');
        }
		
		if (!field_validation_border("co_app_drivers_license", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'co_app_drivers_license');
        }
		
		if (!field_validation_border("co_app_drivers_license_state", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'co_app_drivers_license_state');
        }
		
		if (!field_validation_border("co_app_email", 2, 1)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'co_app_email');
        }
		/*end*/
		
		/*Co - Current Address*/
		if (!field_validation_border("co_app_address", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'co_app_address');
        }
		
		if (!field_validation_border("co_app_city", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'co_app_city');
        }
		
		if (!field_validation_border("co_app_state", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'co_app_state');
        }
		
		if (!field_validation_border("co_app_zip", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'co_app_zip');
        }
		
		if (!field_validation_border("co_app_country", 3, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_country_heading');
		}
		
		if (!field_validation_border("co_app_address_year", 5, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_address_year');
		}
		
		if (!field_validation_border("co_app_address_month", 5, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_address_month');
		}
		
		if (!field_validation_border("co_app_monthly_payment", 4, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_monthly_payment');
		}
		
		yr = $("#co_app_address_year").val();
		mn = $("#co_app_address_month").val();		
		yr = parseInt(yr);
		mn = parseInt(mn);
		if ((yr == 0) && (mn == 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_address_year');
		}
		/*end*/
		
		/*co-Previous Address*/
		var coaddressyear = $("#co_app_address_year").val();
		coaddressyear = parseInt(coaddressyear);
		if (coaddressyear < 3){
			if (!field_validation_border("co_app_prev_address", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_address');
			}
			
			if (!field_validation_border("co_app_prev_city", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_city');
			}
			
			if (!field_validation_border("co_app_prev_state", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_state');
			}
			
			if (!field_validation_border("co_app_prev_zip", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_zip');
			}
			
			if (!field_validation_border("co_app_prev_country", 3, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_country_heading');
			}
				
			if (!field_validation_border("co_app_prev_address_year", 5, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_address_year');
			}
			
			if (!field_validation_border("co_app_prev_address_month", 5, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_address_month');
			}
			
			if (!field_validation_border("co_app_prev_monthly_payment", 4, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_monthly_payment');
			}
			
			yr = $("#co_app_prev_address_year").val();
			mn = $("#co_app_prev_address_month").val();		
			yr = parseInt(yr);
			mn = parseInt(mn);
			if ((yr == 0) && (mn == 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_address_year');
			}
		}
		/*end*/
		
		/*Co-Current Employer*/
		if (!field_validation_border("co_app_employer", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_employer');
		}
		
		if (!field_validation_border("co_app_emp_address", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_emp_address');
		}
		
		if (!field_validation_border("co_app_emp_city", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_emp_city');
		}
		
		if (!field_validation_border("co_app_emp_state", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_emp_state');
		}
		
		if (!field_validation_border("co_app_emp_zip", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_emp_zip');
		}
		
		if (!field_validation_border("co_app_emp_country", 3, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_emp_country_heading');
		}
			
		if (!field_validation_border("co_app_emp_year", 5, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_emp_year');
		}
		
		if (!field_validation_border("co_app_emp_month", 5, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_emp_month');
		}
		
		if (!field_validation_border("co_app_emp_position", 1, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_emp_position');
		}
		
		yr = $("#co_app_emp_year").val();
		mn = $("#co_app_emp_month").val();		
		yr = parseInt(yr);
		mn = parseInt(mn);
		if ((yr == 0) && (mn == 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_emp_year');
		}
		/*end*/
		
		/*Co-Previous Employer*/
		var coempyear = $("#co_app_emp_year").val();
		coempyear = parseInt(coempyear);
		if (coempyear < 3){
			if (!field_validation_border("co_app_prev_employer", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_employer');
			}
			
			if (!field_validation_border("co_app_prev_emp_address", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_emp_address');
			}
			
			if (!field_validation_border("co_app_prev_emp_city", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_emp_city');
			}
			
			if (!field_validation_border("co_app_prev_emp_state", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_emp_state');
			}
			
			if (!field_validation_border("co_app_prev_emp_zip", 1, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_emp_zip');
			}
			
			if (!field_validation_border("co_app_prev_emp_country", 3, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_emp_country_heading');
			}
					
			if (!field_validation_border("co_app_prev_emp_year", 5, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_emp_year');
			}
			
			if (!field_validation_border("co_app_prev_emp_month", 5, 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_emp_month');
			}
			
			yr = $("#co_app_prev_emp_year").val();
			mn = $("#co_app_prev_emp_month").val();		
			yr = parseInt(yr);
			mn = parseInt(mn);
			if ((yr == 0) && (mn == 0)){
				all_ok = "n";
				setfocus = set_field_focus(setfocus, 'co_app_prev_emp_year');
			}
		}
		/*end*/
		
		/*Co-Income*/
		if (!field_validation_border("co_app_wages", 4, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_wages');
		}
		
		if (!field_validation_border("co_app_oth_income", 4, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'co_app_oth_income');
		}
		/*end*/
		
		if (all_ok == "n"){            
            return false;
        }
        return true;
	}
	
	$.fn.step3 = function(){
		var all_ok = "y";
		var setfocus = 'n';
		
		/*Boat Information*/
		if (!field_validation_border("boat_manufacturer", 1, 0)){
            all_ok = "n";
            setfocus = set_field_focus(setfocus, 'boat_manufacturer');
        }
		
		if (!field_validation_border("boat_year", 4, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'boat_year');
		}
		
		if (!field_validation_border("boat_price", 4, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'boat_price');
		}
		/*end*/
		
		/*Loan Information*/
		var check_loan_mandatory = 0;
		purchase_price = $("#purchase_price").val();
		estimated_tax_rate = $("#estimated_tax_rate").val();
		cash_down = $("#cash_down").val();
		trade_amount = $("#trade_amount").val();
		trade_payoff = $("#trade_payoff").val();
		
		if ((purchase_price != "") || (estimated_tax_rate != "") || (cash_down != "")){
			check_loan_mandatory = 1;
		}		
		
		if (!field_validation_border("purchase_price", 4, check_loan_mandatory)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'purchase_price');
		}
		
		if (!field_validation_border("estimated_tax_rate", 4, check_loan_mandatory)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'estimated_tax_rate');
		}
		
		if (!field_validation_border("cash_down", 4, check_loan_mandatory)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'cash_down');
		}
		
		if (!field_validation_border("trade_amount", 4, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'trade_amount');
		}
		
		if (!field_validation_border("trade_payoff", 4, 0)){
			all_ok = "n";
			setfocus = set_field_focus(setfocus, 'trade_payoff');
		}
		/*end*/
		
		if (all_ok == "n"){            
            return false;
        }
        return true;
	}
	
	$.fn.step4 = function(){
		var all_ok = "y";
		var setfocus = 'n';
		
		//asset
		var assetcounter = 0;
		$(".assetamt").each(function(){
			var rowassetamt = parseFloat($(this).val());
			if($.isNumeric(rowassetamt)) {
				assetcounter = 1;
			}
		});
		
		if (assetcounter == 0){
			all_ok = "n";
		}
		//end
		
		//liabilities
		var liabilitiescounter = 0;
		$(".liabilitiesamt").each(function(){
			var rowassetamt = parseFloat($(this).val());
			if($.isNumeric(rowassetamt)) {
				liabilitiescounter = 1;
			}
		});
		
		if (liabilitiescounter == 0){
			all_ok = "n";
		}
		//end
		
		//pmt
		$(".pmtamt").each(function(){
			var idd = $(this).attr("id");
			if (!field_validation_border(idd, 4, 0)){						
				setfocus = set_field_focus(setfocus, idd);
				all_ok = "n";
			}
		});			
		//end
		
		if (all_ok == "n"){            
            return false;
        }
        return true;
	}
	
	$(".nextbutton").click(function(){
		var nextstep = parseInt($(this).attr('nextstep'));
		var previousstep = nextstep - 1;
		var all_ok = "y";		
		
		//form 1 submit
		if (nextstep == 2){
			if (!$(this).step1()){
				all_ok = "n";
			}			
		}
		//end
		
		//form 2 submit		
		if (nextstep == 3){
			if (!$(this).step2()){
				all_ok = "n";
			}					
		}
		//end
		
		//form 3 submit
		if (nextstep == 4){
			if (!$(this).step3()){
				all_ok = "n";
			}
		}
		//end
		
		//form 4 submit
		if (nextstep == 5){
			if (!$(this).step4()){
				errormessagepop("Please fill this form properly");						
				all_ok = "n";
			}
		}
		//end	
	
		//step setup
		if (nextstep == 2){
			var application_type_id = $("#application_type_id").val();
			application_type_id = parseInt(application_type_id);
			if (application_type_id == 2){
				/*---*/
			}else{
				nextstep = nextstep + 1;
			}
		}
		
		if (all_ok == "y"){   
			$('ul.stephead li').removeClass('active');
			$('.s' + previousstep).addClass('completed');
			$('.s' + nextstep).addClass('active');
		         
            $('#form' + previousstep).hide();
			$('#form' + nextstep).show();
			
			$('body,html').animate({
				scrollTop: 0
			}, 400);
        }
	});
	
	$(".prevbutton").click(function(){
		var prevstep = parseInt($(this).attr('prevstep'));
		var nextstep = prevstep + 1;
		
		if (prevstep == 2){
			var application_type_id = $("#application_type_id").val();
			application_type_id = parseInt(application_type_id);
			if (application_type_id == 2){
				/*---*/
			}else{
				prevstep = prevstep - 1;
			}
		}
		
		$('ul.stephead li').removeClass('active');
		$('.s' + prevstep).removeClass('completed');
		$('.s' + prevstep).addClass('active');
		
		$('#form' + nextstep).hide();
		$('#form' + prevstep).show();  
		
		$('body,html').animate({
			scrollTop: 0
		}, 400);                   
    });
	
	$(".submitbutton").click(function(){
		var all_ok = "y";
		
		if (!$(this).step1()){
			all_ok = "n";
		}
		
		var application_type_id = $("#application_type_id").val();
		application_type_id = parseInt(application_type_id);
		if (application_type_id == 2){
			if (!$(this).step2()){
				all_ok = "n";
			}
		}
		
		if (!$(this).step3()){
			all_ok = "n";
		}	
		
		//credit authorization 	
		if(!($("#applicant_auth").is(':checked'))){
			all_ok = "n";
			$(".credit_authorization").addClass("indicateborder");
		}
		
		if (application_type_id == 2){
			if(!($("#co_applicant_auth").is(':checked'))){
				all_ok = "n";
				$(".credit_authorization").addClass("indicateborder");
			}
		}
		//end	
		
		if (all_ok == "y"){ 
			$("#creditapplication-ff" ).submit();
		}else{
			return false;
		}
    });
	//end
	
});

function horsepower_individual_calculate(fieldvalue){
	var engine_no = $("#"+ fieldvalue +"engine_no").val();
	var horsepower_individual = $("#"+ fieldvalue +"horsepower_individual").val();
	var horsepower_combined = engine_no * horsepower_individual;
	horsepower_combined = number_round(horsepower_combined);
	$("."+ fieldvalue +"horsepower_combined_v").html(horsepower_combined);
}