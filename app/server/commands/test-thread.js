const admin = require('./../firebase-admin-init')

const db = admin.firestore()

const subCategoriesRef = db.collection('subCategories')

// const getCategory = async subCategory => {
//   const categoryDocRef = await subCategory.category
//   const categoryDoc = await categoryDocRef.get()
//   return categoryDoc.data()
// }

const getSubCategory = async () => {
  const subCategorySnapshot = await subCategoriesRef.get()
  const subCategories = subCategorySnapshot.docs.map(async subCategoryDoc => {
    const subCategory = subCategoryDoc.data()
    const categoryRef = await subCategory.category.get()
    const category = categoryRef.data()
    // const category = await getCategory(subCategory)
    return {
      ...subCategory,
      category
    }
  })
  return Promise.all(subCategories)
}

getSubCategory().then(res => {
  console.log(res)
})
