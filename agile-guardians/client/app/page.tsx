import Header from './components/Header/Header'
import Search from './components/SearchForm/SearchForm'

export default function Home() {
  return (
    <main className="ml-[120px] flex w-[1200px] flex-col gap-10 bg-transparent py-5">
      <Header />
      <Search />
    </main>
  )
}
