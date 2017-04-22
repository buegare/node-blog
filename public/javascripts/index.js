$('#arrow-down').on('click', function(){

	$.ajax({
		url: "/",
		type: "GET",
		success: function(data) {
	        $(".load-more-posts").append(data);
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        console.warn(jqXHR.responseText);
            console.log('error ' + textStatus + " " + errorThrown);
	    }
	});

});