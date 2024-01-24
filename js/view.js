//Initial appearance
$("#theForm").hide();
$("#visitorList").hide();
$(".summary").each(function() { $(this).hide(); });
$("section").each(function() { $(this).hide(); });
$("#homePage").show();
currentTheme = "blue";

//When mouse hovers over, brighten the border
function brightenTab(obj){
    if (currentTheme == "red"){ obj.style.boxShadow = "0 0 10px 4px rgba(228, 107, 100, 0.8), inset 0 0 30px 0 rgba(228, 107, 100, 0.8)"; }
    else{ obj.style.boxShadow = "0 0 10px 4px rgba(102, 224, 248, 0.8), inset 0 0 30px 0 rgba(102, 224, 248, 0.8)"; }
}

//When mouse leaves, dim border
function dimTab(obj){
    if (currentTheme == "red"){obj.style.boxShadow = "0 0 8px 2px rgba(184, 37, 29, 0.75), inset 0 0 20px 0 rgba(184, 37, 29, 0.75)"}
    else{ obj.style.boxShadow = "0 0 8px 2px rgba(18, 180, 212, 0.75), inset 0 0 20px 0 rgba(18, 180, 212, 0.75)"; }
}

//Show a brief summary of the fact
function factSumShow(e){
    $(e.target).find(".summary").show();
}

//Hide the brief summary
function factSumHide(e){
    $(e.target).find(".summary").hide();
}

//Scrolls to the headers so that they are at the top of the page with a smooth scroll effect
function scrollToHeaders(){
    document.getElementById("headers").scrollIntoView({behavior: "smooth", block: "start"});
}

//Opens the solar system tab for quick access from the home page "start here"
function goToSolarSystem(){
    closeSections();
    $(sections[1]).show();
    scrollToHeaders();
}

//Close all sections
function closeSections(){
    for (i = 0; i < sections.length; i++){
        $(sections[i]).hide();
    }
}

//Switch sections to the selected topic
function tabClick(e){
    
    //Hide all sections
    closeSections();

    //Handle red theme
    if (currentTheme == "red"){
        theHeaders = $(".headersRed")[0];
        $(theHeaders).addClass("headersBlue");
        $(theHeaders).removeClass("headersRed");
        theBody = $(".bodyBoxRed")[0];
        $(theBody).removeClass("bodyBoxRed");
        $(theBody).addClass("bodyBox");
    }

    //Show the page that is connected to this tab
    for (i = 0; i < headerTabs.length; i++){
        if (headerTabs[i].isEqualNode(e.target)){
            $(sections[i]).show();
        }
    }
    scrollToHeaders();
}

//Scroll to the fact that was clicked
function factSumClick(e){
    
    if ($(e.target).hasClass("summary")){
        obj = e.target.parentNode;
    }
    else{
        obj = e.target;
    }

    for (i = 0; i < factSums.length; i++){
        if (factSums[i].isEqualNode(obj)){
            num = i;
            break;
        }
    }
    separators[num+1].scrollIntoView({behavior: "smooth", block: "start"});
}

//Renders table from global 'visitors' object array
function renderTable() {

    $("#theTable").remove();
    var table = document.createElement("table");
    table.id = "theTable"
    $("#tableContainer").append(table);

            //Create cells
            row = document.createElement("tr");
            nameCell = document.createElement("td");
            addressCell = document.createElement("td");
            phoneCell = document.createElement("td");
            emailCell = document.createElement("td");
            idCell = document.createElement("td");
            actionsCell = document.createElement("td");
    
            //Fill cells context
            nameCell.innerHTML = "Name";
            addressCell.innerHTML = "Address";
            phoneCell.innerHTML = "Phone";
            emailCell.innerHTML = "Email";
            idCell.innerHTML = "ID (Hidden)";
            actionsCell.innerHTML = "Actions";
    
            //Add cells to table
            table.appendChild(row);
            row.appendChild(nameCell);
            row.appendChild(addressCell);
            row.appendChild(phoneCell);
            row.appendChild(emailCell);
            row.appendChild(idCell);
            row.appendChild(actionsCell);

    for (i = 0; i < visitors.length; i++) {

        //Create cells
        row = document.createElement("tr");
        nameCell = document.createElement("td");
        addressCell = document.createElement("td");
        phoneCell = document.createElement("td");
        emailCell = document.createElement("td");
        idCell = document.createElement("td");
        actionsCell = document.createElement("td");

        //Fill cells context
        nameCell.innerHTML = visitors[i].fullName;
        addressCell.innerHTML = visitors[i].fullAddress;
        phoneCell.innerHTML = visitors[i].phone;
        emailCell.innerHTML = visitors[i].email;
        idCell.innerHTML = visitors[i].id;

        //Create edit links
        var breakLine = document.createElement("br");
        var edit = document.createElement("u");
        edit.innerHTML = "edit";
        edit.classList.add("edit");
        edit.addEventListener("click", function(){fillForm(this.parentNode.previousSibling.innerHTML);});

        //Create delete links
        var doDelete = document.createElement("u");
        doDelete.innerHTML = "delete";
        doDelete.classList.add("doDelete");
        doDelete.addEventListener("click", function(){deleteVisitor(this.parentNode.previousSibling.innerHTML);});        

        //Add cells to table
        table.appendChild(row);
        row.appendChild(nameCell);
        row.appendChild(addressCell);
        row.appendChild(phoneCell);
        row.appendChild(emailCell);
        row.appendChild(idCell);
        row.appendChild(actionsCell);
        actionsCell.appendChild(edit);
        actionsCell.appendChild(breakLine);
        actionsCell.appendChild(doDelete);

        //Hide id cell
        idCell.style.visibility = "hidden";
    }
}

//shows visitor container and hides all other site content containers 
function showVisitors()  {
    
    //Handle red theme
    if (currentTheme == "red"){
        theHeaders = $(".headersRed")[0];
        $(theHeaders).addClass("headersBlue");
        $(theHeaders).removeClass("headersRed");
        theBody = $(".bodyBoxRed")[0];
        $(theBody).removeClass("bodyBoxRed");
        $(theBody).addClass("bodyBox");
    }

    //Hide all sections
    closeSections();

    //Show visitor page and list
    $("#logVisit").show();
    showList();
    scrollToHeaders();
}

//shows visitor list and hides form 
function showList() {
    $("#theForm").hide();
    $("#visitorList").show();
    renderTable();
}

//shows visitor form and hides list 
function showForm() {
    clearForm();
    $("#theForm").show();
    $("#visitorList").hide();
    scrollToHeaders();
}

//clears values on inputs so next time form is loaded they don't have old contents
function clearForm() {
    $("#first-name").val("");
    $("#last-name").val("");
    $("#address").val("");
    $("#city").val("");
    $("#state").val("");
    $("#zip").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#google")[0].checked = false;
    $("#yahoo")[0].checked = false;
    $("#friend")[0].checked = false;
    $("#commentBox").val("");
    $(".errorMsg").each(function() { $(this).hide(); });
}

//toggles between blue and red theme
function toggleTheme(){
    
    //Toggle to red
    if (currentTheme == "blue"){
        currentTheme = "red";
        head = document.getElementsByTagName("head")[0];
        theme = document.createElement("link");
        theme.rel = "stylesheet";
        theme.href = "css/theme.css";
        theme.id = ("specialTheme");
        head.append(theme);
        $(".customButton").each(function() { dimTab(this); });
        $("section").each(function() { $(this).hide(); });
        $("h1").addClass("glow");
        theHeaders = $(".headersBlue")[0];
        $(theHeaders).addClass("headersRed");
        $(theHeaders).removeClass("headersBlue");
        theBody = $(".bodyBox")[0];
        $(theBody).removeClass("bodyBox");
        $(theBody).addClass("bodyBoxRed");
    }
    //Toggle to blue
    else{
        currentTheme = "blue";
        $("#specialTheme").remove();
        $(".customButton").each(function() { dimTab(this); });
        theHeaders = $(".headersRed")[0];
        $(theHeaders).addClass("headersBlue");
        $(theHeaders).removeClass("headersRed");
        theBody = $(".bodyBoxRed")[0];
        $(theBody).removeClass("bodyBoxRed");
        $(theBody).addClass("bodyBox");
        $("#homePage").show();
    }
}