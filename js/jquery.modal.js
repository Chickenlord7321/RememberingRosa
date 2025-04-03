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
	$("img.open-in-modal").click(function () {
		addContent($(this));
		$("#modal").toggle();
	});

	// Close modal when user clicks the X icon or the image inside the modal
	$("#close, #modal-img").click(function () {
		$("#modal").toggle();
	});
});