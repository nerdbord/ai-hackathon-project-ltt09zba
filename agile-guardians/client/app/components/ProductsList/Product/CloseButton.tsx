'use client'

interface CloseButtonProps {
  onClick?: () => void
}
const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button
      className="absolute right-4 top-4 border-none bg-transparent"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="#858C94"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  )
}

export default CloseButton
