import React, { useState } from 'react';
import commentIcon from '../../../assets/admin.png';
import { formatDate } from '../../../utils/formatDate';
import RatingStars from '../RatingStars';
import PostReview from './PostReview';

const ReviewsCard = ({ productReviews }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const reviews = productReviews || [];

    const handleOpenReviewModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="w-full mt-5">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Reviews
            </h3>
            <div className="bg-white p-5 rounded-md ">
                {reviews.length > 0 ? (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            All Comments
                        </h3>
                        <div className="space-y-4">
                            {reviews.map(review => (
                                <div
                                    key={review?._id}
                                    className="flex items-start space-x-4"
                                >
                                    <img
                                        src={commentIcon}
                                        alt="user icon"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">
                                                    {review?.userId?.username}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {formatDate(
                                                        review?.updatedAt
                                                    )}
                                                </p>
                                            </div>
                                            <RatingStars
                                                rating={review?.rating}
                                            />
                                        </div>
                                        <p className="mt-2">
                                            {review?.comment}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet!</p>
                )}
            </div>

            <div className="my-5 ">
                <button
                    onClick={handleOpenReviewModal}
                    className="bg-indigo-600 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                    Add Review
                </button>
            </div>

            {/* review modal============================== */}

            {isModalOpen && (
                <PostReview
                    isModalOpen={isModalOpen}
                    handleCloseReviewModal={handleCloseReviewModal}
                    handleOpenReviewModal={handleOpenReviewModal}
                />
            )}
        </section>
    );
};

export default ReviewsCard;
