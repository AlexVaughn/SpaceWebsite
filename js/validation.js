//Validates the form on this webpage

$(".errorMsg").each(function() { $(this).hide(); });

const stateAbbreviations = [
  'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
  'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
  'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
  'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
  'VT','VI','VA','WA','WV','WI','WY'
 ];

editing = null;
         
function initValidation(formName) {
  let $form = $(formName);

  //Passive validate
  $('form :input').change(function(ev){
    validateForm();
    if(!this.checkValidity()){
      $(this).addClass("was-validated")
    }
  });
  
  //Validate form on button click
  $form.submit(function(event){
    $form = $(this);
    formEl=$form.get(0);
    event.preventDefault();  //prevent default browser submit
    event.stopPropagation(); //stop event bubbling
    validateForm();

    //Hide error messages
    let $errors = $(".errorMsg");
    for (i = 0; i < $errors.length; i++){
      $($errors[i]).hide();
    }

    //If the form is not valid
    if (!formEl.checkValidity()){
      $(":input").addClass("was-validated");
      
      //Show any necessary error messages
      $fields = $(":input");
      $errors = $(".errorMsg");
      for (i = 0; i < $fields.length; i++){
        if ($fields[i].validity.valid == false){
          $($errors[i]).show();
        }
      }
    }

    //If the form is valid
    else{

      //Gather information from form and create visitor
      v = new Visitor(genNewID(), $("#first-name").val(), $("#last-name").val(), $("#address").val(), $("#city").val(),
      $("#state").val(), $("#zip").val(), $("#phone").val(), $("#email").val(), 
      {google:$("#google")[0].checked,yahoo:$("#yahoo")[0].checked,friend:$("#friend")[0].checked}, $("#commentBox").val())
      
      //If the visitor is being edited
      if (editing != null){
        modelUpdateVisitor(editing, v);
        editing = null;
      }
      //Add visitor to visitor list
      else{
        modelAddVisitor(v);
      }
    
      //Swap to list
      showList();
    }
  });

}

//Valide state from state list and the checkbox group
function validateForm() {
  validateState("#state", "You must enter a valid two character state code, e.g., UT");
  validateCheckboxGroup("you must select at least one!");
}

//Valid state
function validateState(id, msg){
  $el = $(id);
  let valid = false;
  //check whether the value is in the stateAbbreviations array
  let stateStr = $el.val().toUpperCase();
  for (i = 0; i < stateAbbreviations.length; i++){
    if (stateAbbreviations[i] == stateStr) {
      valid = true;
      break;
    }
  }
  setElementValidity(id, valid, msg);
}

//Validate checkbox if one minimum of one is checked
function validateCheckboxGroup(message) {
  let valid = false;
  if ($("#google")[0].checked == true || $("#friend")[0].checked == true || $("#yahoo")[0].checked == true)
  { 
    valid = true;
  }
  setElementValidity("#google", valid, message);
  setElementValidity("#friend", valid, message);
  setElementValidity("#yahoo", valid, message);
}

//Set the validity of an input
function setElementValidity(fieldName, valid, message){
  let $field=$(fieldName);
  let el = $field.get(0);
  if (valid) {                       //it has a value
    el.setCustomValidity('');        //sets to no error message and field is valid
  } 
  else {
    el.setCustomValidity(message);   //sets error message and field gets 'invalid' stat
  }
}