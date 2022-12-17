import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Comments from './Comments'

const ManageComment = () => {

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState('')
  const [category, setCategory] = useState('')

  const categoriesURL = `http://localhost:3002/api/v1/cms/categories/all`
  const productURL = 'http://localhost:3002/api/v1/cms/products'
  const productDetailURL = 'http://localhost:3002/api/v1/web/products/detail'
  // const productDetailURL = 'http://localhost:3002/api/v1/cms/products/detail'
  // const productURL = `http://localhost:3002/api/v1/cms/products/${category}/all'`

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const response = await axios.get(categoriesURL)
        setCategories([...response.data])
      } catch (error) {

      }
    }
    getCategoryData()
  }, [])

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`${productURL}/${category}/all`)
        setProducts([...response.data.products])
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    if(category !== '') {
      getProduct()
    }
  }, [category])



  return (
    <div>
      <div className='d-flex justify-content-around py-3 border-dark border-bottom'>
        <div >
          <label>Category:</label>
          <select className="form-select" onChange={(e) => setCategory(e.target.value)} value={category} aria-label="Default select example">
            <option selected>Open this select menu</option>
            {categories.map(cate => (
              <option key={cate.slug} value={cate.slug}>{cate.name}</option>
            ))}
            {/* <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
          </select>
        </div>
        <div>
          <label>Product:</label>
          <select className="form-select" onChange={(e) => setProduct(e.target.value)} value={product} aria-label="Default select example">
            <option selected>Open this select menu</option>
            {
              products.map(pro => (
                <option key={pro.slug} value={pro.slug}>{pro.name}</option>
              ))
            }
            {/* <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
          </select>
        </div>
      </div>
      <Comments product_slug={product} />
    </div>
  )
}

export default ManageComment