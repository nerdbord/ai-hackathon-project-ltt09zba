interface InfoProps {
  title: string
  content: string
}

const Info = ({ title, content }: InfoProps) => {
  const bannerWidth =
    title === 'Manipulacja'
      ? 'w-[100px]'
      : title === 'Ekologia'
        ? 'w-[76px]'
        : 'w-[64px]'
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`inline-block ${bannerWidth} rounded bg-tertiary px-2 py-[2px] font-semibold text-secondary`}
      >
        {title}
      </div>
      <p className="text-[13px] leading-5 line-clamp-3">{content}</p>
    </div>
  )
}

export default Info
