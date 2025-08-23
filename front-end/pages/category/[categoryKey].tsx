import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/shared/breadcrumbs/breadcrumbs'
import styles from './category.module.scss'
import Link from 'next/link'
import { categoryService } from '../../services/category.service'
import CustomImg from '../../components/shared/customImg/customImg'
import ProductLine from '../../components/shared/productLine/productLine'
import { getImgUrl } from '../../helpers/shared'

export default function CategoryPage() {
  const router = useRouter()
  const { categoryKey } = router.query
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (categoryKey) {
      categoryService.getCategoryDetail(categoryKey as string)
        .then(setData)
    }
  }, [categoryKey])

  if (!data) return <div>Loading...</div>
  const { category, children, popularProducts } = data

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1>{category.name_UA || category.name}</h1>
        <Breadcrumbs inputCategory={category} />
      </div>
      <div className={styles.categoryBlock}>
        <div className={styles.imageBlock}>
          <CustomImg img={getImgUrl(category.image)} alt={category.name} />
        </div>
        <div className={styles.childrenBlock}>
          <h2>Підкатегорії</h2>
          <div className={styles.childrenList}>
            {children.map((child: any) => (
              <Link key={child.id} href={`/category/${child.keyWord}`}>
                <div className={styles.childItem}>
                  <CustomImg img={getImgUrl(child.image)} alt={child.name} />
                  <span>{child.name_UA || child.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.popularProducts}>
        <ProductLine products={popularProducts} title="Популярні товари" />
      </div>
    </div>
  )
}