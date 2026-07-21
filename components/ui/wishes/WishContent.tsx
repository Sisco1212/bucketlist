
const WishContent = ({title, description}: {title: string, description: string}) => {
  return (
      <div>
        <h3 className="text-xl font-semibold">
          {title}
        </h3>

        {description && (
          <p className="text-gray-600">
            {description}
          </p>
        )}
      </div>
  )
}

export default WishContent