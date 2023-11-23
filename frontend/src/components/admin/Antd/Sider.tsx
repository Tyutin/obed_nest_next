'use client';
import { Layout, SiderProps } from 'antd';
const { Sider } = Layout;

export default function AntdSider(props: SiderProps) {
  return <Sider {...props}>{props.children}</Sider>;
}
