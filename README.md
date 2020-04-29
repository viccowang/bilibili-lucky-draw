# bilibili ViccoVlog 本地抽奖
---
#### Desgined by Vicco Vlog
#### bilibli: @ViccoVlog / Youtube: @viccowang
---
```
目前该项目仍然无法突破bilibili API接口限制,只能拉取最后500多个用户信息,再早的用户则无法获取到了
如果用本项目做抽奖请注意有该限制!
```

## 项目安装
```
npm install
```

### 首先启动服务端
这是基于nodejs的服务端,一个类似反向代理的可以拉取bilibiliAPI的内容,用于防止出现跨域问题
```
npm run bServer
```
### 接着启动客户端
这是基于Vuejs 2.x版本的一个客户端网页.
```
npm run serve
```

### 打包
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
