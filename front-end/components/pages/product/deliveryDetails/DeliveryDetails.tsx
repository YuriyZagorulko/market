import Image from 'next/image'
import style from './deliveryDetails.module.scss'

function DeliveryDetails() {
    return (
        <article className={style.delivery}>
            <div className={style.deliveryWrapper}>
                <div className={style.categoryBlock}>
                    <div className={style.headerWrapper}>
                        <div className={style.headerIcon}>
                            <Image layout='fill' src="/images/icons/delivery-truck-icon.svg" alt="delivery" />
                        </div>
                        <h4 className={style.header}>Доставка</h4>
                    </div>
                    <div className={style.categoryBody}>
                        <div className={style.bodyItem}>
                            <div className={style.bodyItemDetails}>
                                <strong className={style.bodyItemHeader}>Нова Пошта</strong>
                                <span className={style.bodyItemDescription}>Від 1 до 5 днів</span>
                            </div>
                            <div className={style.bodyItemPrice}>від 39 ₴</div>

                        </div>
                        <div className={style.bodyItem}>
                            <div className={style.bodyItemDetails}>
                                <strong className={style.bodyItemHeader}>Кур'єром за адресою </strong>
                                <span className={style.bodyItemDescription}>Кур'єром Нова Пошта</span>
                            </div>
                            <div className={style.bodyItemPrice}>від 49 ₴</div>
                        </div>
                        <div className={style.bodyPromotionItem}>
                            <div className={style.bodyPromotionImg}>
                                <Image layout='fill' src="/images/icons/delivery-truck-icon.svg" alt="delivery" />
                            </div>
                            <div className={style.bodyPromotionTextWrapper}>
                                <span className={style.bodyPromotionDescription}>Закази від 3000грн</span>
                                <strong className={style.bodyPromotionHeader}>Доставка безкоштовно</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.categoryBlock}>
                    <div className={style.headerWrapper}>
                        <div className={style.headerIcon} >
                            <Image layout='fill' src="/images/icons/credit-card-icon.svg" alt="delivery" />
                        </div>
                        <h4 className={style.header}>Оплата</h4>
                        <div className={style.categoryBody}>
                        </div>
                    </div>
                    <div className={style.categoryBody}>
                        <div className={style.bodyItem}>
                            <div className={style.bodyItemDetails}>
                                <strong className={style.bodyItemHeader}>При отриманні</strong>
                                <span className={style.bodyItemDescription}>Нова Пошта. Післяплата</span>
                            </div>
                        </div>
                        <div className={style.bodyItem}>
                            <div className={style.bodyItemDetails}>
                                <strong className={style.bodyItemHeader}>Картою Visa, MasterCard</strong>
                                <span className={style.bodyItemDescription}>Оплата карткою будь-якого банку </span>
                            </div>
                        </div>
                        <div className={style.bodyItem}>
                            <div className={style.bodyItemDetails}>
                                <strong className={style.bodyItemHeader}>За реквізитами</strong>
                                <span className={style.bodyItemDescription}>Для терміналів самообслуговування та карт</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>

    )
}

export default DeliveryDetails