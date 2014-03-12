$(function() {
    $("#exit").on("click", function(){
        $('<form method=POST action=/logout>').appendTo('body').submit();
        return false;
    });
});

