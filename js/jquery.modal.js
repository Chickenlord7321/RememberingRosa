// Author: Caleb
// Last update: 8 Apr 2025

// Global variables
let currIndex;	// current image the user has clicked on
let size;		// number of images in the current gallery
let isSquare;	// a boolean that checks whether the current gallery is #squaring-the-square


function goToPrev() {
	let prev = (currIndex - 1 + size) % size;
	console.log("prev = " + prev);

	let prevImg;
	if (isSquare) {
		prevImg = $("#squaring-the-square li").eq(prev).children("img");
	} else {
		let col = Math.ceil(prev / 4) - 1;
		let row = prev % 4;
		console.log("col = " + col + ", row = " + row);
		prevImg = $(".gallery ul").eq(col).children("li").eq(row).children("img")
	}
	addContent(prevImg);
	// Reset current index
	currIndex = prev;
}


function goToNext() {
	let next = (currIndex + 1 + size) % size;
	console.log("next = " + next);

	let nextImg;
	if (isSquare) {
		nextImg = $("#squaring-the-square li").eq(next).children("img");
	} else {
		let col = Math.ceil(next / 4) - 1;
		let row = next % 4;
		console.log("col = " + col + ", row = " + row);
		prevImg = $(".gallery ul").eq(col).children("li").eq(row).children("img");
	}
	addContent(nextImg);
	// Reset current index
	currIndex = next;
}


function addContent(img) {
	// Set the image source/alt to whichever image the user clicked on
	$("#modal-img").attr("src", img.attr("src"));
	$("#modal-img").attr("alt", img.attr("alt"));

	// Change caption so that it lists the team who made the art in the modal
	$("#caption").text(function (i, originalText) {
		return "By " + img.attr("alt");
	});
}

$(document).ready(function () {
	// Open modal and add content when user clicks on an image
	$("li:has(.open-in-modal)").click(function () {
		// Since the #squaring-the-square element is a ul and is built differently
		// from the other gallery, we check the parent of the image that was just 
		// clicked in case we're inside the square.
		let imgContainer = $(this).parent().attr("id");
		if (imgContainer == "squaring-the-square") {
			isSquare = true;
			size = $("#squaring-the-square > li").length;
			currIndex = $(this).index();
			console.log("current index: " + currIndex);
		} else {
			// Otherwise, finding the size is as simple as checking the number of li's inside the gallery.
			isSquare = false;
			size = $(".gallery ul li").length;
			currIndex = 5 * $(this).parent().index() + $(this).index();
			console.log("current index: " + currIndex);
		}
		addContent($(this).children("img"));
		$("#modal").toggle();
	});

	// Close modal when user clicks the X icon or the image inside the modal
	$("#close, #modal-img").click(function () {
		$("#modal").toggle();
	});
});