import React, { useContext, useEffect, useState } from "react";

import MaterialReactTable from "material-react-table";

import { AllContext } from "@/context/allContext";
import { useRouter } from "next/router";
import { columnCatelog, columnGenarel } from "@/assets/data";
import useGetProducts from "@/hooks/useGetProducts";
import { Box, CircularProgress } from "@mui/material";

function Proucts() {
  const [selectedShop, setSelectedShop] = useState(null);

  const { query } = useRouter();

  const { shops } = useContext(AllContext);

  useEffect(() => {
    const selected = shops?.find((shop) => shop.id === parseInt(query.shop_id));
    setSelectedShop(selected);
  }, [query]);

  const { products, loading, refetch } = useGetProducts(selectedShop);

  console.log(products);

  return (
    <Box>
      {loading ? (
        <Box
          component="div"
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <MaterialReactTable
          columns={
            selectedShop?.product_type === "Catelog"
              ? columnCatelog
              : columnGenarel
          }
          defaultColumn={{
            maxSize: 400,
            minSize: 60,
            size: 130,
          }}
          data={products}
          enableColumnActions={false}
          enableColumnFilters={false}
          enablePagination={false}
          enableSorting={false}
          enableBottomToolbar={false}
          enableTopToolbar={false}
          enableColumnResizing
          columnResizeMode="onChange"
          editingMode="cell"
          enableEditing
          rowVirtualizerProps={{
            overscan: 2,
            estimateSize: () => 50,
          }}
          muiTableBodyCellEditTextFieldProps={({ cell }) => ({
            //onBlur is more efficient, but could use onChange instead
            onChange: (event) => {
              console.log(cell);
            },
          })}
          initialState={{ density: "compact" }}
        />
      )}
    </Box>
  );
}

export default Proucts;
