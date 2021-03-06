"use strict";

// var jq = jQuery;

var app = (function () {
    var init = function() {
        _listeners();
    };

    // Документ готов
    var _onLoad = function () {
        console.log('Document ready');

        var winHeight = document.documentElement.clientHeight;
        var winWidth = document.documentElement.clientWidth;

        var vanillaModal = new VanillaModal.default();

        if ( document.getElementById('headroom') ) {
            if ( winWidth > 992 ) {
                var headroom  = new Headroom( document.getElementById('headroom') );
                headroom.init();
            }
        }

        document.getElementById('menu-toggle').addEventListener('click', function (e) {
            _menuToggle(this);
        } );

        var menuItems = document.querySelectorAll('.scroll-anchor a');
        [].forEach.call( menuItems, function(item) {

           item.addEventListener('click', function(e) {
               var target = this.getAttribute('href');
               zenscroll.to( document.querySelector(target) );
           });

        });

        if ( document.getElementById('btn-regions') ) {
            document.getElementById('btn-regions').addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('b-regions').classList.toggle('active');
            });
        }

        if ( document.querySelector('input[type="tel"]') ) {
            [].forEach.call( document.querySelectorAll('input[type="tel"]'), function( input ) {
                Inputmask({"mask": "+7(999) 999-99-99"}).mask(input);
            } );
        }

        validate.init({
            messageValueMissing: 'Это обязательное поле',
            messageTooShort: 'Не менее {minLength} символов',
            disableSubmit: true,

            onSubmit: function (form, fields) {
                _sendForm(form, vanillaModal);
            }
        });

        if ( document.querySelector('.testimonials-slider') ) {
            var testimonialsSlider = tns({
                container: '.testimonials-slider__body',
                items: 1,
                controls: false,
                loop: false
            });
        }

        if ( document.querySelector('.calc-slider') ) {
            [].forEach.call( document.querySelectorAll('.calc-slider'), function( slider ) {
                var calcSlider = tns({
                    container: slider.querySelector('.calc-slider__body'),
                    items: 2,
                    controls: true,
                    nav: false,
                    loop: true,
                    slideBy: 2,
                    controlsText: ['',''],
                    responsive: {
                        0: {
                            items: 1,
                            slideBy: 1
                        },
                        544: {
                            items: 2,
                            slideBy: 2
                        },
                        768: {
                            items: 3,
                            slideBy: 3
                        }
                    },
                    onInit: function( slider ) {
                        var sliderID = slider.container.getAttribute('id'),
                            firstSlide = slider.slideItems.namedItem( sliderID + '-item0');

                        firstSlide.querySelector('input').setAttribute('checked', 'checked');
                    }
                });
            } );
        }

        if ( document.querySelector('#calc-tabs') ) {
            _tabs( document.querySelector('#calc-tabs') );
        }
        if ( document.querySelector('#car-tabs') ) {
            _tabs( document.querySelector('#car-tabs') );
        }

        if ( document.getElementById('calc-moscow') ) {
            _calc( document.getElementById('calc-moscow'), vanillaModal );
        }
        if ( document.getElementById('calc-obl') ) {
            _calc( document.getElementById('calc-obl'), vanillaModal );
        }
        if ( document.getElementById('calc-russia') ) {
            _calc( document.getElementById('calc-russia'), vanillaModal );
        }

        if ( document.querySelector('.js-car-order') ) {
            [].forEach.call( document.querySelectorAll('.js-car-order'), function(button) {

                button.addEventListener('click', function(e) {
                    var car = button.getAttribute('data-car');
                    document.getElementById('callback').querySelector('input[name="car"]').value = car;
                    vanillaModal.open('#callback');
                });

            } );
        }

        if ( document.querySelector('#b-map') ) {
            _createMap( document.querySelector('#b-map') );
        }
    };

    // Открываем меню
    var _menuToggle = function (elem) {
        elem.classList.toggle('active');
        document.getElementById('menu').classList.toggle('active');
    };

    var _createMap = function (elem) {
        var mapCenter = elem.getAttribute('data-center');
        var mapMark = elem.getAttribute('data-mark');
        var mapAddress = elem.getAttribute('data-address');

        var mapCenterCoords = mapCenter.split(',');
        var mapMarkCoords = mapMark.split(',');

        ymaps.ready(init);
        var myMap, myPlacemark;

        function init(){
            myMap = new ymaps.Map("b-map", {
                center: mapCenterCoords,
                zoom: 16,
                controls: ['geolocationControl', 'routeButtonControl', 'typeSelector', 'fullscreenControl', 'zoomControl']
            });

            myMap.behaviors.disable('scrollZoom');

            myPlacemark = new ymaps.Placemark(mapMarkCoords, { hintContent: mapAddress});

            myMap.geoObjects.add(myPlacemark);
        }
    };

    // Табы
    var _tabs = function ( container ) {
        var tabContainer = container;
        var tabControls = container.querySelectorAll('[data-tab-control]');
        var tabs = container.querySelectorAll('[data-tab]');

        var activeTab = tabContainer.querySelector('[data-tab-control].active').getAttribute('data-tab-control');
        tabContainer.querySelector('[data-tab="'+activeTab+'"]').classList.add('active');

        if ( container.querySelector('[data-filter]') ) {
            var filter = container.querySelector('[data-filter]').getAttribute('data-filter');
            _filter( tabs, filter );
        }

        [].forEach.call( tabControls, function( tabControl ) {
            tabControl.addEventListener('click', function() {
                var tabName = this.getAttribute('data-tab-control');
                var tabFilter = this.getAttribute('data-filter');

                container.querySelector('[data-tab-control].active').classList.remove('active');
                this.classList.add('active');

                if ( tabName != '' ) {
                    [].forEach.call ( tabs, function(tab) {
                        tab.classList.remove('active');
                    } );
                    container.querySelector('[data-tab='+tabName+']').classList.add('active');

                }

                if ( tabFilter !== null ) {
                    _filter( tabs, tabFilter );
                }

            });
        } );
    };

    var _filter = function( tabs, tabFilter ) {
        [].forEach.call( tabs, function(tab) {

            tab.classList.remove('active');

            if ( tab.classList.contains(tabFilter) ) {
                tab.classList.add('active');
            }

      } );
    };

    // Отправка формы
    var _sendForm = function ( form, modal ) {

        var fd = new FormData(form);
        var url = myajax.url,
            nonce = myajax.nonce;

        fd.append( 'action', 'mail_handler' );
        fd.append( 'nonce_code', nonce );

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var res = JSON.parse(xhttp.responseText);
                if ( res.success ) {
                    form.reset();
                    form.classList.add('success');
                    setTimeout( function () {
                        form.classList.remove('success');
                        modal.close('#callback');
                    }, 3000);
                }
            }
        };
        xhttp.open("POST", url, true);
        xhttp.send(fd);
    };

    // Калькулятор
    var _calc = function ( container, modal ) {

        var calcTotal = {};

        var calcTotalElem = container.querySelector('.calc-total'),
            checkElems = container.querySelectorAll('input[type="radio"], input[type="checkbox"]'),
            inputElems = container.querySelectorAll('input[type="hidden"]'),
            inputTextElems = container.querySelectorAll('input[type="text"]'),
            selectElems = container.querySelectorAll('select'),
            buttonElem = container.querySelector('.calc-button');

        if ( container.querySelector('.calc-destination') ) {
            var searchRegion = container.getAttribute('data-calc');
            ymaps.ready( function () {
                selectCity(searchRegion);
            });
        }

        calcTotalArr();

        // Проходимся по всем элементам radio и checkbox
        function checkedLoop ( inputs ) {
            [].forEach.call( inputs, function( input ) {
                if ( input.checked ) {
                    var inputName = input.getAttribute('name');
                    var inputData = input.getAttribute('data-calc');

                    calcTotal[inputName] = inputData;
                }
            } );
        };

        // Проходимся по всем элементам select
        function selectLoop( selects ) {
            [].forEach.call( selects, function( select ) {
                [].forEach.call( select, function (option) {
                    if ( option.selected ) {
                        var selectName = select.getAttribute('name');
                        var optionData = option.getAttribute('data-calc');
                        var optionValue = option.getAttribute('value');

                        calcTotal[selectName] = {'count': optionValue, 'price': optionData};
                    }
                } );
            } );
        };

        // Проходимся по всем элементам input
        function inputLoop( inputs ) {
            [].forEach.call( inputs, function(input) {
                var inputName = input.getAttribute('name');
                var inputData = input.value;
                calcTotal[inputName] = inputData;
            });
        }

        // Запускаем проход по всем элементам.
        // Формируем итоговую сумму и выводим.
        function calcTotalArr() {
            var total = 0;

            calcTotal = {};
            checkedLoop(checkElems);
            selectLoop(selectElems);
            inputLoop( inputElems );

            if ( calcTotal['person'] != 0 ) {

                container.querySelector('.calc-person').classList.remove('hide');

                if ( calcTotal['time'] ) {
                    calcTotal['person'] = ( parseInt(calcTotal['person-items'].price) ) * parseInt(calcTotal['time'].count);
                } else {
                    calcTotal['person'] = parseInt(calcTotal['person-items'].price);
                    calcTotal['time'] = 0;
                }

            } else {
                container.querySelector('.calc-person').classList.add('hide');
                calcTotal['person'] = 0;
            }

            calcTotal['type'] = parseInt(calcTotal['type']);

            if ( calcTotal['length-price'] && calcTotal['km'] ) {
                var lengthPrice = parseInt(calcTotal['length-price']);
                calcTotal['length-price'] = lengthPrice * parseInt(calcTotal['km']);
                calcTotal['km'] = 0;
            } else {
                calcTotal['price'] = 0;
            }

            calcTotal['person-items'] = 0;
            calcTotal['destination'] = 0;
            calcTotal['tab'] = 0;
            calcTotal['price'] = 0;

            if ( calcTotal['time'] ) {
                var hoursPrice = parseInt(calcTotal['time'].price);
                calcTotal['time'] = hoursPrice;
            }

            console.log(calcTotal);

            for ( var key in calcTotal ) {
                total += parseInt(calcTotal[key]);
            }

            calcTotalElem.innerHTML = total;

        };

        // При изменении radio или checkbox
        [].forEach.call( checkElems, function(input) {
            input.addEventListener('change', function(e) {
                calcTotalArr();
            });
        });

        // При изменении select
        [].forEach.call( selectElems, function(select) {
            select.addEventListener('change', function(e) {
                calcTotalArr();
            });
        });

        // При изменении input:text
        [].forEach.call( inputElems, function(input) {
            input.addEventListener('change', function(e) {
                calcTotalArr();
            });
        });

        [].forEach.call( inputTextElems, function(input) {
            input.addEventListener('focus', function(e) {
                if ( e.target.value.length > 4 ) {
                    e.target.parentElement.classList.add('clear');
                } else {
                    e.target.parentElement.classList.remove('clear');
                }
            });
            input.addEventListener('keyup', function(e) {
                if ( e.target.value.length > 4 ) {
                    e.target.parentElement.classList.add('clear');
                } else {
                    e.target.parentElement.classList.remove('clear');
                }
            });
        });

        // API Yandex Maps - проверяем выбранный город
        // на принадлежность к диапазону
        function selectCity( searchRegion ) {
            var inputSelect = container.querySelector('.calc-destination'); // Поле ввода

            var selectDrop = new ymaps.SuggestView(inputSelect, {width:300, results: 3}); // Выпадашка от API

            // Если ошибочный город - обнуляем поля
            function errorCity() {
                container.querySelector('.calc-lenght').innerHTML = 0;
                container.querySelector('input[name="km"]').value = 0;
            };

            // Если город верный - удаляем ошибку, показываем процесс
            function successCity() {
                inputSelect.setAttribute('disabled', 'disabled');
                inputSelect.parentElement.classList.remove('error');
                inputSelect.parentElement.classList.add('loading');
            };

            // Когда результат получен - показываем данные
            function readyResult( kmValue ) {
                inputSelect.parentElement.classList.remove('loading');
                inputSelect.removeAttribute('disabled');
                container.querySelector('.calc-lenght').innerHTML = kmValue;
                container.querySelector('input[name="km"]').value = kmValue;
            };

            // Когда выбран город из выпадающего списка - запускаем проверку
            selectDrop.events.add('select', function (e) {
                var destination = e.get('item').value;
                var targetPoint = ymaps.geocode(destination, {json: true, results: 1 });

                inputSelect.parentElement.classList.remove('error');

                targetPoint.then(function(res) {
                    var region = res.GeoObjectCollection.featureMember["0"].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName;

                    if ( searchRegion != '' ) {
                        // если data-calc у формы заполнен названием области
                        if ( region != searchRegion ) {
                            inputSelect.parentElement.classList.add('error');
                            inputSelect.nextElementSibling.innerHTML = 'Только '+ searchRegion;
                            errorCity();
                            calcTotalArr();
                        } else {
                            successCity();
                            getDestinationLenght( destination );
                        }

                    } else {
                        var regionExist = regions.indexOf(region);
                        if ( regionExist < 0 ) {
                            inputSelect.parentElement.classList.add('error');
                            inputSelect.nextElementSibling.innerHTML = 'Регион не входит в зону обслуживания';
                            errorCity();
                            calcTotalArr();
                        } else {
                            successCity();
                            getDestinationLenght( destination );
                        }
                    }
                });
            });

            // находим расстояние от МКАД до точки
            function getDestinationLenght( target ) {
                var myMap = new ymaps.Map("map",
                    { center: [55.73, 37.75], zoom: 9 },
                    { searchControlProvider: 'yandex#search' });

                var moscowPolygon = new ymaps.Polygon(mkadCoords.coordinates);

                moscowPolygon.options.set('visible', false);
                myMap.geoObjects.add(moscowPolygon);

                ymaps.route(['Москва', target]).then(function(res) {
                    var pathsObjects = ymaps.geoQuery(res.getPaths()),
                        edges = [];

                    pathsObjects.each(function (path) {
                        var coordinates = path.geometry.getCoordinates();
                        for (var i = 1, l = coordinates.length; i < l; i++) {
                            edges.push({
                                type: 'LineString',
                                coordinates: [coordinates[i], coordinates[i - 1]]
                            });
                        }
                    });

                    var routeObjects = ymaps.geoQuery(edges).add(res.getWayPoints()).add(res.getViaPoints()).addToMap(myMap),
                        // Найдем все объекты, попадающие внутрь МКАД.
                        objectsInMoscow = routeObjects.searchInside(moscowPolygon),
                        // Найдем объекты, пересекающие МКАД.
                        boundaryObjects = routeObjects.searchIntersect(moscowPolygon);

                    // Получаем отрезок за пределами МКАД - удаляем участки внутри и на пересечении
                    var outer = routeObjects.remove(objectsInMoscow).remove(boundaryObjects);

                    // Берем координаты первой точки
                    var outerStart = outer._objects["0"].geometry._bounds["0"];

                    // Ищем расстояние от первой точки до точки назначения
                    var behindMkadLength = ymaps.route([outerStart, target]).then( function(route) {

                        var kmLength = Math.round(route.getLength() / 1000);

                        readyResult( kmLength );
                        calcTotalArr();

                    });
                });
            };

        };

        // Очищаем поле ввода
        if ( container.querySelector('.clear-input') ) {
            container.querySelector('.clear-input').addEventListener('click', function(e) {
                clearInput(e.target);
            });
        }

        function clearInput( elem ) {

            elem.parentElement.querySelector('input').value = '';

            elem.parentElement.classList.remove('error');
            container.querySelector('.calc-lenght').innerHTML = 0;
            container.querySelector('input[name="km"]').value = 0;

            calcTotalArr();
        };

        // Передаем данные в форму обратного звонка
        buttonElem.addEventListener('click', function(e) {
            e.preventDefault();

            var fd = serialize(container),
                modalElem = document.querySelector('#request');

            modalElem.querySelector('input[name="calc"]').value = fd;
            modal.open('#request');
        });

    };


    var _listeners = function () {
        // svg4everybody();

        document.addEventListener('DOMContentLoaded', _onLoad);
    };

    return {
        init: init
    };
})();
app.init();

var regions = [ 'Архангельская область', 'Астраханская область', 'Белгородская область', 'Брянская область', 'Владимирская область', 'Волгоградская область', 'Вологодская область', 'Воронежская область', 'Ивановская область', 'Калужская область', 'Кировская область', 'Костромская область', 'Краснодарский край', 'Курганская область', 'Курская область', 'Ленинградская область', 'Липецкая область', 'Мурманская область', 'Нижегородская область', 'Новгородская область', 'Оренбургская область', 'Орловская область', 'Пензенская область', 'Пермский край', 'Псковская область', 'Республика Адыгея', 'Республика Башкортостан', 'Республика Калмыкия', 'Республика Карелия', 'Республика Коми', 'Республика Крым', 'Республика Марий Эл', 'Республика Мордовия', 'Республика Татарстан', 'Ростовская область', 'Рязанская область', 'Самарская область', 'Саратовская область', 'Свердловская область', 'Смоленская область', 'Ставропольский край', 'Тамбовская область', 'Тверская область', 'Тульская область', 'Тюменская область', 'Удмуртская Республика', 'Ульяновская область', 'Челябинская область', 'Чувашская Республика', 'Ярославская область' ];

var mkadCoords = { "type": "Polygon", "coordinates": [[[55.78000432402266,37.84172564285271],[55.775874525970494,37.8381207618713],[55.775626746008065,37.83979446823122],[55.77446586811748,37.84243326983639],[55.771974101091104,37.84262672750849],[55.77114545193181,37.84153238623039],[55.76722010265554,37.841124690460184],[55.76654891107098,37.84239076983644],[55.76258709833121,37.842283558197025],[55.758073999993734,37.8421759312134],[55.75381499999371,37.84198330422974],[55.749277102484484,37.8416827275085],[55.74794544108413,37.84157576190186],[55.74525257875241,37.83897929098507],[55.74404373042019,37.83739676451868],[55.74298009816793,37.838732481460525],[55.743060321833575,37.841183997352545],[55.73938799999373,37.84097476190185],[55.73570799999372,37.84048155819702],[55.73228210777237,37.840095812164286],[55.73080491981639,37.83983814285274],[55.729799917464675,37.83846476321406],[55.72919751082619,37.83835745269769],[55.72859509486539,37.838636380279524],[55.727705075632784,37.8395161005249],[55.722727886185154,37.83897964285276],[55.72034817326636,37.83862557539366],[55.71944437307499,37.83559735744853],[55.71831419154461,37.835370708803126],[55.71765218986692,37.83738169402022],[55.71691750159089,37.83823396494291],[55.71547311301385,37.838056931213345],[55.71221445615604,37.836812846557606],[55.709331054395555,37.83522525396725],[55.70953687463627,37.83269301586908],[55.70903403789297,37.829667367706236],[55.70552351822608,37.83311126588435],[55.70041317726053,37.83058993121339],[55.69883771404813,37.82983872750851],[55.69718947487017,37.82934501586913],[55.69504441658371,37.828926414016685],[55.69287499999378,37.82876530422971],[55.690759754047335,37.82894754100031],[55.68951421135665,37.827697554878185],[55.68965045405069,37.82447346292115],[55.68322046195302,37.83136543914793],[55.67814012759211,37.833554015869154],[55.67295011628339,37.83544184655761],[55.6672498719639,37.837480388885474],[55.66316274139358,37.838960677246064],[55.66046999999383,37.83926093121332],[55.65869897264431,37.839025050262435],[55.65794084879904,37.83670784390257],[55.65694309303843,37.835656529083245],[55.65689306460552,37.83704060449217],[55.65550363526252,37.83696819873806],[55.65487847246661,37.83760389616388],[55.65356745541324,37.83687972750851],[55.65155951234079,37.83515216004943],[55.64979413590619,37.83312418518067],[55.64640836412121,37.82801726983639],[55.64164525405531,37.820614174591],[55.6421883258084,37.818908190475426],[55.64112490388471,37.81717543386075],[55.63916106913107,37.81690987037274],[55.637925371757085,37.815099354492155],[55.633798276884455,37.808769150787356],[55.62873670012244,37.80100123544311],[55.62554336109055,37.79598013491824],[55.62033499605651,37.78634567724606],[55.618768681480326,37.78334147619623],[55.619855533402706,37.77746201055901],[55.61909966711279,37.77527329626457],[55.618770300976294,37.77801986242668],[55.617257701952106,37.778212973541216],[55.61574504433011,37.77784818518065],[55.61148576294007,37.77016867724609],[55.60599579539028,37.760191219573976],[55.60227892751446,37.75338926983641],[55.59920577639331,37.746329965606634],[55.59631430313617,37.73939925396728],[55.5935318803559,37.73273665739439],[55.59350760316188,37.7299954450912],[55.59469840523759,37.7268679946899],[55.59229549697373,37.72626726983634],[55.59081598950582,37.7262673598022],[55.5877595845419,37.71897193121335],[55.58393177431724,37.70871550793456],[55.580917323756644,37.700497489410374],[55.57778089778455,37.69204305026244],[55.57815154690915,37.68544477378839],[55.57472945079756,37.68391050793454],[55.57328235936491,37.678803592590306],[55.57255251445782,37.6743402539673],[55.57216388774464,37.66813862698363],[55.57505691895805,37.617927457672096],[55.5757737568051,37.60443099999999],[55.57749105910326,37.599683515869145],[55.57796291823627,37.59754177842709],[55.57906686095235,37.59625834786988],[55.57746616444403,37.59501783265684],[55.57671634534502,37.593090671936025],[55.577944600233785,37.587018007904],[55.57982895000019,37.578692203704804],[55.58116294118248,37.57327546607398],[55.581550362779,37.57385012109279],[55.5820107079112,37.57399562266922],[55.58226289171689,37.5735356072979],[55.582393529795155,37.57290393054962],[55.581919415056234,37.57037722355653],[55.584471614867844,37.5592298306885],[55.58867650795186,37.54189249206543],[55.59158133551745,37.5297256269836],[55.59443656218868,37.517837865081766],[55.59635625174229,37.51200186508174],[55.59907823904434,37.506808949737554],[55.6062944994944,37.49820432275389],[55.60967103463367,37.494406071441674],[55.61066689753365,37.494760001358024],[55.61220931698269,37.49397137107085],[55.613417718449064,37.49016528606031],[55.61530616333343,37.48773249206542],[55.622640129112334,37.47921386508177],[55.62993723476164,37.470652153442394],[55.6368075123157,37.46273446298218],[55.64068225239439,37.46350692265317],[55.640794546982576,37.46050283203121],[55.64118904154646,37.457627470916734],[55.64690488145138,37.450718034393326],[55.65397824729769,37.44239252645875],[55.66053543155961,37.434587576721185],[55.661693766520735,37.43582144975277],[55.662755031737014,37.43576786245721],[55.664610641628116,37.430982915344174],[55.66778515273695,37.428547447097685],[55.668633314343566,37.42945134592044],[55.66948145750025,37.42859571562949],[55.670813882451405,37.4262836402282],[55.6811141674414,37.418709037048295],[55.68235377885389,37.41922139651101],[55.68359335082235,37.419218771842885],[55.684375235224735,37.417196501327446],[55.68540557585352,37.41607020370478],[55.68686637150793,37.415640857147146],[55.68903015131686,37.414632153442334],[55.690896881757396,37.413344899475064],[55.69264232162232,37.41171432275391],[55.69455101638112,37.40948282275393],[55.69638690385348,37.40703674603271],[55.70451821283731,37.39607169577025],[55.70942491932811,37.38952706878662],[55.71149057784176,37.387778313491815],[55.71419814298992,37.39049275399779],[55.7155489617061,37.385557272491454],[55.71849856042102,37.38388335714726],[55.7292763261685,37.378368238098155],[55.730845879211614,37.37763597123337],[55.73167906388319,37.37890062088197],[55.734703664681774,37.37750451918789],[55.734851959522246,37.375610832015965],[55.74105626086403,37.3723813571472],[55.746115620904355,37.37014935714723],[55.750883999993725,37.36944173016362],[55.76335905525834,37.36975304365541],[55.76432079697595,37.37244070571134],[55.76636979670426,37.3724259757175],[55.76735417953104,37.369922155757884],[55.76823419316575,37.369892695770275],[55.782312184391266,37.370214730163575],[55.78436801120489,37.370493611114505],[55.78596427165359,37.37120164550783],[55.7874378183096,37.37284851456452],[55.7886695054807,37.37608325135799],[55.78947647305964,37.3764587460632],[55.79146512926804,37.37530000265506],[55.79899647809345,37.38235915344241],[55.80113596939471,37.384344043655396],[55.80322699999366,37.38594269577028],[55.804919036911976,37.38711208598329],[55.806610999993666,37.3880239841309],[55.81001864976979,37.38928977249147],[55.81348641242801,37.39038389947512],[55.81983538336746,37.39235781481933],[55.82417822811877,37.393709457672124],[55.82792275755836,37.394685720901464],[55.830447148154136,37.39557615344238],[55.83167107969975,37.39844478226658],[55.83151823557964,37.40019761214057],[55.83264967594742,37.400398790382326],[55.83322180909622,37.39659544313046],[55.83402792148566,37.39667059524539],[55.83638877400216,37.39682089947515],[55.83861656112751,37.39643489154053],[55.84072348043264,37.3955338994751],[55.84502158126453,37.392680272491454],[55.84659117913199,37.39241188227847],[55.84816071336481,37.392529730163616],[55.85288092980303,37.39486835714723],[55.859893456073635,37.39873052645878],[55.86441833633205,37.40272161111449],[55.867579567544375,37.40697072750854],[55.868369880337,37.410007082016016],[55.86920843741314,37.4120992989502],[55.87055369615854,37.412668021163924],[55.87170587948249,37.41482461111453],[55.873183961039565,37.41862266137694],[55.874879126654704,37.42413732540892],[55.875614937236705,37.4312182698669],[55.8762723478417,37.43111093783558],[55.87706546369396,37.43332105622856],[55.87790681284802,37.43385747619623],[55.88027084462084,37.441303050262405],[55.87942070143253,37.44747234260555],[55.88072960917233,37.44716141796871],[55.88121221323979,37.44769797085568],[55.882080694420715,37.45204320500181],[55.882346110794586,37.45673176190186],[55.88252729504517,37.463383999999984],[55.88294937719063,37.46682797486874],[55.88361266759345,37.470014457672086],[55.88546991372396,37.47751410450743],[55.88534929207307,37.47860317658232],[55.882563306475106,37.48165826025772],[55.8815803226785,37.48316434442331],[55.882427612793315,37.483831555817645],[55.88372791409729,37.483182967125686],[55.88495581062434,37.483092277908824],[55.8875561994203,37.4855716508179],[55.887827444039566,37.486440636245746],[55.88897899871799,37.49014203439328],[55.890208937135604,37.493210285705544],[55.891342397444696,37.497512451065035],[55.89174030252967,37.49780744510645],[55.89239745507079,37.49940333499519],[55.89339220941865,37.50018383334346],[55.903869074155224,37.52421672750851],[55.90564076517974,37.52977457672118],[55.90661661218259,37.53503220370484],[55.90714113744566,37.54042858064267],[55.905645048442985,37.54320461007303],[55.906608607018505,37.545686966066306],[55.90788552162358,37.54743976120755],[55.90901557907218,37.55796999999999],[55.91059395704873,37.572711542327866],[55.91073854155573,37.57942799999998],[55.91009969268444,37.58502865872187],[55.90794809960554,37.58739968913264],[55.908713267595054,37.59131567193598],[55.902866854295375,37.612687423278814],[55.90041967242986,37.62348079629517],[55.898141151686396,37.635797880950896],[55.89639275532968,37.649487626983664],[55.89572360207488,37.65619302513125],[55.895295577183965,37.66294133862307],[55.89505457604897,37.66874564418033],[55.89254677027454,37.67375601586915],[55.8947775867987,37.67744661901856],[55.89450045676125,37.688347],[55.89422926332761,37.69480554232789],[55.89322256101114,37.70107096560668],[55.891763491662616,37.705962965606716],[55.889110234998974,37.711885134918205],[55.886577568759876,37.71682005026245],[55.88458159806678,37.7199315476074],[55.882281005794134,37.72234560316464],[55.8809452036196,37.72364385977171],[55.8809722706006,37.725371142837474],[55.88037213862385,37.727870902099546],[55.877941504088696,37.73394330422971],[55.87208120378722,37.745339592590376],[55.86703807949492,37.75525267724611],[55.859821640197474,37.76919976190188],[55.82962968399116,37.827835219574],[55.82575289922351,37.83341438888553],[55.82188784027888,37.83652584655761],[55.81612575504693,37.83809213491821],[55.81460347077685,37.83605359521481],[55.81276696067908,37.83632178569025],[55.811486181656385,37.838623105812026],[55.807329380532785,37.83912198147584],[55.80510270463816,37.839079078033414],[55.79940712529036,37.83965844708251],[55.79131399999368,37.840581150787344],[55.78000432402266,37.84172564285271]]] };
//# sourceMappingURL=../css/app.js.map
