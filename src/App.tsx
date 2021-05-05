import React from 'react';
import styles from './App.module.scss';
import {encode, decode, copyToClipboard} from "./utils/helper";
import {createMessage} from "./components/Message";
// copyFunc
const copyFunc = (data = '') => {
  if (!data) return message('啥都没有复制个啥❓')
  copyToClipboard(data)
  message('复制成功啦✅')
}

const message = (msg: string) => createMessage()(msg)
function App() {
  const [text, setText] = React.useState('')
  const [key, setKey] = React.useState('')
  const [resMsg, setResMsg] = React.useState('')
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
    copyFunc(res)
  }, [text, key, setResMsg])
  //

  return (
    <div className={styles.App}>
      <textarea autoFocus placeholder="原文" value={text} onChange={textChange}/>
      <input value={key} placeholder="key" onChange={keyChange}/>
      <button onClick={btnClick.bind('', true)}>加密🔒 & 复制📋</button>
      <button onClick={btnClick.bind('', false)}>解密🔐 & 复制📋</button>
      <div>转换结果：</div>
      <button onClick={copyFunc.bind('', resMsg)}>复制</button>
      <div className={styles.res}>{resMsg}</div>
    </div>
  );
}

export default App;
