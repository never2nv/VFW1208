/*
Title: Style.css
Author: Paul J. Miller
VFW-1208
Date: 08/14/2012
Project 3: Heritage Tree
*/
// If DOM is ready then proceed with rest of code
    window.addEventListener("DOMContentLoaded", function(){
	
	// alert(localStorage.length);
	
	//getElementById Function
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
		if($('favorite').checked){
			favoriteValue = $('favorite').value;	
		} else{
			favoriteValue = "No";
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('mainInfo').style.display = "none";
				$('clearData').style.display = "inline";
				$('displayData').style.display = "none";
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
		
	// If no key then it will generate a brand new key
	if(!key){
		var id			= Math.floor(Math.random()*100000001);
	}else{
		
	// Otherwise set id to the pre-existing key that's beeing edited, and can save over the original data
		id = key;
	}
		// Gather up all our form field values and store in an object.
		// Object properties will contain array with form label and input values.
		getCheckBoxValue();
		var item		= {};
		item.relation = ["Relation:", $('relation').value];
		item.fname    = ["First Name:", $('fname').value];
		item.mname    = ["Middle Name:", $('mname').value];
		item.lname    = ["Last Name:", $('lname').value];
		item.favorite	= ["Mark As Favorite:", $('favorite').value];
		item.history  = ["History:", $('history').value];
		item.rating   = ["Rating:", $('rating').value];
		item.dob      = ["Date of Birth:", $('dob').value];
		item.dod      = ["Date of Death:", $('dod').value];
		item.honors	= ["Military Honors:", $('honors').value];
		item.rwar	= ["Revolutionary War:", $('rwar').value];
		item.cwar	= ["Civil War:", $('cwar').value];
		item.ww1	= ["World War I:", $('ww1').value];
		item.ww2	= ["World War II:", $('ww2').value];
		item.vwar	= ["Vietnam:", $('vwar').value];
		// Saving data into local storage Use Stringify to convert object into a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Family Member Saved!");	
	}
		
	function getData(){
	toggleControls("on");
	if(localStorage.length === 0){
		alert("There is no heritage data in storage!");
	}
		// Write data from local storage to browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0; i<localStorage.length; i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
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
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // Create edit and delete buttons for (localStorage) data.
		}
	}
	
	// Make Item Links: creates an edit and delete link to every single localStorage item.
	function makeItemLinks(key, linksLi){
		// Edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Relative";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		// Line Break Tag
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		// Delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Relative";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}	
	
	function editItem(){
		// Grab data of item from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		// Show forum
		toggleControls("off");
		
		// Populate form fields with Item info.	
		$('relation').value = item.relation[1];
		$('fname').value = item.fname[1];
		$('mname').value = item.mname[1];
		$('lname').value = item.lname[1];
		$('honors').value = item.honors[1];
		var checkBox = document.forms[0].honors;
		for(var i=0; i<checkBox.length; i++){
			if(checkBox[i].value == "rwar" && item.honors[1] == "rwar"){
				checkBox[i].setAttribute("checked", "checked");
			}
			if(checkBox[i].value == "cwar" && item.honors[1] == "cwar"){
				checkBox[i].setAttribute("checked", "checked");
			}
			if(checkBox[i].value == "ww1" && item.honors[1] == "ww1"){
				checkBox[i].setAttribute("checked", "checked");
			}
			if(checkBox[i].value == "ww2" && item.honors[1] == "ww2"){
				checkBox[i].setAttribute("checked", "checked");
			}	
			if(checkBox[i].value == "vwar" && item.honors[1] == "vwar"){
				checkBox[i].setAttribute("checked", "checked");
			}
		}
		
		if(item.favorite[1] == "Yes"){
			$('fav').setAttribute("checked", "checked");
		}
		
		$('history').value = item.history[1];
		$('rating').value = item.rating[1];
		$('dob').value = item.dob[1];
		
		// Remove initial savedata listener button.
		save.removeEventListener("click", storeData);
		// Change the initial submit button value to edit
		$('submit').value = "Edit Relative";
		var editRelative = $('submit');
		// Save tracked key of this function as a property.
		editRelative.addEventListener("click", validate);
		editRelative.key = this.key;
	}
	
	// Delete single item from localStorage
	function deleteItem(){
		var confirm = confirm("Are you sure you want to delete this relative? Press cancel to abort deletion.");
		if(confirm){
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Relative was deleted successfully!");
		}else{
			alert("Deletion of relative has been CANCELED! Relative's data left in-tact!");
		}
	}
	
	// Clear local storage function
	function clearStorage(){
		if(localStorage.length === 0){
			alert("No data to clear.");
		}else {
			localStorage.clear();
			alert("All relative's have been deleted.");
			window.location.reload();
			return false;
		}
	}
	
	// Check or validate items within the relative's data.
	function validate(e){
		// Define what should be checked
		var getRelation = $('relation'),
			getFname = $('fname'),
			getMname = $('mname'),
		    getLname = $('lname');
		    // getDob = $('dob');  <= Decided to not make this required as they may not know their DOB/DOD
		    getRelation.style.border = "1px solid red";
		    getFname.style.border = "1px solid red";
		    getMname.style.border = "1px solid red";
		    getLname.style.border = "1px solid red";
		    
		    // Reset error messages
		    errorMsg.innerHTML = "";
		    
		// Get Error Messages
		var errorArray = [];
		
		// Relation Validation
		if(getRelation=="--Choose A Family Relation--"){
			var relationError = "Please choose a family relation!";
			getRelation.style.border = "1px solid red";
			errorArray.push(groupError);
		}	
		
		// First Name validation
		if(getFname==""){
			var fNameError = "Please enter a first name!";
			getRname.style.border = "1px solid red";
			errorArray.push(fNameError);
		}
		
		// Middle Name validation
		if(getMname==""){
			var mNameError = "Please enter a middle name or initial!";
			getRname.style.border = "1px solid red";
			errorArray.push(mNameError);
		}
		
		// Last Name validation
		if(getLname==""){
			var lNameError = "Please enter a last name!";
			getRname.style.border = "1px solid red";
			errorArray.push(lNameError);
		}

		// If errors are present, display on screen
		if(errorArray.length >= 1) {
			for(var i=0, j=errorArray.length; i<j;i++){
				var txt = document.createElement('li');
				txt.innerHTML = errorArray[i];
				errorMsg.appendChild(txt);
			}
		e.preventDefault();
		return false;
		}else{
			// No errors, then save the relative data to local storage.
			storeData(this.key);	
			// The above sends the key value from editData function.
		}
	
  }

	// Variable defaults
	var relationCategory = ["--Choose A Family Relation--", "Mother", "Father", "Spouse", "Unknown"],
		favoriteValue = "No";
		
	makeCats();
	
	// Set link & click events
	var displayData = $('displayData');
	displayData.addEventListener("click", getData);
	var clearLink = $('clearData');
	clearLink.addEventListener("click", clearStorage);
	var save = $('submit');
	save.addEventListener("click", storeData);
} );