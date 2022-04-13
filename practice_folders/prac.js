//$ = shorthand for getElementById
$(function () {
    var bindDatePicker = function() {
         $(".date").datetimepicker({
         format:'YYYY-MM-DD',
             icons: {
                 time: "fa fa-clock-o",
                 date: "fa fa-calendar",
                 up: "fa fa-arrow-up",
                 down: "fa fa-arrow-down"
             }
         }).find('input:first').on("blur",function () {
             // check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
             // update the format if it's yyyy-mm-dd
             var date = parseDate($(this).val());
 
             if (! isValidDate(date)) {
                 //create date based on momentjs (we have that)
                 date = moment().format('YYYY-MM-DD');
             }
 
             $(this).val(date);
         });
     }
    
    var isValidDate = function(value, format) {
         format = format || false;
         // lets parse the date to the best of our knowledge
         if (format) {
             value = parseDate(value);
         }
 
         var timestamp = Date.parse(value);
 
         return isNaN(timestamp) == false;
    }
    
    var parseDate = function(value) {
         var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
         if (m)
             value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);
 
         return value;
    }
    
    bindDatePicker();
  });
$(function () {

    // Start counting from the third row
    let counter = 1;

    $("#insertRow").on("click", function (event) {
        event.preventDefault();

        let newRow = $("<tr>");
        let cols = '';

        // Table columns
        cols += '<th scope="row">' + counter + '</th>';
        cols += '<td><input class="form-control rounded-0" type="text" name="firstname" placeholder="First name"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="lastname" placeholder="Last name"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="@" placeholder="@"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="subjectname" placeholder="Subject"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="chaptername" placeholder="Assignment Name"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="category" placeholder="Category"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="startdate" placeholder="MM/DD/YYYY"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="firstname" placeholder="MM/DD/YYYY"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="firstname" placeholder="Total Points"></td>';
        cols += '<td><input class="form-control rounded-0" type="text" name="firstname" placeholder="Score"></td>';
        cols += '<td><button class="btn btn-danger rounded-0" id ="deleteRow"><i class="fa fa-trash"></i></button</td>';

        
        // Insert the columns inside a row
        newRow.append(cols);

        // Insert the row inside a table
        $("table").append(newRow);

        // Increase counter after each row insertion
        counter++;
    });

    // Remove row when delete btn is clicked
    $("table").on("click", "#deleteRow", function (event) {
        $(this).closest("tr").remove();
        counter -= 1
    });
});