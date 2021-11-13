import React from 'react';
import styles from './App.module.scss';
import {encode, decode, copyToClipboard} from "./utils/helper";
import {createMessage} from "./components/Message";

const message = (msg: string) => createMessage()(msg)

// copyFunc
const copyFunc = (data = '') => {
  if (!data) return message('啥都没有复制个啥❓')
  copyToClipboard(data)
  message('复制成功啦✅')
}

function App() {
  const [text, setText] = React.useState('')
  const [key, setKey] = React.useState('')
  const [resMsg, setResMsg] = React.useState('')
  const [keyType, setKeyType] = React.useState('password')
  // textChange
  const textChange = React.useCallback(e => {
    setText(e.target.value)
  }, [setText])
  // keyChange
  const keyChange = React.useCallback(e => {
    setKey(e.target.value)
  }, [setKey])
  // btnClick
  const btnClick = React.useCallback(isEncode => {
    if (!text) return message('原文为空哦')
    if (!key) return message('key为空哦')
    const func = isEncode ? encode : decode
    const res = func(text, key)
    setResMsg(res)
    if (!res) return message('好像不对❌，是不是加密/解密点错了')
    if (res) {
      isEncode && copyFunc(res)
      // 为了安全，解码不自动复制到剪切板
      !isEncode && message('解码成功✅;如有需要，请点击[复制]按钮手动复制')
    }
  }, [text, key, setResMsg])
  // onEyeClick
  const onEyeClick = React.useCallback(() => {
    setKeyType(keyType === 'password' ? 'text' : 'password')
  }, [setKeyType, keyType])
  return (
    <div className={styles.App}>
      <div className={styles.title}>对称加密</div>
      <textarea rows={8} className={styles.textarea} autoFocus placeholder="原文" value={text} onChange={textChange}/>
      <div className={styles.keyRow}>
        <input className={styles.key} type={keyType} value={key} placeholder="key" onChange={keyChange}/>
        <div className={styles.eye} onClick={onEyeClick}>{keyType === 'password' ? '👁' : '🙈'}</div>
      </div>
      <div className={styles.btns}>
        <button className={styles.encode} onClick={btnClick.bind('', true)}>加密🔒 & 复制📋</button>
        <button className={styles.encode} onClick={btnClick.bind('', false)}>解密🔐</button>
      </div>
      {
        resMsg && <>
          <div className={styles.resTitle}>转换结果：<button className={styles.commonBtn} onClick={copyFunc.bind('', resMsg)}>复制</button></div>
          <div className={styles.res}>{resMsg}</div>
        </>
      }
    </div>
  );
}

export default App;
