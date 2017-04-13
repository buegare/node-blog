function showDecisionIcons() {
	$('#delete-post-icon-remove, #delete-post-icon-ok').show();
}

function hideDecisionIcons() {
	$('#delete-post-icon-remove, #delete-post-icon-ok').hide();
}

function deletePost() {
	var postId = $('#delete-post-btn').attr('postId');

	$.ajax({
		url: "/delete/post",
		type: "DELETE",
		data: {postId: postId},
        success: function() {
        	window.location.replace('/');
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.warn(jqXHR.responseText);
            console.log('error ' + textStatus + " " + errorThrown);
        }
	});
}

function editPost() {
	var postTitle = $('#edit-post-btn').attr('postTitle');

	$.ajax({
		url: "/post/" + postTitle,
		type: "GET",
		//data: new_comment,
		success: function(data) {
			$("#edit-target").html(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.warn(jqXHR.responseText);
            console.log('error ' + textStatus + " " + errorThrown);
        }
	});
}

$('#delete-post-btn').on('click', showDecisionIcons);

$('#delete-post-icon-remove').on('click', hideDecisionIcons);

$('#delete-post-icon-ok').on('click', deletePost);

$('#edit-post-btn').on('click', editPost);