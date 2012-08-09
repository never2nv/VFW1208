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
	
	function storeData(){
		localStorage.setItem("test", "hello");
		
	}
	
	// Variable defaults
	var relationCategory = ["--Choose A Family Relation--", "Mother", "Father", "Spouse", "Unknown"];
	makeCats();
	
	// Set link & click events
/*
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	*/
	var save = $('submit');
	save.addEventListener("click", storeData);
	
	
	
});