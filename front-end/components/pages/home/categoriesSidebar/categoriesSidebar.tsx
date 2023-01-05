import style from './categoriesSidebar.module.scss'
import React from 'react'
import { Card, Menu, MenuProps } from 'antd'
import { useRouter } from 'next/router'
import { items1, items2, items3, itemsSingleLine } from './categoriesItems'
import { useTranslation } from 'next-i18next'

// const itemsOld: MenuItem[] = [
//   getItem('Масла', 'sub1', <span className={'iconContainer'}><FontAwesomeIcon icon={faOilCan} /></span>, [
//     getItem('Моторные масла', null,
//     <span className='img-comtainer'>
//       <Image
//         src={ '/images/previews/main-menu/motor-oil.png' }
//         alt="Img"
//         layout="fixed"
//         width={'40px'}
//         height={'45px'}
//       />
//     </span>
//     ),
//     getItem('Автомобильные масла', null,
//       <span className='img-comtainer'>
//         <Image
//           src={ '/images/previews/main-menu/wd.jpg' }
//           alt="Img"
//           layout="fixed"
//           width={'40px'}
//           height={'45px'}
//         />
//       </span>
//     ),
//     getItem('Трансмиссионные масла', null,
//       <span className='img-comtainer'>
//         <Image
//           src={ '/images/previews/main-menu/trans-oil.jpg' }
//           alt="Img"
//           layout="fixed"
//           width={'40px'}
//           height={'45px'}
//         />
//       </span>
//     ),
//     getItem('Промывочные масла', null,
//       <span className='img-comtainer'>
//         <Image
//           src={ '/images/previews/main-menu/washing-oil.jpg' }
//           alt="Img"
//           layout="fixed"
//           width={'40px'}
//           height={'45px'}
//         />
//       </span>
//     ),
//     getItem('Промышленные индустриальные масла', null,
//       <span className='img-comtainer'>
//         <Image
//           src={ '/images/previews/main-menu/industrial-oil.jpg' }
//           alt="Img"
//           layout="fixed"
//           width={'40px'}
//           height={'45px'}
//         />
//       </span>
//     ),
//   ]),

//   getItem('Автоэлектроника', 'sub5', <span className={'iconContainer'}><FontAwesomeIcon icon={faCarBattery} /></span>, [
//     getItem('Аккумуляторы', ProductCategories.CarBatteries,
//       <span className='img-comtainer'>
//         <Image
//           src={ '/images/previews/main-menu/battery.jpg' }
//           alt="Img"
//           layout="fixed"
//           width={'40px'}
//           height={'45px'}
//         />
//       </span>
//     ),
//     getItem('Аксессуары для АКБ', '1',
//       <span className='img-comtainer'>
//         <Image
//           src={ '/images/previews/main-menu/battery-acc.jpg' }
//           alt="Img"
//           layout="fixed"
//           width={'40px'}
//           height={'45px'}
//         />
//       </span>
//     ),
//   ]),

//   getItem('Автосвет', 'sub6', <span className={'iconContainer'}><FontAwesomeIcon icon={faLightbulb} /></span>, [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),
//     getItem('Option 11', '11'),
//     getItem('Option 12', '12'),
//   ]),

//   getItem('Инструменты', 'sub7', <span className={'iconContainer'}><FontAwesomeIcon icon={faScrewdriverWrench} /></span>, [
//     getItem('Option 13', '13'),
//   ]),
// ]

const redirectToCategory = (router, category) => {
  if (category) {
    router.push({
        pathname: '/search',
        query: {params: JSON.stringify({ category })}
    })
  }
}
const translateMenuItems = (trans,items)=>{
    return items.map((el)=>({...el,label:trans(el.label)}))
}

function CategoriesSidebar (props: { }) {
  // const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const { t: trans } = useTranslation('home')
  
  const onClick = e => {
    redirectToCategory(router, e.key)
    console.log('click', e)
  }
  // if (mounted) {  // console warning fix
    return (
      <div className={style.container + ' global'}>
        <Card hoverable className={style.card}>
          <div className={style.menuFull}>
            <Menu onClick={onClick} mode="vertical" items={translateMenuItems(trans,itemsSingleLine)} />
          </div>
          <div  className={style.menuSplit}>
            <Menu onClick={onClick} style={{ width: 270 }} mode="vertical" items={translateMenuItems(trans,items1)} />
            <Menu onClick={onClick} style={{ width: 270 }} mode="vertical" items={translateMenuItems(trans,items2)} />
            <Menu onClick={onClick} style={{ width: 270 }} mode="vertical" items={translateMenuItems(trans,items3)} />
          </div>
        </Card>
      </div>
    )
  // } else {
  //   return <></>
  // }
}
export default CategoriesSidebar