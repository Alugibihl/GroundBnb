import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getSpotsDetail } from "../../store/spotsReducer";
import { cleanUp, getReviewsBySpot } from "../../store/reviewReducer";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateReviewForm from "../Reviews/CreatReviewForm";
import EditReviewForm from "../Reviews/EditReviewForm";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import CreateBookingModal from "../Bookings/CreateBooking";
import ReviewDeleteModal from "../Reviews/DeleteReview";

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spotsInfo = useSelector((state) => state.spots[spotId]);
    const spotReviews = useSelector((state) => state.reviews);
    const user = useSelector((state) => state.session);
    const ulRef = useRef();
    const reviewData = Object.values(spotReviews);
    const [showMenu, setShowMenu] = useState(false);


    useEffect(() => {
        dispatch(getSpotsDetail(spotId));
    }, [dispatch, spotId, spotReviews]);

    useEffect(() => {
        dispatch(getReviewsBySpot(spotId));
        return () => dispatch(cleanUp());
    }, [dispatch, spotId]);

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    const closeMenu = () => setShowMenu(false);

    let date = (time) => {
        let updated = new Date(time);
        return updated;
    };
    let reviewMadness = (reviewCount, spotsInfo) => {
        if (parseInt(reviewCount) > 1) {
            return <div>{reviewCount} Reviews</div>;
        } else if (parseInt(reviewCount) === 1) {
            return <div>{reviewCount} Review</div>;
        } else {
            return (
                <div
                    className={
                        user.user === null || spotsInfo.Owner?.id === user.user?.id
                            ? "hidden"
                            : "new-review-area"
                    }
                >
                    <OpenModalButton
                        buttonText="Post Your Review"
                        onButtonClick={closeMenu}
                        modalComponent={<CreateReviewForm spot={spotsInfo} />}
                    />
                    <div>Be the first to post a review!</div>
                </div>
            );
        }
    };
    if (spotsInfo === undefined) {
        return null;
    }
    let imageManipulator = (imageArr) => {
        if (!imageArr.length) {
            return null;
        }
        return (
            <div className="images-box-internal">
                {imageArr.map((image, idx) => {
                    return idx !== 0 && idx <= 4 ? (
                        <img
                            key={image.id}
                            className="support-pics"
                            src={image.url}
                            alt="unavailable"
                        />
                    ) : null;
                })}
            </div>
        );
    };

    return (
        <>
            {Object.values(spotsInfo)?.length > 0 ? (
                <div className="format-me">
                    {" "}
                    <h3 className="spotName">{spotsInfo.name}</h3>
                    <div className="subtitle">
                        {spotsInfo.city}, {spotsInfo.state}, {spotsInfo.country}
                    </div>
                    {spotsInfo?.SpotImages?.length > 0 ? (
                        <div className="images-box">
                            <img
                                className="main-pic"
                                src={spotsInfo?.SpotImages[0].url}
                                alt="unavailable"
                            />
                            {imageManipulator(spotsInfo?.SpotImages)}
                        </div>
                    ) : null}
                    <div className="bottom-spot">
                        <div className="spot-host description-box wrap-break">
                            <h3 className="spot-host">
                                Hosted by {spotsInfo.Owner?.firstName}{" "}
                                {spotsInfo.Owner?.lastName}
                            </h3>
                            <div className="description-box wrap-break">
                                {spotsInfo.description}
                            </div>{" "}
                        </div>
                        <div className="reserve-box">
                            {" "}
                            <div className="top-row-box">
                                ${spotsInfo.price}.00 night{" "}
                                <div>
                                    <i className="fa-solid fa-star"></i>
                                    {spotsInfo.avgStarRating === "New"
                                        ? "New"
                                        : parseInt(spotsInfo.avgStarRating)?.toFixed(1)}{" "}
                                </div>
                                <div
                                    className={
                                        parseInt(spotsInfo.numReviews) < 1 ? "hidden" : "dot"
                                    }
                                >
                                    .
                                </div>
                                <div>
                                    {" "}
                                    {parseInt(spotsInfo.numReviews) === 1
                                        ? "1 Review"
                                        : parseInt(spotsInfo.numReviews) > 1
                                            ? `${spotsInfo?.numReviews} Reviews`
                                            : null}
                                </div>
                            </div>
                            {user.user === null && <OpenModalButton className="oval-button-gray-variable"
                                onButtonClick={closeMenu} buttonText={"Sign In to Book"}
                                modalComponent={<LoginFormModal />} />}
                            {user.user && user?.user?.id === spotsInfo?.ownerId && <button
                                className="oval-button-gray"> Unavailable </button>}
                            {user.user && user?.user?.id !== spotsInfo?.ownerId && <OpenModalButton
                                className="reserve-a-spot"
                                buttonText="Reserve"
                                onButtonClick={closeMenu}
                                modalComponent={<CreateBookingModal spot={spotsInfo} />}
                            />}
                        </div>
                    </div>
                    <div className="review-holder">
                        <div className="reviews-container">
                            <div className="review-organizer">
                                <div
                                    className={
                                        spotsInfo.numReviews < 1 ? "review-organizer" : "review-line"
                                    }
                                >
                                    <div>
                                        <i className="fa-solid fa-star"></i>
                                        {spotsInfo.avgStarRating === "New"
                                            ? "New"
                                            : parseInt(spotsInfo.avgStarRating)?.toFixed(1)}
                                    </div>
                                    <div className={spotsInfo.numReviews < 1 ? "hidden" : "dot"}>
                                        .
                                    </div>
                                    {reviewMadness(spotsInfo.numReviews, spotsInfo)}
                                </div>
                                {spotsInfo.numReviews > 0 ? (
                                    <button
                                        className={
                                            user.user === null ||
                                                spotsInfo.ownerId === user.user?.id ||
                                                reviewData.find((review) => review.userId === user.user?.id)
                                                ? "hidden"
                                                : null
                                        }
                                    >
                                        <OpenModalMenuItem
                                            itemText="Post Your Review"
                                            onItemClick={closeMenu}
                                            modalComponent={<CreateReviewForm spot={spotsInfo} />}
                                        />
                                    </button>
                                ) : null}
                            </div>
                            {reviewData.map((review) => {
                                return (
                                    <span key={review.id}>
                                        {" "}
                                        <div className="reviews-name">
                                            {review.User ? review.User.firstName : user.user.firstName}
                                        </div>
                                        <div className="reviews">
                                            {" "}
                                            <div>
                                                {date(review.updatedAt).toLocaleString("en-US", {
                                                    month: "long",
                                                })}{" "}
                                                {date(review.updatedAt).getFullYear()}
                                            </div>
                                            <div className="review-description">{review.review}</div>
                                        </div>
                                        {review.User?.id === user.user?.id ? (
                                            <div className="button-holder">
                                                <OpenModalButton
                                                    buttonText={"Update"}
                                                    onButtonClick={closeMenu}
                                                    modalComponent={
                                                        <EditReviewForm review={review} spot={spotsInfo} />
                                                    }
                                                />
                                                <OpenModalButton
                                                    buttonText="Delete"
                                                    onButtonClick={closeMenu}
                                                    modalComponent={<ReviewDeleteModal review={review} />}
                                                />
                                            </div>
                                        ) : null}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div >
            ) : (
                <div>Loading</div>
            )}
        </>
    );
};
export default SpotDetails;
