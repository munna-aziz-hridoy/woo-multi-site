const columnCatelog = [
  {
    accessorKey: "image",
    header: "Image",
    Cell: ({ cell }) => <img width={40} height={50} src={cell.getValue()} />,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 280,
  },
  {
    accessorKey: "jancode",
    header: "JAN code",
  },
  {
    accessorKey: "newPrice",
    header: "New Price",
  },
  {
    accessorKey: "usedPrice",
    header: "User Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "tag",
    header: "Tag",
  },
  {
    accessorKey: "priceSourceNew",
    header: "Price Source New",
  },
  {
    accessorKey: "noteNew",
    header: "Note New",
  },
  {
    accessorKey: "priceSourceUsed",
    header: "Price Source Used",
  },
  {
    accessorKey: "noteUsed",
    header: "Note Used",
  },
  {
    accessorKey: "newRemarks",
    header: "New Remarks",
  },
  {
    accessorKey: "usedRemarks",
    header: "Used Remarks",
  },
];

const columnGenarel = [
  {
    accessorKey: "image",
    header: "Image",
    Cell: ({ cell }) => (
      <div className="image_container">
        <img width={40} height={50} src={cell.getValue()} />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "jancode",
    header: "JAN code",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "sellPrice",
    header: "Sell Price",
  },
  {
    accessorKey: "stockStatus",
    header: "Stock Status",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "totalSale",
    header: "Total Sale",
  },
  {
    accessorKey: "onSale",
    header: "On Sale",
  },
];

export { columnCatelog, columnGenarel };
