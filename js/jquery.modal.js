// Author: Caleb
// Last update: 13 Apr 2025

// Global variables
let currIndex;		// current image the user has clicked on
let size;			// number of images in the current gallery
let isSquare;		// a boolean that checks whether the current gallery is #squaring-the-square
let numGalleryCols;	// number of columns in .gallery
let numGalleryRows;	// number of rows in .gallery


// 
function goToPrev() {
	goToImg(-1);
}


function goToNext() {
	goToImg(1);
}


// Helper function that takes modal to the previous or next image
function goToImg(moveBy) {
	// The next index is calculated using circular array logic. We use modulo to 
	// ensure the index is always between 0 and the size of the gallery. 
	// For example, say the size is 20 and the current index is 19. Going to the next
	// index would take us to 20, which is an out-of-bounds index. But if we divide by
	// by the size (20) and take the remainder, the next index would become 0, which
	// IS within bounds! 
	let nextIndex = (currIndex + moveBy + size) % size;
	let nextImg;
	if (isSquare) {
		nextImg = $("#squaring-the-square li").eq(nextIndex).children("img:first-child");
	}
	else {
		// Since the total number of images is just the number of columns times the number of rows,
		// it follows that dividing by the rows would give us the columns. We use floor to ensure
		// the value is an integer.
		let col = Math.floor(nextIndex / numGalleryRows);
		// Similar kind of circular array logic, same way we calculated nextIndex.
		let row = (nextIndex + numGalleryRows) % numGalleryRows;
		// Retrieve the image at (col, row)
		nextImg = $(".gallery .col").eq(col).children("li").eq(row).children("img:first-child");

		console.log(
			"Going to\ncol:" + col
			+ ", row: " + row
			+ "\nimg = " + nextImg.attr("src")
		);
	}
	addContent(nextImg);
	currIndex = nextIndex;
	console.log("current index: " + currIndex);
}


function addContent(img) {
	// Set the image source and alt to whichever image the user clicked on
	$("#modal-img").attr("src", img.attr("src"));
	$("#modal-img").attr("alt", img.attr("alt"));

	// Change caption so that it lists the artist or team of artists who made the art in the modal
	$("#caption").text(function (i, originalText) {
		return "By " + img.attr("alt");
	});
}

$(document).ready(function () {
	numGalleryCols = $(".gallery .col").length;
	numGalleryRows = $(".gallery .col:first-child li").length;

	// Open modal and add content when user clicks on an image
	$("li:has(.open-in-modal)").click(function () {
		// Since the #squaring-the-square element is a ul and is built differently
		// from the other gallery, we check the parent of the image that was just 
		// clicked in case we're inside the square.
		let imgContainer = $(this).parent().attr("id");
		if (imgContainer == "squaring-the-square") {
			isSquare = true;
			// Size is just the number of <li> in the square
			size = $("#squaring-the-square > li").length;
			currIndex = $(this).index();
		} 
		else {
			// Otherwise, the parent container must be .gallery
			isSquare = false;
			// Size is the number of <li> in the gallery
			size = $(".gallery ul li").length;
			let currCol = $(this).parent().index();

			// $(this).index() gives us the index of an image *within its column*, which 
			// is not how we want to represent the current index. The current index is 
			// the location of the image out of *all* the images in the gallery.
			// So if we take the number of rows times the current column, that gives us 
			// the total number of images in all the previous columns, and from there we 
			// can just add the index.

			// So in the .gallery, for example, the currIndex is the current index out of
			// 20 total images, not out of the 5 images per column.
			currIndex = (currCol * numGalleryRows) + $(this).index();
		}
		addContent($(this).children("img"));
		$("#modal").toggle();	// display modal

		console.log("current index: " + currIndex);
	});

	// Close modal when user clicks the X icon or the image inside the modal
	$("#close, #modal-img").click(function () {
		$("#modal").toggle();	// display modal
	});
});