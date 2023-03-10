import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Category from 'App/Models/Category'

export default class ProductsController {
  public async index({ view, request }: HttpContextContract) {
    const categories = await Category.query().orderBy('name', 'asc')
    let products = await Product.query().preload('images').orderBy('id', 'desc')

    if (request.qs().category){
      const category = await Category.findBy('slug', request.qs().category)
      try {
        products = await Product.query().preload('images').where('category_id', category?.id).orderBy('id', 'desc')
      } catch {
        products = []
      }
    }

    return view.render('product', {
      title: 'Product',
      products,
      categories
    })
  }

  public async show({ view, params, request }: HttpContextContract) {
    const product = await Product.findBy('slug', params.slug)
    await product?.load('images')
    const href = `https://wa.me/62${product?.wa_number}/?text=Saya%20ingin%20membeli%20${product?.name}%0A${request.completeUrl()}`

    return view.render('item', {
      title: 'Product',
      product,
      href,
    })
  }
}
