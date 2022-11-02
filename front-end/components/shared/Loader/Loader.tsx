import { Spin } from 'antd';
import style from '../Loader/loader.module.scss'

export default function Loader() {
    return <div className={style.wrapper}><Spin className={style.loader}></Spin></div>
}

