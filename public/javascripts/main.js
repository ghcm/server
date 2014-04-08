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
        if (!displayed.find(":selected").length) {
            displayed.eq(0).prop("selected","selected");
            $companuIdselect.trigger("change");
        }

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
        if (!displayed.find("option:selected").length) {
            displayed.eq(0).prop("selected","selected");
        }

    }

    $("select[name='departId']").on("change", departChange);

    $("select[name='companyId']").on("change", companyChange);

   // if (window.TRIGGER) {
  // $("select[name='departId']").trigger("change");
   // }




/////////////////////////////////////////
//          DEL SECTION    //////////////
/////////////////////////////////////////

    /* ajax request */
    function makeAjaxRequest(opts) {
        var action = opts.action;
        var id = opts.id;
        var value = opts.val || false;

        $.post("/del_good", { action: action, id: id, value: value}, function (data) {

            if (data)
                showConfirm("SUCCESS");
            else
                alert("Error. Please contact administrator");

        });
    }

    function showConfirm (str) {
        var $div = $("<div>");
        $div.css({
            position: "fixed",
            width: 330,
            height: 70,
            background: "#00B2B5",
            top: 20,
            right: 20,
            padding: 20,
            "text-align": "center",
            "border-radius": "10px",
            color: "white",
            "font-weight": "bold",
            "z-index": 1000
        });

        $div.html(str);
        $(document.body).append($div);

        setTimeout(function () {
            $div.fadeOut(1000, function () {
                $div.remove();
            });
        }, 1000)
    }



    $("button[action='del_goods']").on("click", function () {

        var $self = $(this);

        var isDel = confirm("Вы действительно хотите удалить данный товар?");

        var thisId = $(this).attr("thisid");

        if (isDel) {
            $.post("/del_good", { goodId: thisId}, function (data) {

                if (data.result == "success")
                    showConfirm(data.text);
                else
                    alert("Error. Please contact administrator");

                $self.closest("tr").remove();
            });


        }

    });


    $("button[action='del_cat']").on("click", function () {


        var $self = $(this);

        var isDel = confirm("Вы действительно хотите удалить данную категорию?");

        var thisId = $(this).attr("thisid");

        if (isDel) {
            $.post("/del_cat", { catId: thisId}, function (data) {

                if (data.result == "success")
                    showConfirm(data.text);
                else
                    alert("Error. Please contact administrator");

                $self.closest("tr").remove();
            });


        }

    });








});




