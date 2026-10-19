import mongoose from 'mongoose'
import dns from "node:dns/promises"
import { Product } from '../models/product.model.js'
import { ENV } from '../config/env.js'
dns.setServers(["1.1.1.1"])
const products = [
    {
        name: 'wireless bluetooth headphones',
        description: 'premium over-ear headphones with active noise cancellation 30 hour battery life and premium sound quality prefect for music lovers and travelers.',
        price: 149.99,
        stock: 50,
        category: 'Electronics',
        images: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        avarageRating: 4.5,
        totalReviews:128
    },
    {
        name: 'smart watch series 5',
        description: 'advanced fitness tracking heart rate monitor gps and water resistant',
        price: 399.99,
        stock: 35,
        category: 'Electronics',
        images: [
            "https://images.unsplash.com/photo-1660844817855-3ecc7ef21f12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        ],
        averageRAgin: 4.5,
        totalReviews:128
    },
    {
        name: 'running shoes pro edition',
        description: 'lightweight running shoes with responsive cushioning and breathable mesh upper designed for performance and comfort during long runs.',
        price: 129.99,
        stock: 60,
        category: 'Sports',
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        ],
        averageRating: 4.6,
        totalReviews:342
    },
    {
        name: 'best selling mystery novel',
        description: 'a gripping psychological thriller that will keep you on the edge of your seat new york times bestseller with over 1 million copies sold.',
        price: 24.99,
        stock: 100,
        category: 'Books',
        images: [
                "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        ],
        averageRating: 4.8,
        totalReviews:1243
    },
    {
        name: 'portable bluetooth speaker',
        description: 'waterproof wireless speaker with 360-degree sound 12 hour battery life and durable design perfect for outdoor adventures.',
        price: 69.99,
        stock:40,
        category: 'Fashion',
        images: [
     "https://images.unsplash.com/photo-1531104985437-603d6490e6d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        ],
        averageRating: 4.2,
        totalReviews:95
    },
    {
        name: 'classic denim jacket',
        description: 'timeless denim jacket with vintage wash and comfortable fit a wardrobe essential that pairs perfectly with any outfit.',
        price: 69.99,
        stock:40,
        category: 'Fashion',
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        ],
        averageRating: 4.2,
        totalReviews:95
        
    },
    {
        name: 'yoga mat pro',
        description: 'extra-thick non-slip yoga mat with carrying strap eco friendly material provides excellent cushing and grip for all yoga styles.',
        price: 39.99,
        stock:55,
        category: 'Sports',
        images: [
            "https://media.istockphoto.com/id/2192783352/es/foto/colchonetas-de-yoga-desplegadas-en-un-estudio-de-pilates-iluminadas-por-la-luz-del-sol.webp?a=1&b=1&s=612x612&w=0&k=20&c=j0oA9uDxo7H-T-58-wmTLUFGTm-kP9eUIVuDvpFWHO0="
        ],
        averageRating: 4.6,
        totalReviews:134
        
    },
    {
        name: 'coffe table book collection',
        description: 'stunning photography book featuring architecture and design from around the world hardcover editing with 300+ pages of inspiration.',
        price: 39.99,
        stock:55,
        category: 'Books',
        images: [
            "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        ],
        averageRating: 4.6,
        totalReviews:134
    }
]

const seedDatabase = async () => {
    try {
        await mongoose.connect(ENV.DB_URL)
        console.log('connected to MongoDB')
        await Product.deleteMany({})
        console.log('cleared exisiting products')
        await Product.insertMany(products)
        console.log(`successfully seeded ${products.length} products`)
        const categories = [...new Set(products.map((p) => p.category))]
        console.log('seed products summary')
        console.log(`total products ${products.length}`)
        console.log(`categories ${categories.join(', ')}`)
        await mongoose.connection.close()
        console.log('database seeding completed and connection closed')
        process.exit(0)
    } catch (error) {
        console.error('error seeding database', error)
        process.exit(1)
    }
}
seedDatabase()