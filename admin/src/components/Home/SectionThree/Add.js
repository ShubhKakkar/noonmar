import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// import { SubTab, SubInput } from "./TabNInput";
// import { DevTool } from "@hookform/devtools";
import { useSelector } from "react-redux";

import { API } from "../../../constant/api";
import useRequest from "../../../hooks/useRequest";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import {
  Input,
  RenderMultiLangInputFields,
  SubmitButton,
} from "../../Form/Form";

const SubTab = ({ name, index, image }) => {
  return (
    <li className={`nav-item ${index > 0 ? "mr-3" : ""}`}>
      <a
        className={`nav-link ${index === 0 ? "active" : ""}`}
        data-toggle="tab"
        href={`#kt_apps_contacts_view_tab_${index}`}
      >
        <>
          {false && image && (
            <span className="symbol symbol-20 mr-3">
              <img src={`${API.PORT}/${image}`} alt="" />
            </span>
          )}
          <span className="nav-text">{name}</span>
        </>
      </a>
    </li>
  );
};

const SubInput = ({ index, errors, register, required, InputFields, code }) => {
  return (
    <div
      className={`tab-pane ${index === 0 ? "active" : ""}`}
      id={`kt_apps_contacts_view_tab_${index}`}
      role="tabpanel"
    >
      <RenderMultiLangInputFields
        InputFields={InputFields}
        errors={errors}
        register={register}
        required={required}
        code={code}
      />

      <div className="row"></div>
    </div>
  );
};

const Add = () => {
  const { languages } = useSelector((state) => state.setting);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { response, request } = useRequest();

  useEffect(() => {
    document.title = "Section 3 (Add) - Noonmar";
  }, []);

  useEffect(() => {
    if (response) {
      toast.success(response.message);
      history.push("/section-three");
    }
  }, [response]);

  const onSubmitNew = (data) => {
    const formData = new FormData();

    const fileIndexes = {};

    const subData = [];

    let index = 0;

    for (let i = 0; i < languages.length; i++) {
      const code = languages[i].code;

      if (data[`image-${code}`][0]) {
        formData.append("image", data[`image-${code}`][0]);
        fileIndexes[index] = `image-${code}`;
        index++;
      }

      subData.push({ code });
    }

    formData.append("fileIndexes", JSON.stringify(fileIndexes));
    formData.append("subData", JSON.stringify(subData));
    formData.append("link", data.link);

    request("POST", "master/home/section-three", formData);
  };

  const COMMON = [
    {
      Component: Input,
      label: "Link",
      name: "link",
      registerFields: {
        required: true,
      },
      type: "text",
    },
  ];

  const InputFields = [
    [
      {
        Component: Input,
        label: "Image",
        type: "file",
        name: "image",
        inputData: {
          accept: "image/*",
        },
        registerFields: {
          required: true,
        },
        tooltip: {
          show: true,
          title: `Required resolution is 2.22:1 (Width:Height)`,
        },
      },
    ],
  ];

  return (
    <div
      className="content  d-flex flex-column flex-column-fluid"
      id="kt_content"
    >
      <Breadcrumb
        title="Section 1 - Add"
        links={[
          { to: "/", name: "Dashboard" },
          //   { to: "/section-2", name: "Section 2" },
        ]}
      />

      <div className="d-flex flex-column-fluid">
        <div className=" container ">
          <form onSubmit={handleSubmit(onSubmitNew)}>
            <div className="card card-custom gutter-b">
              <div className="card-body">
                <div className="row">
                  {COMMON.map((Input, index) => (
                    <Input.Component
                      key={index}
                      {...Input}
                      errors={errors}
                      register={register}
                      setValue={setValue}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="card card-custom gutter-b">
              <div className="card-header card-header-tabs-line">
                <div className="card-toolbar">
                  <ul
                    className="nav nav-tabs nav-tabs-space-lg nav-tabs-line nav-bold nav-tabs-line-3x"
                    role="tablist"
                  >
                    {languages.length > 0 &&
                      languages.map((lang, index) => (
                        <SubTab
                          key={index}
                          name={lang.name}
                          index={index}
                          image={lang?.image}
                        />
                      ))}
                  </ul>
                </div>
              </div>

              <div className="card-body px-0">
                <div className="tab-content px-10">
                  {languages.length > 0 &&
                    languages.map((lang, index) => (
                      <>
                        <SubInput
                          key={index}
                          index={index}
                          errors={errors}
                          register={register}
                          required={lang.required}
                          InputFields={InputFields}
                          code={lang.code}
                        />
                      </>
                    ))}
                </div>
                <button
                  onClick={handleSubmit(onSubmitNew)}
                  style={{ display: "none" }}
                ></button>

                <SubmitButton
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmitNew}
                  name="Update"
                  pxClass="px-10"
                />

                <div className="row"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default Add;
