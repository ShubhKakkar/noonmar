import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Moment from "moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import useRequest from "../../../hooks/useRequest";
import Pagination from "../../Pagination/Pagination";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import Table from "../../Table/Table";
import { SearchInput, SearchSubmitButton } from "../../Form/Form";
import { addOneToDate } from "../../../util/fn";

const OBJ_TABLE = {
  name: "name",
  "created at": "createdAt",
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

  dateTo = dateTo ? addOneToDate(new Date(dateTo)) : addOneToDate(new Date());

  return `country/all?page=${page}&per_page=${per_page}&sortBy=${sortBy}&order=${order}&isActive=${isActive}&name=${name}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
};

const ViewAll = () => {
  const [seekers, setSeekers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(10);
  const [perPage, setPerPage] = useState(0);
  const [currentSort, setCurrentSort] = useState({
    sortBy: "name",
    order: "asc",
  });

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
    document.title = "Countries- Noonmar";
  }, [records_per_page]);

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
      toast.success("Country has been deleted successfully.");
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
      text: "You want to delete this country?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        requestDelete("DELETE", "country", { id });
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
        requestChangeStatus("PUT", "country/status", {
          id,
          status,
        });
      } else if (result.isDismissed) {
      }
    });
  };

  const InputFields = [
    // {
    //   label: "Status",
    //   name: "isActive",
    //   required: false,
    // },
    {
      label: "Name",
      name: "name",
      required: false,
    },
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
      <Breadcrumb title="Countries" links={[{ to: "/", name: "Dashboard" }]} />

      <div className="d-flex flex-column-fluid">
        <div className=" container ">
          <div className="row">
            <div className="col-12">
              <div className="card card-custom card-stretch card-shadowless">
                <div className="card-header">
                  <div className="card-title"></div>
                  <div className="card-toolbar">
                    <a
                      /*href="#!"*/
                      className="btn btn-primary dropdown-toggle mr-2"
                      data-toggle="collapse"
                      data-target="#collapseOne6"
                    >
                      Search
                    </a>
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
                        {
                          isLink: true,
                          to: "/country-pricing/data",
                          name: "Tax",
                          title: "View Pricing",
                          extraData: true,
                          key: "12_87",
                        },
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

export default ViewAll;
