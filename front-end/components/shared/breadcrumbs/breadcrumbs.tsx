import React, { ReactNode } from 'react'
import styles from "./breadcrumbs.module.scss"
import { IProductCategory } from '../../../helpers/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { redirectToCategory } from '../../../helpers/other'
import { useRouter } from 'next/router'
import Link from 'next/link'

type IProps = {
  inputCategory: IProductCategory
}

function Breadcrumbs (props: IProps) {
  const router = useRouter()

  const renderBreadcrumbs = (currentCategory: IProductCategory, breadcrumbs: IProductCategory[] = []) => {
    if (currentCategory.parentCategoryData) {
      const updatedBreadcrumbs = [currentCategory, ...breadcrumbs];
      return renderBreadcrumbs(currentCategory.parentCategoryData, updatedBreadcrumbs);
    }

    return [currentCategory, ...breadcrumbs, ];
  };

  const breadcrumbs = renderBreadcrumbs(props.inputCategory);
  return (
    <div className={styles.container}>
      <div className="breadcrumb">
        <Link href="/"><FontAwesomeIcon icon={faHome as IconProp} /></Link>
          {breadcrumbs.length > 0 && <span style={{margin: '0 5px'}}> / </span>}
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <a onClick={redirectToCategory(item, router)}>{item.name_UA}</a>
            {index < breadcrumbs.length - 1 && <span style={{margin: '0 5px'}}> / </span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
export default Breadcrumbs