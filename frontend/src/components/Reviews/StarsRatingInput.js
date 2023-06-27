import { useState } from "react";

const StarsRatingInput = ({ stars, disabled, onChange }) => {
    const [activeRating, setActiveRating] = useState(parseFloat(stars));
    const filled = "fa-solid fa-star"
    const empty = "fa-regular fa-star"

    return (
        <div className="rating-input">
            <div
                onMouseEnter={() => {
                    if (!disabled) setActiveRating(1);
                }}
                onMouseLeave={() => {
                    if (!disabled) setActiveRating(stars);
                }}
                onClick={() => { onChange(1) }}
            >
                <i className={activeRating >= 1 ? filled : empty}></i>
            </div>
            <div
                onMouseEnter={() => {
                    if (!disabled) setActiveRating(2);
                }}
                onMouseLeave={() => {
                    if (!disabled) setActiveRating(stars);
                }}
                onClick={() => { onChange(2) }}
            >
                <i className={activeRating >= 2 ? filled : empty}></i>
            </div>
            <div
                onMouseEnter={() => {
                    if (!disabled) setActiveRating(3);
                }}
                onMouseLeave={() => {
                    if (!disabled) setActiveRating(stars);
                }}
                onClick={() => { onChange(3) }}
            >
                <i className={activeRating >= 3 ? filled : empty}></i>
            </div>
            <div
                onMouseEnter={() => {
                    if (!disabled) setActiveRating(4);
                }}
                onMouseLeave={() => {
                    if (!disabled) setActiveRating(stars);
                }}
                onClick={() => { onChange(4) }}
            >
                <i className={activeRating >= 4 ? filled : empty}></i>
            </div>
            <div
                onMouseEnter={() => {
                    if (!disabled) setActiveRating(5);
                }}
                onMouseLeave={() => {
                    if (!disabled) setActiveRating(stars);
                }}
                onClick={() => { onChange(5) }}
            >
                <i className={activeRating >= 5 ? filled : empty}></i>
            </div>
        </div>
    )
};

export default StarsRatingInput;
