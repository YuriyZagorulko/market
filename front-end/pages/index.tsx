import React from 'react'
import styles from '../styles/pages/Home.module.scss'

interface IProps {
  login: any
  dispatch: any
}
interface IState {
  products: [],
}
export default class Home extends React.Component<IProps, IState> {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    console.log('didmount')
  }
  render () {
    return (
    <div className={styles.container}>
      index content
    </div>
  )
  }
}
