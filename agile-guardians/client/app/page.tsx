import { Suspense } from 'react'
import Header from './components/Header'
import Loading from './components/Loading/Loading'
import ProductsList from './components/ProductsList'
import Search from './components/SearchForm'
import Error from './components/Error/Error'

export default function Home() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 bg-transparent px-4 py-5">
      <Header />
      <main className="space-y-8 md:space-y-16">
        <Search />
        <Suspense fallback={<Loading />}>
          <ProductsList />
        </Suspense>
      </main>
    </div>
  )
}
