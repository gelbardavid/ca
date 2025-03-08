const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js";
import { ROUTES } from "../services/constants.js";
import { getReaderLevel, getBookEra, getPriceColor } from '../services/util.service.js'

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams();

    useEffect(() => {
        const fetchData = () => {
            loadBook();
        }
        fetchData()
    }, [])


    const loadBook = async () => {
        const { bookId = '' } = params || {};
        const bookDetails = await bookService.get(bookId);
        setBook(bookDetails);
    }

    const setStringsList = (propName) => {
        const dataArr = book[propName];
        return dataArr.reduce((dataStr, data) => {
            if (!dataStr) return data;
            return `${dataStr} | ${data}`;
        }, '')
    }

    const setOnSaleRibbon = () => {
        return { display: book.listPrice.isOnSale ? "" : "none" }
    }

    if (!book) return <div className="loader">Loading...</div>

    return (
        <section className="book-details">
            <Link to={ROUTES.HOME}><button className='back-button'>Back</button></Link>
            <section className="book-data">
                <div className="book-image">
                    <img src={`${book.thumbnail}`}></img>
                    <div style={setOnSaleRibbon()} className="book-on-sale">On Sale</div>
                </div>
                <div className="book-data-description">
                    <h1>{book.title}</h1>
                    <h4>{setStringsList('authors')}</h4>
                    <section className="book-metadata">
                        <h5>Publish Year:</h5><p>{book.publishedDate}</p>
                        <h5>Language:</h5><p>{book.language}</p>
                        <h5>Pages Count:</h5><p>{book.pageCount}</p>
                        <h5>Categories:</h5><p>{setStringsList('categories')}</p>
                    </section>
                    <p className="subtitle">{book.subtitle}</p>
                    <p className="description">{book.description}</p>
                    <h5 className={getPriceColor(book.listPrice.amount)}>{book.listPrice.amount} {book.listPrice.currencyCode}</h5>
                    <section className="extended-metadata">
                        <h6>{getReaderLevel(book.pageCount)}</h6>
                        <h6>{getBookEra(book.publishedDate)}</h6>
                    </section>
                </div>
            </section>
        </section>
    )

}