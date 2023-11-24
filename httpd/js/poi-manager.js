"use strict";

var local_uri_prefix = "";
if (typeof(KISMET_URI_PREFIX) !== 'undefined')
    local_uri_prefix = KISMET_URI_PREFIX;

kismet_ui_tabpane.AddTab({
    id: 'poi-manager',
    tabTitle: 'Points of Interest',
    priority: -100,
    createCallback: function (div) {
        $(document).ready(function () {
            $(div).append(`
            <div id="poi-manager-form" style="font-size:1.3em;">
                <fieldset>
                    <label for="poi-note">Note:</label>
                    <input type="text" class="form-control" id="poi-note" aria-describedby="poi-note-help" style="padding:0.3em;width:30em;" placeholder="Note to attach to the Point of Interest.">
                    <button type="submit" class="btn btn-primary ui-button ui-corner-all ui-widget" id="btn-poi-create">Create POI</button>
                    <span id="poi-status"></span>
                </fieldset>
                <p id="poi-note-help" style="margin:10px;">Points of interest are logged in the kismetdb log file, and can be used as markers to retrieve information during post-processing.</p>
            </div>
            `);

            // Gets devices since timestamp (absolute, or relative to now - using negatives)
            function createPOI() {
                const dataJSON = {
                    note: $("#poi-note").val(),
                }
                const postData = "json=" + JSON.stringify(dataJSON);
                
                // console.log(postData);

                $("#poi-status").text("Creating...");

                $("#btn-poi-create").prop('disabled', true);
                $.post(local_uri_prefix + "/poi/create_poi.cmd", postData, "html")
                .done(function (data) {
                    if (data.responseText == "POI created\n")
                    {
                        console.log("POI creation succeeded.");
                        // console.log(data);
                        $("#poi-status").text("Success!");
                    }
                    else
                    {
                        console.log("POI creation failed.");
                        // console.log(data);
                        $("#poi-status").text("Failed.");
                    }
                })
                .fail(function (data) {
                    if (data.responseText == "POI created\n")
                    {
                        console.log("POI creation succeeded.");
                        // console.log(data);
                        $("#poi-status").text("Success!");
                    }
                    else
                    {
                        console.log("POI creation failed.");
                        // console.log(data);
                        $("#poi-status").text("Failed.");
                    }
                })
                .always(function () {
                    $("#btn-poi-create").prop('disabled', false);
                });
            }; // end of createPOI

            $("#btn-poi-create").on("click", createPOI);
        }); // end of document.ready
    }, // end of createCallback
}); // end of AddTab
