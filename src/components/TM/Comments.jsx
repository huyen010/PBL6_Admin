import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'

const Comments = (props) => {
  const header = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };
  const productDetailURL = 'http://206.189.146.194:3002/api/v1/web/products/detail'
  const product_slug = props.product_slug
  const [comments, setComments] = useState([])
  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const response = await axios.get(`${productDetailURL}/${product_slug}`, header)
        console.log(response)
        setComments([...response.data.comment])
      } catch (error) {
        console.log(error)
      }
    }
    if (product_slug !== '') getProductDetail()
  }, [product_slug])
  return (
    <>
      {
        comments.map(comment => <Comment comment={comment} />)
      }
    </>
  )
}

export default Comments