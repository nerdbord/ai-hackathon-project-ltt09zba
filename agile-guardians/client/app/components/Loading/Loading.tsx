const Loading = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      ></div>
      <p className="text-lg font-semibold">Trwa przetwarzanie danych...</p>
    </div>
  )
}

export default Loading
