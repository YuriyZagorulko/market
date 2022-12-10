import { useState } from 'react'
import CategoryCheckbox from '../CategoryCheckbox/CategoryCheckbox'
import style from './asideCollapse.module.scss'



interface IProps{
    header:string
    categoriesQuantity: number
    categories:any[]

}

function AsideCollapse(props:IProps){
    const [isCollapseActive,setIsCollapseActive] = useState<boolean>(true)
    const handleCollapseClick = ()=>{
        setIsCollapseActive(!isCollapseActive)
    }
    return(
        <div className={style.collapseWrapper}>
            <button onClick={handleCollapseClick} className={style.collapseButton}>
                <span className={style.collapseHeader}>{props.header}
                <span className={style.collapseQuantity}>{props.categoriesQuantity}</span>
                <img className={isCollapseActive ? style.collapseChevronActive : style.collapseChevron} src='/images/icons/downArrow.svg' alt="arrow" />
                </span>
            </button>
            <div className={isCollapseActive ? style.collapseBody : style.displayNone}>
                {props.categories.map((el)=><CategoryCheckbox categoryName={el} key={el}/>)}

            </div>
            
        </div>
    )

}

export default AsideCollapse