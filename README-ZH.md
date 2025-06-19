# symmetric-key-tool
对称加密在线工具

纯前端页面，无需后端

一个线上Demo: [对称加密小工具](https://encode.zggmd.com/)

网页已支持PWA，可添加快捷方式到桌面，能离线运行

Demo可以直接使用，但建议自己build后部署服务，更放心


项目基于[create-react-app](https://create-react-app.dev/)搭建，模板为[cra-template-pwa-typescript](https://www.npmjs.com/package/cra-template-pwa-typescript)，网页主题配色 模仿的是 github Dark dimmed 主题

# 本地开发
1. clone本项目
2. npm i 或者 yarn
3. npm run start 或者 yarn start
4. 打开 http://localhost:3000/

# 构建
1. npm run build 或者 yarn build
2. 产物在根目录/build 下

# 使用方法
1. 提供明文和密钥，点击*加密按钮*，获得加密后的密文，并自动复制到剪切板
2. 提供密文和密钥，点击*解密按钮*，获得原始明文，基于安全考虑，**不会** ~~自动复制到剪切板~~，防止其他软件读取读取剪切板获得敏感的明文
3. 获得原始明文后，如需复制到剪切板，请点击下方的**复制按钮**

# 项目理念
1. 您应当自己保存加密后的密文和密钥，本项目不提供（也不应该提供）任何存储功能
2. 因为使用的算法都是公开的（原理见下文），加密后的密文仍然有被暴力破解的可能性，因此密文可以最好不要存放在公开的地方
3. 密钥的保存应该记在大脑中，而不是记在某个地方
4. 如果有条件，请务必部署和使用**自己的服务**，加密解密这种触及敏感信息的工具，请相信自己，而不是相信陌生人提供的工具

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
 
