import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    title: string;
    description: string;
    language: string;
    learningOutcome: string;
    requirement: string;
    topicID: string;
    thumbnail: FileList;
}

const YourFormComponent: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        // Handle form submission logic here
        console.log(data);
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('language', data.language);
        formData.append('learningOutcome', data.learningOutcome);
        formData.append('requirement', data.requirement.split(',').map((item) => item.trim()).join(','));
        formData.append('topicID', data.topicID);
        formData.append('thumbnail', data.thumbnail[0]);
    };

    return (
        <div className="container mx-auto mt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        id="title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requirement">
                        Requirement (comma-separated values)
                    </label>
                    {/* Updated to a single text input for comma-separated values */}
                    <input
                        {...register('requirement', { required: 'Requirement is required' })}
                        type="text"
                        id="requirement"
                        placeholder="Enter comma-separated values"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.requirement && (
                        <p className="text-red-500 text-xs italic">{errors.requirement.message}</p>
                    )}
                </div>

                {/* Repeat similar structure for other form fields */}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                        Thumbnail
                    </label>
                    <input
                        {...register('thumbnail', { required: 'Thumbnail is required' })}
                        type="file"
                        id="thumbnail"
                        accept="image/*"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.thumbnail && (
                        <p className="text-red-500 text-xs italic">{errors.thumbnail.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default YourFormComponent;
