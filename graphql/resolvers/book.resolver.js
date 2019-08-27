
const booksData = [{
    _id: 0,
    title: 'First Book',
    ex:'s',
    price: 12.99,
    createdAt: "2019-08-11T18:29:19.128Z"
}];

module.exports =
    {
        books: () => {
            return Promise.resolve(booksData)
            .then(_=>{
                throw new Error("dsvfdnhjsvh")
            })

            return Promise.resolve(booksData)
        },
        addBook: ({ title, price }) => {
            const book = {
                _id: Math.random().toString(),
                title,
                price: +price,
                createdAt: new Date().toISOString()
            }
            booksData.push(book);

            return book;
        }
    }