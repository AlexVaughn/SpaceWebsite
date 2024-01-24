customButtons = $(".customButton");          //Array, custom buttons
headerTabs = $(".headerTab");                //Array, Tabs for each topic at in the menu
factSums = $(".factSummary");                //Array, Brief summaries of each fact at the top of each page
sections = $("section");                     //Array, all sections
separators = $(".separator");                //Array, all the separators between sub sections

//Add event listeners to custom buttons so they have the brighten effect
for (i = 0; i < customButtons.length; i++){
    $(customButtons[i]).mouseenter(function(e){brightenTab(e.target)});
    $(customButtons[i]).mouseleave(function(e){dimTab(e.target)});
}

//Add event listeners to the header tabs for navigation
for (i = 0; i < headerTabs.length; i++){
    $(headerTabs[i]).click(tabClick);
}

//Add event listeners to each fact summary
for (i = 0; i < factSums.length; i++){
    factSums[i].addEventListener("mouseenter", factSumShow);
    factSums[i].addEventListener("mouseleave", factSumHide);
    $(factSums[i]).click(factSumClick);
}

//Add event listeners to stand alone buttons and links
$("#visitorBtn").click(showVisitors);
$("#solarLink").click(goToSolarSystem);
$("#logVisitLink").click(showForm);
$("#neverMindLink").click(function(){
    editing = false;
    scrollToHeaders();
    showList();
});
$("#headerIcon").click(toggleTheme);
$(".goToTop").each(function() { $(this).click(scrollToHeaders); });

//confirm deletion, removes the vistor from the array, re-renders the table
function deleteVisitor(id) {
    result = confirm("Are you sure you want to delete this visitor?");
    if (result){
        modelDeleteVisitor(parseInt(id));
        showList();
    }
}

//fills the input values with those of an existing visitor
function fillForm(id){
    visitor = visitors[findVisitorIndex(parseInt(id))];
    showForm();
    editing = visitor;
    $("#first-name").val(visitor.firstName);
    $("#last-name").val(visitor.lastName);
    $("#address").val(visitor.address);
    $("#city").val(visitor.city);
    $("#state").val(visitor.state);
    $("#zip").val(visitor.zip);
    $("#phone").val(visitor.phone);
    $("#email").val(visitor.email);
    $("#google")[0].checked = visitor.howFound.google;
    $("#yahoo")[0].checked = visitor.howFound.yahoo;
    $("#friend")[0].checked = visitor.howFound.friend;
    $("#commentBox").val(visitor.notes);
}