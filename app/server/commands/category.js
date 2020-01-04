const admin = require('./../firebase-admin-init')
const categories = require('./category-data.js')

const db = admin.firestore()

const categoriesRef = db.collection('categories')
const subCategoriesRef = db.collection('subCategories')

let asort = 1
let bsort = 1

categories.forEach((category, i) => {
  const categoryRef = categoriesRef.doc(category.id)

  categoryRef.set({
    id: category.id,
    title: category.title,
    sort: i,
    subCategories: category.subCategories
  })

  category.subCategories.forEach(subCategory => {
    const subCategoryRef = db
      .collection(`categories/${category.id}/subCategories`)
      .doc(subCategory.id)

    subCategoryRef.set({
      id: subCategory.id,
      title: subCategory.title,
      description: subCategory.description,
      slug: subCategory.slug,
      sort: asort++
      // category: categoryRef,
      // category_id: categoryRef.id
    })
  })

  category.subCategories.forEach(subCategory => {
    const subCategoryRef = subCategoriesRef.doc(subCategory.slug)
    subCategoryRef.set({
      id: subCategory.id,
      title: subCategory.title,
      description: subCategory.description,
      slug: subCategory.slug,
      // category: categoryRef,
      category_id: categoryRef.id,
      sort: bsort++
    })
  })
})
