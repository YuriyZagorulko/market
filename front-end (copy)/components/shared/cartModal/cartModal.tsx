import React from 'react'
import styles from "./cartModal.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { IProduct, getFirstImg } from '../../../helpers/types/responces/products'
import Modal from 'antd/lib/modal/Modal'
import { connect } from 'react-redux'
import { store } from '../../../redux/store'
import { IControls } from '../../../redux/reducers/controls.reducer'
import { controlsConstants } from '../../../helpers/constants/controls'

type IProps = {
  dispatch: any
}
type cartModalState = {
  isVisible: boolean
}
class CartModal extends React.Component<IProps, cartModalState> {
    constructor(props){
      super(props)
      this.state = {
        isVisible: false
      }
      store.subscribe(() => {
        const controls: IControls = store.getState().controls
        if (controls){
          this.setState({
            isVisible: controls.isCartOpened
          })
        }
      })
    }
    handleOk = () => {
      this.props.dispatch({type: controlsConstants.CLOSE_CART})
      // this.setState({isVisible: false})
    }
    handleCancel = () => {
      this.props.dispatch({type: controlsConstants.CLOSE_CART})
    }
    render() {
      return (
      <div className={styles.container}>
        <Modal title="Корзина" visible={this.state.isVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>)
    }
  }

const connectedCartModal = connect(state => state)(CartModal)
export default connectedCartModal