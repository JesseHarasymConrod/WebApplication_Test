$("#SummariesTable").find("textarea").each(function () {
    if ($(this).attr('ishtml') == "True") {
        CKEDITOR.inline(this.id);
    }
});


//AJAX Loading
var targets = JSON.parse($("#TargetsJSON").val());

targets.forEach(function (entry) {
    $('#tblTargets > tbody:last').append('<tr><td>' + entry + '</td></tr>');
});

$("#lnkClearTargetsList").click(function () {
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            },
            "Clear": function () {
                targets = [];
                $('#tblTargets > tbody').empty();
                $("#TargetsJSON").val(JSON.stringify(targets));
                $(this).dialog("close");
            }
        }
    });
});

$('#txtVersionToAdd').on('keydown', function (event) {
    var x = event.which;
    if (x == 13) {
        event.preventDefault();
        $("#btnVersionToAdd").click();
    }
});

$("#btnVersionToAdd").click(function () {
    var newVal = $("#txtVersionToAdd").val()

    //validate Version Number
    var verRegEx = /^(\d+\.)?(\d+\.)?(\d+\.)?(\d+)$/;
    if (!verRegEx.test(newVal)) {
        return;
    }

    //no duplicates
    if (jQuery.inArray(newVal, targets) >= 0) {
        return;
    }

    targets.push(newVal);
    targets.sort(function (a, b) {
        return versionCompare(a, b, null);
    });
    targets.reverse();

    $('#tblTargets > tbody').empty();
    targets.forEach(function (entry) {
        $('#tblTargets > tbody:last').append('<tr><td>' + entry + '</td></tr>');
    });
    $("#TargetsJSON").val(JSON.stringify(targets));

    $('#txtVersionToAdd').val('');
    $('#txtVersionToAdd').focus();


});

setEditTargets();
$("#IsAnyPrevious").click(function () {
    setEditTargets();
});

function setEditTargets() {
    if ($("#IsAnyPrevious").prop("checked")) {
        $('#pnlEditTargets').fadeTo('slow', .6);
        $("#pnlEditTargets").children().attr("disabled", "disabled");
    } else {
        $('#pnlEditTargets').fadeTo('slow', 1);
        $("#pnlEditTargets").children().removeAttr("disabled");
    }
}

function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}

var elevationType = $("#ElevationType").val();
$("input[name=rdoElevationType]:radio").each(function () {
    if ($(this).val() == elevationType && !$(this).prop('checked') == true) {
        $(this).prop('checked', true);
    }
});

$("input[name=rdoElevationType]:radio").change(function () {
    $("#ElevationType").val($(this).val());
});


$("#AccessMode").change(
   function () {
       if ($("#AccessMode :selected").text() != "Version") {
           $("#AccessListControl").addClass("accessListDisabled");
       } else {
           $("#AccessListControl").removeClass("accessListDisabled");
       }
   }
)

if ($("#AccessMode :selected").text() != "Version") {
    $("#AccessListControl").addClass("accessListDisabled");
}