import { useDispatch, useSelector } from "react-redux";
import { getSpotsDetail } from "../../store/spotsReducer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SpotForm from "./SpotForm";

const EditSpotForm = () => {
    const dispatch = useDispatch()
    const spotsId = useParams()
    const currentSpot = useSelector((state) => state.spots[spotsId])
    console.log('this is the current spot', currentSpot)
    useEffect(() => {
        dispatch(getSpotsDetail())
    }, [dispatch])

    return (
        <SpotForm spotId={spotsId} formType="Edit Spot" />
    )
}


export default EditSpotForm;
