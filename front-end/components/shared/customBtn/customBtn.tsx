import React, { useEffect, useState } from 'react'
import styles from "./customBtn.module.scss"
import { Button } from 'antd'


function CustomBtn (props: any) {
  const [isDisabledButton, setDisabledState] = useState(false)
  const [disabledId, setDisabledId] = useState(null)
  const disabledTime = 4000

  useEffect(() => {
    return () => {
      if (disabledId) {
        clearTimeout(disabledId)
      }
    }
  }, [])
  const clickHandler = (e) => {
    if (props.onClick && !isDisabledButton) {
      props.onClick(e)
    }
    setDisabledState(true)
    setDisabledId(setTimeout(() => {
      setDisabledState(false)
    }, disabledTime))
  }
  return (
    <Button disabled={isDisabledButton} {...props} onClick={clickHandler}>
      Войти
    </Button>
  )
}
export default CustomBtn