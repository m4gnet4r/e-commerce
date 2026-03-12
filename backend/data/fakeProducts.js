const {faker} =require( "@faker-js/faker");

const categories=["Electronics","Fashion", "Home", "Books", "Sports","Toys"];
const generateFakeProducts =(count=200)=>{
    const products=[];

    for(let i=0;i<count;i++){
        products.push({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: Number(faker.commerce.price({min:99, max:9999 })),
            image: `https://source.unsplash.com/400x400/?${encodeURIComponent(faker.commerce.product())}`,
            category: faker.helpers.arrayElement(categories)
        });
    }
    return products;
};

module.exports= generateFakeProducts;