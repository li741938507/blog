var express=require("express");
var mysql=require("mysql");

//配置数据库连接池
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"myblog",
    user:"root",
    password:"a"
});

//路由操作，第一步，需要加载路由
var router=express.Router();

router.use(function(req,res,next){
    if(req.session.userInfo==null||req.session.userInfo==undefined){
        res.send("<script>alert('非法操作，请先登录');location.href='http://127.0.0.1'</script>");
        return;
    }
    next();
});

router.get("/about", function (req,res) {
    var cid=req.query.cid;
    pool.getConnection(function(err,conn){
        conn.query("select c.*,t.tname,u.nickname from contents c,type t,user u where c.tid=t.tid and c.uid=u.uid",function(err,result){
            if(err){
                console.log(err);
            }else{
                res.render("visitor/about",{
                    content:result[0],
                    userInfo:req.session.userInfo
                });
            }
        })
    });
});
router.get("/study", function (req,res) {
    var cid=req.query.cid;
    pool.getConnection(function(err,conn){
        conn.query("select c.*,t.tname,u.nickname from contents c,type t,user u where c.tid=t.tid and c.uid=u.uid",function(err,result){
            if(err){
                console.log(err);
            }else{
                res.render("visitor/study",{
                    content:result[0],
                    userInfo:req.session.userInfo
                });
            }
        })
    });
});



module.exports=router;