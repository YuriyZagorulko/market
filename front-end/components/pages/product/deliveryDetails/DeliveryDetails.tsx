import Image from 'next/image'
import style from './deliveryDetails.module.scss'
import { useTranslation } from 'next-i18next'

function DeliveryDetails() {
    const { t : trans } = useTranslation('product')

    return (
        <article className={style.delivery}>
            <div className={style.deliveryWrapper}>
                <div className={style.categoryBlock}>
                    <div className={style.headerWrapper}>
                        <div className={style.headerIcon}>
                            <Image layout='fill' src="/images/icons/delivery-truck-icon.svg" alt="delivery" />
                        </div>
                        <h4 className={style.header}>{trans('deliveryDetails.delivery')}</h4>
                    </div>
                    <div className={style.categoryBody}>
                        <div className={style.bodyItem}>
                            <div className={style.bodyItemDetails}>
                                <strong className={style.bodyItemHeader}>{trans('deliveryDetails.novaPoshta')}</strong>
                                <span className={style.bodyItemDescription}>{trans('deliveryDetails.from1To5Days')}</span>
                            </div>
                            <div className={style.bodyItemPrice}>{trans('deliveryDetails.from')} 39 ₴</div>

                        </div>
                        <div className={style.bodyItem}>
                            <div className={style.bodyItemDetails}>
                                <strong className={style.bodyItemHeader}>{trans('deliveryDetails.byCourierToAddress')}</strong>
                                <span className={style.bodyItemDescription}>{trans("deliveryDetails.novaPoshtaCourier")}</span>
                            </div>
                            <div className={style.bodyItemPrice}>{trans('deliveryDetails.from')} 49 ₴</div>
                        </div>
                        <div className={style.bodyPromotionItem}>
                            <div className={style.bodyPromotionImg}>
                                <Image layout='fill' src="/images/icons/delivery-truck-icon.svg" alt="delivery" />
                            </div>
                            <div className={style.bodyPromotionTextWrapper}>
                                <span className={style.bodyPromotionDescription}>{trans("deliveryDetails.ordersFrom")} 3000₴</span>
                                <strong className={style.bodyPromotionHeader}>{trans("deliveryDetails.freeDelivery" )}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.categoryBlock}>
                    <div className={style.headerWrapper}>
                        <div className={style.headerIcon} >
                            <Image layout='fill' src="/images/icons/credit-card-icon.svg" alt="delivery" />
                        </div>
                        <h4 className={style.header}>{trans('deliveryDetails.payment')}</h4>
                        <div className={style.categoryBody}>
                        </div>
                    </div>
                    <div className={style.categoryBody}>
                        <div className={style.bodyItem}>
                            <div className={style.bodyItemDetails}>
                                <strong className={style.bodyItemHeader}>{trans('deliveryDetails.uponReceipt')}</strong>
                                <span className={style.bodyItemDescription}>{trans('deliveryDetails.novaPoshtaAfterPayment')}</span>
                            </div>
                        </div>
                        <div className={style.bodyItem}>
                            <div className={style.bodyItemDetails}>
                                <strong className={style.bodyItemHeader}>{trans('deliveryDetails.paymentByVisaMasterCard')}</strong>
                                <span className={style.bodyItemDescription}>{trans('deliveryDetails.paymentByAnyCard')}</span>
                            </div>
                        </div>
                        {/* <div className={style.bodyItem}>
                            <div className={style.bodyItemDetails}>
                                <strong className={style.bodyItemHeader}>{trans('deliveryDetails.accordingToDetails')}</strong>
                                <span className={style.bodyItemDescription}>{trans('deliveryDetails.selfServiceTerminalsCards')}</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </article>

    )
}

export default DeliveryDetails