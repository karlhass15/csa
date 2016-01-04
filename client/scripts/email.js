
$(document).ready(function(){

    $('#informationTab a').click(function (e) {
        if($(this).parent('li').hasClass('active')){
            $( $(this).attr('href') ).hide();
        }
        else {
            e.preventDefault();
            $(this).tab('show');
        }
    });

    $("#contactForm").submit(function(event){
        event.preventDefault();
        var values = {};

    });
//submit button in email.html
    $("#contactForm").submit(addContact);

});
//function adds a persons info and message to database
function addContact() {
    event.preventDefault();
    var values = {};

    //clears form in email.html
    $.each($(this).serializeArray(), function (i, field) {
        values[field.name] = field.value;

    });
    //clearing the fields after submit in email.html
    $(this).find("input[type=text]").val("");
    $(this).find("textarea").val("");

    //sends addedContact's info to database
    $.ajax({
        type: "POST",
        url: "/contact",
        data: values,
        success: function (data) {
            //emailSent()
            console.log('post made it');
        }
    });
}

