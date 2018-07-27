
$(document).ready(function () {
    var input = '';
    $('#courseSearch').keyup(function (e) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        input = this.value;
        if (regex.test(input)) {
            console.log(input);
            if (input.length > 2) {
                var reg2 = new RegExp("^[a-zA-Z]{3}[0-9]{1,3}$");
                if (reg2.test(input)) {
                    var URL = 'http://localhost:3000/search-course?searchQuery=' + input;
                    $.get(URL, function (response) {
                        console.log(response);
                        getCourses(response);
                    });
                }

            }
            return true;
        }

        e.preventDefault(); 
        return false;
    });
});

function getCourses(data){
    var course_array = [];
    for (i in data){
        course_array.push(data[i].course);
        
    }
    console.log(course_array);
    displayDropdown(course_array);
    
}

function displayDropdown(arr){
    var alreadyFilled = false;
    function initDialog() {
        clearDialog();
        for (var i = 0; i < arr.length; i++) {
            $('.dialog').append('<div>' + arr[i] + '</div>');
        }
    }
    function clearDialog() {
        $('.dialog').empty();
    }
    $('.autocomplete input').click(function() {
        if (!alreadyFilled) {
            $('.dialog').addClass('open');
        }

    });
    $('body').on('click', '.dialog > div', function() {
        $('.autocomplete input').val($(this).text()).focus();
        $('.autocomplete .close').addClass('visible');
        alreadyFilled = true;
    });
    $('.autocomplete .close').click(function() {
        alreadyFilled = false;
        $('.dialog').addClass('open');
        $('.autocomplete input').val('').focus();
        $(this).removeClass('visible');
    });

    function match(str) {
        str = str.toLowerCase();
        clearDialog();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].toLowerCase().startsWith(str)) {
                $('.dialog').append('<div>' + arr[i] + '</div>');
            }
        }
    }
    $('.autocomplete input').on('input', function() {
        $('.dialog').addClass('open');
        alreadyFilled = false;
        match($(this).val());
    });
    $('body').click(function(e) {
        if (!$(e.target).is("input, .close")) {
            $('.dialog').removeClass('open');
        }
    });
    initDialog();
}