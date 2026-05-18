const Specifications = ({ product }) => {
  return (
    <>
      {product.specifications &&
        Object.keys(product.specifications).length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Характеристики
            </h2>
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr
                    key={key}
                    className="border-b border-gray-100 dark:border-gray-700"
                  >
                    <td className="py-2 pr-4 text-gray-500 dark:text-gray-400 w-1/2">
                      {key}
                    </td>
                    <td className="py-2 text-gray-800 dark:text-gray-200 font-medium">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </>
  );
};

export default Specifications;
