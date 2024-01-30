import React, { useEffect, useState } from "react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId,
} from "react-places-autocomplete";

const GooglePlaceAddMore = ({
  saveAddress,
  defaultAddress,
  index,
  setValue,
  placeholder,
  handleChange,
  address,
  name,
  register,
}) => {
  const handleSelect = async (address, placeId) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        saveAddress(address, latLng, index);
        // setAddress(address);
        setValue(name, address);
      });
    const [place] = await geocodeByPlaceId(placeId);
    const { long_name: postalCode = "" } =
      place.address_components.find((c) => c.types.includes("postal_code")) ||
      "";
    const { long_name: state = "" } =
      place.address_components.find((c) =>
        c.types.includes("administrative_area_level_1")
      ) || "";
    const { long_name: city = "" } =
      place.address_components.find((c) =>
        c.types.includes("administrative_area_level_2")
      ) || "";
    const { long_name: street = "" } =
      place.address_components.find((c) => c.types.includes("route")) || "";

    setValue(`pinCode${index}`, postalCode ?? "");

    setValue(`state${index}`, state ?? "");
    setValue(`street${index}`, street ?? "");

    setValue(`city${index}`, city ?? "");
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(e) => handleChange(e, index)}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...register}
            {...getInputProps({
              placeholder: placeholder,
              className: "form-control dark-form-control",
            })}
          />
          <div className="autocomplete-dropdown-container locationDropDown search-places-DropDown">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  className="autocomDropdown"
                  key={suggestion.placeId}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default GooglePlaceAddMore;
