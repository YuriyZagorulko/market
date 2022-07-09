import React, { useEffect, useState } from 'react'
import styles from "./customBtn.module.scss"
import { Button } from 'antd'


function CustomBtn (props: any) {
  const [isDisabledButton, setDisabledState] = useState(false)
  const disabledTime = 4000

  useEffect(() => {
    const disabledId = setTimeout(() => {
      setDisabledState(false)
    }, disabledTime)
    return () => {
      if (disabledId) {
        clearTimeout(disabledId)
      }
    }
  }, [isDisabledButton])
  const clickHandler = (e) => {
    if (props.onClick && !isDisabledButton) {
      props.onClick(e)
    }
    setDisabledState(true)
  }
  return (
    <Button disabled={isDisabledButton} {...props} onClick={clickHandler}>
      {props.children}
    </Button>
  )
}
export default CustomBtn