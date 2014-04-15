(function( $ ){

    var defaults = {
        presizePercent: 0.6,
        isCircle: true,
        isModal: true,
        isCentered: true,
        ajax: false,
        leftButRoute: "",
        rightButRoute: "",
        closeButRoute: "",
        expandButRoute: ""
    }

    var methods = {
        init : function( options ) {
            var data = $.extend({}, defaults, options);
            data.elements = $(this);

            data.winHeight = $(window).height();
            data.winWidth = $(window).width();



            $(this).on("click", function (e) {
                methods.initImagesProps(data, e);
            });
        },
        initImagesProps: function (data, e) {
            var $target = $(e.target);

            //Текущий индекс элемента в ряду
            data.currentIndex = $target.index();

            //Создаем wrapper, который будет содержать картинку
            data.div = $("<div />");
            if (data.imageWrapperClassName) {
                data.div.prop("class", data.imageWrapperClassName);
            }
            else {
                data.div.css({
                    "position": "absolute",
                    "top": 0,
                    "padding": "10px",
                    "border": "1px solid #b3c9ce",
                    "border-radius": "4px",
                    "text-align": "center",
                    "font": "italic 14px/1.3 arial, sans-serif",
                    "color": "#333",
                    "background": "#fff",
                    "box-shadow": "3px 3px 3px rgba(0,0,0,.3)",
                    "z-index": 1000
                })
            }

            $(document.body).append(data.div);

            //Координаты и метрики элемента, по которому кликнули.
            data.targetProps = $target.offset();
            data.elWidth = $target.outerWidth();
            data.elHeight = $target.outerHeight();

            //Смотрим на путь до картинки
            data.sources = [];
            data.sources.push($target.attr("link"));

            //Показываем варппер по координатам элемента, по которому кликнули. Внутри будет лоадер
            data.div.css("display", "inline-block");
            data.div.css({
                left: data.targetProps.left,
                top: data.targetProps.top
            });

            //Показываем лоадер
            data.loader = $("<img />");
            data.loader.prop("src", data.loaderSrc);

            data.loader.css({
                margin: 0,
                padding: 0
            });
            data.div.append(data.loader);

            //Картинка грузится по аяксу или нет
            if (data.ajax) {
                var vahImg = methods.makeAjaxQuery(data, function () { methods.addImg(data) });
            }
            else {
                var vahImg = methods.preloadImages(data, data.sources, function () { methods.addImg(data) } );
            }

            //Делать ли окно модальным
            if (data.isModal) {
                addModal();
            }
            else {
                methods.dragndrop(data);
            }

            data.scrollTop = $(document).scrollTop();
            data.scrollLeft = $(document).scrollLeft();

            function addModal () {
                data.cover = $("<div />");
                data.cover.css({
                    "background":"gray",
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    "z-index": 1,
                    opacity: 0.3,
                    filter: "alpha(opacity=30)"
                });
                $(document.body).append(data.cover);
            }

            e.preventDefault();
            return false;

        },
        //размеры окна
        getWindowSizes: function () {
            var winLeft = $(window).scrollLeft();
            var winTop = $(window).scrollTop();
            var winRight = winLeft + $(window).width();
            var winBottom = winTop + $(window).height();
            return {
                left: winLeft,
                top: winTop,
                right: winRight,
                bottom: winBottom
            }
        },
        //предзагрузка изображений
        preloadImages: function (data, sources, callback) {

             var counter = 0;
             function onLoad() {
                 data.img.newWidth = img.width;
                 data.img.newHeight = img.height;
                 counter++;
                 if (counter == sources.length) callback();
             }

             for (var i = 0; i < sources.length; i++) {
                 var img = document.createElement('img');
                 // сначала onload/onerror, затем src - важно для IE<9
                 img.onload = img.onerror = onLoad;
                 img.src = sources[i];
                 data.img = $(img);
             }

                return img;
         },
        //добавляет изображение после предзагрузки, просчитывает часть свойств
        addImg: function(data) {

             var newRight, newBottom;

             data.img.originalSize = {
                 width: data.img.width,
                 height: data.img.height
             }

            if (data.elements.length > 1) {
                addNextDivIcon();
                addPrevDivIcon();
                methods.enableButtons(data);
            }

             data.windowProps = methods.getWindowSizes();

             methods.carouselIt(data);
              //убираем все отступы
             data.img.css({padding: 0, margin: 0});

            //прячем лоадер
             data.loader.hide();

            //добавляем картинку
             data.div.append(data.img);

            //добавляем кнопку закрытия
             addCloseDivIcon();

            //некоторая кроссбарузерность
             var imageWidth = data.img.get(0).width || data.img.width();
             var imageHeight = data.img.get(0).height || data.img.height();

            //дестурктор при нажатии на увеличенной картинке (накладывается тока при модальном окне, если нет,
            // то там свой обработчик с просчетом координат dragndrop)
            if (data.isModal)   {
                data.div.on("click", function (e) {
                    data.nextButton = (!data.nextButton) ? true : data.nextButton;
                    data.prevButton = (!data.prevButton) ? true : data.prevButton;
                    if ( e.target != data.nextButton[0] && e.target != data.prevButton[0]) {
                        data.div.remove();
                        data.cover.remove();
                        data.resizer = false;
                    }
                });
            }

            //добавляет закрывающую кнопку
            function addCloseDivIcon () {
                 data.closer = $("<div>");
                 data.closer.css({
                     width: "26px",
                     height: "26px",
                     position: "absolute",
                     right: 20,
                     display: "none",
                     top: 20,
                     background: "url('" + data.closeButRoute + "')",
                     cursor: "pointer",
                     "z-index": 2000
                 });

                 data.div.append(data.closer);
             }

            //добавляет кнопку - листалку к след картинке
            function addNextDivIcon () {
                 data.nextButton = $("<div>");
                 data.nextButton.css({
                     width: "20px",
                     height: "97px",
                     position: "absolute",
                     display: "none",
                     right: 9,
                     top: data.div.height()/2,
                     background: "url('" + data.rightButRoute + "')",
                     "background-position": "-80px 0",
                     cursor: "pointer",
                     "z-index": 3000
                 });
                 data.nextButton.css({ "top": "-=" + data.nextButton.height()/2/2  });

                 data.nextButton.hover(function () {
                     $(this).css({"background-position":"-120px 0"});
                 }, function () {
                     $(this).css({"background-position":"-80px 0"});
                 })

                 data.div.append(data.nextButton);
             }

            //добавляет кнопку - листалку к пред картинке
            function addPrevDivIcon () {
                data.prevButton = $("<div>");
                data.prevButton.css({
                    width: "20px",
                    height: "97px",
                    position: "absolute",
                    display: "none",
                    left: 9,
                    top: data.div.height()/2,
                    background: "url('" + data.leftButRoute + "')",
                    "background-position": "-39px 0",
                    cursor: "pointer",
                    "z-index": 3000
                });
               // height/2  - data.prevButton.height()/2 + methods.helperMethods.getPaddingsVert(data.div[0]) + methods.helperMethods.getBorderHor(data.div[0]);
                data.prevButton.css({ "top": "-=" + data.prevButton.height()/2/2 });


                data.prevButton.hover(function () {
                    $(this).css({"background-position":"0 0"});
                }, function () {
                    $(this).css({"background-position":"-39px 0"});
                })

                data.div.append(data.prevButton);
            }



        },
        //показывает лоадер
        showLoader: function (data) {
            methods.disableButtons(data);
            data.loader.css({ position: "absolute", left: "50%", top: "50%", "z-index": 101});
            data.loaderWrap = $("<div>");
            data.loader.wrap(data.loaderWrap);
            data.loaderWrap.css({"position": "absolute", width: "100%", height: "100%", top: 0, left: 0, border: "0px solid black", "z-index": 100, background:"white"});
            data.div.append(data.loaderWrap);
            data.loader.show();
        },

        //функция, которая отвечает за смену изображения
        imageLeafLoader: function (data, direction) {


            switch (direction) {
                case "next":
                    data.currentIndex = getIndexNext();
                    break;
                case "prev":
                    data.currentIndex = getIndexPrev();
                    break;
            }

            var nextImage = data.elements[data.currentIndex].getAttribute("link");

            //функция, которая запускается после загрузки изображения
            function onLoad() {
                data.img.newWidth = img.width;
                data.img.newHeight = img.height;

                data.loaderWrap.hide();
                data.loader.hide();
                methods.enableButtons(data);
                methods.carouselIt(data);
            }

            var img = document.createElement('img');
            // сначала onload/onerror, затем src - важно для IE<9
            img.onload = img.onerror = onLoad;

            img.src = nextImage;
            data.img.get(0).src = nextImage;
            //event.stopPropagation();

            /* получаем индекс следующего элемента (при прокрутке вправо )*/
            function getIndexNext () {
                if (!data.isCircle) { //если циклическая карусель
                    if (data.currentIndex == data.elements.length - 1) {
                        return  data.elements.length - 1;
                    }
                }
                else {           //если не циклическая карусель
                    if (data.currentIndex == data.elements.length - 1) {
                        return 0;
                    }
                }
                return ++data.currentIndex;
            }

            /* получаем индекс предыдущего элемента (при прокрутке влево)*/
            function getIndexPrev () {
                if (!data.isCircle) {   //если циклическая карусель
                    if (data.currentIndex == 0) {
                        return 0;
                    }

                }
                else {           //если не циклическая карусель
                    if (data.currentIndex == 0) {
                        return data.elements.length - 1;
                    }
                }
                return --data.currentIndex;

            }
        },
        //вправо
        next: function (event, data) {
            methods.showLoader(data);
            methods.imageLeafLoader(data, "next");
        },
        //влево
        prev: function (event, data) {
            methods.showLoader(data);
            methods.imageLeafLoader(data, "prev");
        },
        //основная функция, определяющая размеры изображения и враппера в окне
        carouselIt: function (data) {

            /* сохраняем размеры нового изображения */
            var imgHeight = data.img.newHeight;
            var imgWidth = data.img.newWidth;
           if (!data.img.originalSize) {
               data.img.originalSize = {};
           }
            data.img.originalSize.width = data.img.newWidth;
            data.img.originalSize.height = data.img.newHeight;



            data.winHeight = $(window).height();
            data.winWidth = $(window).width();            

            /* если размеры изображения больше размера окна, то ресайзим */
            if (imgHeight > data.winHeight || imgWidth >  data.winWidth)  {
                if (!data.resizer) {
                    addFullImageIcon();
                }
                var smallerProp = getSmallerProp();

                //смотрим какой показатель меньше величин экрана - от этого зависит какой показатель будет главным
                if (smallerProp) {
                    switch (smallerProp) {
                        case "height":
                            var prop = data.winHeight/imgHeight;
                            var height = data.winHeight*data.presizePercent -
                                methods.helperMethods.getPaddingsVert(data.div.get(0)) -
                                methods.helperMethods.getBorderVert(data.div.get(0));
                            var width = data.img.newWidth*prop*data.presizePercent -
                                methods.helperMethods.getPaddingsHor(data.div.get(0)) -
                                methods.helperMethods.getBorderHor(data.div.get(0));
                            break;
                        case "width":
                            var prop =  data.winWidth/imgWidth;
                            var width =  data.winWidth*data.presizePercent -
                                methods.helperMethods.getPaddingsHor(data.div.get(0)) -
                                methods.helperMethods.getBorderHor(data.div.get(0));
                            var height =  data.img.newHeight*prop*data.presizePercent -
                                methods.helperMethods.getPaddingsVert(data.div.get(0)) -
                                methods.helperMethods.getBorderVert(data.div.get(0));
                            break;
                    }
                }
            }
            /* если размеры изображения меньше размера окна */
            else {
                if (data.resizer && typeof data.resizer == "object") {
                    $(data.resizer).remove();
                    data.resizer = false;
                }
                var height = data.img.newHeight;
                var width = data.img.newWidth;

            }
            // делаем изображение по центру
            if (data.isCentered && data.windowProps)
                var centerProps = setCenterImagePosition();
            if (!data.isCentered && data.windowProps)
                var centerProps = setImagePositionByImagePosition();

            //анимируем изменение изображения
            data.img.animate({ width: width, height: height});
            if (centerProps)
                data.div.animate({ left: centerProps.left, top: centerProps.top}, function () {

                if (typeof data.prevButton == "object") {
                    data.prevButton.show();
                    data.nextButton.show();
                }

                data.closer.show();
                if (data.resizer)
                    data.resizer.show();
                //Если элементов больше 1, то добавляем кнопки листания

            } );

            if (typeof data.prevButton == "object")
                correctPrevNextButtons();


            //функция отвечает за появление дива исходя из показателей картинки, по которой произошел клик

            function setImagePositionByImagePosition () {
                var newLeft = data.targetProps.left + data.elWidth/2  - width/2;
                newRight = newLeft + width + methods.helperMethods.getPaddingsHor(data.div[0]) + methods.helperMethods.getBorderHor(data.div[0]);
                newBottom = data.targetProps.top + height/2 + methods.helperMethods.getPaddingsVert(data.div[0])/2;

                var left = data.targetProps.left + (data.elWidth - width)/2^0;
                var top = data.targetProps.top + (data.elHeight - height)/2^0;

                correctProps();

                //корректировка координат
                function correctProps () {

                    if (left < data.windowProps.left)  {
                        left = data.windowProps.left;
                    } // вылезли за левую границу

                    if (top < data.windowProps.top) { // вылезли за верхнюю границу
                        top = data.windowProps.top;
                    }

                    if (newRight > data.windowProps.right) { // вылезли за верхнюю границу
                        left = data.windowProps.right - width -
                            methods.helperMethods.getPaddingsHor(data.div[0]) -
                            methods.helperMethods.getBorderHor(data.div[0]);

                    }

                    if (newBottom > data.windowProps.bottom) { // вылезли за нижнюю границу
                        top = data.windowProps.bottom - data.div.height() -
                            methods.helperMethods.getPaddingsVert(data.div[0]) -
                            methods.helperMethods.getBorderVert(data.div[0]);
                    }
                }


                return {left: left, top: top}
            }

/*            function makeAnimatedOpacity(){
                data.div.css( { "opacity": "0" });
                if (data.resizer)
                    data.resizer.css( { opacity: 0 });

                data.div.css( { "display": "inline-block" });

                data.div.animate({ opacity: 1  });

                if (data.resizer)
                    data.resizer.css( { opacity: 1 });
            }*/

            //корректировка высоты расположения управляющих кнопок
            function correctPrevNextButtons () {
                var butHeight = height/2  - data.prevButton.height()/2 + methods.helperMethods.getPaddingsVert(data.div[0]) + methods.helperMethods.getBorderHor(data.div[0]);
                data.prevButton.css({ "top": butHeight});
                data.nextButton.css({ "top": butHeight});
            }


            //установка изображения по центру экрана
            function setCenterImagePosition () {
                var left =  (data.windowProps.right - width)/2^0;
                var top = data.windowProps.top + (data.winHeight - height)/2^0 ;

                return {left: left, top: top}
            }

            //получаем какой параметр является главным - всота или ширина
            function getSmallerProp () {
                var h = data.winHeight - imgHeight;
                var w =  data.winWidth - imgWidth;
                return (h < w) ? "height" : "width";
            }


            //функция добавления кнопки перехода к полноразмерному изображению
            function addFullImageIcon () {

                data.resizer = $("<div>");
                data.resizer.css({
                    width: "54px",
                    height: "54px",
                    position: "absolute",
                    display: "none",
                    right: 20,
                    bottom: 40,
                    background: "url('" + data.expandButRoute + "')",
                    cursor: "pointer",
                    "z-index": 2000
                });

                data.div.append(data.resizer);

                data.resizer.on("click", function (event) {
                    methods.setimageFullSize(data, event);
                })
            }

        },

        //если картинка является не модальной, то можно ли ее таскать
        dragndrop: function (data)  {

            var element = data.div;
            element.on("mousedown",  function(e) {
                element.off("mouseup.close");

                var self = $(this);

                var initClickCoords = { left: e.pageX, top: e.pageY };
                var coords = self.offset();

                var shiftX = e.pageX - coords.left;
                var shiftY = e.pageY - coords.top;

                self.css({"z-index" : 1000}); // над другими элементами

                function moveAt(e) {
                    self.css({ left: e.pageX - shiftX + 'px' });
                    self.css({ top: e.pageY - shiftY + 'px' });
                }

                $(document).on("mousemove",  function(e) {
                    moveAt(e);
                });

                $(document).on("mouseup", function(e) {
                    data.resizer = (!data.resizer) ? false : data.resizer;
                    data.nextButton = (!data.nextButton) ? true : data.nextButton;
                    data.prevButton = (!data.prevButton) ? true : data.prevButton;

                    if ( Math.abs(e.pageX - initClickCoords.left) < 3 && e.target != data.resizer[0] && e.target != data.nextButton[0] && e.target != data.prevButton[0]) {
                        element.remove();
                        if (data.cover)
                            data.cover.remove();

                        if (data.nextButton && data.prevButton) {
                            data.nextButton = false;
                            data.prevButton = false;
                        }
                        data.resizer = false;
                    }

                    $(document).off("mousemove");
                    e.stopPropagation();
                });


            });

            element.on("dragstart",  function() {
                return false;
            })

        },

        //картинка, которая грузится по аяксу
        makeAjaxQuery: function (data, callback) {
            var $link = data.elements.attr("link");
            console.log($link);
            $.post($link, {}, function (wow) {
                var div = $("<div />");
                div.append(wow);
                
                var images = div.find("img");

                data.sources = [];
                data.sources.push(images.get(0).src);

                methods.preloadImages(data, data.sources, function () { methods.addImg(data) } );
            });
        },

        //вспомогательные методы
        helperMethods: {
            getPaddingsHor: function  (elem) {
                var paddingLeft = parseInt(methods.getStyle(elem, "padding-left")) || 0;
                var paddingRight =  parseInt(methods.getStyle(elem, "padding-right")) || 0;
                return  paddingLeft + paddingRight;
            },

            getPaddingsVert: function  (elem) {
                var paddingTop = parseInt(methods.getStyle(elem, "padding-top")) || 0;
                var paddingBottom = parseInt(methods.getStyle(elem, "padding-bottom")) || 0;
                return  paddingTop + paddingBottom;
            },

            getBorderHor: function (elem) {
                var borderLeft = parseInt(methods.getStyle(elem, "border-left")) || 0;
                var borderRight =  parseInt(methods.getStyle(elem, "border-right")) || 0;
                return  borderLeft + borderRight;
            },
            getBorderVert: function (elem) {
                var borderTop = parseInt(methods.getStyle(elem, "border-top")) || 0;
                var borderBottom = parseInt(methods.getStyle(elem, "border-bottom")) || 0;
                return  borderTop + borderBottom;
            }
        },

        //делает изображение полноразмерным, вызывается при нажатии на соотв. кнопку
        setimageFullSize: function (data, event) {
            try {
                data.div.css("left", $(window).scrollLeft());
                data.div.css("top", $(window).scrollTop());

                data.img.width(data.img.originalSize.width);
                data.img.height(data.img.originalSize.height);
            }
            catch (e) {
                console.log(e.message);
            }
            event.stopPropagation();
        },

        /* вспомогательная функция получения свойства */
        getStyle: function (oElm, strCssRule) {
            var strValue = "";
            if(document.defaultView && document.defaultView.getComputedStyle){
                strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
            }
            else if(oElm.currentStyle){
                strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
                    return p1.toUpperCase();
                });
                strValue = oElm.currentStyle[strCssRule];
            }
            return strValue;
        },

        /* деактивирует кнопки */
        disableButtons : function (data) {
            data.nextButton.off("click");
            data.prevButton.off("click");
        },

        /* активирует кнопки */
        enableButtons: function (data) {
            data.nextButton.on("click", function (event) {
                methods.next(event, data);
            });

            data.prevButton.on("click", function (event) {
                methods.prev(event, data);
            });
        }
    }


    $.fn.gallery = function( method ) {
        if ( methods[method] ) {
           return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для gallery' );
        }
    };

})( jQuery );

