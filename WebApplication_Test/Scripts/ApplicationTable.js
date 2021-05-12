var gridState = { pageIndex: 0, sortCol: "userName", sortOrder: false, filter: "" };

$(function () {

    $(document).ajaxStart(function () {
        $("#loaderDiv").addClass('ui-ajax-loading');
    });

    $(document).ajaxStop(function () {
        $("#loaderDiv").removeClass('ui-ajax-loading');
    });

});

function redrawGrid(property, value) {
    if (property == 'sortCol') {
        if (value == gridState.sortCol) {
            gridState.sortOrder = !gridState.sortOrder;
        }
        gridState.sortCol = value;
        gridState.pageIndex = 0;
    } else if (property == 'pageIndex') {
        gridState.pageIndex = value;
    } else if (property == 'filter') {
        gridState.filter = value;
    }

    //ajax post to delete user
    $.get(globalHomePath+"Application/GetApplicationTable", { viewState: JSON.stringify(gridState) },
			function (data) {
			    //success
			    $("#applicationTable").html(data);

			    //turn off ajax indicator
			});
}

function deleteRow(item) {
    var a = item;
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            },
            "Delete": function () {
                deleteApplication(a.getAttribute("rel"));
                $(this).dialog("close");
            }
        }
    });
}

function deleteApplication(id) {
    //ajax post to delete user
    $.post(globalHomePath+"Application/Remove", { "id": id },
			function (data) {
			    //success
			    if (data.RemovedId == id) {
			        $('#row-' + data.RemovedId).fadeOut('slow');
			    }
			});
}

function storeTableParams() {
    sessionStorage.setItem('ApplicationTable', JSON.stringify(gridState));
}

function setFilter() {
    gridState.filter = $('input[name=q]').val()
}