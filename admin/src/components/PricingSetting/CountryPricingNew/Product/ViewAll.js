import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Moment from "moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import useRequest from "../../../../hooks/useRequest";
import Pagination from "../../../Pagination/Pagination";
import Breadcrumb from "../../../Breadcrumb/Breadcrumb";
import Table from "../../../Table/Table";
import { SearchInput, SearchSubmitButton } from "../../../Form/Form";
import { addOneToDate } from "../../../../util/fn";

import { useLocation } from "react-router-dom";

const ViewCustomerGroups = ({ countryId }) => {
  //   const {  type } = props.match.params;
  const type = "specific";
  const location = useLocation();
  const { pathname } = location;

  let OBJ_TABLE = {
    // "country name": "countryName",
    "product name": "productName",
    value: "value",
    "created at": "createdAt",
    status: "isActive",
  };

  const searchQueryHandler = (
    page,
    per_page,
    sortBy,
    order,
    isActive = "",
    name = "",
    dateFrom = "1970-01-01",
    dateTo
  ) => {
    if (sortBy.length > 0) {
      if (sortBy == "created at") {
        sortBy = "createdAt";
      }
    } else {
      sortBy = "createdAt";
    }
    order = order.length > 0 ? order : "desc";

    dateFrom = dateFrom.length > 0 ? dateFrom : "1970-01-01";
    // parentId
    dateTo = dateTo ? addOneToDate(new Date(dateTo)) : addOneToDate(new Date());

    return `pricing-new/country/products?page=${page}&per_page=${per_page}&sortBy=${sortBy}&order=${order}&isActive=${isActive}&name=${name}&dateFrom=${dateFrom}&dateTo=${dateTo}&countryId=${countryId}`;
  };
  const [seekers, setSeekers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(10);
  const [perPage, setPerPage] = useState(0);
  const [currentSort, setCurrentSort] = useState({
    sortBy: "created at",
    order: "desc",
  });

  // const [allCountry, setAllCountry] = useState([]);
  // const [allVendors, setAllVendors] = useState([]);
  const MySwal = withReactContent(Swal);

  const { records_per_page } = useSelector((state) => state.setting);
  const { roleId, permission } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    getValues,
    clearErrors,
    setError,
  } = useForm();

  const { request, response } = useRequest();

  const { request: requestChangeStatus, response: responseChangeStatus } =
    useRequest();
  const { request: requestDelete, response: responseDelete } = useRequest();

  useEffect(() => {
    if (records_per_page) {
      setPerPage(records_per_page);
      request(
        "GET",
        searchQueryHandler(
          1,
          records_per_page,
          currentSort.sortBy,
          currentSort.order
        )
      );
    }
    document.title =
      type == "customer"
        ? "Customer Groups Pricing- Noonmar"
        : type == "specific"
        ? "Product Pricing- Noonmar"
        : "Product Groups Pricing- Noonmar";
  }, [records_per_page, pathname]);

  useEffect(() => {
    if (response) {
      setSeekers(response.data);
      setTotalDocuments((prev) => response.totalDocuments ?? prev);
    }
  }, [response]);

  useEffect(() => {
    if (responseChangeStatus) {
      const { id, status } = responseChangeStatus;

      const oldSeekers = [...seekers];
      const indexToChange = oldSeekers.findIndex((seeker) => seeker._id == id);
      oldSeekers[indexToChange].isActive = status;

      setSeekers(oldSeekers);
    }
  }, [responseChangeStatus]);

  useEffect(() => {
    if (responseDelete) {
      const { id } = responseDelete;
      let newSeeker = [...seekers];
      newSeeker = newSeeker.filter((seeker) => seeker._id != id);
      setSeekers(newSeeker);
      toast.success(
        `${
          type == "customer"
            ? "Customer"
            : type == "customer"
            ? "Product"
            : "Product Group"
        } Pricing has been deleted successfully.`
      );
    }
  }, [responseDelete]);

  const fetchMoreData = ({ selected }) => {
    setSeekers([]);
    const { isActive, name, dateFrom, dateTo } = getValues();

    setPage(selected + 1);
    request(
      "GET",
      searchQueryHandler(
        selected + 1,
        perPage,
        currentSort.sortBy,
        currentSort.order,
        isActive,
        name,
        dateFrom,
        dateTo
      )
    );
  };

  const deleteHandler = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: `You want to delete this ${type} pricing?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        requestDelete("DELETE", "pricing-new/country/category", { id });
      } else if (result.isDismissed) {
      }
    });
  };

  const onSearchHandler = (data) => {
    const { isActive, name, dateFrom, dateTo } = getValues();

    if (dateFrom && dateTo) {
      if (Moment(dateFrom).isAfter(dateTo)) {
        setError("dateTo", {
          type: "manual",
        });
        return;
      }
    }

    request(
      "GET",
      searchQueryHandler(
        1,
        perPage,
        currentSort.sortBy,
        currentSort.order,
        isActive,
        name,
        dateFrom,
        dateTo
      )
    );
    setPage(1);
  };

  const onResetHandler = (e) => {
    e.preventDefault();
    resetField("isActive");
    resetField("name");
    resetField("country");
    resetField("dateFrom");
    resetField("dateTo");
    request(
      "GET",
      searchQueryHandler(1, perPage, currentSort.sortBy, currentSort.order)
    );
    setPage(1);
  };

  const perPageChangeHandler = (event) => {
    const { isActive, name, dateFrom, dateTo } = getValues();

    request(
      "GET",
      searchQueryHandler(
        1,
        event.target.value,
        currentSort.sortBy,
        currentSort.order,
        isActive,
        name,
        dateFrom,
        dateTo
      )
    );
    setPage(1);

    setPerPage(event.target.value);
  };

  const sortingHandler = (sortBy) => {
    const { isActive, name, dateFrom, dateTo } = getValues();

    if (currentSort.sortBy == sortBy) {
      const newOrder = currentSort.order === "asc" ? "desc" : "asc";
      request(
        "GET",
        searchQueryHandler(
          page,
          perPage,
          sortBy,
          newOrder,
          isActive,
          name,
          dateTo
        )
      );
      setCurrentSort({ sortBy, order: newOrder });
    } else {
      request(
        "GET",
        searchQueryHandler(
          page,
          perPage,
          sortBy,
          "desc",
          isActive,
          name,
          dateFrom,
          dateTo
        )
      );
      setCurrentSort({ sortBy, order: "desc" });
    }
  };

  const changeStatusHandler = (id) => {
    const user = seekers.find((seeker) => seeker._id == id);
    const status = !user.isActive;

    MySwal.fire({
      title: "Are you sure?",
      text: "Want to change this status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        requestChangeStatus("PUT", "pricing-new/country/category/status", {
          id,
          status,
        });
      } else if (result.isDismissed) {
      }
    });
  };

  const InputFields = [
    {
      label: "Name",
      name: "name",
      required: false,
    },
    // {
    //   isSelectInput: true,
    //   label: "Country",
    //   name: "country",
    //   required: false,
    //   children: allCountry && allCountry.length > 0 && (
    //     <>
    //       <option value="">{"Select an option"}</option>
    //       {allCountry.map((obj) => (
    //         <option key={obj._id} value={obj._id}>
    //           {" "}
    //           {obj.name}
    //         </option>
    //       ))}
    //     </>
    //   ),
    // },
    // {
    //   isSelectInput: true,
    //   label: "Vendor",
    //   name: "vendor",
    //   required: false,
    //   children: allVendors && allVendors.length > 0 && (
    //     <>
    //       <option value="">{"Select an option"}</option>
    //       {allVendors.map((obj) => (
    //         <option key={obj._id} value={obj._id}>
    //           {" "}
    //           {obj.businessName}
    //         </option>
    //       ))}
    //     </>
    //   ),
    // },
    {
      isSelectInput: true,
      label: "Status",
      name: "isActive",
      required: false,
      children: (
        <>
          <option value="">{"Select an option"}</option>
          <option value={true}> {"Activated"}</option>
          <option value={false}>{"Deactivated"}</option>
        </>
      ),
    },
    {
      label: "Date From",
      name: "dateFrom",
      isDate: true,
      clearErrors,
    },
    {
      label: "Date To",
      name: "dateTo",
      isDate: true,
      clearErrors,
      otherRegisterFields: {
        manual: true,
        feedback: "'To Date' cannot be smaller than 'From Date'",
      },
    },
  ];

  return (
    <div
      className="content  d-flex flex-column flex-column-fluid"
      id="kt_content"
    >
      <Breadcrumb
        title={
          type == "customer"
            ? "Customer Groups Pricing"
            : type == "specific"
            ? "Product Pricing"
            : "Product Groups Pricing"
        }
        // title="Customer Groups Pricing"
        links={[
          { to: "/", name: "Dashboard" },
          {
            to: `/country-pricing`,
            name: "Back To Country Pricing",
          },
          // { to: "/pricing-setting/country-pricing", name: "Countries" },
          // {
          //   to: `/pricing-setting/country-pricing/one/${parentId}`,
          //   name: "Back To Country Pricing",
          // },
        ]}
      />

      <div className="d-flex flex-column-fluid">
        <div className=" container ">
          <div className="row">
            <div className="col-12">
              <div className="card card-custom card-stretch card-shadowless">
                <div className="card-header">
                  <div className="card-title"></div>
                  <div className="card-toolbar">
                    {/* <a
                      className="btn btn-primary dropdown-toggle mr-2"
                      data-toggle="collapse"
                      data-target="#collapseOne6"
                    >
                      Search
                    </a> */}

                    {((roleId === 2 && !!permission["7_2"]) || roleId == 1) && (
                      <Link
                        to={`/country-pricing/${type}/add/${countryId}`}
                        className="btn btn-primary"
                      >
                        Add{" "}
                        {type == "customer"
                          ? "Customer Groups"
                          : type == "specific"
                          ? "Product"
                          : "Product Groups"}{" "}
                        Pricing
                      </Link>
                    )}
                  </div>
                </div>
                <div className="card-body">
                  <div
                    className="accordion accordion-solid accordion-toggle-plus"
                    id="accordionExample6"
                  >
                    <div
                      id="collapseOne6"
                      className="collapse"
                      data-parent="#accordionExample6"
                    >
                      <div>
                        <form
                          onSubmit={handleSubmit(onSearchHandler)}
                          className="kt-form kt-form--fit mb-0"
                        >
                          <div className="row mb-6">
                            {InputFields.map((inputMain, index) => (
                              <SearchInput
                                key={index}
                                {...inputMain}
                                errors={errors}
                                register={register}
                              />
                            ))}
                          </div>

                          <SearchSubmitButton
                            handleSubmit={handleSubmit}
                            onSearchHandler={onSearchHandler}
                            onResetHandler={onResetHandler}
                          />
                        </form>
                        <hr />
                      </div>
                    </div>
                  </div>
                  <div className="dataTables_wrapper ">
                    <Table
                      currentSort={currentSort}
                      sortingHandler={sortingHandler}
                      mainData={seekers}
                      tableHeading={Object.keys(OBJ_TABLE)}
                      tableData={Object.values(OBJ_TABLE)}
                      links={[
                        // {
                        //   isLink: true,
                        //   to: `/wallet/view`,
                        //   name: "Wallet",
                        //   extraData: true,
                        // },
                        {
                          isLink: false,
                          name: "Deactivate",
                          click: changeStatusHandler,
                          title: "Click To Activate",
                          key: "7_3",
                        },
                        {
                          isLink: false,
                          name: "Activate",
                          click: changeStatusHandler,
                          title: "Click To Deactivate",
                          key: "7_3",
                        },
                        // {
                        //   isLink: true,
                        //   //   to: "/pricing-setting/system-pricing/view",
                        //   to: `/pricing-setting/system-pricing/${type}-group/view/${type}/${parentId}`,
                        //   name: "View",
                        //   extraData: true,
                        //   key: "7_4",
                        // },
                        // "/pricing-setting/system-pricing/view-customer-group/customer"
                        // pricing-setting/system-pricing/customer-group/edit-customer/:type/:parentId
                        {
                          isLink: true,
                          to: `/country-pricing/${type}/edit/${countryId}`,
                          name: "Edit",
                          extraData: true,
                          key: "7_5",
                        },

                        {
                          isLink: false,
                          name: "Delete",
                          click: deleteHandler,
                          key: "7_6",
                        },
                        // {
                        //   isLink: true,
                        //   to: "/users/change-password",
                        //   name: "ChangePassword",
                        //   extraData: true,
                        //   title: "Change Password",
                        // },
                        // {
                        //   isLink: false,
                        //   name: "SendCreds",
                        //   click: sendCredentials,
                        //   title: "Send Credentials",
                        // },
                        // {
                        //   isLink: false,
                        //   name: "Login",
                        //   click: loginUser,
                        //   title: "Login",
                        // },
                      ]}
                      onlyDate={{
                        createdAt: "date",
                        startDate: "dateTime",
                        endDate: "dateTime",
                      }}
                    />

                    {perPage !== 0 && (
                      <Pagination
                        page={page}
                        totalDocuments={totalDocuments}
                        getNewData={fetchMoreData}
                        perPage={perPage}
                        defaultPerPage={records_per_page}
                        perPageChangeHandler={perPageChangeHandler}
                        currentDocLength={seekers.length}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerGroups;
