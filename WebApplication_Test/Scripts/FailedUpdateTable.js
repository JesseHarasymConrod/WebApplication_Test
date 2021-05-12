var gridState = { ApplicationId: applicationId, pageIndex: 0, sortCol: "UniqueId", sortOrder: false, filter: "" };

$(function () {

    $(document).ajaxStart(function () {
        $("#loaderDiv").addClass('ui-ajax-loading');
    });

    $(document).ajaxStop(function () {
        $("#loaderDiv").removeClass('ui-ajax-loading');
    });

});

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
                deleteUpdate(a.getAttribute("rel"));
                $(this).dialog("close");
            }
        }
    });
}

function deleteUpdate(id) {
    //ajax post to delete user
    $.post(globalHomePath+"Home/RemoveUpdate", { "id": id, "appId": gridState.ApplicationId },
			function (data) {
			    //success
			    if (data.RemovedId == id) {
			        $('#row-' + data.RemovedId).fadeOut('slow');
			    }
			});
}

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

    //ajax post to get new data
    $.get(globalHomePath+"Home/GetFailedUpdateTable", { id: applicationId, viewState: JSON.stringify(gridState) },
			function (data) {
			    //success
			    $("#failedUpdateTable").replaceWith(data);
			    //turn off ajax indicator
			    $("#loaderDiv").removeClass('ui-ajax-loading');
			});
    return false;
}

function storeTableParams() {
    sessionStorage.setItem('failedUpdateTable', JSON.stringify(gridState));
}

function setFilter() {
    gridState.filter = $('input[name=q]').val()
}