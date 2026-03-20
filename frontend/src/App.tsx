import BookList from './components/BookList'
import './App.css'

function App() {
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
        <BookList />
      </div>
    </main>
  )
}

export default App
