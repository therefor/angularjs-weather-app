var app = angular.module("wheatherInfo", []);
app.controller("myCtrl", function($scope, $http) {
    //获取天气数据函数
    function getData(city){
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city +" &appid=bc822510a69ebb51096fc25261dd2d97";
        $http.get(url).then(function(response) {
            // return response.data;
            $scope.myData = response.data;
            $scope.city = response.data.name;
            $scope.country = response.data.sys.country;
            $scope.wheather = response.data.weather[0].main;
            $scope.tempCel = Math.round(response.data.main.temp)/10; //保留一位小数
            $scope.tempFah = Math.round( (response.data.main.temp * 9)/5 )/10 + 32;//华氏摄氏度
            $scope.temp = $scope.tempCel;
            $scope.unit = "C";
            $scope.wheatherPic = "";
            changeImg($scope.wheather);
        });

    }
    //改变天气图片
    function changeImg(wheatherClass){
        //alert("."+ wheatherClass);
        switch (wheatherClass.toLowerCase()) {
            case 'dizzle':
                src = "http://cdn1.theodysseyonline.com/files/2015/05/24/635680854265070871-654912290_rainy-feature.jpg";
                break;
            case 'clouds':
                src = "https://www.7l.com/blog/wp-content/uploads/2012/03/CutClouds.jpg";
                break;
            case 'rain':
                src = "http://images.wisegeek.com/purple-umbrella-with-rain.jpg";
                break;
            case 'snow':
                src = "http://news.bbcimg.co.uk/media/images/65285000/jpg/_65285371_jamesshooter.jpg";
                break;
            case 'clear':
                src = "http://www.atrixforums.com/forum/attachments/motorola-atrix-graphics/12665d1368588945-share-your-wallpapers-12469-field-under-clear-sky-1920x1080-nature-wallpaper.jpg";
                break;
            case 'thunderstom':
                src = "http://m.img.brothersoft.com/android/11/11a7c1e8cc0692a40a26c9800306b588_screeshots_4.jpeg";
                break;;
            default:
                var src = "http://ourbeautifulworldanduniverse.com/wp-content/uploads/2012/08/Mythical-Sahara.jpg";//天气照片默认为沙漠;
        }
        $("img#wheatherPic").attr("src",src);
    }
    //获取位置之后请求天气数据
    var jqxhr = $.getJSON( "http://ipinfo.io/json", function(data) {
        //alert( "success" );
        $scope.city = data.city;
        getData($scope.city);
    })
        .fail(function() {
            alert( "无法获取您的城市地址，请手动输入所在城市拼音" );
        });

    //更换城市为用户输入值
    $scope.changeCity = function(){
        var city = $scope.anotherCity;
        getData(city);
    }

    //华氏和摄氏度转换
    $scope.tempChange = false; //默认温度单位为摄氏度
    $scope.sys = function(){
        if($scope.tempChange){
            $scope.unit ='C';
            $scope.temp = $scope.tempCel;
            return $scope.tempChange = false;
        }

        $scope.unit ='F';
        $scope.temp = $scope.tempFah;
        return $scope.tempChange = true;
    }

});