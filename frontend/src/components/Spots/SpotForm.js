import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSpot, editSpot } from "../../store/spotsReducer";
import { useHistory } from 'react-router-dom'
import * as sessionActions from "../../store/session";

function SpotForm({ formType }) {
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(1)
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    // console.log('description', sessionActions)
    useEffect(() => {
        const err = {}
        if (country !== 'United States') { err.country = "We are only able to provide our services to the United States at this time" }
        if (address.length < 4) { err.address = "Please provide a valid Address." }
        if (city.length < 2) { err.city = "Please enter a valid City." }
        if (state.length < 2) { err.state = "Please Enter a valid State." }
        if (description.length < 50) { err.description = 'Please write a description atleast 50 characters long.' }

        setErrors(err)
    }, [country, address, city, state, description, title, price, image])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const spotAspects = { country, address, city, state, description, title, price, image }
        let createdSpot
        if (formType === "Edit Spot") { await dispatch(editSpot(spotAspects)) }
        else {
            console.log('fish')
            createdSpot = await dispatch(createSpot(spotAspects))
            console.log('createdSpot', createdSpot);
            if (createdSpot) {
                setErrors({})
                history.push(`/spots/${spotAspects.id}`)
            }
        }
    }

    return (
        <div className="formatter">
            <h1>Create a new Spot</h1>
            <h2 >Where's your place located?</h2>
            <h3>Guests will only get access to your exact address once they booked a<br />
                reservation.
            </h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Country
                    <input
                        type="text"
                        placeholder="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Street Address
                    <input
                        type="text"
                        placeholder="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City
                    <input
                        type="text"
                        placeholder="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        type="text"
                        placeholder="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <h2>Describe your place to guests</h2>
                    Mention the best features of your space, any special amentities like <br />
                    fast wifi or parking, and what you love about the neighborhood.
                    <input
                        type="textarea"
                        placeholder="Please write at least 50 characters"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <h2>Create a title for your spot</h2>
                    Catch guests' attention with a spot title that highlights what makes <br />
                    your place special.

                    <input
                        type="text"
                        placeholder="Name of your spot"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <h2>Set a base price for your spot</h2>
                    Competitive pricing can help your listing stand out and rank higher<br />
                    in search results.
                    <div>$
                        <input
                            placeholder="Price per night (USD)"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        /></div>
                </label>
                <label>
                    <h2>Liven up your spot with photos</h2>
                    Submit a link to a photo to publish a spot
                    <input
                        type="url"
                        placeholder="Preview Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </label>
                <button disabled={Object.values(errors).length > 0} type="submit">Create Spot</button>
            </form>
        </div>
    );
}

export default SpotForm;
