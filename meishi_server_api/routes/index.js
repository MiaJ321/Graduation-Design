var express = require('express');
var router = express.Router();
var db = require("../util/dbconfig");  // 引入数据库方法

var bodyparser = require('body-parser');
// 已解析表单提交数据为例 application/x-www-form-urlencoded
// extended: false 值是false时解析值是“String”或“Array” 值是true的时候可以解析任意类型的数据

//注册 
router.get('/register', (req, res) => {
  console.log(req.query);
  let sql1 = `select * from users where tel = '${req.query.tel}'`  // 查找数据表中是否已经存在用户
  // let sql1 = `select * from users where FIND_IN_SET('${req.query.user}', user)`  // 查找数据表中是否已经存在用户
  let sql2 = `INSERT INTO users(tel,paw) VALUES(?,?)`    // 插入语句，将前端传递过来的手机号和密码插入到数据库中
  db.query(sql1,function(err,data){
      if(err){
          res.send({
                  msg:"注册失败",
                  code:500
          });
      }else {
          if(data.length==0){  // data 为查询出来的结果，如果查询的手机号不存在，将会返回一个空数据 所有此时 data[0]==undefined, 执行插入语句操作;
              db.query(sql2,[req.query.tel,req.query.paw],function(err,data){
                  if(err){
                      res.send({
                          code:500,
                          msg:"注册失败!",
                      });
                      console.log(err)
                  }else {
                      res.send({
                              msg:"注册成功",
                              code:200
                      });
                  }
              });
          }else{
              // 当tel用户存在时
              res.send({code:0, msg:'用户名已存在'})
          }
      }
  });
});



// 登录
router.get('/signIn', (req, res)=>{
  let {
  tel,
  paw
  } = req.query;

  console.log(req.query)

let sql = `select * from users where FIND_IN_SET('${tel}', tel)`
db.query(sql,(err,data) => {
  // console.log(data)
  if (err) {
      console.log(err);
      return res.json({
          code: -1,
          msg: '登录失败'
      })
  } else {
      console.log("c")
      console.log(data);
      // 当data数组不为空时，代表该手机号注册过，然后匹对密码
      if(data.length==0){
          // 当 data 为空数组时，代表该手机号没有注册
          res.send({
              data:data,
              code:0,
              msg:"该用户尚未注册"
          });
      }else{
          if(data[0].paw == paw){
              res.send({
                  data:data[0],
                  code:200,
                  msg:"登录成功！"
              });
          }else{
              res.send({
                  code:500,
                  msg:"密码错误"
              });
          }
      }
  }
  })
});

// 查看菜品是否已经收藏    
router.get('/isStar', (req, res) => {    
    let sql = `select * from star where tel = '${req.query.tel}' && goods_id = '${req.query.goods_id}'`  // 查找数据表中是否存在
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                code: 500,
                msg: "获取失败"
            })
        } else {
            res.send({
                list: data,
                code: 200,
                 msg: "获取数据成功"
            })
        }
    });
  });

  // delStar 取消收藏
  router.get('/delStar', (req, res) => {
    let sql = `delete from star where goods_id = ${req.query.goods_id} && tel = ${req.query.tel}`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            res.send({
                code: 500,
                msg: "删除失败"
            })
        } else {
            res.send({
                code: 200,
                msg: "删除成功"
        })
    }
})
})

//查询所有的商品
router.get('/getCaipin', (req, res) => {    
  var sql = "select * from goods";
  db.query(sql, (err, data) => {
      if (err) {
          res.send({
              code: 500,
              msg: "获取失败"
          })
      } else {
          res.send({
              list: data,
              code: 200,
               msg: "获取数据成功"
          })
      }
  });
});

// 获取我的发布
router.get('/getMyCaipin', (req, res) => {    
    var sql = `select * from goods where tel = '${req.query.tel}'`
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                code: 500,
                msg: "获取失败"
            })
        } else {
            res.send({
                list: data,
                code: 200,
                 msg: "获取数据成功"
            })
        }
    });
  });

  //获得所有周边店
  router.get('/getNearby', (req, res) => {    
    var sql = `select * from nearby LIMIT ${req.query.start} ,${req.query.num}`
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                code: 500,
                msg: "获取失败"
            })
        } else {
            res.send({
                list: data,
                code: 200,
                 msg: "获取数据成功"
            })
        }
    });
  });

  //获取我的发布
  router.get('/getMyCom', (req, res) => {    
    var sql = `select * from pinglun where tel = '${req.query.tel}'`
    db.query(sql, (err, data) => {
        if (err) {
            res.send({
                code: 500,
                msg: "获取失败"
            })
        } else {
            res.send({
                list: data,
                code: 200,
                 msg: "获取数据成功"
            })
        }
    });
  });

// 添加到收藏
router.get('/addSart', (req, res) => {
    console.log(req.query);   
    let sql2 = `INSERT INTO star(buzhou,num,goods_id,title,img,yuanliao,zhizuo,money,tel) VALUES(?,?,?,?,?,?,?,?,?)`    // 插入语句，将前端传递过来的手机号和密码插入到数据库中
  // data 为查询出来的结果，如果查询的手机号不存在，将会返回一个空数据 所有此时 data[0]==undefined, 执行插入语句操作;
                db.query(sql2,[req.query.buzhou,req.query.num,req.query.goods_id,req.query.title,req.query.img,req.query.yuanliao,req.query.zhizuo,req.query.money,req.query.tel],function(err,data){
                    if(err){
                        res.send({
                            code:500,
                            msg:"添加失败!",
                        });
                        console.log(err)
                    }else {
                        // console.log(data);
                        // res.redirect("/users"); 重定向，添加完后返回到用户首页
                        res.send({
                                msg:"添加成功!",
                                code:200
                        });
                    }
                });
  });

  // 分类
router.get('/getFenlei', (req, res) => {
    let sql1 = `select * from goods where num = '${req.query.num}'`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"查询失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"查询成功！",
                code:"200"
            });
        }
    });
  });

  router.get('/addPinglun', (req, res) => {
    console.log(req.query);
    let sql = `INSERT INTO pinglun(tel,title,img,name,shijian,goods_id) VALUES(?,?,?,?,?,?)`   
        db.query(sql,[req.query.tel,req.query.title,req.query.img,req.query.name,req.query.time,req.query.goods_id],function(err,data){
                if(err){
                    res.send({
                        code:500,
                        msg:"添加失败!",
                    });
                        console.log(err)
                    }else {
                        res.send({
                            msg:"添加成功!",
                             code:200
                    });
                }
        });
  });

  // 我的收藏
  router.get('/getMyStar', (req, res) => {
    console.log(req.query);
    let sql1 = `select * from star where tel = '${req.query.tel}'`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"获取失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"获取成功！",
                code:"200"
            });
        }
    });
  });



// 添加菜品接口
router.get('/addCaipin', (req, res) => {
    console.log(req.query);
    let sql = `INSERT INTO goods(tel,buzhou,title,img,zhizuo,num,yuanliao,money,shijian) VALUES(?,?,?,?,?,?,?,?,?)`    // 插入语句，将前端传递过来的手机号和密码插入到数据库中
        db.query(sql,[req.query.tel,req.query.buzhou,req.query.title,req.query.img,req.query.zhizuo,req.query.num,req.query.yuanliao,req.query.money,req.query.shijian],function(err,data){
                if(err){
                    res.send({
                        code:500,
                        msg:"添加失败!",
                    });
                        console.log(err)
                    }else {
                        res.send({
                            msg:"添加成功!",
                             code:200
                    });
                }
        });
  });


// 评论
router.get('/star', (req, res) => {
    console.log(req.query);
    let sql = `INSERT INTO pinglun(nickName,name_img,goods_id,msg,star,tel,shijian) VALUES(?,?,?,?,?,?,?)`    // 插入语句，将前端传递过来的手机号和密码插入到数据库中
        db.query(sql,[req.query.nickName,req.query.name_img,req.query.goods_id,req.query.msg,req.query.star,req.query.tel,req.query.shijian],function(err,data){
                if(err){
                    res.send({
                        code:500,
                        msg:"添加失败!",
                    });
                        console.log(err)
                    }else {
                        // console.log(data);
                        // res.redirect("/users"); 重定向，添加完后返回到用户首页
                        res.send({
                            msg:"添加成功!",
                             code:200
                    });
                }
        });
  });

  // 评价后，修改订单状态
  router.get('/xgOrderStar', (req,res)=>{
    var sql = `update dingdan set active='1' where dingdan_id='${req.query.dingdan_id}'`;
    console.log(req);
    db.query(sql,function(err,data){
        if(err){
            console.log(err,"v")
            res.send("修改失败 " + err);
        }else {
            // res.redirect("/users");
            console.log(data,"a")
            res.send({
               msg:"修改成功",
               code:200
           
            });
        }
    })
})

// 获取菜品评论
router.get('/getPinglun', (req, res) => {
    let sql1 = `select * from pinglun where goods_id = '${req.query.goods_id}'`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"查询失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"查询成功！",
                code:"200"
            });
        }
    });
  });

  //获得店铺评论
  router.get('/getNearping', (req, res) => {
    let sql1 = `select * from near1 LIMIT ${req.query.start} ,${req.query.num}`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"查询失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"查询成功！",
                code:"200"
            });
        }
    });
  });





  // 搜索美食
router.get('/search', (req, res)=>{
    console.log(req.query)
// 查询语句
let sql = `select * from goods where title REGEXP '${req.query.title}'`
db.query(sql,(err,data) => {
    // console.log(data)
    if (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '搜索失败'
        })
    } else {
            console.log(data)
            res.send({
                list:data,
                code:200,
                msg:"搜索成功"
            });
        }
  })
});



  // 搜索用户
  router.get('/search2', (req, res)=>{
    console.log(req.query)
// 查询语句
let sql = `select * from users where tel REGEXP '${req.query.tel}'`
db.query(sql,(err,data) => {
    if (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '搜索失败'
        })
    } else {
            console.log(data)
            res.send({
                list:data,
                code:200,
                msg:"搜索成功"
            });
        }
  })
});


// 搜索收藏
router.get('/search3', (req, res)=>{
    console.log(req.query)
// 查询语句
let sql = `select * from star where title REGEXP '${req.query.title}'`
db.query(sql,(err,data) => {
    // console.log(data)
    if (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '搜索失败'
        })
    } else {
            console.log(data)
            res.send({
                list:data,
                code:200,
                msg:"搜索成功"
            });
        }
  })
});

//搜索评论
router.get('/search4', (req, res)=>{
    console.log(req.query)
// 查询语句
let sql = `select * from pinglun where tel REGEXP '${req.query.tel}'`
db.query(sql,(err,data) => {
    if (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '搜索失败'
        })
    } else {
            console.log(data)
            res.send({
                list:data,
                code:200,
                msg:"搜索成功"
            });
        }
  })
});




// 获取所有用户
  router.get('/getUser', (req, res) => {
    let sql1 = `select * from users`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"查询失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"查询成功！",
                code:"200"
            });
        }
    });
  });

 // 修改用户信息
 // 修改列表,根据id修改
 router.get('/updateUser', (req,res)=>{
    var sql = `update users set paw='${req.query.paw}',xingming='${req.query.xingming}',xingbie='${req.query.xingbie}',nicheng='${req.query.nicheng}' where id='${req.query.id}'`;
    console.log(req);
    // (err,data)是回调函数（被作为参数传递给另一个函数的函数）
    db.query(sql,function(err,data){
        if(err){
            console.log(err,"v")
            res.send("修改失败 " + err);
        }else {
            // res.redirect("/users");
            console.log(data,"a")
            res.send({
               msg:"修改成功",
               code:200
           
            });
        }
    })
})

// admin 修改密码
 router.get('/updatePost', (req,res)=>{
    var sql = `update users set paw='${req.query.paw}' where id='${req.query.id}'`;
    console.log(req);
    db.query(sql,function(err,data){
        if(err){
            console.log(err,"v")
            res.send("修改失败 " + err);
        }else {
            // res.redirect("/users");
            console.log(data,"a")
            res.send({
               msg:"修改成功",
               code:200
           
            });
        }
    })
})

// 获取用户个人信息
router.get('/getUserInfo', (req, res) => {
    let sql1 = `select * from users where id = '${req.query.id}'`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"查询失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"查询成功！",
                code:"200"
            });
        }
    });
  });


// 删除用户
router.get('/delUser', (req, res) => {
    let sql = `delete from users where id = ${req.query.id}`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            res.send({
                code: 500,
                msg: "删除失败"
            })
        } else {
            res.send({
                code: 200,
                msg: "删除成功"
        })
    }
})
})


router.get('/updateCaipin', (req,res)=>{
    var sql = `update goods a,star b set a.title='${req.query.title}',b.title='${req.query.title}',a.zhizuo='${req.query.zhizuo}',b.zhizuo='${req.query.zhizuo}',a.yuanliao='${req.query.yuanliao}',b.yuanliao='${req.query.yuanliao}',a.money='${req.query.money}',b.money='${req.query.money}' where a.goods_id='${req.query.goods_id}' and b.goods_id='${req.query.goods_id}'`;
    //var sqln = `update star set title='${req.query.title}',zhizuo='${req.query.zhizuo}',yuanliao='${req.query.yuanliao}',money='${req.query.money}' where goods_id='${req.query.goods_id}'`;
    console.log(req);
    db.query(sql,function(err,data){
        if(err){
            console.log(err,"v")
            res.send("修改失败 " + err);
        }else {
            // res.redirect("/users");
            console.log(data,"a")
            res.send({
               msg:"修改成功",
               code:200
           
            });
        }
    })

})

// 删除菜品
router.get('/delCaipin', (req, res) => {
    //之后进行测验:大成功，完全没问题啦，累死
    let sql = `delete a.*,b.* ,c.* from goods  a LEFT JOIN star AS b  ON a.goods_id=b.goods_id
    LEFT JOIN pinglun AS c  ON a.goods_id=c.goods_id where a.goods_id= ${req.query.goods_id} `;
    
                db.query(sql, (err, data) => {
                    if (err) {
                    console.log(err)
                    res.send({
                        code: 500,
                        msg: "删除失败"
                    })
                    }   else {
                        res.send({
                            code: 200,
                            msg: "删除成功"
                        })
                    }
                })

})
    
         
         




// 删除订单
router.get('/delOrder', (req, res) => {
    let sql = `delete from dingdan where dingdan_id = ${req.query.dingdan_id}`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            res.send({
                code: 500,
                msg: "删除失败"
            })
        } else {
            res.send({
                code: 200,
                msg: "删除成功"
        })
    }
   })
})

// 获取用户所有评论
router.get('/getPinglunAll', (req, res) => { 
    let sql = `select * from pinglun`
    db.query(sql,function(err,data){
        if(err){
            res.send({
                    msg:"查询失败",
                    code:500
            });
        }else {
            console.log(data)
            res.send({
                list:data,
                msg:"查询成功！",
                code:"200"
            });
        }
    });
  });

  // 删除评论 
  router.get('/delPinglun', (req, res) => {
    let sql = `delete from pinglun where pinglun_id = ${req.query.pinglun_id}`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            res.send({
                code: 500,
                msg: "删除失败"
            })
        } else {
            res.send({
                code: 200,
                msg: "删除成功"
        })
    }
   })
})

// 修改评论
router.get('/updatePinglun', (req,res)=>{
    var sql = `update pinglun set title='${req.query.title}' where pinglun_id='${req.query.pinglun_id}'`;
    console.log(req.query);
    db.query(sql,function(err,data){
        if(err){
            console.log(err,"v")
            res.send("修改失败 " + err);
        }else {
            // res.redirect("/users");
            console.log(data,"a")
            res.send({
               msg:"修改成功",
               code:200
           
            });
        }
    })
})

// 获取用户收藏
  router.get('/getStar', (req, res) => {
    let sql1 = `select * from star`
    db.query(sql1,function(err,data){
        if(err){
            res.send({
                    msg:"获取失败",
                    code:500
            });
        }else {
            res.send({
                list:data,
                msg:"获取成功！",
                code:"200"
            });
        }
    });
  });

   //  删除收藏
   router.get('/delUserStar', (req, res) => {
    let sql = `delete from star where star_id = ${req.query.star_id}`;
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            res.send({
                code: 500,
                msg: "删除失败"
            })
        } else {
            res.send({
                code: 200,
                msg: "删除成功"
        })
    }
})
})

   

  

module.exports = router;
