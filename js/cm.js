(function($) {
    $.fn.longpress = function(longCallback, shortCallback, duration) {
        if (typeof duration === "undefined") {
            duration = 500;
        }

        return this.each(function() {
            var $this = $(this);

            // to keep track of how long something was pressed
            var mouse_down_time;
            var timeout;

            // mousedown or touchstart callback
            function mousedown_callback(e) {
                mouse_down_time = new Date().getTime();
                var context = $(this);

                // set a timeout to call the longpress callback when time elapses
                timeout = setTimeout(function() {
                    if (typeof longCallback === "function") {
                        longCallback.call(context, e);
                    } else {
                        $.error('Callback required for long press. You provided: ' + typeof longCallback);
                    }
                }, duration);
            }

            // mouseup or touchend callback
            function mouseup_callback(e) {
                var press_time = new Date().getTime() - mouse_down_time;
                if (press_time < duration) {
                    // cancel the timeout
                    clearTimeout(timeout);

                    // call the shortCallback if provided
                    if (typeof shortCallback === "function") {
                        shortCallback.call($(this), e);
                    } else if (typeof shortCallback === "undefined") {
                        ;
                    } else {
                        $.error('Optional callback for short press should be a function.');
                    }
                }
            }

            // cancel long press event if the finger or mouse was moved
            function move_callback(e) {
                clearTimeout(timeout);
            }

            // Browser Support
            $this.on('mousedown', mousedown_callback);
            $this.on('mouseup', mouseup_callback);
            $this.on('mousemove', move_callback);

            // Mobile Support
            $this.on('touchstart', mousedown_callback);
            $this.on('touchend', mouseup_callback);
            $this.on('touchmove', move_callback);
        });
    };
}(jQuery));

Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
};

Date.prototype.yyyymmddhhiiss = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    var hh = this.getHours().toString();
    var ii = this.getMinutes().toString();
    var ss = this.getSeconds().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]) + " " + (hh[1]?hh:"0"+hh[0]) + ":" + (ii[1]?ii:"0"+ii[0]) + ":" + (ss[1]?ss:"0"+ss[0]); // padding
};

Date.prototype.toSimpleDateString = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
}


function myAlert(title_or_msg, msg_or_fn, fn) {
    if(msg_or_fn == undefined && fn == undefined) {
        _myAlert("알림", title_or_msg);
    } else if(fn == undefined) {
        if(typeof msg_or_fn == 'function') {
            _myAlert("알림", title_or_msg, msg_or_fn);
        } else {
            _myAlert(title_or_msg, msg_or_fn)
        }
    }
}

function _myAlert(title, msg, fn) {
    //console.log("alert: " + msg);
    //console.log((new Error()).stack);
    if(typeof fn == 'function') {
        $("#alertModal").on("hidden.bs.modal", fn);
    } else {
        $("#alertModal").on("hidden.bs.modal", function(e){});
    }

    $("#alertTitle").html(title);
    $("#alertMsg").html(msg);
    $("#alertModal").modal('show');
}

function myConfirm(title, msg, fnOk, fnCancel) {
    //console.log("confirm: " + msg);
    if(typeof fnOk == 'function') {
        $("#confirmModalOk").off("click");
        $("#confirmModalOk").click(fnOk);
    } else {
        $("#confirmModalOk").off("click");
    }
    if(typeof fnCancel == 'function') {
        $("#confirmModalCancel").off("click");
        $("#confirmModalCancel").click(fnCancel);
    } else {
        $("#confirmModalCancel").off("click");
    }

    $("#confirmTitle").html(title);
    $("#confirmMsg").html(msg);
    $("#confirmModal").modal('show');
}

function autoAddNumberComma(event) {
    // skip for arrow keys
    if(event.which >= 37 && event.which <= 40) return;

    // format number
    $(this).val(function(index, value) {
        return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            ;
    });
}
function toCommaNumber(n) {
    n = n + "";
    return n.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        ;
}
function stringStartsWith (string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}
function autoAddDashPhoneNumber(event) {
    var val = $(this).val();
    val = val.replace(/-/g, "");
    if(val.length >= 4) {
        if(stringStartsWith(val, "02")) {
            val = val.substring(0, 2) + "-" + val.substring(2, val.length);
        } else  {
            val = val.substring(0, 3) + "-" + val.substring(3, val.length);
        }
    }
    if(val.length >= 9) {
        if(stringStartsWith(val, "02")) {
            val = val.substring(0, 7) + "-" + val.substring(7, val.length);
        } else {
            val = val.substring(0, 8) + "-" + val.substring(8, val.length);
        }
    }
    $(this).val(val);
}

$(document).ready(function() {
    jQuery.extend(jQuery.expr[':'], {
        focusable: function (el, index, selector) {
            return $(el).is('a, button, :input, [tabindex]');
        }
    });

    $(document).on('keypress', 'input,select', function (e) {
        if (e.which == 13) {
            e.preventDefault();
            // Get all focusable elements on the page
            var $canfocus = $(':focusable');
            var index = $canfocus.index(this) + 1;
            if (index >= $canfocus.length) index = 0;
            $canfocus.eq(index).focus();
        }
    });

    $(".auto-comma").keyup(autoAddNumberComma);
    $(".auto-dash").keyup(autoAddDashPhoneNumber);
});


var onAddr1Loaded;
var onAddr2Loaded;
var onAddr3Loaded;
function load_addrs() {
    $.post('/a/area/lv1', function(data) {
        data = JSON.parse(data);
        if(data.result) {
            var cs = data.message.split(",").sort();
            var sel1 = $("#addr1");
            sel1.html("");
            sel1.append('<option value=\'-1\'>시 단위 선택</option>');
            for(var i = 0; i < cs.length; i++) {
                sel1.append('<option>' + cs[i] + '</option>');
            }

            if(typeof onAddr1Loaded == 'function') {
                onAddr1Loaded();
            }
        }
    });

    $("#addr1").change(function() {
        var sel2 = $("#addr2");

        var val = $("#addr1").val();
        if(val == '-1') {
            sel2.html("");
            sel2.append('<option value=\"-1\">군 단위 선택</option>');
        } else {
            $.post('/a/area/lv2', {lv1: val}, function(data) {
                data = JSON.parse(data);
                if(data.result) {
                    var cs = data.message.split(",").sort();
                    sel2.html("");
                    sel2.append('<option value=\"-1\">군 단위 선택</option>');
                    for(var i = 0; i < cs.length; i++) {
                        sel2.append('<option>' + cs[i] + '</option>');
                    }

                    if(typeof onAddr2Loaded == 'function') {
                        onAddr2Loaded();
                    }
                } else {

                }
            });
        }
    });

    $("#addr2").change(function() {
        var sel3 = $("#addr3");

        var val2 = $("#addr2").val();
        if(val2 == '-1') {
            sel3.html("");
            sel3.append('<option value=\"-1\">구 단위 선택</option>');
        } else {
            var val1 = $("#addr1").val();

            $.post('/a/area/lv3', {lv1: val1, lv2: val2}, function(data) {
                data = JSON.parse(data);
                if(data.result) {
                    var cs = data.message.split(",").sort();
                    sel3.html("");
                    sel3.append('<option value=\"-1\">구 단위 선택</option>');
                    for(var i = 0; i < cs.length; i++) {
                        sel3.append('<option>' + cs[i] + '</option>');
                    }

                    if(typeof onAddr3Loaded == 'function') {
                        onAddr3Loaded();
                    }
                } else {

                }
            });
        }
    });
}


function selectAddr(addr1, addr2, addr3, idaddr1, idaddr2, idaddr3) {
    if(idaddr1 == undefined || idaddr2 == undefined || idaddr3 == undefined) {
        idaddr1 = "#addr1";
        idaddr2 = "#addr2";
        idaddr3 = "#addr3";
    }
    if($(idaddr1 + " option:contains(" + addr1 + ")").length == 0) {
        $(idaddr1).append('<option>' + addr1 + '</option>');
    }
    $(idaddr1).val(addr1);
    $(idaddr1).change();
    onAddr2Loaded = function () {
        onAddr2Loaded = undefined;
        if($(idaddr2 + " option:contains(" + addr2 + ")").length == 0) {
            $(idaddr2).append('<option>' + addr2 + '</option>');
        }
        $(idaddr2).val(addr2);
        $(idaddr2).change();
    }
    onAddr3Loaded = function () {
        onAddr3Loaded = undefined;
        if($(idaddr3 + " option:contains(" + addr3 + ")").length == 0) {
            $(idaddr3).append('<option>' + addr3 + '</option>');
        }
        $(idaddr3).val(addr3);
        $(idaddr3).change();
    }
}


function toLatLng(addr, cb) {
    console.log("addr convert: " + addr);
    // 좌표조회
    $.post("/a/naver/to_latlng", {addr: addr}, function(data) {
        console.log(data);
        data = JSON.parse(data);
        //{ "result": { "total": 1, "userquery": "경기 고양시일산서구 가좌동 123", "items": [ { "address": "경기도 고양시 일산서구 가좌동 124", "addrdetail": { "country": "대한민국", "sido": "경기도", "sigugun": "고양시 일산서구", "dongmyun": "가좌동", "rest": "124" }, "isRoadAddress": false, "point": { "x": 126.7244373, "y": 37.6942710 } } ] } }
        if(data.result) {
            var lat = data.result.items[0].point.y;
            var lng = data.result.items[0].point.x;

            cb(lat, lng);
        } else { // 주소로 좌표조회 실패
            cb(undefined, undefined);
        }
    });
}

function refineAddr1(addr) {
    if(addr == "서울특별시") {
        return "서울";
    } else if(addr == "세종특별자치시") {
        return "세종시";
    } else if(addr == "부산광역시") {
        return "부산";
    } else if(addr == "인천광역시") {
        return "인천";
    } else if(addr == "대구광역시") {
        return "대구";
    } else if(addr == "대전광역시") {
        return "대전";
    } else if(addr == "광주광역시") {
        return "광주";
    } else if(addr == "울산광역시") {
        return "울산";
    } else if(addr == "경기도") {
        return "경기";
    } else if(addr == "강원도") {
        return "강원";
    } else if(addr == "충청남도") {
        return "충남";
    } else if(addr == "충청북도") {
        return "충북";
    } else if(addr == "전라남도") {
        return "전남";
    } else if(addr == "전라북도") {
        return "전북";
    } else if(addr == "경상북도") {
        return "경북";
    } else if(addr == "경상남도") {
        return "경남";
    } else if(addr == "제주특별자치도") {
        return "제주";
    }
    return addr;
}

function toAddr(lat, lng, cb) {
    console.log("toAddr: " + lat + " " + lng + " ");
    $.post("/a/naver/to_addr", {lat: lat, lng: lng}, function (data) {
        console.log(data);
        data = JSON.parse(data);
        if(data.result) {
            var addrDetail = null;
            for(var i = 0; i < data.result.items.length; i++) { // 구주소 형식이 있으면 그걸 가져옴
                if(data.result.items[i].isRoadAddress == false) {
                    addrDetail = data.result.items[i].addrdetail;
                    break;
                }
            }
            if(addrDetail == null) { // 구주소 형식이 없으면 신주소 형식 가져옴
                addrDetail = data.result.items[0].addrdetail;
            }

            var sido = addrDetail.sido;
            sido = refineAddr1(sido);
            var sigugun = addrDetail.sigugun;
            sigugun = sigugun.replace(/\s+/g, '');
            cb(sido, sigugun, addrDetail.dongmyun, addrDetail.rest);
        } else {
            cb(null, null, null, null);
        }
    });
}


function loginByKey(ukey) {
    $.post("/a/account/loginByKey", {ukey: ukey}, function(data) {
        data = JSON.parse(data);
        if(data.result) {

        } else {
            window.location.href = "/";
        }
    });
}




/**
 * Module for displaying "Waiting for..." dialog using Bootstrap
 *
 * @author Eugene Maslovich <ehpc@em42.ru>
 */

var waitingDialog = waitingDialog || (function ($) {
        'use strict';

        // Creating modal dialog's DOM
        var $dialog = $(
            '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
            '<div class="modal-dialog modal-m">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
            '<div class="modal-body">' +
            '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
            '</div>' +
            '</div></div></div>');

        return {
            /**
             * Opens our dialog
             * @param message Custom message
             * @param options Custom options:
             * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
             * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
             */
            show: function (message, options) {
                // Assigning defaults
                if (typeof options === 'undefined') {
                    options = {};
                }
                if (typeof message === 'undefined') {
                    message = 'Loading';
                }
                var settings = $.extend({
                    dialogSize: 'm',
                    progressType: '',
                    onHide: null // This callback runs after the dialog was hidden
                }, options);

                // Configuring dialog
                $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
                $dialog.find('.progress-bar').attr('class', 'progress-bar');
                if (settings.progressType) {
                    $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
                }
                $dialog.find('h3').text(message);
                // Adding callbacks
                if (typeof settings.onHide === 'function') {
                    $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                        settings.onHide.call($dialog);
                    });
                }
                // Opening dialog
                $dialog.modal();
            },
            /**
             * Closes dialog
             */
            hide: function () {
                $dialog.modal('hide');
            }
        };

    })(jQuery);