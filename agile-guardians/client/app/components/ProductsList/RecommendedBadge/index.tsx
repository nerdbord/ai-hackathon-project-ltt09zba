import Star from './Star'

const RecommendedBadge = () => {
  return (
    <p className="flex items-center gap-2 text-sm font-semibold uppercase text-secondary">
      <span>
        <Star />
      </span>
      Rekomendowany produkt
    </p>
  )
}

export default RecommendedBadge
