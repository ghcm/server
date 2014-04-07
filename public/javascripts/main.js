$(function() {
    $("#exit").on("click", function(){
        $('<form method=POST action=/logout>').appendTo('body').submit();
        return false;
    });


    function departChange() {
        var departId = $(this).val();
        var $companuIdselect = $("select[name='companyId']");
        $companuIdselect.find("option").show();
        $companuIdselect.find("option[depart!='" + departId + "']").hide();


        var displayed = $companuIdselect.find("option").filter(function() {
            var element = $(this);

            if(element.css('display') == 'none') {
                element.hide();
                return false;
            }

            return true;
        });

        displayed.eq(0).prop("selected","selected");
        $companuIdselect.trigger("change");
    }

    function companyChange() {
        var companyId = $(this).val();
        var $catIdselect = $("select[name='catId']");
        $catIdselect.find("option").show();
        $catIdselect.find("option[company!='" + companyId + "']").hide();


        var displayed = $catIdselect.find("option").filter(function() {
            var element = $(this);

            if(element.css('display') == 'none') {
                element.hide();
                return false;
            }

            return true;
        });

        displayed.eq(0).prop("selected","selected");
    }

    $("select[name='departId']").on("change", departChange);



    $("select[name='companyId']").on("change", companyChange);



});




