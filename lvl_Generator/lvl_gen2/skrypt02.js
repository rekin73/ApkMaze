$(document).ready(function () {

    var hexLeft = 0;
    var hexTop = 0;

    var json = {
        size: 0,
        div: [],
    }

    var id = 0;
    //var divHex;
    //var imgHex;

    $("#kolumny").on("input", function () {
        var json = {
            "size": 0,
            "level": []
        }
        localStorage.setItem('hexy', JSON.stringify(json));
        $("#plansza").empty();
        var il_kolumn = parseInt($("#kolumny").val());
        //console.log(il_kolumn)
        hexLeft = 0;
        hexTop = 0;
        var q = 0;
        var k = 0;
        for (var j = 0; j < il_kolumn; j++) {
            for (var i = 0; i < il_kolumn; i++) {
                var divHex = $("<div>").addClass("hexagon").css("left", hexLeft).css("top", hexTop);
                divHex.attr("id", q);
                $("#plansza").append(divHex);
                //imgHex = $('<img src="hex.png" alt="hexagon">');
                //$(divHex).append(imgHex);
                hexTop += 50;
                //
                var that = this;

                var outuj = 0;
                var din = 0;

                divHex.on("click", function () {
                    var e = this.id;
                    //console.log($(this));
                    var d = $(this).children().length;
                    //console.log(d);
                    divHex.attr("id", e)
                    divHex.attr("klik", 0)


                    if (d < 1) {
                        var arrow = $('<div>');
                        arrow.attr("class", "strzala");
                        arrow.attr("style", "-moz-transform: rotate(60deg)");
                        arrow.attr("id", e + "st")
                        $("#" + e).append(arrow);
                        k = 60;



                    }
                    if (d >= 1) {
                        //console.log("ok")
                        //console.log(k)
                        $("#" + e + "st").attr("style", "-moz-transform: rotate(" + k + "deg)");
                        $("#" + e + "st").attr("style", "transform: rotate(" + k + "deg)");
                        k += 60;
                        // console.log(k);

                        if (outuj < 5) {
                            outuj++;
                        } else {
                            outuj = 0;
                        }

                    }

                    /*
                                        if (json.level[e - 1] == undefined) {
                                            din = 0;
                                        } else {
                                            din = json.level[e - 1].dirOut;
                                            console.log(json.level[e - 1].dirOut)
                                        }
                    */
                    json.size = il_kolumn;
                    var object = {
                        id: e,
                        type: $("#typ").val(),
                        //dirIn:json.level[e]-il_kolumn,
                        //dirIn: din,
                        out: 0
                    }
                    if (json.level[this.id] == null) {
                        json.level[this.id] = object;
                    } else {
                        json.level[this.id].id = e;

                        if (json.level[this.id].out == 5) {
                            json.level[this.id].out = 0
                        } else {
                            json.level[this.id].out++
                        }
                        if (this.id == 0) {
                            json.level[this.id].in = 0
                        } else {
                            switch (json.level[this.id].out) {
                                case 0:
                                    if (json.level[this.id - json.size] != undefined) {
                                        json.level[this.id - json.size].in = 3
                                    }
                                    break;
                                case 1:
                                    if (json.level[(this.id - json.size) + 1] != undefined) {
                                        json.level[(this.id - json.size) + 1].in = 4
                                    }
                                    break;
                                case 2:
                                    if (json.level[this.id + 1] != undefined) {
                                        json.level[this.id + 1].in = 5
                                    }
                                    break;
                                case 3:
                                    if (json.level[this.id + json.size] != undefined) {
                                        json.level[this.id + json.size].in = 0
                                    }
                                    break;
                                case 4:
                                    if (json.level[this.id + json.size - 1] != undefined) {
                                        json.level[this.id + json.size - 1].in = 1
                                    }
                                    break;
                                case 5:
                                    if (json.level[this.id - 1] != undefined) {
                                        json.level[this.id - 1].in = 2;
                                    }
                                    break;
                            }

                        }
                    }

                    //json.divHex[e]={
                    //    id:e,
                    //}
                    this.klik++;
                    $("#json").html(JSON.stringify(json));
                    //console.log(JSON.stringify(json))
                });



                q++;
            }
            hexTop = 0;
            if (j % 2 == 0) {
                hexLeft += 38;
                hexTop += 25;
            } else {
                hexLeft += 38;
                hexTop = 0;
            }

        }
    })




})