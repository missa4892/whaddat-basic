/******************************/
/** Modal Dialog Handling **/
/******************************/

$('#myModal').on('shown.bs.modal', function () {
  $('#myModal').focus();
})

/******************************/
/** Statistics Page Handling **/
/******************************/

var plotDrawn = false;
var pendingShowPlot = false;

$('#myModal').find('.statistics').hide();
$('#myModal').find('.warning').hide();

function navigate(element) {
	var src = $(element).find('a').html();
	console.log('Menu listener triggered from: ' + src);

	if(src == 'Statistics') {
		if (window.matchMedia("(orientation: portrait)").matches) {
			pendingShowPlot = true;
			$('#myModal').find('.statistics').hide();

			$('#myModal .warning p.msg').html('Statistics can only be viewed in landscape mode');
			$('#myModal').find('.warning').show();
			$("#myModal").modal("show");
		} else {
			pendingShowPlot = false;
			$('#myModal').find('.statistics').show();
			$('#myModal').find('.warning').hide();
			navigateStats();
		}
	} else if (src == 'My Profile') {
		window.open("/myProfile", '_blank');
	} else if (src == 'Moderator') {
		window.open("/moderator", '_blank');
	} else {
		console.log('Do nothing');
	}

	$('#btn-menu').click();
}

function navigateStats() {
	if(!plotDrawn) {
		generatePlot();
		plotDrawn = true;
	}
	$("#myModal").modal("show");
}

window.addEventListener("orientationchange", function() {
	if(pendingShowPlot) {
		if (window.matchMedia("(orientation: landscape)").matches) {
			generatePlot();
			pendingShowPlot = false;
			$('#myModal').find('.statistics').show();
			$('#myModal').find('.warning').hide();
			return;
		}
	}
	if (window.matchMedia("(orientation: portrait)").matches) {
		$("#myModal").modal("hide");
	}
}, false);

/******************************/
/** Next Section Handling **/
/******************************/
