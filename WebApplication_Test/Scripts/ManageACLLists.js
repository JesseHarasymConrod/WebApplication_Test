var displayedListId;

$(function () {

    $(document).ajaxStart(function () {
        $("#loaderDiv").addClass('ui-ajax-loading');
    });

    $(document).ajaxStop(function () {
        $("#loaderDiv").removeClass('ui-ajax-loading');
    });

    $("table > tbody").selectable({

        // Don't allow individual table cell selection.
        filter: ":not(td)",

        // Update the initial total to 0, since nothing is selected yet.
        create: function (e, ui) {

        },

        selecting: function (event, ui) {
            if ($(".ui-selected, .ui-selecting").length > 1) {
                $(ui.selecting).removeClass("ui-selecting");
            }
        },

        // When a row is selected, add the highlight class to the row and
        selected: function (e, ui) {
            $(ui.selected).addClass("ui-state-highlight");
            var widget = $(this).data("uiSelectable");
            //alert('lets load the list!' + ' ' + $(ui.selected).attr('id').substring(4));
            displayedListId = $(ui.selected).attr('id').substring(4);
            $('#itemsTable').load(globalHomePath + "Application/GetACL/" + displayedListId);
        },


        // When a row is unselected, remove the highlight class from the row
        // and update the total.
        unselected: function (e, ui) {
            $(ui.unselected).removeClass("ui-state-highlight");
            var widget = $(this).data("uiSelectable")
            $('#itemsTable').html('');
            displayedListId = '';
        }
    });
    //closeEdit();
});

function showAddPanel() {
    //set up the controls
    $('#txtListName').val('');
    $("#chkIsShared").prop('checked', false);

    //show dialog
    $('#dialog-EditAcl').dialog({
        resizable: false,
        height: 230,
        width: 350,
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            },
            "Save": addAccessList
        }

    });

}

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
}

function showEditPanel() {
    //set up the controls
    var lstName = $('#row-' + displayedListId).children('td').eq(1).html().trim();
    if (lstName.endsWith('(Shared)')) {
        lstName = lstName.substr(0, lstName.length - 8).trim();
    }
    $('#txtListName').val(lstName);
    $("#chkIsShared").prop('checked', $("#AccessListId-" + displayedListId).data('shared'));

    //show dialog
    $('#dialog-EditAcl').dialog({
        resizable: false,
        height: 230,
        width: 350,
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            },
            "Save": editAccessList
        }

    });



    //$("#pnlEditList").show();
    //$("#tblAppAccessLists input:checkbox").each(function () {
    //    $(this).removeAttr("hidden");
    //});

    //$("#btnRemoveLists").removeAttr("hidden");
}

function showRemoveCheckboxes() {
    $("#tblAppAccessLists input:checkbox").each(function () {
        $(this).removeAttr("hidden");
    });
    $("#btnDelete").attr("hidden", "hidden");
    $("#btnCancelRemove").removeAttr("hidden");
    $("#btnClone").attr("hidden", "hidden");
    $("#btnRemoveLists").removeAttr("hidden");
}

function hideRemoveCheckboxes() {
    $("#tblAppAccessLists input:checkbox").each(function () {
        $(this).attr("hidden", "hidden");
    });
    $("#btnRemoveLists").attr("hidden", "hidden");
    $("#btnCancelRemove").attr("hidden", "hidden");
    $("#btnClone").removeAttr("hidden");
    $("#btnDelete").removeAttr("hidden");
}

//function closeEdit() {
//    $("#pnlEditList").hide();
//    $("#tblAppAccessLists input:checkbox").each(function () {
//        $(this).attr("hidden", "hidden");
//    });
//    $("#btnRemoveLists").attr("hidden", "hidden");

//}

function showEntryEditPanel() {
    $("#tblACLEntries input:checkbox").each(function () {
        $(this).removeAttr("hidden");

    });
    $("#btnRemoveEntries").removeAttr("hidden");
    $("#imgCloseEntriesEdit").removeAttr("hidden");
}

function closeEntriesEdit() {
    $("#tblACLEntries input:checkbox").each(function () {
        $(this).attr("hidden", "hidden");
    });
    $("#btnRemoveEntries").attr("hidden", "hidden");
    $("#imgCloseEntriesEdit").attr("hidden", "hidden");
}

function copyAccessList() {
    if (!displayedListId) {
        return;
    }

    var jqxhr = $.get(globalHomePath+"Application/CopyACLList", { listId: displayedListId },
        function (data) {
            if (data) {
                var newListInfo = JSON.parse(data);
                addNewListRow(newListInfo[0], newListInfo[1]);
            }
        })
    .fail(function () {
        alert("error");
    });
}

function editAccessList() {
    var newListName = $("#txtListName").val();
    var isShared = $("#chkIsShared").is(":checked");

    var jqxhr = $.get(globalHomePath+"Application/EditACLList", { listId: displayedListId, listName: newListName, isShared: isShared },
        function (data) {
            if (data == 0) {
                $('#row-' + displayedListId).children('td').eq(1).html(newListName);
                $("#AccessListId-" + displayedListId).data('shared', isShared);
                //hide edit panel
                $('#dialog-EditAcl').dialog("close");
            } else {
                //
            }
        })
        .fail(function () {
            alert("error");
            $('#dialog-EditAcl').dialog("close");
        });
}
function addAccessList() {
    var newListName = $("#txtListName").val();
    var isShared = $("#chkIsShared").is(":checked");

    if (!newListName) {
        return;
    }

    var jqxhr = $.get(globalHomePath + "Application/AddACLList", { applicationId: applicationId, listName: newListName, isShared: isShared },
        function (data) {
            //<tr id="row-@item.Id">
            //   <td>
            //      <input type="checkbox" id="AccessListId-@item.Id" />
            //   </td>
            //   <td>@Html.DisplayFor(modelItem => item.Name)
            //  </td>
            //</tr>
            if (data > 0) {
                //success
                addNewListRow(data, newListName, isShared);
                $('#dialog-EditAcl').dialog("close");
            }
        })
        .fail(function () {
            alert("error");
            $('#dialog-EditAcl').dialog("close");
        });

}

function addNewListRow(id, name, isShared) {
    var newRow = '<tr id="row-' + id + '"><td><input type="checkbox" data-shared="' + isShared + '" id="AccessItemId-' + id + '" hidden="hidden" /></td><td>' + name + '</td></tr>';
    $('#tblAppAccessLists > tbody:last').append(newRow);
    $('#txtNewList').val('');
    $('#txtNewList').focus();
    //scroll to item
    $('#pnlAccessLists').animate({ scrollTop: $('#pnlAccessLists')[0].scrollHeight }, 1000);
}

function removeCheckedEntries() {
    var toRemove = [];
    $('#tblACLEntries tbody tr').each(function () {
        $this = $(this)
        var isChecked = $this.find('input:checkbox:first').attr('checked');
        if (isChecked == 'checked') {
            var itemToRemove = $this.find('input:checkbox:first').attr('id');
            if (itemToRemove) {
                itemToRemove = itemToRemove.substr(13);
                toRemove.push(itemToRemove);
            }
        }
    });

    if (toRemove.length > 0) {
        $('#dialog-confirm').dialog({
            resizable: false,
            modal: true,
            buttons: {
                Cancel: function () {
                    $(this).dialog("close");
                },
                "Delete": function () {
                    deleteEntries(toRemove);
                    $(this).dialog('close');
                }
            }
        });
    }
}

function deleteEntries(toRemove) {
    var jqxhr = $.get(globalHomePath+"Application/RemoveACLEntries", { applicationId: applicationId, entryIds: JSON.stringify(toRemove) },
        function (data) {
            //remove confirmed items
            var removed = JSON.parse(data);

            $.each(removed, function (key, value) {
                $('#tblACLEntries #row-' + value).find('input:checkbox:first').prop('checked', false);
                $('#tblACLEntries #row-' + value).fadeOut('slow');
            });
        });
}

function removeCheckedLists() {
    var toRemove = [];
    $("#tblAppAccessLists tbody tr").each(function () {
        $this = $(this)
        var isChecked = $this.find('input:checkbox:first').attr('checked');
        if (isChecked == 'checked') {
            var itemToRemove = $this.find('input:checkbox:first').attr('id');
            if (itemToRemove) {
                itemToRemove = itemToRemove.substr(13);
                toRemove.push(itemToRemove);
            }
        }

    });

    if (toRemove.length > 0) {
        //prompt user
        $('#dialog-confirm').dialog({
            resizable: false,
            modal: true,
            buttons: {
                Cancel: function () {
                    $(this).dialog("close");
                    hideRemoveCheckboxes();
                },
                "Delete": function () {
                    deleteLists(toRemove);
                    $(this).dialog("close");
                    hideRemoveCheckboxes();
                }
            }
        });
    }
}

function deleteLists(toRemove) {
    //server call
    var jqxhr = $.get(globalHomePath+"Application/RemoveACLList", { applicationId: applicationId, listIds: JSON.stringify(toRemove) },
        function (data) {
            //remove confirmed items
            var removed = JSON.parse(data);

            $.each(removed, function (key, value) {
                if ($('#tblAppAccessLists #row-' + value).hasClass('ui-selected')) {
                    $('#itemsTable').html('');
                }
                $('#tblAppAccessLists #row-' + value).find('input:checkbox:first').prop('checked', false);
                $('#tblAppAccessLists #row-' + value).fadeOut('slow');
            });
        })
    .fail(function () {
        alert("error");
    });
}

function addToAccessList() {
    var newKey = $("#txtNewKey").val();

    if (!newKey) {
        return;
    }

    //is value already in list?
    //yes, scroll to the item

    //no, add it
    var jqxhr = $.get(globalHomePath+"Application/AddACLEntry", { listId: displayedListId, entry: newKey },
        function (data) {
            if (data > 0) {
                //success
                //    <tr id="row-@item.Id">
                //    <td>
                //        <input type="checkbox" id="AccessItemId-@item.Id" />
                //    </td>
                //    <td>@item.AccessKey</td>
                //</tr>

                var newRow = '<tr id="row-' + data + '"><td><input type="checkbox" id="AccessItemId-' + data + '" hidden="hidden" /></td><td>' + newKey + '</td></tr>';

                $('#tblACLEntries > tbody:last').append(newRow);
                $('#row-' + data).hide().fadeIn();
                $('#txtNewKey').val('');
                $('#txtNewKey').focus();
                //scroll to item
                $('#pnlACLEntries').animate({ scrollTop: $('#pnlACLEntries')[0].scrollHeight }, 1000);

            }
        })
        .fail(function () {
            alert("error");
        })
    ;



}