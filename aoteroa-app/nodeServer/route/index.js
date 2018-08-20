const express = require('express');
const mysql = require('mysql');
//const common = require('../libs/common');
const db = mysql.createPool({ //连接池(最小，最大)
    host: 'localhost',    //机器IP
    user: 'root',
    password: 'root',
    database: 'dockyard'       //数据库实例，将脚本导入实例
});
module.exports = () => {
    const route = express.Router();    //路由
    
    route.post('/api/login', (req, res) => {
        
        let username = req.body.username;
        let password = req.body.password;
        //let password = common.md5(mObj.loginPawd + common.MD5_SUFFXIE);
        // console.log(username, mObj.passwd);
        const selectUser = `SELECT * FROM t_user where username='${username}' and password='${password}'`;
        db.query(selectUser, (err, data) => {   //数据库查询
            console.log(data);
            if (err) {
                console.log(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                if (data.length == 0) {
                    res.send({ 'msg': '该用户不存在', 'status': -1 }).end();
                } else {
                    let dataw = data[0];
                    //console.log(dataw,dataw.password,req.body.password);
                    //login sucess
                    if (dataw.password === req.body.password) {
                        //console.log("ok");
                        //save the session 
                        req.session['user_id'] = dataw.id;     //存入服务端session]
                        dataw.result = "success";
                        dataw.password = null;
                        res.send(dataw).end();
                    } else {
                        res.send({ 'msg': '密码不正确', 'status': -2 }).end();
                    }
                }
            }
        });

    });
    route.get('/api/tasks', (req, res) => {
        const getTasks = `SELECT * FROM t_task `;
        db.query(getTasks, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    //console.log(data)
                    res.send(data).end();
                }
            }
        });
    });
    route.post('/api/task/add', (req, res) => {
        
        let text = req.body.text;
        //let password = common.md5(mObj.loginPawd + common.MD5_SUFFXIE);
        // console.log(username, mObj.passwd);
        const insertTask = `INSERT INTO t_task(text) VALUES('${text}')`;
        db.query(insertTask, (err, data) => {
            if (err) {
                console.log(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                res.send({ 'msg': '操作成功', 'status': 1 }).end();
            }
        });

    });
    route.post('/api/task/del', (req, res) => {
        
        let id = req.body.id;
        //let password = common.md5(mObj.loginPawd + common.MD5_SUFFXIE);
        // console.log(username, mObj.passwd);
        const delTask = `DELETE from t_task where id=${id}`;
        db.query(delTask, (err, data) => {
            if (err) {
                console.log(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                res.send({ 'msg': '操作成功', 'status': 1 }).end();
            }
        });

    });
    route.post('/api/task/upd', (req, res) => {
        
        let id = req.body.id;
        let completed = req.body.completed ? 'N' : 'Y';
        //let password = common.md5(mObj.loginPawd + common.MD5_SUFFXIE);
        // console.log(username, mObj.passwd);
        const updateTask = `update t_task set completed='${completed}' where id=${id}`;
        db.query(updateTask, (err, data) => {
            if (err) {
                console.log(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                res.send({ 'msg': '操作成功', 'status': 1 }).end();
            }
        });

    });
    return route;
}
