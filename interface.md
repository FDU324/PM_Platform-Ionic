### 账号
- 登录 post请求 
  - /login 
  - 参数：username、password
  - 返回：
    - 失败： 'fail'
    - 成功： json 
    
```json 
        {
            username: ,
            email: ,
            nickname: ,
            userImage: ,
        }
```
**Socket**
- 登录后前端会依次emit下列几个socket event
```js
首先会建立socket连接

1. 前端发送，确认连接
socket.emit('confirmConnect', '', () => {});

后端处理
socket.on('confirmConnect', (data, func) => {
    func({
        success: true,
        data: 'success'
    });
});

2. 前端发送，登录
socket.emit('login', username, () => {});

后端处理

socket.on('login', (username, func) => {
    
    // 处理离线信息等，最后调用func回调

    func({
        success: true,
        data: 'success'
    });
});

```



- 注册 post请求  
  - /reg
  - 参数：username、email、password、nickname、userImage
  - 返回：
    - 成功: 'success'
    - 失败: 'fail'
 
### 游戏列表页面
- 获取游戏列表
  - 参数：无
  - 返回：json

```json 
        [
            {
                id: ,
                name: ,
                icon: ,
                image: ,
                description: ,
                category: ,
                downloadLink: ,
                packageName: ,
                uri: ,
            },
             ...
        ]
```

### 好友聊天
**Socket**
```js
1.前端发送消息
const sendData = {
    from: user.username,
    to: friend.username,
    message: message
};

socket.emit('sendMessage', JSON.stringify(sendData), () => {});

后端处理转发
socket.on('sendMessage', (data, func) => {
    // 处理
    // TODO:离线处理
    
    
    if (处理成功) {
        socket.emit('receiveMessage', data);
        
        func({
            success: true,
            data: 'success'
        });
        
    } else {
        socket.emit('refuseMessage', data);
        
        func({
            success: false,
            data: 'refuse'
        });
   
    }

});


2. 添加好友
前端
const sendData = {
    myUsername: myUsername,
    friendUsername: friendUsername
};

socket.emit('friendReq', JSON.stringify(sendData), () => {});

后端处理
socket.on('friendReq', (data, func) => {
    // 处理

    const user = {
        username: ,
        email: ,
        nickname: ,
        userImage: ,     
    };
    socket.emit('receiveFriendReq', JSON.stringify(user)); 
    
    func({
        success: true,
        data: 'success'
    });
});

3. 接受好友请求
const sendData = {
    myUsername: myUsername,
    friendUsername: friendUsername
};

socket.emit('acceptFriendReq', JSON.stringify(sendData), () => {});

后端
socket.on('acceptFriendReq', (data, func) => {
    // 处理

    const user = {
        username: ,
        email: ,
        nickname: ,
        userImage: ,     
    };
    socket.emit('friendReqAssent', JSON.stringify(user)); 
    
    func({
        success: true,
        data: 'success'
    });
});


```



### 动态
- 获取当前用户所有可见动态， get请求
  - /getMoments?username=
  - 返回值: 待定



### 商城
- 获取某个游戏的商品列表
  - 参数：无
  - 返回：json
  
```json 
        [
            {
                id: ,
                name: ,
                price: ,
                virtualCurrency: ,
                storeNum: ,
            },
             ...
        ]
```
  
- 购买商品
  - 参数：id、price、virtualCurrency
  - 返回：storeNum


