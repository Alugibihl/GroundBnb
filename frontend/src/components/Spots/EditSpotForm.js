import { useDispatch, useSelector } from "react-redux";
import { getSpotsDetail } from "../../store/spotsReducer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SpotForm from "./SpotForm";

const EditSpotForm = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const currentSpot = useSelector((state) => state.spots[spotId])
    // console.log('this is the current spot', currentSpot)
    const initialValues = {
        country: currentSpot.country,
        address: currentSpot.address,
        city: currentSpot.city,
        state: currentSpot.state,
        description: currentSpot.description,
        name: currentSpot.name,
        price: currentSpot.price,
    }
    useEffect(() => {
        dispatch(getSpotsDetail(spotId))
    }, [dispatch, spotId])

    return (
        <SpotForm formType="Edit Spot" spotsId={spotId} initialValues={initialValues} />
    )
}


export default EditSpotForm;
