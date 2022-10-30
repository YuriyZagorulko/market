import { Spin } from 'antd';
import style from '../Loader/loader.module.scss'
import { store } from '../../../redux/store'
import { IControlsState } from '../../../redux/reducers/controls.reducer';


export function Loader() {
    const state = store.getState()
    const controls: IControlsState = state.controls
    return (controls.isLoaderShown ?<div className={style.wrapper}>  <Spin className={style.loader}></Spin></div> : <></>)
}