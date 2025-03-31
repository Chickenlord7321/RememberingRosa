$(document).ready(function () {
	// Open modal and add content when user clicks on an image
	$("#squaring-the-square li > img").click(function () {
		let img = $(this);
		
		// Set the image source/alt to whichever image the user clicked on
		$("#modal > img").attr("src", img.attr("src"));
		$("#modal > img").attr("alt", img.attr("alt"));

		// Change caption so that it lists the team who made the art in the modal
		$("#caption").text(function (i, originalText) {
			return "By Team " + img.attr("alt");
		}); 
		$("#modal").toggle();
	});

	// Close modal when user clicks the X icon or the image inside the modal
	$("#close").click(function () {
		$("#modal").toggle();
	});
	$("#modal > img").click(function () {
		$("#modal").toggle();
	})
});