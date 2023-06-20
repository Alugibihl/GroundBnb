import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getSpotsDetail } from "../../store/spotsReducer";
import { cleanUp, getReviewsBySpot } from "../../store/reviewReducer";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import UsersReviewsModal from "../Reviews/UsersReviewsModal";
import CreateReviewForm from "../Reviews/CreatReviewForm";
import EditReviewForm from "../Reviews/EditReviewForm";
import OpenModalButton from "../OpenModalButton";

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spotsInfo = useSelector((state) => state.spots[spotId]);
    const spotReviews = useSelector((state) => state.reviews);
    const user = useSelector((state) => state.session);
    const ulRef = useRef();
    const reviewData = Object.values(spotReviews);
    const [showMenu, setShowMenu] = useState(false);
    console.log(
        "this is the spot being lookedat",
        spotsInfo,
        "these are the reviews",
        spotReviews,
        "here is review data",
        reviewData,
        "user",
        user
    );
    useEffect(() => {
        console.log("in spot details use effect");
        dispatch(getSpotsDetail(spotId));
    }, [dispatch, spotId, spotReviews]);

    useEffect(() => {
        console.log("in spot detail getSpotsDetail dispatch");
        dispatch(getReviewsBySpot(spotId));
        console.log("in spot detail getReviewsbySpot dispatch");
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
            console.log("this is reviewcount", reviewCount);
            return <div>{reviewCount} Reviews</div>;
        } else if (parseInt(reviewCount) === 1) {
            console.log("this is reviewcount", typeof reviewCount, reviewCount);
            return <div>{reviewCount} Review</div>;
        } else {
            console.log("this is reviewcount", reviewCount);
            return (
                <div
                    className={
                        user.user === null || spotsInfo.Owner?.id === user.user?.id
                            ? "hidden"
                            : "new-review-area"
                    }
                >
                    <button>
                        <OpenModalMenuItem
                            itemText="Post Your Review"
                            onItemClick={closeMenu}
                            modalComponent={<CreateReviewForm spot={spotsInfo} />}
                        />
                    </button>
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
                    {console.log("this is spotsInfo inside the return", spotsInfo)}
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
                            <button
                                className={user.user.id === spotsInfo.id ? "oval-button-gray" : "reserve-a-spot"}
                                onClick={() => window.alert("Feature Coming Soon...")}
                            >
                                Reserve
                            </button>
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
                                                    modalComponent={<UsersReviewsModal review={review} />}
                                                />
                                            </div>
                                        ) : null}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading</div>
            )}
            {console.log("spot detail end jsx running")}
        </>
    );
};
export default SpotDetails;
