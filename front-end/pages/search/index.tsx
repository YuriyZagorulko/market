import style from './search.module.scss'
import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { searchService } from '../../../services/search.service'


function SearchPage () {
  const dispatch = useDispatch()
  const [{isDisabledButton}, setSate] = useState({
    isDisabledButton: false
  })

  return (
    <div className={''}>
        dfdf
    </div>
  )
}
const connectedSearchPage = connect(state => state)(SearchPage)
export  default connectedSearchPage