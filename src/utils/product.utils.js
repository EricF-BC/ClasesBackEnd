import  { faker } from "@faker-js/faker/locale/es";


export const generateProduct = () => {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 1000, max: 100000 }),
        stock: faker.number.int({ min: 10, max: 100 })
    }
}