$(document).ready(function(){

/*回到顶部效果*/
(function(){
   $(main).scroll(function(){
        $(main).scrollTop()>100? $("#returnTop").css("bottom","60px"):$("#returnTop").css("bottom","-200px");
    });
    $("#returnTop").bind("click",function(){
        if($(main).scrollTop != 0){
            if(!$("html,main").is(":animated")){
                $("html,main").animate({scrollTop: 0},500)
            }
            
        }
        
    }); 
})();

});




    
