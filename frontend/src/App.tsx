import { useEffect, useState } from 'react'
import './App.css'

type Book = {
  bookID: number
  title: string
  author: string
  publisher: string
  isbn: string
  classification: string
  category: string
  pageCount: number
  price: number
}

type BooksResponse = {
  books: Book[]
  totalBooks: number
}

function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [pageSize, setPageSize] = useState(5)
  const [pageNum, setPageNum] = useState(1)
  const [totalBooks, setTotalBooks] = useState(0)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({
          pageSize: pageSize.toString(),
          pageNum: pageNum.toString(),
          sortOrder,
        })

        const response = await fetch(`/books?${params.toString()}`)

        if (!response.ok) {
          throw new Error('Failed to load books')
        }

        const data: BooksResponse = await response.json()
        setBooks(data.books)
        setTotalBooks(data.totalBooks)
      } catch {
        setError('Unable to load the bookstore data right now.')
      } finally {
        setLoading(false)
      }
    }

    void fetchBooks()
  }, [pageNum, pageSize, sortOrder])

  const totalPages = Math.max(1, Math.ceil(totalBooks / pageSize))

  const handlePageSizeChange = (value: number) => {
    setPageSize(value)
    setPageNum(1)
  }

  const handleSortToggle = () => {
    setSortOrder((current) => (current === 'asc' ? 'desc' : 'asc'))
    setPageNum(1)
  }

  return (
    <main className="bookstore-shell">
      <div className="container py-5">
        <section className="hero-panel mb-4">
          <div>
            <p className="eyebrow mb-2">Mission 11</p>
            <h1 className="display-5 fw-semibold mb-3">Online Bookstore Catalog</h1>
            <p className="lead mb-0">
              Browse Professor Hilton&apos;s book list with pagination, page-size controls,
              and title sorting.
            </p>
          </div>
        </section>

        <section className="controls-panel mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label fw-semibold" htmlFor="pageSize">
                Results per page
              </label>
              <select
                id="pageSize"
                className="form-select"
                value={pageSize}
                onChange={(event) => handlePageSizeChange(Number(event.target.value))}
              >
                {[5, 10, 15].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <button className="btn btn-dark w-100" onClick={handleSortToggle}>
                Sort title: {sortOrder === 'asc' ? 'A to Z' : 'Z to A'}
              </button>
            </div>

            <div className="col-md-4 text-md-end">
              <div className="results-chip">
                Showing page {pageNum} of {totalPages} ({totalBooks} books)
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="status-card">Loading books...</div>
        ) : error ? (
          <div className="status-card error-card">{error}</div>
        ) : (
          <>
            <div className="row g-4">
              {books.map((book) => (
                <div className="col-12 col-lg-6" key={book.bookID}>
                  <article className="book-card h-100">
                    <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                      <div>
                        <p className="book-category mb-2">
                          {book.classification} / {book.category}
                        </p>
                        <h2 className="h4 mb-1">{book.title}</h2>
                        <p className="text-muted mb-0">by {book.author}</p>
                      </div>
                      <div className="price-pill">${book.price.toFixed(2)}</div>
                    </div>

                    <div className="book-grid">
                      <div>
                        <span className="label">Publisher</span>
                        <span>{book.publisher}</span>
                      </div>
                      <div>
                        <span className="label">ISBN</span>
                        <span>{book.isbn}</span>
                      </div>
                      <div>
                        <span className="label">Pages</span>
                        <span>{book.pageCount}</span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            <nav aria-label="Book pagination" className="mt-4">
              <ul className="pagination justify-content-center flex-wrap gap-2">
                <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <li className={`page-item ${page === pageNum ? 'active' : ''}`} key={page}>
                    <button className="page-link" onClick={() => setPageNum(page)}>
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPageNum(pageNum + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </main>
  )
}

export default App
