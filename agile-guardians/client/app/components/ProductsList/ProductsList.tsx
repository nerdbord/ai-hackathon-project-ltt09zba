import Product from './Product/Product'

const dummyProps = {
  title: 'Horizontal Card with Image & Actions',
  img: '',
  manipulation:
    'Sagittis, eu pretium massa quisque cursus augue massa cursus. Sed quisque velit, auctor at lobortis hac tincidunt sodales id. Elit interdum vel nisi, in enim sagittis at. Netus sagittis eleifend aliquet urna quis.',
  ecology:
    'Sagittis, eu pretium massa quisque cursus augue massa cursus. Sed quisque velit, auctor at lobortis hac tincidunt sodales id. Elit interdum vel nisi, in enim sagittis at. Netus sagittis eleifend aliquet urna quis.',
  quality:
    'Sagittis, eu pretium massa quisque cursus augue massa cursus. Sed quisque velit, auctor at lobortis hac tincidunt sodales id. Elit interdum vel nisi, in enim sagittis at. Netus sagittis eleifend aliquet urna quis.',
  url: '/',
}

const ProductsList = () => {
  return (
    <section className="flex w-[1200px] flex-col gap-6 bg-transparent px-6">
      <h3 className="text-[40px] font-semibold">Znalezione oferty</h3>
      {Array.from({ length: 5 }, (_, index) => (
        <Product
          index={index}
          key={index}
          title={dummyProps.title}
          img={dummyProps.img}
          ecology={dummyProps.ecology}
          manipulation={dummyProps.manipulation}
          quality={dummyProps.quality}
          url={dummyProps.url}
        />
      ))}
    </section>
  )
}

export default ProductsList