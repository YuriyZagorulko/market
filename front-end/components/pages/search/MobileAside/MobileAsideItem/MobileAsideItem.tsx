import React from 'react';
import style from './mobileAsideItem.module.scss';


function MobileAsideItem(){
    return(
            <li className={style.asideBtnWrapper}>
                <button className={style.asideBtn}>
                    <span className={style.asideBtnTitle}>Cars</span>
                    <span className={style.asideBtnAdditionalText}>Усі</span>
                </button>
            </li>
        )

}

export default React.memo(MobileAsideItem)