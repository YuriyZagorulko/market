import React from 'react'
import styles from "./productListItem.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { IOrder } from '../../../helpers/types/orders'
import { connect } from 'react-redux'
import { Collapse, Select } from 'antd'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'

type OrderProps = {
  order: IOrder;
}
type productItemState = {
  isImageError: boolean
}

function OrderLine (props: OrderProps){
  return (
    <div>
      <Collapse
          defaultActiveKey={['1']}
          expandIconPosition={'right'}
        >
          <CollapsePanel header="This is panel header 1" key="1">
            <div>collapse text</div>
          </CollapsePanel>
        </Collapse>
    </div>
  )
}
export default OrderLine