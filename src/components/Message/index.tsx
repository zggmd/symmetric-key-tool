import React from 'react'
import ReactDom from 'react-dom'
import styles from './index.module.scss'

let wrap: HTMLElement
export const createMessage = () => (content: React.ReactNode) => {
  if (typeof document === "undefined") {
    return;
  }
  if (!wrap) {
    //如果有的话，说明已经调用过这个函数了，这个空div就可以一直复用
    wrap = document.createElement("div");
    document.body && document.body.appendChild(wrap); //挂body上
  }
  const divs = document.createElement('div');
  wrap.appendChild(divs);
  ReactDom.render(<Message rootDom={wrap} parentDom={divs} content={content} />, divs)
}

export type MessageProps = {
  rootDom: HTMLElement; //这个用来干掉parentDom 这个可以常驻
  parentDom: Element | DocumentFragment; //这个是挂载点 要unmount卸载 完毕后卸载挂载点 注意！一共2步卸载，别漏了
  content: React.ReactNode;
};

export function Message(props: MessageProps) {
  const { rootDom, parentDom, content } = props;

  const unmount = React.useMemo(() => () => {
    if (parentDom && rootDom) {
      rootDom.removeChild(parentDom);
    }
  }, [parentDom, rootDom]);

  React.useEffect(() => {
    setTimeout(() => {
      unmount();
    }, 2000);
  }, [unmount]);
  return <div className={styles.Message}>
    <div className={styles.msg}>
      {content}
    </div>
  </div>;
}