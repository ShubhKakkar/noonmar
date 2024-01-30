import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";

import { SubTab } from "../Cms/TabNInput";
import useRequest from "../../hooks/useRequest";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

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
  const { id: seekerId } = props.match.params;

  const [userData, setUserData] = useState([]);

  const { response: responseUserData, request: requestUserData } = useRequest();

  const { date_format } = useSelector((state) => state.setting);

  useEffect(() => {
    requestUserData("GET", `registration-field/${seekerId}`);

    document.title = "View Registration Field - Noonmar";
  }, []);

  useEffect(() => {
    if (responseUserData) {
      const { name, isActive, createdAt } = responseUserData.RegistrationFields;
      setUserData([
        { title: "Name", value: name },
        {
          title: "Registered On",
          value: <Moment format={date_format}>{createdAt}</Moment>,
        },
        {
          title: "Status",
          value: isActive ? <Activated /> : <Deactivated />,
        },
      ]);
    }
  }, [responseUserData]);

  return (
    <div
      className="content  d-flex flex-column flex-column-fluid"
      id="kt_content"
    >
      <Breadcrumb
        title="View Registration Field"
        links={[
          { to: "/", name: "Dashboard" },
          { to: "/registration-fields", name: "Back To Registration Field" },
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
                  {["Vendor Information"].map((data, index) => (
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
                  {userData.length > 0 &&
                    userData.map((user, index) => (
                      <div key={index} className="form-group row my-2">
                        <label className="col-4 col-form-label">
                          {user.title}
                        </label>
                        <div className="col-8">
                          <span className="form-control-plaintext font-weight-bolder">
                            {user.value}
                          </span>
                        </div>
                      </div>
                    ))}

                  <div className="row"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOne;
