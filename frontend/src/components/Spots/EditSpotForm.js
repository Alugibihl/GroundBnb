import SpotForm from "./SpotForm";
import { useDispatch } from "react-redux";
import { getSpotsDetail } from "../../store/spotsReducer";
import { useEffect } from "react";

const EditSpotForm = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotsDetail())
    }, [dispatch])

    return (
        <SpotForm formType="Edit Spot" />
    )
}


export default EditSpotForm;
