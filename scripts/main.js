$(document).ready(function() {
	$("#cycleButton").click(function() {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		var animationArr = ["animated rotate", "animated bounce", "animated shake", "animated swing"];
		var i = Math.floor(Math.random() * 3) + 1; // Choose an array index from 1 to 3
		$(".glyphicon-cog").addClass(animationArr[0]).one(animationEnd, function() {
			$(this).removeClass(animationArr[0]);
		});
		$("h1").addClass(animationArr[i]).one(animationEnd, function() {
			$(this).removeClass(animationArr[i]);
		});
		$.ajax({
			cache: false,
			dataType: "json",
			url: "https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
			error: function(jqXHR, textStatus) {
				if (textStatus === "parsererror") {
					$("#quoteText").text("Technical Difficulties: Bad JSON Data from our API. Try again?");
				} else {
					$("#quoteText").text("Technical Difficulties. Please try again in a bit.");
				}
			},
			success: function(data) {
				var quoteText = data.quoteText;
				var quoteAuthor = data.quoteAuthor;
				if (!quoteAuthor) {
					quoteAuthor += "Anonymous";
				}
				$("#quoteText").html(quoteText + '<footer id="quoteAuthor"></footer>'); // Replace footer overwritten by jQuery
				$("#quoteAuthor").text(quoteAuthor);
				$("#tweetButton").attr("href", function() {
					// Percent-encode the quote to conform to URL syntax
					var encodeText = encodeURIComponent(quoteText.trim());
					var encodeAuthor = encodeURIComponent(quoteAuthor.trim());
					return "https://twitter.com/intent/tweet?text=" + "%22" + encodeText + "%22" + "%20" + "-" + "%20" + encodeAuthor;
				});
			}
		});
	});
});
