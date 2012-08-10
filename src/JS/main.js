/*
Title: Style.css
Author: Paul J. Miller
VFW-1208
Date: 07/03/2012
Project 2: Heritage Tree
*/
// If DOM is ready then proceed with rest of code
window.addEventListener("DOMContentLoaded", function(){
	
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	// Select field and populate it
	function makeCats(){
		// formTag = Array of all form tags available
		var formTag = document.getElementsByTagName("form"),
		selectLi = $('select'),
		makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "groups");
		for(var i=0, j=relationCategory.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = relationCategory[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	// Find value of checkbox
	function getCheckBoxValue(){
		if ($('favorite').checked){
			favoriteValue = $('favorite').value;	
		}else{
			favoriteValue = "No"
		 }
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('mainInfo').style.display = "none";
				$('clearData').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('mainInfo').style.display = "block";
				$('clearData').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(){
		var id			= Math.floor(Math.random()*100000001);
		// Gather up all our form field values and store in an object.
		// Object properties will contain array with form label and input values.
		getCheckBoxValue();
		var item		= {};
		item.relation = ["Relation:", $('relation').value];
		item.fname    = ["First Name:", $('fname').value];
		item.mname    = ["Middle Name:", $('mname').value];
		item.lname    = ["Last Name:", $('lname').value];
		item.history  = ["History:", $('history').value];
		item.rating   = ["Rating:", $('rating').value];
		item.dob      = ["Date of Birth:", $('dob').value];
		item.favorite	= ["Mark As Favorite:", $('favorite').value];
		item.honors	= ["Military Honors:", $('favorite').value];
		// Saving data into local storage Use Stringify to convert object into a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Family Member Saved!");	
	}
	
	function getData(){
	toggleControls("on");
		// Write data from local storage to browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0; i<localStorage.length; i++){
			var makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// JSON PARSE is opposite of stringify, parsing tunrs vlaue into an object!
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for (var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;	
			}
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no relatives to clear!");
		}else{
			localStorage.clear();
			alert("All relatives are deleted!");
			window.location.reload();
			return false;
		}
	}
	
	// Variable defaults
	var relationCategory = ["--Choose A Family Relation--", "Mother", "Father", "Spouse", "Unknown"],
		favoriteValue = "No";
		
	makeCats();
	
	// Set link & click events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clearData');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);
)
};