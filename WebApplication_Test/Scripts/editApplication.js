/// <reference path="jquery-1.9.0-vsdoc.js" />


$(document).ready(function () {
    if (document.referrer.includes("ManageACL")) {
        $("#tabs").tabs({ active: 1 });
    }
    

    $("#selectOwnerDialog").dialog({
        resizeable: true,
        autoOpen: false,
        modal: true,
        width: 550,
        height: 400,
        buttons: {
            Cancel: function () {
                $(this).dialog('close');
            },
            'Ok': function () {
                //set the selected owner
                var selected = $(".ui-selected");
                if (selected.length > 0) {
                    $("#OwnerUserId").val(selected.attr("data-id"));
                    $("#OwnerDisplay").html(selected.html() + " (" + selected.attr("data-username") + ")");
                }
                $(this).dialog('close');
            }
        }

    });

    $('input[type=radio][name=ClientVersionMode]').bind('change', function () {
        if (this.value == "MSIDisplayVersion") {
            $("#MsiDisplayName").prop("disabled", false);
        } else {
            $("#MsiDisplayName").prop("disabled", true);
        }
    });

    $("#EnableUpdateTimeWindow").bind('change', function () {
        if (this.checked) {
            $("#pnlUpdateTimeWindow").children().prop('disabled', false);
        } else {
            $("#pnlUpdateTimeWindow").children().prop('disabled', true);
        }
    });

    $("#selectableUserList").selectable({
        selecting: function (event, ui) {
            if ($(".ui-selected, .ui-selecting").length > 1) {
                $(ui.selecting).removeClass("ui-selecting");
            }

        }
    });

    $(document).ajaxStart(function () {
        $("#loaderDiv").addClass('ui-ajax-loading');
    });

    $(document).ajaxStop(function () {
        $("#loaderDiv").removeClass('ui-ajax-loading');
    });

    $("#AllowAnonymousAccess").click(
        function allowAnonymousAccessOnClick() {
            if ($(this).is(":checked")) {
                $("#AccessListControl").addClass("accessListDisabled");
            } else {
                $("#AccessListControl").removeClass("accessListDisabled");
            }
        }
     )

    if ($("#AllowAnonymousAccess").is(":checked")) {
        $("#AccessListControl").addClass("accessListDisabled");
    }

    $("#btnManageACLs").click(function () {
        var isNew = $("#IsNew").val().toLowerCase();
        if(isNew == "true") {
            $("#alertNewDialog").dialog({
                resizable: false,
                modal: true,
                buttons: {
                    "OK": function () {
                        $(this).dialog("close");
                    }
                }
            });
            return false;
        } else {
            return true;
        }
    });

    var validator = $("#frmEdit").data('validator');
    validator.settings.showErrors = function () {
        var errorCount = this.numberOfInvalids();
        if (errorCount > 0) {
            $("#btnSubmit").attr("disabled", "disabled");
            $("#btnSubmit").addClass("ui-state-disabled");
        } else {
            $("#btnSubmit").removeAttr("disabled");
            $("#btnSubmit").removeClass("ui-state-disabled");
        }
        this.defaultShowErrors();
    };
});

function openSelectOwnerDialog() {
    $('#selectOwnerDialog').dialog('open');
}






