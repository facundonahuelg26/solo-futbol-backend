import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateProductDto } from 'src/products/dto/create-products.dto'
import { UpdateProductDto } from 'src/products/dto/update-products.dto'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async getProducts(
    page: number,
    limit: number,
    club?: string,
    brands?: string[],
  ) {
    const offset = (page - 1) * limit
    const where: any = {}

    if (club) {
      where.clubId = club
    }
    if (brands && brands.length > 0) {
      where.brandId = { in: brands }
    }

    // Primero obtenemos todos los productos que cumplen los criterios de filtro
    const allFilteredProducts = await this.prisma.products.findMany({
      where,
    })

    // Reorganizamos los productos según el orden de los filtros aplicados
    const orderedProducts = this.orderProductsByFilters(
      allFilteredProducts,
      brands,
    )

    const paginatedProducts = orderedProducts.slice(offset, offset + limit)

    return paginatedProducts
  }

  // Método adicional para ordenar productos según los filtros aplicados
  orderProductsByFilters(products: any[], brands?: string[]): any[] {
    const orderedProducts = []
    const addedProducts = new Set()

    // Luego ordenar por marcas
    if (brands && brands.length > 0) {
      brands.forEach((brandId) => {
        products.forEach((product) => {
          if (product.brandId === brandId && !addedProducts.has(product.id)) {
            orderedProducts.push(product)
            addedProducts.add(product.id)
          }
        })
      })
    }

    // Agregar los productos restantes que no fueron ordenados por equipos o marcas
    products.forEach((product) => {
      if (!addedProducts.has(product.id)) {
        orderedProducts.push(product)
        addedProducts.add(product.id)
      }
    })

    return orderedProducts
  }
  async getTotalProducts(
    // page: number,
    // limit: number,
    club?: string,
    brands?: string[],
  ) {
    // const offset = (page - 1) * limit
    const where: any = {}

    if (club) {
      where.clubId = club // Filtrar por club
    }
    if (brands && brands.length > 0) {
      where.brandId = { in: brands }
    }

    return this.prisma.products.count({ where })
  }

  async createProduct(product: CreateProductDto) {
    return this.prisma.products.create({
      data: {
        name: product.name,
        price: product.price,
        href: product.href,
        breadcrumbs: product.breadcrumbs,
        images: product.images,
        sizes: product.sizes,
        description: product.description,
        highlights: product.highlights,
        details: product.details,
        gender: product.gender,
        brand: { connect: { id: product.brandId } },
        club: { connect: { id: product.clubId } },
      },
    })
  }

  async updateProduct(id: string, product: UpdateProductDto) {
    return this.prisma.products.update({
      where: { id },
      data: {
        name: product.name,
        price: product.price,
        href: product.href,
        breadcrumbs: product.breadcrumbs,
        images: product.images,
        sizes: product.sizes,
        description: product.description,
        highlights: product.highlights,
        details: product.details,
        gender: product.gender,
        brand: { connect: { id: product.brandId } },
        club: { connect: { id: product.clubId } },
      },
    })
  }
}
