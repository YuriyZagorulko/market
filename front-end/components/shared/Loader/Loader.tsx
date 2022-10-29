import { Spin } from 'antd';
import style from '../Loader/loader.module.scss'
export function Loader() {
    return <Spin className={style.loader}></Spin>
}