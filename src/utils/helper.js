const wooProductToFormatedProduct = (product, type) => {
  console.log(product);

  if (type === "Catelog") {
    const getMetaValue = (field) => {
      const metaField = product?.meta_data?.find((meta) => meta?.key === field);

      return metaField?.value;
    };

    const newPrice = getMetaValue("_price_field_1");
    const usedPrice = getMetaValue("_price_field_2");
    const priceSourceNew = getMetaValue("source-name");
    const priceSourceNewLink = getMetaValue("source-link");
    const noteNew = getMetaValue("source-note");
    const priceSourceUsed = getMetaValue("sourceNameUsed");
    const priceSourceUsedLink = getMetaValue("sourceLinkUsed");
    const noteUsed = getMetaValue("sourceNoteUsed");
    const newRemarks = getMetaValue("new-remarks");
    const usedRemarks = getMetaValue("used-remarks");

    return {
      id: product?.id,
      image: product?.images?.[0]?.src,
      name: product?.name,
      jancode: product?.sku,
      category: product?.categories[0]?.name,
      newPrice,
      usedPrice,
      priceSourceNew,
      priceSourceNewLink,
      noteNew,
      priceSourceUsed,
      priceSourceUsedLink,
      noteUsed,
      newRemarks,
      usedRemarks,
    };
  } else {
    return {
      id: product?.id,
      image: product?.images?.[0]?.src,
      name: product?.name,
      jancode: product?.sku,
      category: product?.categories[0]?.name,
      price: product?.price,
      sellPrice: product?.sell_price,
      stockStatus: product?.stock_status,
      weight: product?.weight,
      totalSale: product?.total_sales,
      onSale: product?.onSale ? "Yes" : "No",
    };
  }
};

export { wooProductToFormatedProduct };
