function addNewComment(){

	var new_comment = {
		name: $("#new-comment input[name='name']").val(),
		body: $("#new-comment textarea").val(),
		post_title: $(location).attr('pathname').split('/')[2]
	};

	$.ajax({
		url: "/create/comment",
		type: "POST",
		data: new_comment,
		success: function(data) {
			if($(data).hasClass('target-comments')) {
				$("#new-comment input[name='name']").val('');
				$("#new-comment textarea").val('');
				$("#comments").html(data);
				$('.form-errors').remove();
			} else {
            	$("#new-comment").html(data);
            	$('#new-comment :button').on('click', addNewComment);
			}
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.warn(jqXHR.responseText);
            console.log('error ' + textStatus + " " + errorThrown);
        }
	});

}




$('#new-comment :button').on('click', addNewComment);
