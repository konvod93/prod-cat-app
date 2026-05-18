
const DetailedDescription = ({ product }) => {
    return (
        <>
        {product.detailedDescription && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Описание
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {product.detailedDescription}
              </p>
            </div>
          )}
        </>
    )
}

export default DetailedDescription;