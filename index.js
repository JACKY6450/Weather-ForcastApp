        let a;
        let i;
        let j;
        let arr1=[];
        let locatran;
        let timeran;
        let repeat;
        let rain = {
            chancedata:[],
            citydata:[]
        };
        let raintemp;
        const apiurl1 = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-A92D3352-36AC-4D14-9877-3D706D2CA3AC";
        const apiurl2 = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-A92D3352-36AC-4D14-9877-3D706D2CA3AC";
        $(document).ready(function(){
            initweather1();
            initweather2();
        })
        function initweather1(){
            $.ajax({
                url:apiurl1,
                method:"get",
                dataType:"json",
                success: function(response){
                    // console.log(response.records);
                    $(".app").toggle();
                    a = $("#time option");
                    for(i=0;i<a.length;i++){
                        $(".time option").eq(i).text(response.records.location[0].weatherElement[0].time[i].startTime+" ~ "+
                                                     response.records.location[0].weatherElement[0].time[i].endTime);
                        $("#time1 option").eq(i).text(response.records.location[0].weatherElement[0].time[i].startTime+" ~ "+
                                                     response.records.location[0].weatherElement[0].time[i].endTime);
                    
                    }
                    for(i=0;i<8;i++){
                        locatran = Math.floor(Math.random()*response.records.location.length);
                        
                        for(j=0;j<i;j++){
                            if(arr1[j]==locatran){
                                repeat = 1;
                                break;   
                            }          
                        }
                        if(repeat==1){
                            i--;
                            repeat = 0;
                            continue;
                        }
                        else{ 
                        arr1[i] = locatran;  
                        }   
                        // console.log(locatran); 
                    }
                    for(i=0;i<arr1.length;i++){
                        // initdatabox();
                        timeran = Math.floor(Math.random()*response.records.location[0].weatherElement[0].time.length);
                        let dataitem = $("<div></div>").addClass("dataitem");
                        for(j=0;j<locatedata.picinform.length;j++){
                            if(locatedata.picinform[j].piclocate == response.records.location[arr1[i]].locationName){
                                let itemimg = $("<img></img>").attr("src",locatedata.picinform[j].picsrc);
                                dataitem.append(itemimg);
                            }
                        }
                                        //圖片
                        dataitem.append("<h2>"+response.records.location[arr1[i]].locationName+"</h2>"); 
                                        //縣市名稱
                        let datatab = $("<table></table>");
                        datatab.append("<tr><td>Sart Time</td>"+ 
                                        "<td>"+response.records.location[arr1[i]].weatherElement[0].time[timeran].startTime+"</td><tr>"+
                                        "<tr><td>End Time</td>"+
                                        "<td>"+response.records.location[arr1[i]].weatherElement[0].time[timeran].endTime+"</td><tr>"+
                                        "<tr><td>天氣狀況</td>"+
                                        "<td>"+response.records.location[arr1[i]].weatherElement[0].time[timeran].parameter.parameterName+"</td><tr>"+
                                        "<tr><td>最低溫(&degC)</td>"+
                                        "<td>"+response.records.location[arr1[i]].weatherElement[2].time[timeran].parameter.parameterName+"</td><tr>"+
                                        "<tr><td>最高溫(&degC)</td>"+
                                        "<td>"+response.records.location[arr1[i]].weatherElement[4].time[timeran].parameter.parameterName+"</td><tr>"+
                                        "<tr><td>降雨機率(%)</td>"+
                                        "<td>"+response.records.location[arr1[i]].weatherElement[1].time[timeran].parameter.parameterName+"</td><tr>"+
                                        "<tr><td>舒適度</td>"+
                                        "<td>"+response.records.location[arr1[i]].weatherElement[3].time[timeran].parameter.parameterName+"</td><tr>"
                                        );
                        dataitem.append(datatab);
                        $(".databox").append(dataitem);

                    }
                    // init 降雨機率資料
                    let timeseq = $("#time1").val();
                    for(i=0;i<response.records.location.length;i++){
                        rain.chancedata[i] = response.records.location[i].weatherElement[1].time[timeseq].parameter.parameterName;
                        rain.citydata[i] = response.records.location[i].locationName;
                    }
                    // console.log(rain.chancedata, rain.citydata);
                    rainchancecompu();
                    // console.log(response.records.location.length);
                },
                error:function(error){
                    console.log(error);
                },
            })
        }
        function initweather2(){
            $.ajax({
                url:apiurl2,
                method:"get",
                dataType:"json",
                success: function(response){
                    // console.log(response);
                    $("#observatory").empty();
                    let citynam = $("#city1 option:selected").val();
                    // console.log(city);
                    for(i=0;i<response.records.location.length;i++){
                        if(citynam == response.records.location[i].parameter[0].parameterValue){
                            let obseroption = $("<option></option>");
                            obseroption.text(response.records.location[i].locationName);
                            obseroption.val(response.records.location[i].locationName);
                            $("#observatory").append(obseroption);
                        }
                    }
                },
                error: function(error){
                    consol.log(error);
                }
            })
        }
        function sendout(){
            // alert($("#city").val()+" "+$("#time option").eq(0).text());
            let cityval = $("#city").val();
            let timeseq = $("#time").val();
            // console.log(cityval);
            // $(".databox").empty();
            $.ajax({
                url:apiurl1,
                method:"get",
                dataType:"json",
                success: function(response){
                    for(i=0;i<response.records.location.length;i++){
                        if(cityval == response.records.location[i].locationName){
                            $(".databox .dataitem").removeClass("newest");
                            $(".databox .dataitem").eq(7).remove();
                            let dataitem = $("<div></div>").addClass("dataitem");
                            dataitem.fadeOut(0);
                            for(j=0;j<locatedata.picinform.length;j++){
                                if(locatedata.picinform[j].piclocate == cityval){
                                    let itemimg = $("<img></img>").attr("src",locatedata.picinform[j].picsrc);
                                    dataitem.append(itemimg);
                                }
                            }
                            // dataitem.append("<img></img>").attr("src","homepagpic/travpic/TAIWAN/Taipei.jpg");
                                            //圖片
                            dataitem.append("<h2>"+response.records.location[i].locationName+"</h2>"); 
                                            //縣市名稱
                            let datatab = $("<table></table>");
                            datatab.append("<tr><td>Sart Time</td>"+ 
                                            "<td>"+response.records.location[i].weatherElement[0].time[timeseq].startTime+"</td><tr>"+
                                            "<tr><td>End Time</td>"+
                                            "<td>"+response.records.location[i].weatherElement[0].time[timeseq].endTime+"</td><tr>"+
                                            "<tr><td>天氣狀況</td>"+
                                            "<td>"+response.records.location[i].weatherElement[0].time[timeseq].parameter.parameterName+"</td><tr>"+
                                            "<tr><td>最低溫(&degC)</td>"+
                                            "<td>"+response.records.location[i].weatherElement[2].time[timeseq].parameter.parameterName+"</td><tr>"+
                                            "<tr><td>最高溫(&degC)</td>"+
                                            "<td>"+response.records.location[i].weatherElement[4].time[timeseq].parameter.parameterName+"</td><tr>"+
                                            "<tr><td>降雨機率(%)</td>"+
                                            "<td>"+response.records.location[i].weatherElement[1].time[timeseq].parameter.parameterName+"</td><tr>"+
                                            "<tr><td>舒適度</td>"+
                                            "<td>"+response.records.location[i].weatherElement[3].time[timeseq].parameter.parameterName+"</td><tr>"
                                            );
                            dataitem.append(datatab);
                            dataitem.addClass("newest");
                            dataitem.fadeIn(600);
                            $(".databox").prepend(dataitem); 
                        } 
                    }
                },
            
                error:function(error){
                    console.log(error);
                },
            })
           
            // console.log($("#city").val());
        }
        function rainchandatamov(){
            $.ajax({
                url:apiurl1,
                method:"get",
                dataType:"json",
                success: function(response){
                    let timeseq = $("#time1").val();
                    $(".rainchan").empty();
                    for(i=0;i<response.records.location.length;i++){
                        rain.chancedata[i] = response.records.location[i].weatherElement[1].time[timeseq].parameter.parameterName;
                        rain.citydata[i] = response.records.location[i].locationName;
                    }
                    rainchancecompu();
                },
                error:function(error){
                    console.log(error);
                },
            })
        }
        function rainchancecompu(){
            for(i=0;i<rain.chancedata.length;i++){
                for(j=0;j<rain.chancedata.length-1;j++){
                    if(parseInt(rain.chancedata[j])<parseInt(rain.chancedata[j+1])){
                        console.log(rain.chancedata[j], rain.chancedata[j+1]);
                        raintemp = rain.chancedata[j];
                        rain.chancedata[j] = rain.chancedata[j+1];
                        rain.chancedata[j+1] = raintemp; 
                        raintemp = rain.citydata[j];
                        rain.citydata[j] = rain.citydata[j+1];
                        rain.citydata[j+1] = raintemp;
                    }
                }
            }
            // Bubble sort 將降雨量由高到低排序
            for(i=0;i<rain.citydata.length;i++){
                let chancebar = $("<div></div>").addClass("chancebar");
                let barlength;
                barlength = rain.chancedata[i]*3;
                chancebar.css("height",barlength);
                let chancetext = $("<div></div>").addClass("chancetext");
                chancetext.text(rain.chancedata[i]+"%");
                let barcolumn = $("<div></div>").addClass("barcolumn");
                barcolumn.append(chancebar, chancetext);
                let raincity = $("<div></div>").addClass("raincity");
                raincity.text(rain.citydata[i]);
                let rainchanitem = $("<div></div>").addClass("rainchanitem");
                rainchanitem.append(barcolumn, raincity);
                // rainchanitem.append(raincity);
                $(".rainchan").append(rainchanitem);
                
            }
                    
        }
        function changeobscity(){
            $.ajax({
                url:apiurl2,
                method:"get",
                dataType:"json",
                success: function(response){
                    // console.log(response);
                    $("#observatory").empty();
                    let citynam = $("#city1 option:selected").val();
                    // console.log(city);
                    for(i=0;i<response.records.location.length;i++){
                        if(citynam == response.records.location[i].parameter[0].parameterValue){
                            let obseroption = $("<option></option>");
                            obseroption.text(response.records.location[i].locationName);
                            obseroption.val(response.records.location[i].locationName);
                            $("#observatory").append(obseroption);
                        }
                    }
                },
                error: function(error){
                    consol.log(error);
                }
            })
        }
        function changeobsdata(){
            let citynam = $("#city1 option:selected").val();
            let observatory = $("#observatory option:selected").val();
            
           
            $.ajax({
                url:apiurl2,
                method:"get",
                dataType:"json",
                success: function(response){
                    for(i=0;i<response.records.location.length;i++){
                        if(citynam == response.records.location[i].parameter[0].parameterValue){
                            if(observatory == response.records.location[i].locationName){
                                // console.log(response.records.location[i].locationName);
                                $("#obseavadata .observatitle").empty();
                                $("#obseavadata .obseavadata1").empty();
                                // $("#obseavadata .observatitle").append("<span>"+response.records.location[i].locationName+"觀測站</span>"
                                //                                         +"<span>"+response.records.location[i].parameter[0].parameterValue+"</span>"
                                //                                         +"<span>"+response.records.location[i].parameter[2].parameterValue+"</span>");
                                let observatorynam = $("<div></div>").addClass("observatorynam");
                                observatorynam.text(response.records.location[i].locationName+"觀測站");
                                let observalocate = $("<div></div>").addClass("observatorynam observatorynam1");
                                observalocate.text(response.records.location[i].parameter[0].parameterValue);
                                let observacounty = $("<div></div>").addClass("observatorynam observatorynam2");
                                observacounty.text(response.records.location[i].parameter[2].parameterValue);
                                let observatoryid = $("<div></div>").addClass("observatoryid");
                                observatoryid.text("Station ID : "+response.records.location[i].stationId);
                                $("#obseavadata .observatitle").append(observatorynam,observalocate,observacounty, observatoryid);
                                $("#obseavadata .obseavadata1").append("<tr>"+
                                                                       "<td>高度(公尺)</td><td>"+response.records.location[i].weatherElement[0].elementValue+"</td>"+
                                                                       "<td>風向(度)</td><td>"+response.records.location[i].weatherElement[1].elementValue+"</td>"+
                                                                       "<td>風速(公尺/秒)</td><td>"+response.records.location[i].weatherElement[2].elementValue+"</td>"+
                                                                       "</tr>");
                                $("#obseavadata .obseavadata1").append("<tr>"+
                                                                       "<td>溫度(&degC)</td><td>"+response.records.location[i].weatherElement[3].elementValue+"</td>"+
                                                                       "<td>相對溼度</td><td>"+response.records.location[i].weatherElement[4].elementValue+"</td>"+
                                                                       "<td>測站氣壓</td><td>"+response.records.location[i].weatherElement[5].elementValue+"</td>"+
                                                                       "</tr>");
                                $("#obseavadata .obseavadata1").append("<tr>"+
                                                                       "<td>日累積雨量(毫米)</td><td>"+response.records.location[i].weatherElement[6].elementValue+"</td>"+
                                                                       "<td>小時最大風速(公尺/秒)</td><td>"+response.records.location[i].weatherElement[7].elementValue+"</td>"+
                                                                       "<td>小時最大陣風風向(度)</td><td>"+response.records.location[i].weatherElement[8].elementValue+"</td>"+
                                                                       "</tr>");
                                $("#obseavadata .obseavadata1").append("<tr>"+
                                                                       "<td>小時最大陣風時間</td><td>"+response.records.location[i].weatherElement[9].elementValue+"</td>"+
                                                                       "<td>本日最高溫</td><td>"+response.records.location[i].weatherElement[10].elementValue+"</td>"+
                                                                       "<td>本日最高溫發生時間</td><td>"+response.records.location[i].weatherElement[11].elementValue+"</td>"+
                                                                       "</tr>");
                                $("#obseavadata .obseavadata1").append("<tr>"+
                                                                       "<td>本日最低溫(&degC)</td><td>"+response.records.location[i].weatherElement[12].elementValue+"</td>"+
                                                                       "<td>本日最低溫發生時間</td><td>"+response.records.location[i].weatherElement[13].elementValue+"</td>"+
                                                                        "</tr>");
                            }
                        }
                    }
                },
                error: function(error){
                    console.log(error);
                }
            })
        }
        $(window).scroll(function(){
            var scrolltop = $(this).scrollTop();
            // alert(scrolltop);
            if(scrolltop>250){
                $(".backtotop").show();
            }
            else
                $(".backtotop").hide();
        })
        function backtotop(){ 
            $('html,body').animate({ scrollTop: 0 }, 400); 
        }
        // function cleardata(){
        //     $(".databox").empty();
        //     $(".dataimport .datalist").remove();
        // }