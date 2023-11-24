import { BiSolidCategoryAlt } from "react-icons/bi";
import useCategory from '../../../hooks/useCategoryHooks';
import { useEffect, useState } from 'react';

type Category = {
    _id: string;
    categoryName: string;
};

const AllCategoryMolecule = () => {
    const { getAllCategory } = useCategory();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getAllCategory().then((data: Category[]) => setCategories(data));
    }, []);

    return (
        <div className="container mx-auto my-8 px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories?.map((category: Category) => (
                    <div key={category?._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:bg-gray-200">
                        <div className="flex items-center p-4">
                            <BiSolidCategoryAlt size={24} className="mr-2" />
                            <h3 className="text-xl font-bold">{category?.categoryName}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCategoryMolecule;
