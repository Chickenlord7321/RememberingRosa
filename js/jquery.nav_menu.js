/**
 * Author: Caleb Bronn
 * Last update: 10 Apr 2025
 * This jQuery script changes the icon of the hamburger menu when clicked, and also 
 * changes the border radius of the icon to make it blend with the opening/closing 
 * animation.
*/

// Exchange hamburger icon for X icon when checkbox is clicked (or vice-versa)
// Called by #hambox
function switchIcon() {
	if ($("#hambox").prop("checked")) {
		$("#hamburger > i").removeClass("fa-bars").addClass("fa-xmark");
		// Show the menu
		$("#menu").addClass("show").removeClass("hide");
	} else {
		$("#hamburger > i").removeClass("fa-xmark").addClass("fa-bars");
		// Hide menu and delay the hiding effect
		setTimeout(function () {
			$("#menu").removeClass("show").addClass("hide");
		}, 500);
	}
}

// Main
$(document).ready(function () {
	
	// Animate the border radius of the hamburger to make it look clean when the menu opens/closes.
	$("#hambox").click(function () {
		// top is rounded, bottom is flat
		if ($(this).prop("checked")) {
			// Bottom left goes square immediately
			$("#hamburger").animate(
				{borderBottomRightRadius: "0",}, 50
			);
			// bottom right goes square after 0.05 seconds
			$("#hamburger").animate(
				{borderBottomLeftRadius: "0",}, 100
			);
		}
		// Rounded on all sides
		else {
			// Bottom right goes square after 0.2 seconds
			$("#hamburger").delay(200).animate(
				{borderBottomLeftRadius: "1rem",}, 200
			);
			// bottom left goes square after 0.4 seconds
			$("#hamburger").animate(
				{borderBottomRightRadius: "1rem",}, 200
			);
		}
	});	// end click()
});	// end ready()
