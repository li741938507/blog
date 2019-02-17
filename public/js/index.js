var flag=false;
$("#list").on("click",function(){
    if(flag){
        $("#menu_list li").show("slow");
    }else{
        $("#menu_list li").hide("slow");
        }
    flag=!flag;
});
    var winHeight=window.innerHeight;
    var winWidth=window.innerWidth;
    var header=document.getElementById("header");
    header.style.width=winWidth-21+'px';
    header.style.height=winHeight+'px';

var gotop=document.getElementsByClassName("go-top")[0];
$(window).on("scroll",function(){
    st=$(window).scrollTop();
    if(st>=300){
        gotop.style.display="block";
    }else {
        gotop.style.display = "none";
    }
});
function login(){
    $("#hideAll").show();
}
function hideAll(){
    $("#hideAll").hide();
}
function showzc(){
    $("#login-box").hide();
    $("#zhuce").show();
}
function showLogin(){
    $("#zhuce").hide();
    $("#login-box").show();
}
$(".logout-btn").click(function(){
    $(".logout").toggle();
});

//注册
$("#zhuce").find('button').on('click', function () {
    var uname=$("#zhuce").find('[name="username"]').val();
    var pwd=$("#zhuce").find('[name="password"]').val();
    var repwd=$("#zhuce").find('[name="repassword"]').val();
    var nickname=$("#zhuce").find('[name="nickname"]').val();
    if(uname=="" || uname==null || pwd=="" || pwd==null ){
        alert("用户名或密码不能为空!");
        return;
    }
    if(nickname=="" || nickname==null){
        alert("昵称不能为空!");
        return;
    }
    if(pwd!=repwd){
        alert("输入的两次密码不一致!");
        return;
    }
    //通过ajax提交请求
    $.ajax({
        type:'post',
        url:'/api/user/register',
        data:{
            username:$("#zhuce").find('[name="username"]').val(),
            password:$("#zhuce").find('[name="password"]').val(),
            nickname:$("#zhuce").find('[name="nickname"]').val()
        },
        dataType:'json',
        success:function(result){
            $("#zhuce").find('.colWarning2').html(result.message);

            if(result.code==2){
                //注册成功
                setTimeout(function () {
                    $("#login-box").show();
                    $("#zhuce").hide();
                },1000);
            }
        }
    });
});

//登录
$("#login-box").find('button').on('click',function(){
    var uname=$("#login-box").find('[name="username"]').val();
    var pwd=$("#login-box").find('[name="password"]').val();
    if(uname=="" || uname==null || pwd=="" || pwd==null){
        alert("用户名或密码不能为空!");
        return;
    }
    //通过ajax提交请求
    $.ajax({
        type:'post',
        url:'/api/user/login',
        data:{
            username:$("#login-box").find('[name="username"]').val(),
            password:$("#login-box").find('[name="password"]').val(),
        },
        dataType:'json',
        success: function (result) {
            $("#login-box").find('.colWarning1').html(result.message);
            if (result.code == 2) {
                //登录成功
                //$loginBox.hide();
                //$userBox.show();
                //$loginBox.find('[name="username"]').val("");
                //$loginBox.find('[name="password"]').val("");
                //判断是管理员还是普通用户
                //if (result.info.isAdmin == 0) {     //普通用户
                //$userBox.find("p.userName span").html(result.info.uname);
                //$userBox.find("p.adminInfo").hide();
                // } else if (result.info.isAdmin == 1) {       //管理员
                //$userBox.find("p.userName span").html(result.info.uname);
                //$userBox.find("p.adminInfo").show();
                // }
                window.location.reload();
            }
        }
    })
})