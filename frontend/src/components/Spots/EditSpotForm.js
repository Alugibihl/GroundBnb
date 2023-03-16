import { useDispatch, useSelector } from "react-redux";
import { getSpotsDetail } from "../../store/spotsReducer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SpotForm from "./SpotForm";

const EditSpotForm = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const currentSpot = useSelector((state) => state.spots[spotId])
    console.log('this is the current spot', currentSpot, spotId)
    useEffect(() => {
        dispatch(getSpotsDetail(spotId))
    }, [dispatch, spotId])

    return (
        <SpotForm spotsId={spotId} formType="Edit Spot" />
    )
}


export default EditSpotForm;
