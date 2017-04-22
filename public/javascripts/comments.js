function decisionIconsShow(e) {
	var commentId = $(e.target).attr('commentId'); 
	$("span[commentId=" + commentId + "]").show();
}

function decisionIconsHide(e) {
	var commentId = $(e.target).attr('commentId'); 
	$("span[commentId=" + commentId + "]").hide();
}

function deleteComment(e) {
	var commentId = $(e.target).attr('commentId');
	var postId = $(e.target).attr('postId');

	$.ajax({
		url: "/delete/comment",
		type: "DELETE",
		data: {commentId: commentId, postId: postId},
		success: function(data) {
			$("#comments").html(data);
			$('.delete-btn').on('click', function(e) {
				decisionIconsShow(e);
			});
			$('.delete-comment-icon-remove').on('click', function(e) {
				decisionIconsHide(e);
			});
			$('.delete-comment-icon-ok').on('click', deleteComment);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.warn(jqXHR.responseText);
            console.log('error ' + textStatus + " " + errorThrown);
        }
	});
}

function addNewComment(){

	var new_comment = {
		name: $("#new-comment input[name='name']").val(),
		body: $("#new-comment textarea").val(),
		post_slug: $('img').attr('alt')
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
				$('.delete-btn').on('click', decisionIconsShow);
				$('.delete-comment-icon-remove').on('click', decisionIconsHide);
				$('.delete-comment-icon-ok').on('click', deleteComment);

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

$('.delete-btn').on('click', decisionIconsShow);

$('.delete-comment-icon-remove').on('click', decisionIconsHide);

$('.delete-comment-icon-ok').on('click', deleteComment);