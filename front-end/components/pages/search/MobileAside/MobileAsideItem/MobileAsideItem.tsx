import style from './mobileAsideItem.module.scss';

interface IProps{
    key:any
}
function MobileAsideItem(props:IProps){
    return(
            <li key={props.key} className={style.asideBtnWrapper}>
            <button className={style.asideBtn}>
                <span className={style.asideBtnTitle}>Cars</span>
                <span className={style.asideBtnAdditionalText}>Усі</span>
            </button>
            </li>
        )

}

export default MobileAsideItem