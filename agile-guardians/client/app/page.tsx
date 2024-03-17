import Header from './components/Header'
import ProductsList from './components/ProductsList'
import QueryProvider from './components/QueryProvider/QueryProvider'
import Search from './components/SearchForm'

export default function Home() {
  return (
    <QueryProvider>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 bg-transparent px-4 py-5">
        <Header />
        <main className="space-y-8 md:space-y-16">
          <Search />
          <ProductsList />
        </main>
      </div>
    </QueryProvider>
  )
}
