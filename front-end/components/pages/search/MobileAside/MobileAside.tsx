import { IProduct } from '../../../../helpers/types/responces/products';
import { productService } from '../../../../services/cabinet.service';
import style from './mobileAside.module.scss';
import MobileAsideItem from './MobileAsideItem/MobileAsideItem';

interface IProps {
    isActive: boolean
    products: IProduct[]
    onCloseClick: () => void

}

function MobileAside(props: IProps) {
    const { isActive, onCloseClick } = props
    return (
        <aside className={style.aside}>
            <div className={isActive ? style.sidenavWrapper : style.disabled}>
                <div onClick={onCloseClick} className={style.sidenavHeader}><button className={style.closebtn}>
                    Фільтри </button></div>
                <ul className={style.sideNavList}> {props.products?.map((el) => <MobileAsideItem key={el.title} />)}</ul>
                <div className={style.sidenavFooter}>
                    <button onClick={onCloseClick} className={style.sidenavFooterClose}>Назад</button>
                </div>
            </div>
        </aside>
    )
}

export default MobileAside