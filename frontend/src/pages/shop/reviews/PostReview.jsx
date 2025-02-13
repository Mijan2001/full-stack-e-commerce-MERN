import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewsApi';

const PostReview = ({
    isModalOpen,
    handleOpenReviewModal,
    handleCloseReviewModal
}) => {
    const { id } = useParams();
    const { user } = useSelector(state => state?.auth);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const handleRating = star => {
        setRating(star);
    };
    const { refetch } = useFetchProductByIdQuery(id, { skip: !id });

    const [postReview] = usePostReviewMutation();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const newComment = {
                comment,
                rating,
                userId: user?._id,
                productId: id
            };
            await postReview(newComment).unwrap();
            alert('Review posted successfully');
            setComment('');
            setRating(0);
            refetch();
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
        handleCloseReviewModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-md shadow-lg w-full max-w-lg mx-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Add Review
                </h3>

                <div>
                    {[1, 2, 3, 4, 5].map((star, index) => (
                        <span onClick={() => handleRating(star)} key={index}>
                            {rating >= star ? (
                                <i className="ri-start-fill"></i>
                            ) : (
                                <i className="ri-start-line"></i>
                            )}
                        </span>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="comment"
                            className="text-lg font-semibold text-gray-800"
                        >
                            Comment
                        </label>
                        <textarea
                            name="comment"
                            onChange={e => setComment(e.target.value)}
                            value={comment}
                            id="comment"
                            cols="30"
                            rows="4"
                            className="border p-2 rounded-md"
                        ></textarea>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="rating"
                            className="text-lg font-semibold text-gray-800"
                        >
                            Rating
                        </label>
                        <input
                            type="number"
                            onChange={e => setRating(e.target.value)}
                            value={rating}
                            name="rating"
                            id="rating"
                            className="border p-2 rounded-md"
                            min="1"
                            max="5"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Add Review
                        </button>
                        <button
                            type="button"
                            onClick={handleCloseReviewModal}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostReview;
