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

- 注册 post请求  
  - /reg
  - 参数：username、email、password、nickname、userImage
  - 返回：
    - 成功: 'success'
    - 失败: 'fail'
 
### 游戏列表页面
- 获取游戏列表
  - 参数：无
  - 返回：游戏列表，包含id、name、icon、image、description、category、downloadLink、packageName

### 好友聊天



### 动态
- 获取当前用户所有可见动态， get请求
  - /getMoments?username=
  - 返回值: 待定



### 商城
- 获取某个游戏的商品列表
  - 参数：无
  - 返回：商品列表，包含id、name、price、virtualCurrency、storeNum
- 购买商品
  - 参数：id、price、virtualCurrency
  - 返回：storeNum


