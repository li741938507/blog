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

//第二步，处理请求
/*router.get("/", function (req,res) {
 res.sendFile("../view/main/index.html");
 });*/
<!--  {%%} 代表语法  for if -->
<!--  {{}} 具体数据-->
router.get("/", function (req,res) {    //分页查找
    var page=Number(req.query.page||1);
    var mytype=Number(req.query.mytype||1);
    pool.getConnection(function (err,conn) {
        conn.query("select * from type order by tid", function (err,result) {
            //注意这里，我们现在需要同时查两个东西    所有的文章类型     第二个：所有的文章内容
            //请注意，绝对不能再释放连接之后再去查找
            if(mytype==1){
                var sql1="select c.*,t.tname,u.nickname from contents c,type t,user u where c.tid=t.tid and c.uid=u.uid";
            }else{
                var sql1="select c.*,t.tname,u.nickname from contents c,type t,user u where c.tid=t.tid and c.uid=u.uid and c.tid="+mytype;
            }
            conn.query(sql1,function (err2,result2) {
                var count=result2.length;
                var size=4;
                var pages=Math.ceil(count/size);
                page=Math.min(page,pages);
                page=Math.max(page,1);
                var beginSize=(page-1)*size;
                if(mytype==1){
                    var sql2="select c.*,t.tname,u.nickname from contents c,type t,user u where c.tid=t.tid and c.uid=u.uid order by c.addTime desc limit ?,?";
                }else{
                    var sql2="select c.*,t.tname,u.nickname from contents c,type t,user u where c.tid=t.tid and c.uid=u.uid and c.tid="+mytype+" order by c.addTime desc limit ?,?";
                }
                conn.query(sql2,[beginSize,size],function(err2,result2){
                    conn.release();
                    //现在，数据有了result  问题是，如何将这个数据，传到网页里面去
                    //网页路径  传到这个网页的模板引擎的参数
                    res.render("main/index", {
                        types: result,
                        contents: result2,
                        content:result2[0],
                        page: page,
                        pages:pages,
                        size: size,
                        count: count,
                        mytype:mytype,
                        userInfo:req.session.userInfo
                    });
                });
            });
        });
    });
});
router.get("/view",function(req,res){
    var cid=req.query.cid;
    var mytype=Number(req.query.mytype||1);
    pool.getConnection(function(err,conn){
        conn.query("select c.*,u.nickname,cm.* from contents c,user u,comments cm where u.uid=cm.uid and cm.cid=c.cid and c.cid=? order by cm.vtime desc",[cid],function(err,result){
            console.log(result);
                res.render("main/view", {
                    mytype: mytype,
                    contents: result,
                    content: result[0],
                    userInfo: req.session.userInfo
                });
            var views=result[0].views;
            conn.query("update contents set views=? where cid=?",[views+1,cid],function(err,result2){
                conn.release();
            });
        })
    });
});

//第三步，将这个支线模块，加载到主模块里面去
module.exports=router;
