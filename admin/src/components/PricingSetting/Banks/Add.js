import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import useRequest from "../../../hooks/useRequest";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import GooglePlace from "../../GooglePlace/GooglePlace";
import {
  Textarea,
  Input,
  SelectInput,
  RenderInputFields,
  SubmitButton,
} from "../../Form/Form";

const Add = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const { response, request } = useRequest();
  const { response: responseCountries, request: requestCountries } =
    useRequest();
  // const { response: responseVendors, request: requestVendors } = useRequest();

  const [allCountry, setAllCountry] = useState([]);
  // const [allVendors, setAllVendors] = useState([]);

  const history = useHistory();

  useEffect(() => {
    document.title = "Add Bank - Noonmar";
    requestCountries("GET", `country/all?page=1&isActive=${true}`);
    // requestVendors("GET", `vendor/all?page=1&isActive=${true}`);
  }, []);

  useEffect(() => {
    if (response) {
      toast.success("Bank has been added successfully.");
      history.push("/pricing-setting/banks");
    }
  }, [response]);

  useEffect(() => {
    if (responseCountries) {
      if (responseCountries.status && responseCountries.data) {
        setAllCountry(responseCountries.data);
      }
    }
  }, [responseCountries]);

  // useEffect(() => {
  //   if (responseVendors) {
  //     if (responseVendors.status && responseVendors.users) {
  //       setAllVendors(responseVendors.users);
  //     }
  //   }
  // }, [responseVendors]);

  const onSubmit = (data) => {
    const { name, address, geoLocation, information, country } = data;

    if (!address) {
      setError("address", {
        type: "manual",
      });
      return;
    }

    if (!geoLocation) {
      setError("address", {
        type: "manual1",
      });
      return;
    }
    request("POST", "bank", {
      // vendor,
      name,
      country,
      address,
      location: {
        type: "Point",
        coordinates: geoLocation,
      },
      information,
    });
  };

  const saveAddressHandler = (address, geoLocation, key) => {
    clearErrors("address");
    setValue("address", address);
    setValue("geoLocation", [geoLocation.lng, geoLocation.lat]);
  };

  const getCurrentLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition();
    }
  };

  const InputFields = [
    [
      {
        Component: Input,
        label: "Bank Name",
        type: "text",
        name: "name",
        registerFields: {
          required: true,
          // pattern: /^[A-Za-z ]+$/,
        },
        // registerFieldsFeedback: {
        //   pattern: "Bank name can only contain letters.",
        // },
      },
      {
        Component: SelectInput,
        label: "Country",
        name: "country",
        registerFields: {
          required: true,
        },
        children: allCountry && allCountry.length > 0 && (
          <>
            <option value="">{"Select an option"}</option>
            {allCountry.map((obj) => (
              <option key={obj._id} value={obj._id}>
                {" "}
                {obj.name}
              </option>
            ))}
          </>
        ),
      },
      {
        Component: Textarea,
        label: "Information",
        type: "text",
        name: "information",
        registerFields: {
          required: true,
        },
        colClass: "col-xl-12",
      },
    ],
  ];

  return (
    <div
      className="content  d-flex flex-column flex-column-fluid"
      id="kt_content"
    >
      <Breadcrumb
        title="Add Bank"
        links={[
          { to: "/", name: "Dashboard" },
          { to: "/pricing-setting/banks", name: "Back To Banks" },
        ]}
      />

      <div className="d-flex flex-column-fluid">
        <div className=" container ">
          <div className="card card-custom ">
            <div class="card-header">
              <h3 class="card-title">Add Bank</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <RenderInputFields
                      InputFields={InputFields}
                      errors={errors}
                      register={register}
                    />

                    <div className="form-group">
                      <div className="position-relative">
                        <label>Location</label>
                        <GooglePlace
                          saveAddress={saveAddressHandler}
                          index={0}
                        />
                        {errors.address?.type === "manual" && (
                          <p className="error-msg">
                            The address field is required.
                          </p>
                        )}
                        {errors.address?.type === "manual1" && (
                          <p className="error-msg">
                            The address field is invalid.
                          </p>
                        )}
                        <span
                          className="inputicon"
                          onClick={getCurrentLocationHandler}
                        ></span>
                      </div>
                    </div>

                    <div className="row"></div>

                    <SubmitButton
                      handleSubmit={handleSubmit}
                      onSubmit={onSubmit}
                      name="Submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
