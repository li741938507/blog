var express=require("express");
var mysql=require("mysql");

//配置数据库连接池
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"blog",
    user:"root",
    password:"a"
});

//路由操作，第一步，需要加载路由
var router=express.Router();
router.use(function(req,res,next){
    if(req.session.userInfo==null||req.session.userInfo==undefined||req.session.userInfo.isAdmin==0){
        res.send("<script>alert('非法操作，请先登录');location.href='http://127.0.0.1'</script>");
        return;
    }
    next();
});

//第二步，处理请求
router.get("/", function (req,res) {
    res.render("admin/index");
});
router.get("/user",function(req,res){
    var page=Number(req.query.page||1);
    var size=6;
    pool.getConnection(function (err,conn) {
        conn.query("select * from user order by uid", function (err,result){
           if(err){
               console.log(err);
           }
            var count=result.length;
            var size=6;
            var pages=Math.ceil(count/size);
            page=Math.min(page,pages);
            page=Math.max(page,1);
            var beginSize=(page-1)*size;
            conn.query("select * from user order by uid limit ?,?",[beginSize,size], function (err,result2){
                conn.release();
                res.render("admin/user_index",{
                    userInfo:req.session.userInfo,
                    users:result2,
                    tag:'user',
                    page:page,
                    pages:pages,
                    size:size,
                    count:count
                });
            });
        });
    });
});
router.get("/category",function(req,res){
    var page=Number(req.query.page||1);
    var size=6;
    pool.getConnection(function (err,conn) {
        conn.query("select * from type order by tid", function (err,result){
            if(err){
                console.log(err);
            }
            var count=result.length;
            var pages=Math.ceil(count/size);
            page=Math.min(page,pages);
            page=Math.max(page,1);
            var beginSize=(page-1)*size;
            conn.query("select * from type order by tid limit ?,?",[beginSize,size], function (err,result2){
                conn.release();
                res.render("admin/category",{
                    userInfo:req.session.userInfo,
                    types:result2,
                    tag:'category',
                    page:page,
                    pages:pages,
                    size:size,
                    count:count
                });
            });
        });
    });
});
router.post("/category/edit",function(req,res){
    var tid=req.body.tid;
    var tname=req.body.tname;
    pool.getConnection(function(err,conn){
        conn.query("update type set tname=? where tid=?",[tname,tid],function(err,result) {
            conn.release();
            if (err) {
                console.log(err);
            } else if (result.affectedRows > 0) {
                res.send("1");
            } else {
                res.send("0");
            }
        });
    })
});
router.post("/category/del",function(req,res){
    var tid=req.body.tid;
    var flag=false;
    pool.getConnection(function(err,conn){
        conn.query("select * from contents where tid=?",[tid],function(err,resu) {
            if(err){
                console.log(err);
            }else if(resu.length>0){
                conn.query("update contents set tid=1 where tid=?", [tid], function(er, re) {
                    conn.query("delete from type where tid=?", [tid], function (err2, result2) {
                        conn.release();
                        console.log(result2.affectedRows);
                        if (err2) {
                            console.log(err2);
                        } else if (result2.affectedRows > 0) {
                            res.send("1");
                        } else {
                            res.send("0");
                        }
                    });
                });
            }else{
                conn.query("delete from type where tid=?", [tid], function (err2, result2) {
                    conn.release();
                    console.log(result2.affectedRows);
                    if (err2) {
                        console.log(err2);
                    } else if (result2.affectedRows > 0) {
                        res.send("1");
                    } else {
                        res.send("0");
                    }
                });
            }

        });
    })
});
router.get("/category/add",function(req,res){
        res.render("admin/add");
});
router.post("/category/add1",function(req,res) {
    var tname = req.body.tname;
    pool.getConnection(function (err, conn) {
        conn.query("select * from type where tname=?", [tname], function (err, resu) {
            if(err){
                console.log(err);
            }
            else if (resu.length > 0) {
                res.send("-1");
            }else{
                conn.query("insert into type values(0,?)", [tname], function (err, result) {
                    conn.release();
                    if(err){
                        console.log(err);
                    }else if(result.affectedRows>0){
                        res.send("1");
                    }else{
                     res.send("0");
                    }
                });
            }
        });
    });
});
router.get("/content",function(req,res){
    var page=Number(req.query.page||1);
    var size=6;
    pool.getConnection(function (err,conn) {
        conn.query("select * from contents", function (err,result){
            if(err){
                console.log(err);
            }
            var count=result.length;
            var pages=Math.ceil(count/size);
            page=Math.min(page,pages);
            page=Math.max(page,1);
            var beginSize=(page-1)*size;
            conn.query("select c.*,t.tname,u.uname from contents c,type t,user u where t.tid=c.tid and c.uid=u.uid order by cid limit ?,?",[beginSize,size], function (err,result2){
                conn.release();
                res.render("admin/content",{
                    userInfo:req.session.userInfo,
                    contents:result2,
                    tag:'content',
                    page:page,
                    pages:pages,
                    size:size,
                    count:count
                });
            });
        });
    });
});
router.get("/content/edit",function(req,res){
    pool.getConnection(function(err,conn){
      if(err){
          console.log(err);
      }else{
          conn.query("select distinct c.tid,t.tname from contents c,type t where t.tid=c.tid",function(err,result){
              conn.release();
              if(err){
                  console.log(err);
              }else{
                  res.render("admin/content_edit",{
                      userInfo:req.session.userInfo,
                      categories:result
                  });
              }
          })
      }
    });
});
router.post("/content/del",function(req,res){
   var cid=req.body.cid;
    pool.getConnection(function(err,conn){
        conn.query("delete from contents where cid=?",[cid],function(err,result){
            if(err){
                console.log(err);
            }else if(result.affectedRows>0){
                res.send("1");
            }else{
                res.send("0");
            }
        })
    })
});
router.get("/content/add",function(req,res){
    res.render("admin/content_add");
});
//第三步，将这个支线模块，加载到主模块里面去
module.exports=router;