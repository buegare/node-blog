function showDecisionIcons() {
	$('#delete-post-icon-remove, #delete-post-icon-ok').show();
}

function hideDecisionIcons() {
	$('#delete-post-icon-remove, #delete-post-icon-ok').hide();
}

function deletePost() {
	var postId = $('#delete-post-btn').attr('postId');
	var img = $('img').attr('imgId');

	if(img === 'noimage.png') { img = null; }

	$.ajax({
		url: "/delete/post",
		type: "DELETE",
		data: {postId: postId, img: img},
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
	var postSlug = $('#edit-post-btn').attr('postSlug');

	$.ajax({
		url: "/post/" + postSlug,
		type: "GET",
		success: function(data) {
			$("#edit-target").html(data);
			$('#delete-post-btn').on('click', showDecisionIcons);
			$('#delete-post-icon-remove').on('click', hideDecisionIcons);
			$('#delete-post-icon-ok').on('click', deletePost);
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