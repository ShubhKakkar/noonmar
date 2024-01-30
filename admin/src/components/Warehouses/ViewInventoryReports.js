import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Moment from "moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import useRequest from "../../hooks/useRequest";
import Pagination from "../Pagination/Pagination";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Table from "../Table/Table";
import { SearchInput, SearchSubmitButton } from "../Form/Form";
import { addOneToDate } from "../../util/fn";

const OBJ_TABLE = {
  "Product Name": "productName",
  // vendor: "vendor",
  quantity: "quantity",
  "real quantity": "realQuantity",
  "created at": "createdAt",
  Adjust: "hideAdjustButton",
  //status: "isActive",
};

const ViewInventoryReports = (props) => {
  const { id: warehouseId } = props.match.params;

  const searchQueryHandler = (
    page,
    per_page,
    sortBy,
    order,
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

    dateTo = dateTo ? addOneToDate(new Date(dateTo)) : addOneToDate(new Date());

    return `warehouse/inventory-report/${warehouseId}?page=${page}&per_page=${per_page}&sortBy=${sortBy}&order=${order}&name=${name}&dateFrom=${dateFrom}&dateTo=${dateTo}&role=customer`;
  };

  const [report, setreport] = useState([]);
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
  const { request: requestAdjust, response: responseAdjust } = useRequest();

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
    document.title = "Inventory Report Products - Noonmar";
  }, [records_per_page]);

  useEffect(() => {
    if (response) {
      setreport(response.products);
      setTotalDocuments((prev) => response.totalDocuments ?? prev);
    }
  }, [response]);

  useEffect(() => {
    // requestCountries("GET", `country/all?page=1&isActive=${true}`);
    // requestVendors("GET", `vendor/all?page=1&isActive=${true}&per_page=100`);
  }, []);

  // useEffect(() => {
  //   if (responseCountries) {
  //     if (responseCountries.status && responseCountries.data) {
  //       setAllCountry(responseCountries.data);
  //     }
  //   }
  // }, [responseCountries]);

  // useEffect(() => {
  //   if (responseVendors) {
  //     if (responseVendors.status && responseVendors.vendors) {
  //       setAllVendors(responseVendors.vendors);
  //     }
  //   }
  // }, [responseVendors]);

  useEffect(() => {
    if (responseChangeStatus) {
      const { id, status } = responseChangeStatus;

      const oldreport = [...report];
      const indexToChange = oldreport.findIndex((seeker) => seeker._id == id);
      oldreport[indexToChange].isActive = status;

      setreport(oldreport);
    }
  }, [responseChangeStatus]);

  useEffect(() => {
    if (responseAdjust) {
      toast.success(responseAdjust.message);
      request(
        "GET",
        `warehouse/inventory-report/${warehouseId}?page=1&per_page=10`
      );
    }
  }, [responseAdjust]);

  useEffect(() => {
    if (responseDelete) {
      const { id } = responseDelete;
      let newSeeker = [...report];
      newSeeker = newSeeker.filter((seeker) => seeker._id != id);
      setreport(newSeeker);
      toast.success("Inventory Report deleted successfully.");
    }
  }, [responseDelete]);

  const fetchMoreData = ({ selected }) => {
    setreport([]);
    const { name, dateFrom, dateTo } = getValues();

    setPage(selected + 1);
    request(
      "GET",
      searchQueryHandler(
        selected + 1,
        perPage,
        currentSort.sortBy,
        currentSort.order,

        name,

        dateFrom,
        dateTo
      )
    );
  };

  const deleteHandler = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to delete this report?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        requestDelete("DELETE", "warehouse/inventory-reports", { id });
      } else if (result.isDismissed) {
      }
    });
  };

  const onSearchHandler = (data) => {
    const { name, dateFrom, dateTo } = getValues();

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
    resetField("vendor");
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
    const { name, dateFrom, dateTo } = getValues();

    request(
      "GET",
      searchQueryHandler(
        1,
        event.target.value,
        currentSort.sortBy,
        currentSort.order,

        name,

        dateFrom,
        dateTo
      )
    );
    setPage(1);

    setPerPage(event.target.value);
  };

  const sortingHandler = (sortBy) => {
    const { name, dateFrom, dateTo } = getValues();

    if (currentSort.sortBy == sortBy) {
      const newOrder = currentSort.order === "asc" ? "desc" : "asc";
      request(
        "GET",
        searchQueryHandler(
          page,
          perPage,
          sortBy,
          newOrder,

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

          name,

          dateFrom,
          dateTo
        )
      );
      setCurrentSort({ sortBy, order: "desc" });
    }
  };

  const changeStatusHandler = (id) => {
    const user = report.find((seeker) => seeker._id == id);
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
        requestChangeStatus("PUT", "warehouse/inventory-reports", {
          id,
          status,
        });
      } else if (result.isDismissed) {
      }
    });
  };

  const adjustHandler = (ids, type) => {
    let data = [];

    if (type === "single") {
      data.push(ids);
    } else {
      report.forEach((item) => {
        if (!item.hideAdjustButton) {
          data.push(item._id);
        }
      });
    }
    if (data.length === 0) {
      toast.error("There is no product to adjust.");
      return;
    }
    requestAdjust("PUT", "warehouse/adjust-products", { ids: data });
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
    // {
    //   isSelectInput: true,
    //   label: "Status",
    //   name: "isActive",
    //   required: false,
    //   children: (
    //     <>
    //       <option value="">{"Select an option"}</option>
    //       <option value={true}> {"Activated"}</option>
    //       <option value={false}>{"Deactivated"}</option>
    //     </>
    //   ),
    // },
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
        title="Inventory Report Products"
        links={[{ to: "/", name: "Dashboard" }]}
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
                      href="#!"
                      className="btn btn-primary dropdown-toggle mr-2"
                      data-toggle="collapse"
                      data-target="#collapseOne6"
                    >
                      Search
                    </a> */}
                    {/* <Link to="" className="btn btn-primary mr-2">
                      Filters
                    </Link> */}

                    <button
                      className="btn btn-primary"
                      onClick={() => adjustHandler(null, "multiple")}
                      type="button"
                    >
                      Adjust All
                    </button>
                    {/* {((roleId === 2 && !!permission["7_2"]) || roleId == 1) && (
                      <Link to="/warehouse/add" className="btn btn-primary">
                        Add Inventory Report
                      </Link>
                    )}  */}
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
                      mainData={report}
                      tableHeading={Object.keys(OBJ_TABLE)}
                      tableData={Object.values(OBJ_TABLE)}
                      renderAs={{
                        hideAdjustButton: (data, id) =>
                          !data ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => adjustHandler(id, "single")}
                            >
                              Adjust
                            </button>
                          ) : (
                            "-"
                          ),
                      }}
                      links={
                        [
                          // {
                          //   isLink: true,
                          //   to: `/wallet/view`,
                          //   name: "Wallet",
                          //   extraData: true,
                          // },
                          // {
                          //   isLink: false,
                          //   name: "Deactivate",
                          //   click: changeStatusHandler,
                          //   title: "Click To Activate",
                          //   key: "7_3",
                          // },
                          // {
                          //   isLink: false,
                          //   name: "Activate",
                          //   click: changeStatusHandler,
                          //   title: "Click To Deactivate",
                          //   key: "7_3",
                          // },
                          // {
                          //   isLink: true,
                          //   to: "/warehouse/view",
                          //   name: "View",
                          //   extraData: true,
                          //   key: "7_4",
                          // },
                          // {
                          //   isLink: true,
                          //   to: "/warehouse/edit",
                          //   name: "Edit",
                          //   extraData: true,
                          //   key: "7_5",
                          // },
                          // {
                          //   isLink: true,
                          //   to: "",
                          //   name: "Read",
                          //   title: "View Inventory Reports",
                          //   extraData: true,
                          //   key: "",
                          // },
                          // {
                          //   isLink: true,
                          //   to: "/warehouse/add-products",
                          //   name: "Add Product",
                          //   title: "Inventory",
                          //   key: "7_8",
                          // },
                          // {
                          //   isLink: true,
                          //   to: "/warehouse/logs",
                          //   name: "Warehouse Logs",
                          //   title: "Logs",
                          //   key: "7_9",
                          // },
                          // {
                          //   isLink: true,
                          //   to: "/warehouse/inventory-reports",
                          //   name: "Inventory Reports",
                          //   title: "Inventory-Reports",
                          //   key: "7_10",
                          // },
                          // {
                          //   isLink: false,
                          //   name: "Delete",
                          //   click: deleteHandler,
                          //   key: "7_6",
                          // },
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
                        ]
                      }
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
                        currentDocLength={report.length}
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

export default ViewInventoryReports;
