# symmetric-key-tool
对称加密在线工具

纯前端页面，无需后端

一个线上Demo: [对称加密小工具](https://encode.zggmd.com/)

Demo可以直接使用，但建议自己build后部署服务，更放心


项目基于[create-react-app](https://create-react-app.dev/)搭建, 模板为[cra-template-pwa-typescript](https://www.npmjs.com/package/cra-template-pwa-typescript)

# 本地开发
1. clone本项目
2. npm i 或者 yarn
3. npm run start 或者 yarn start
4. 打开 http://localhost:3000/

# 构建
1. npm run build 或者 yarn build
2. 产物在根目录/build 下

# 工作原理
基于 [crypto-js](https://github.com/brix/crypto-js)，选择了其中的AES加密算法

[主要代码](https://github.com/zggmd/symmetric-key-tool/blob/main/src/utils/helper.ts#L4)如下：
```typescript
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
// 加密
export const encode = (msg: string, key: string): string => AES.encrypt(msg, key).toString();
// 解密
export const decode = (ciphertext: string, key: string): string => AES.decrypt(ciphertext, key).toString(encUtf8)
```

#  License
 [MIT License](https://github.com/zggmd/symmetric-key-tool/blob/main/LICENSE)
 
