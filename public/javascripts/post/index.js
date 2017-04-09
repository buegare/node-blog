$('#arrow-down').click(function(){

	$.ajax({
		url: "/",
		type: "GET",
		success: function(data) {
	        $(".load-more-posts").append(data);
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        console.err('error ' + textStatus + " " + errorThrown);
	    }
	});

});