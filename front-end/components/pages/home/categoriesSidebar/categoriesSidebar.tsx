import style from './categoriesSidebar.module.scss'
import React, { useState, useEffect } from 'react'
import { Card, Menu, MenuProps } from 'antd'
import { connect } from 'react-redux'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOilCan, faCarBattery, faLightbulb, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[] | any,
  type?: 'group',
  itemStyle = {height: '45px'}
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    style: itemStyle
  }
}
const itemsOld: MenuItem[] = [
  getItem('Масла', 'sub1', <span className={'iconContainer'}><FontAwesomeIcon icon={faOilCan} /></span>, [
    getItem('Моторные масла', null,
    <span className='img-comtainer'>
      <Image
        src={ '/images/previews/main-menu/motor-oil.png' }
        alt="Img"
        layout="fixed"
        width={'40px'}
        height={'45px'}
      />
    </span>
    ),
    getItem('Автомобильные масла', null,
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/wd.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Трансмиссионные масла', null,
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/trans-oil.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Промывочные масла', null,
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/washing-oil.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Промышленные индустриальные масла', null,
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/industrial-oil.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
  ]),

  getItem('Автоэлектроника', 'sub5', <span className={'iconContainer'}><FontAwesomeIcon icon={faCarBattery} /></span>, [
    getItem('Аккумуляторы', '1',
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/battery.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Аксессуары для АКБ', '2',
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/battery-acc.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
  ]),

  getItem('Автосвет', 'sub6', <span className={'iconContainer'}><FontAwesomeIcon icon={faLightbulb} /></span>, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem('Инструменты', 'sub7', <span className={'iconContainer'}><FontAwesomeIcon icon={faScrewdriverWrench} /></span>, [
    getItem('Option 13', '13'),
  ]),
]
const items = [
  getItem('Аккумуляторы', '1',
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/battery.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Пусковой кабель', '2',
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/battery-acc.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Пускозарядные устройства', '3',
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/battery-charge.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Смазка для контактов', '4',
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/electro-lubricant.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Дистиллированная вода', '5',
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/voda-distillirovannaya.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Клеммы аккумулятора', '6',
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/klemmi.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Тестеры для АКБ', '7',
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/nagruzochnye-vilki.jpg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    )
]
function CategoriesSidebar (props: { }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const onClick = e => {
    console.log('click', e)
  }

  if (mounted) {  // console warning fix
    return (
      <div className={style.container + ' global'}>
        <Card hoverable className={style.card}>
          <Menu onClick={onClick} style={{ width: 256 }} mode="vertical" items={items} />
        </Card>
      </div>
    )
  } else {
    return <></>
  }
}
export default CategoriesSidebar