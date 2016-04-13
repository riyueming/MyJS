
$(document).ready(function(){
    $(window).on("load",function(){
        imgLocation();

        var dateImg = {"date":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"}]}
        window.onscroll = function(){
            if(!scrollside()){
                $.each(dateImg.date,function(index,value){
                    var box = $("<div>").addClass("box").appendTo($("#container"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    //console.log("./img/"+$(value).attr("src"));

                    $("<img>").attr("src","./img/"+$(value).attr("src")).appendTo(content);
                });
                imgLocation();
            }
        };

    }) ;
});

function scrollside(){
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
    var documentHeight = $(document).height();
    var scrollHeight = $(window).scrollTop;
    return(lastboxHeight < scrollHeight+documentHeight)?true:false;

}

function imgLocation(){
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width()/boxWidth);
    var boxArr = [];
   // console.log(boxWidth);

    box.each(function(index,value){
       //console.log(index+"----"+value);
       //console.log(num);
        var boxHeight = box.eq(index).height();
        //console.log(boxHeight);
        if(index < num){
            boxArr[index] = boxHeight;
            //console.log(boxArr);
        }else{
            var minboxHeight = Math.min.apply(null,boxArr);
            //console.log(minboxHeight);
            var minboxIndex = $.inArray(minboxHeight,boxArr);
            //console.log(minboxIndex);
            //console.log(value);
            $(value).css({
                "position":"absolute",
                "top":minboxHeight,
                "left":box.eq(minboxIndex).position().left
            });

            boxArr[minboxIndex] += box.eq(index).height();
        }
    });
}