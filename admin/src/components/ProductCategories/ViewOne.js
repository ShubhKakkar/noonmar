import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";

import useRequest from "../../hooks/useRequest";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { API } from "../../constant/api";
import { SubTab, SubInputReadable } from "../LanguageForm/LanguageForm";

const Activated = () => (
  <span className="label label-lg label-light-success label-inline">
    Activated
  </span>
);

const Deactivated = () => (
  <span className="label label-lg label-light-danger label-inline">
    Deactivated
  </span>
);

const ViewOne = (props) => {
  const { id: recordId } = props.match.params;

  const [record, setRecord] = useState([]);
  const [record2, setRecord2] = useState([]);
  const {
    response: responseProductCategories,
    request: requestProductCategories,
  } = useRequest();

  const { date_format, languages } = useSelector((state) => state.setting);

  useEffect(() => {
    document.title = "View Product Category - Noonmar";
  }, []);

  useEffect(() => {
    if (languages) {
      requestProductCategories("GET", `product-category/${recordId}`);
    }
  }, [languages]);

  useEffect(() => {
    if (responseProductCategories) {
      const {
        data: { commissionRate, image, isActive, createdAt },
        countriesData,
        languageData,
      } = responseProductCategories.data;

      let countries = "";
      if (countriesData && countriesData.length > 0) {
        countriesData.forEach((obj) => {
          countries += obj.name + ", ";
        });
        if (countries != "") {
          countries = countries.slice(0, -2);
        }
      }

      setRecord([
        { title: "Country", value: countries ? countries : "-" },
        {
          title: "Commission Rate",
          value: commissionRate ? commissionRate + "%" : "-",
        },
        {
          title: "Image",
          value: image ? (
            <img className="imageMedia" src={`${API.PORT}/${image}`} />
          ) : (
            "-"
          ),
        },
        {
          title: "Created At",
          value: <Moment format={date_format}>{createdAt}</Moment>,
        },
        {
          title: "Status",
          value: isActive ? <Activated /> : <Deactivated />,
        },
      ]);

      languageData.sort(function (a, b) {
        const date1 = new Date(a.date).getTime();
        const date2 = new Date(b.date).getTime();
        return date1 - date2;
      });

      setRecord2({ langData: languageData });
    }
  }, [responseProductCategories]);

  return (
    <div
      className="content  d-flex flex-column flex-column-fluid"
      id="kt_content"
    >
      <Breadcrumb
        title="View Product Category"
        links={[
          { to: "/", name: "Dashboard" },
          { to: "/product/categories", name: "Back To Product Categories" },
        ]}
      />

      <div className="d-flex flex-column-fluid">
        <div className=" container ">
          <div className="card card-custom gutter-b">
            <div className="card-header card-header-tabs-line">
              <div className="card-toolbar">
                <ul
                  className="nav nav-tabs nav-tabs-space-lg nav-tabs-line nav-bold nav-tabs-line-3x"
                  role="tablist"
                >
                  {["Product Category Information"].map((data, index) => (
                    <SubTab key={index} name={data} index={index} />
                  ))}
                </ul>
              </div>
            </div>

            <div className="card-body px-0">
              <div className="tab-content px-10">
                <div
                  className={`tab-pane active`}
                  id={`kt_apps_contacts_view_tab_3`}
                  role="tabpanel"
                >
                  {record.length > 0 &&
                    record.map((data, index) => (
                      <div key={index} className="form-group row my-2">
                        <label className="col-4 col-form-label">
                          {data.title}
                        </label>
                        <div className="col-8">
                          <span className="form-control-plaintext font-weight-bolder">
                            {data.value}
                          </span>
                        </div>
                      </div>
                    ))}

                  <div className="row"></div>
                </div>
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
                {record2?.langData?.length > 0 &&
                  record2.langData.map((lang, index) => (
                    <SubInputReadable key={lang.id} index={index} lang={lang} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOne;