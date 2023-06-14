import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./App.css";

export default function DogPics(props) {
    const [breed, setBreed] = useState("random");
    const [image, setImage] = useState("");
    const [buttonClick, setButtonClick] = useState(false);

    const handleChange = (e) => {
        setBreed(e.target.value);
    };

    const handleNextImage = async () => {
        try {
            const url =
                breed === "random"
                    ? "https://dog.ceo/api/breeds/image/random"
                    : `https://dog.ceo/api/breed/${breed}/images/random`;

            const imageResponse = await axios.get(url);
            if (imageResponse.data.status === "success") {
                const imageData = imageResponse.data.message;
                setImage(imageData);
            } else {
                throw new Error(imageResponse.status);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        handleNextImage();
    }, [breed]);
    useEffect(() => {
        handleNextImage();
    }, [buttonClick]);

    return (
        <Box sx={{ maxWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select a breed</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={breed}
                    label="Select a breed"
                    onChange={handleChange}
                >
                    <MenuItem value={"random"}>Random</MenuItem>
                    <MenuItem value={"beagle"}>beagle</MenuItem>
                    <MenuItem value={"boxer"}>Boxer</MenuItem>
                    <MenuItem value={"dalmation"}>Dalmation</MenuItem>
                    <MenuItem value={"husky"}>Husky</MenuItem>
                </Select>
            </FormControl>
            <img src={image} alt={`image of ${breed} dog`} />
            <button name="next" value={breed} onClick={() => setButtonClick(!buttonClick)}>
                Next
            </button>
        </Box>
    );
}
