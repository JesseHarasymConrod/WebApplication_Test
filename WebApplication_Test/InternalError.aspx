<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="InternalError.aspx.cs" Inherits="AppLifeServerMvc.NotFoundError" %>
<% Response.StatusCode = 500; %>
<!DOCTYPE html>
<html>
<head runat="server">
    <title>500</title>
    <link href="/Content/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link href="/Content/styles.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <!--START HEADER  -->
    <div id="header">
        <div id="head_wrap" class="container_12">
            <!--START LOGO  -->
            <div id="logo" class="grid_8">
                <h1>
                    <img src="/Content/images/AUServer_White_48X48.png" alt="AppLife Server" />
                    <strong>AppLife</strong>Server</h1>
            </div>
            <!-- END LOGO -->
        </div>
        <!-- END HEAD_WRAP (CONTAINER FOR LOGO AND NAVIGATION -->
    </div>
    <!--END HEADER (FULLL WIDTH WRAPPER WITH BG) -->
    <!--START CONTENT  -->
    <div id="content" class="container_12">
        <h1 style="padding-top: 120px;">500 - An internal server error has occurred.</h1>
        <p>We are working to resolve the issue.</p>
    </div>
</body>
</html>