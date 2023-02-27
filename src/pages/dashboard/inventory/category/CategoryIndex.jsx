import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { connect } from "react-redux";

import { getCategories, deleteCategory } from "@/actions/categoryActions.js";
import { clearData } from "@/actions/globalActions.js";

import IndexTable from "@/components/IndexTable.jsx";
import TableButtons from "@/components/TableButtons.jsx";

import CategoryForm from "@/components/category/CategoryForm";

function CategoryIndex(props) {
  const { categories, loading } = props;

  const initialCategoryModal = { open: false, category: null };

  const [categoryModal, setCategoryModal] = useState(initialCategoryModal);

  const handleCategoryModal = (category) => {
    categoryModal.open
      ? setCategoryModal(initialCategoryModal)
      : setCategoryModal({ open: true, category: category });
  };

  useEffect(() => {
    props.getCategories();

    return () => props.clearData();
  }, []);

  const renderRows = () => {
    return categories.map((category, index) => {
      const className = `py-3 px-5 text-center ${
        index === categories.length - 1 ? "" : "border-b border-blue-gray-50"
      }`;

      return (
        <tr key={index}>
          <td className={className}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              {index + 1}
            </Typography>
          </td>
          <td className={className}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              {category.name}
            </Typography>
          </td>
          <td className={className}>
            <TableButtons
              id={category.id}
              deleteFunction={props.deleteCategory}
              handleModal={() => handleCategoryModal(category)}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {categoryModal.open && (
        <CategoryForm
          categoryModal={categoryModal}
          handleCategoryModal={() => handleCategoryModal(null)}
        />
      )}

      <IndexTable
        title="category table"
        headers={["#", "category name", ""]}
        renderRows={categories.length > 0 ? renderRows() : null}
        handleModal={() => handleCategoryModal(null)}
        loading={loading}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    category: { categories, getCategoriesLoading },
  } = state;

  return { categories, loading: getCategoriesLoading };
};

export default connect(mapStateToProps, {
  getCategories,
  deleteCategory,
  clearData,
})(CategoryIndex);
