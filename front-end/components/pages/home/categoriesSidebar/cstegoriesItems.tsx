import { MenuProps } from "antd"
import Image from "next/image"
import { ProductCategories } from "../../../../helpers/constants/search"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCarBattery, faLightbulb, faOilCan, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons"
import { CATEGORIES } from "../../../../helpers/constants/categories"

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[] | any,
  type?: 'group',
  itemStyle = {height: '45px'}
): any {
  return {
    key,
    icon,
    children,
    label,
    type,
    style: itemStyle
  }
}

function sliceIntoChunks(arr, chunkSize) { // split menu array into chunks (smaller arrays) with specified size (second argument)
    const res = []
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize)
        res.push(chunk)
    }
    return res
}

// export const itemsBattery = [
//     getItem('Аккумуляторы', ProductCategories.CarBatteries,
//         <span className='img-comtainer'>
//             <Image
//             src={ '/images/previews/main-menu/battery.jpg' }
//             alt="Img"
//             layout="fixed"
//             width={'40px'}
//             height={'45px'}
//             />
//         </span>
//     ),
//     getItem('Пусковой кабель', ProductCategories.StartCable,
//         <span className='img-comtainer'>
//             <Image
//             src={ '/images/previews/main-menu/battery-acc.jpg' }
//             alt="Img"
//             layout="fixed"
//             width={'40px'}
//             height={'45px'}
//             />
//         </span>
//     ),
//     getItem('Пускозарядные устройства', ProductCategories.StarterChargers,
//         <span className='img-comtainer'>
//             <Image
//             src={ '/images/previews/main-menu/battery-charge.jpg' }
//             alt="Img"
//             layout="fixed"
//             width={'40px'}
//             height={'45px'}
//             />
//         </span>
//     ),
//     getItem('Смазка для контактов', ProductCategories.ContactGrease,
//         <span className='img-comtainer'>
//             <Image
//             src={ '/images/previews/main-menu/electro-lubricant.jpg' }
//             alt="Img"
//             layout="fixed"
//             width={'40px'}
//             height={'45px'}
//             />
//         </span>
//     ),
//     getItem('Дистиллированная вода', ProductCategories.DistilledWater,
//         <span className='img-comtainer'>
//             <Image
//             src={ '/images/previews/main-menu/voda-distillirovannaya.jpg' }
//             alt="Img"
//             layout="fixed"
//             width={'40px'}
//             height={'45px'}
//             />
//         </span>
//     ),
//     getItem('Клеммы аккумулятора', ProductCategories.BatteryTerminals,
//         <span className='img-comtainer'>
//             <Image
//             src={ '/images/previews/main-menu/klemmi.jpg' }
//             alt="Img"
//             layout="fixed"
//             width={'40px'}
//             height={'45px'}
//             />
//         </span>
//     ),
//     getItem('Тестеры для АКБ', ProductCategories.BatteryTesters,
//         <span className='img-comtainer'>
//             <Image
//             src={ '/images/previews/main-menu/nagruzochnye-vilki.jpg' }
//             alt="Img"
//             layout="fixed"
//             width={'40px'}
//             height={'45px'}
//             />
//         </span>
//     )
// ]

const itemsOils: MenuItem[] = [
    getItem('Моторні мастила', CATEGORIES.MotorOils,
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
    getItem('Автомобільні мастила', CATEGORIES.AutomotiveOils,
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
    getItem('Трансмісійні мастила', CATEGORIES.TransmissionOils,
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
    getItem('Промивні мастила', CATEGORIES.FlushingOils,
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
    getItem('Індустріальні мастила', CATEGORIES.IndustrialOils,
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
    getItem('Ланцюгові мастила', CATEGORIES.ChainOils,
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/chain-oil.webp' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Рідини для склоомивача', CATEGORIES.WindshieldWasherFluids,
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/windshield-washer-fluids.jpeg' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Гальмівні рідини', CATEGORIES.BrakeFluids,
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/brake-fluids.webp' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Охолоджувальні рідини', CATEGORIES.Coolants,
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/coolants.webp' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
    getItem('Фарби', CATEGORIES.CarPaints,
      <span className='img-comtainer'>
        <Image
          src={ '/images/previews/main-menu/car-paints.webp' }
          alt="Img"
          layout="fixed"
          width={'40px'}
          height={'45px'}
        />
      </span>
    ),
]

export { itemsOils };