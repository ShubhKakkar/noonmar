import React, { useState } from "react";
import { Store } from "../../../util/Svg";

export const Sidebar = ({ variants, subVariants, setIsSidebarOpen }) => {
  const sibebarClickHandler = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="product_left_box">
      <button
        onClick={sibebarClickHandler}
        type="button"
        className="inner_slide_btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <polygon points="0 0 24 0 24 24 0 24"></polygon>
            <path
              d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"
              fill="#000000"
              fill-rule="nonzero"
              transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999) "
            ></path>
            <path
              d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"
              fill="#000000"
              fill-rule="nonzero"
              opacity="0.3"
              transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999) "
            ></path>
          </g>
        </svg>
      </button>
      <ul className={`nav flex-column product_navbar nav-pills `}>
        <li className="nav-item">
          <a
            className="tablnk nav-link active"
            data-tabid={1}
            data-toggle="tab"
            href="#kt_tab_pane_1"
          >
            <span className="product_icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6652 2.33015C14.843 2.24123 15.0489 2.22658 15.2375 2.28939C15.4262 2.35221 15.5822 2.48737 15.6712 2.66515L17.8722 7.06715C19.2252 7.17115 20.0742 7.43715 20.6222 8.11415C21.0582 8.65315 21.1982 9.32315 21.1472 10.2501H2.85319C2.80219 9.32315 2.94319 8.65315 3.37819 8.11415C3.92619 7.43615 4.77519 7.17115 6.12819 7.06715L8.3292 2.66515C8.41897 2.48878 8.57481 2.35504 8.76276 2.29307C8.95071 2.23111 9.15554 2.24594 9.3326 2.33434C9.50966 2.42274 9.64461 2.57754 9.70803 2.76501C9.77146 2.95247 9.75821 3.1574 9.67119 3.33515L7.83619 7.00515C8.3192 7.00015 8.84619 7.00015 9.42219 7.00015H14.5782C15.1542 7.00015 15.6812 7.00015 16.1642 7.00515L14.3292 3.33515C14.2404 3.15719 14.2258 2.95122 14.2889 2.76256C14.3519 2.5739 14.4872 2.419 14.6652 2.33015Z" fill="#888888"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.55541 14.257C3.37094 13.4243 3.20092 12.5885 3.04541 11.75H20.9554C20.7998 12.5885 20.6298 13.4243 20.4454 14.257L20.0164 16.257C19.5294 18.53 19.2864 19.666 18.4614 20.333C17.6364 21 16.4744 21 14.1504 21H9.85041C7.52641 21 6.36441 21 5.54041 20.333C4.71441 19.666 4.47041 18.53 3.98441 16.257L3.55541 14.257ZM10.0004 13.25C9.8015 13.25 9.61073 13.329 9.47008 13.4697C9.32943 13.6103 9.25041 13.8011 9.25041 14C9.25041 14.1989 9.32943 14.3897 9.47008 14.5303C9.61073 14.671 9.8015 14.75 10.0004 14.75H14.0004C14.1993 14.75 14.3901 14.671 14.5307 14.5303C14.6714 14.3897 14.7504 14.1989 14.7504 14C14.7504 13.8011 14.6714 13.6103 14.5307 13.4697C14.3901 13.329 14.1993 13.25 14.0004 13.25H10.0004Z" fill="#888888"/>
            </svg>
            </span>
            <span className="product_text"> Product Information </span>
          </a>{" "}
        </li>
        <li className="nav-item">
          <a
            className="tablnk nav-link "
            data-tabid={11}
            data-toggle="tab"
            href="#kt_tab_pane_11"
          >
            <span className="product_icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.87 15.07L10.33 12.56L10.36 12.53C12.0541 10.6471 13.3199 8.41925 14.07 6H17V4H10V2H8V4H1V5.99H12.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8H4.69C5.42 9.63 6.42 11.17 7.67 12.56L2.58 17.58L4 19L9 14L12.11 17.11L12.87 15.07ZM18.5 10H16.5L12 22H14L15.12 19H19.87L21 22H23L18.5 10ZM15.88 17L17.5 12.67L19.12 17H15.88Z" fill="#888888"/>
            </svg>
               </span>
            <span className="product_text"> Translated Info</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="tablnk nav-link"
            data-tabid={2}
            data-toggle="tab"
            href="#kt_tab_pane_2"
          >
            <span className="product_icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_590_21893)">
              <path d="M23.2657 0.485759C23.196 0.312374 23.0623 0.172503 22.8921 0.0952456C22.722 0.0179882 22.5287 0.00929232 22.3523 0.070967C22.1759 0.132642 22.0301 0.259938 21.9452 0.426375C21.8603 0.592811 21.8429 0.785573 21.8965 0.964559C23.0113 4.16856 20.7985 6.56136 19.1113 7.84296L18.4297 6.86616C18.2005 6.53856 17.6881 6.26616 17.2897 6.26136L13.4641 6.27816C12.9967 6.29227 12.5419 6.43241 12.1477 6.68376L0.874857 14.5882C0.612651 14.7727 0.43424 15.0536 0.378688 15.3693C0.323135 15.6851 0.394968 16.01 0.578457 16.273L5.70126 23.6026C6.08526 24.1486 6.69846 24.0826 7.24566 23.701L18.5185 15.7954C18.8425 15.5662 19.2169 15.0718 19.3489 14.6938L20.5465 10.9198C20.6785 10.543 20.5981 9.96816 20.3689 9.64056L19.9537 9.04536C22.2193 7.30896 24.5713 4.24056 23.2657 0.485759ZM18.0205 11.7154C17.8128 11.8607 17.5785 11.9638 17.331 12.0185C17.0835 12.0733 16.8276 12.0788 16.578 12.0347C16.3284 11.9906 16.0899 11.8977 15.8762 11.7614C15.6625 11.625 15.4777 11.4479 15.3325 11.2402C15.0384 10.8197 14.9231 10.2998 15.012 9.79452C15.1008 9.28921 15.3866 8.83981 15.8065 8.54496C16.1356 8.31434 16.5286 8.19233 16.9305 8.19599C17.3324 8.19965 17.7231 8.32879 18.0481 8.56536C17.7217 8.76216 17.4973 8.87736 17.4553 8.89536C17.3065 8.96629 17.1863 9.08563 17.1142 9.23385C17.0422 9.38206 17.0226 9.55035 17.0587 9.71114C17.0948 9.87193 17.1845 10.0157 17.313 10.1188C17.4415 10.222 17.6013 10.2785 17.7661 10.279C17.8693 10.279 17.9749 10.255 18.0745 10.2082C18.3073 10.0978 18.5569 9.96696 18.8173 9.81216C18.8772 10.1722 18.8341 10.5419 18.6932 10.8786C18.5522 11.2153 18.319 11.5054 18.0205 11.7154Z" fill="#888888"/>
              </g>
              <defs>
              <clipPath id="clip0_590_21893">
              <rect width="24" height="24" fill="white"/>
              </clipPath>
              </defs>
              </svg>
              </span>
            <span className="product_text"> Prices </span>
          </a>
        </li>
        {/* <li className="nav-item">
          <a
            className="tablnk nav-link"
            data-tabid={3}
            data-toggle="tab"
            href="#kt_tab_pane_3"
          >
            About
          </a>
        </li> */}
        {/* <li className="nav-item">
          <a
            className="tablnk nav-link"
            data-tabid={4}
            data-toggle="tab"
            href="#kt_tab_pane_4"
          >
            Taxes
          </a>
        </li> */}
        <li className="nav-item">
          <a
            className="tablnk nav-link"
            data-tabid={5}
            data-toggle="tab"
            href="#kt_tab_pane_5"
          >
            <span className="product_icon"> 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.3 8.9L22.5 12.1L21.1 13.5L17.9 10.3C17.55 10.5 17.175 10.6667 16.775 10.8C16.375 10.9333 15.95 11 15.5 11C14.25 11 13.1877 10.5623 12.313 9.687C11.4383 8.81167 11.0007 7.74933 11 6.5C11 5.25 11.4377 4.18733 12.313 3.312C13.1883 2.43667 14.2507 1.99933 15.5 2C16.75 2 17.8127 2.43767 18.688 3.313C19.5633 4.18833 20.0007 5.25067 20 6.5C20 6.95 19.9333 7.375 19.8 7.775C19.6667 8.175 19.5 8.55 19.3 8.9ZM15.5 9C16.2 9 16.7917 8.75833 17.275 8.275C17.7583 7.79167 18 7.2 18 6.5C18 5.8 17.7583 5.20833 17.275 4.725C16.7917 4.24167 16.2 4 15.5 4C14.8 4 14.2083 4.24167 13.725 4.725C13.2417 5.20833 13 5.8 13 6.5C13 7.2 13.2417 7.79167 13.725 8.275C14.2083 8.75833 14.8 9 15.5 9ZM17.45 12.7L20 15.25V20C20 20.55 19.804 21.021 19.412 21.413C19.02 21.805 18.5493 22.0007 18 22H4C3.45 22 2.979 21.804 2.587 21.412C2.195 21.02 1.99934 20.5493 2 20V6C2 5.45 2.196 4.979 2.588 4.587C2.98 4.195 3.45067 3.99933 4 4H9.5C9.31667 4.41667 9.19167 4.846 9.125 5.288C9.05834 5.73 9.025 6.16733 9.025 6.6C9.025 8.41667 9.66667 9.93333 10.95 11.15C12.2333 12.3667 13.7583 12.975 15.525 12.975C15.8417 12.975 16.1583 12.954 16.475 12.912C16.7917 12.87 17.1167 12.7993 17.45 12.7Z" fill="#888888"/>
              </svg>
            </span>
            <span className="product_text"> Feature or Specification </span>
          </a>
        </li>
        {/* <li className="nav-item">
          <a
            className="tablnk nav-link"
            data-tabid={12}
            data-toggle="tab"
            href="#kt_tab_pane_12"
          >
            Frequently Asked Questions
          </a>
        </li> */}

        <li className="nav-item">
          <a
            className="tablnk nav-link"
            data-tabid={6}
            data-toggle="tab"
            href="#kt_tab_pane_6"
          >
            <span className="product_icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 20C5.16667 20 4.45833 19.7083 3.875 19.125C3.29167 18.5417 3 17.8333 3 17H1V4H17V8H20L23 12V17H21C21 17.8333 20.7083 18.5417 20.125 19.125C19.5417 19.7083 18.8333 20 18 20C17.1667 20 16.4583 19.7083 15.875 19.125C15.2917 18.5417 15 17.8333 15 17H9C9 17.8333 8.70833 18.5417 8.125 19.125C7.54167 19.7083 6.83333 20 6 20ZM6 18C6.28333 18 6.521 17.904 6.713 17.712C6.905 17.52 7.00067 17.2827 7 17C7 16.7167 6.904 16.479 6.712 16.287C6.52 16.095 6.28267 15.9993 6 16C5.71667 16 5.479 16.096 5.287 16.288C5.095 16.48 4.99933 16.7173 5 17C5 17.2833 5.096 17.521 5.288 17.713C5.48 17.905 5.71733 18.0007 6 18ZM18 18C18.2833 18 18.521 17.904 18.713 17.712C18.905 17.52 19.0007 17.2827 19 17C19 16.7167 18.904 16.479 18.712 16.287C18.52 16.095 18.2827 15.9993 18 16C17.7167 16 17.479 16.096 17.287 16.288C17.095 16.48 16.9993 16.7173 17 17C17 17.2833 17.096 17.521 17.288 17.713C17.48 17.905 17.7173 18.0007 18 18ZM17 13H21.25L19 10H17V13Z" fill="#888888"/>
              </svg>  
            </span>
            <span className="product_text"> Shipping Specifications </span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="tablnk nav-link "
            data-tabid={7}
            data-toggle="tab"
            href="#kt_tab_pane_7"
          >
            <span className="product_icon"> 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0001 17H8.00097C4.68727 17 2.00098 14.3137 2.00098 11C2.00098 7.68629 4.68727 5 8.00097 5H16.0001C19.3138 5 22.0001 7.68629 22.0001 11C22.0001 14.3137 19.3138 17 16.0001 17H14.0001M14.0001 17L17.0001 20M14.0001 17L17.0001 14" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span className="product_text"> Alternate Products </span>
          </a>
        </li>
        {/* <li className="nav-item">
          <a
            className="tablnk nav-link"
            data-tabid={8}
            data-toggle="tab"
            href="#kt_tab_pane_8"
          >
            Product Meta
          </a>
        </li> */}
        <li className="nav-item">
          <a
            className="tablnk nav-link"
            data-tabid={9}
            data-toggle="tab"
            href="#kt_tab_pane_9"
          >
            <span className="product_icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 3.75H4.5C4.30109 3.75 4.11032 3.82902 3.96967 3.96967C3.82902 4.11032 3.75 4.30109 3.75 4.5V19.5C3.75 19.6989 3.82902 19.8897 3.96967 20.0303C4.11032 20.171 4.30109 20.25 4.5 20.25H19.5C19.6989 20.25 19.8897 20.171 20.0303 20.0303C20.171 19.8897 20.25 19.6989 20.25 19.5V4.5C20.25 4.30109 20.171 4.11032 20.0303 3.96967C19.8897 3.82902 19.6989 3.75 19.5 3.75ZM4.5 1.5C3.70435 1.5 2.94129 1.81607 2.37868 2.37868C1.81607 2.94129 1.5 3.70435 1.5 4.5V19.5C1.5 20.2956 1.81607 21.0587 2.37868 21.6213C2.94129 22.1839 3.70435 22.5 4.5 22.5H19.5C20.2956 22.5 21.0587 22.1839 21.6213 21.6213C22.1839 21.0587 22.5 20.2956 22.5 19.5V4.5C22.5 3.70435 22.1839 2.94129 21.6213 2.37868C21.0587 1.81607 20.2956 1.5 19.5 1.5H4.5ZM18 16.2855L14.25 12L10.536 16.245L8.25 13.5L6 16.2V18H18V16.2855ZM9.75 12C10.3467 12 10.919 11.7629 11.341 11.341C11.7629 10.919 12 10.3467 12 9.75C12 9.15326 11.7629 8.58097 11.341 8.15901C10.919 7.73705 10.3467 7.5 9.75 7.5C9.15326 7.5 8.58097 7.73705 8.15901 8.15901C7.73705 8.58097 7.5 9.15326 7.5 9.75C7.5 10.3467 7.73705 10.919 8.15901 11.341C8.58097 11.7629 9.15326 12 9.75 12Z" fill="#888888"/>
            </svg>  
            </span>
            <span className="product_text"> Media </span>
          </a>
        </li>
        {false && variants.length > 0 && (
          <li className="nav-item">
            <a
              className="tablnk nav-link "
              data-tabid={10}
              data-toggle="tab"
              href="#kt_tab_pane_10"
            >
              <span className="product_icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.97192 20.6224C7.62667 20.1913 7.69624 19.562 8.12731 19.2167C8.55838 18.8715 9.18771 18.9411 9.53296 19.3721C10.8544 21.022 12.8458 22 15 22C18.866 22 22 18.866 22 15C22 12.8458 21.022 10.8544 19.3721 9.53296C18.9411 9.18771 18.8715 8.55838 19.2167 8.12731C19.562 7.69624 20.1913 7.62667 20.6224 7.97192C22.7413 9.66896 24 12.2321 24 15C24 19.9706 19.9706 24 15 24C12.2321 24 9.66896 22.7413 7.97192 20.6224ZM9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16ZM8.10183 13.8027C8.00812 14.347 7.49093 14.7122 6.94665 14.6185C6.40238 14.5248 6.03712 14.0076 6.13083 13.4634C6.77476 9.72328 9.72328 6.77476 13.4634 6.13083C14.0076 6.03712 14.5248 6.40238 14.6185 6.94665C14.7122 7.49093 14.347 8.00812 13.8027 8.10183C10.8971 8.60209 8.60209 10.8971 8.10183 13.8027Z" fill="#888888"/>
                </svg>

                </span>
              <span className="product_text"> Old Variant </span>
            </a>
          </li>
        )}

        {variants.length > 0 && (
          <li className="nav-item">
            <a
              className="tablnk nav-link"
              data-tabid={12}
              data-toggle="tab"
              href="#kt_tab_pane_12"
            >
              <span className="product_icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.97192 20.6224C7.62667 20.1913 7.69624 19.562 8.12731 19.2167C8.55838 18.8715 9.18771 18.9411 9.53296 19.3721C10.8544 21.022 12.8458 22 15 22C18.866 22 22 18.866 22 15C22 12.8458 21.022 10.8544 19.3721 9.53296C18.9411 9.18771 18.8715 8.55838 19.2167 8.12731C19.562 7.69624 20.1913 7.62667 20.6224 7.97192C22.7413 9.66896 24 12.2321 24 15C24 19.9706 19.9706 24 15 24C12.2321 24 9.66896 22.7413 7.97192 20.6224ZM9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16ZM8.10183 13.8027C8.00812 14.347 7.49093 14.7122 6.94665 14.6185C6.40238 14.5248 6.03712 14.0076 6.13083 13.4634C6.77476 9.72328 9.72328 6.77476 13.4634 6.13083C14.0076 6.03712 14.5248 6.40238 14.6185 6.94665C14.7122 7.49093 14.347 8.00812 13.8027 8.10183C10.8971 8.60209 8.60209 10.8971 8.10183 13.8027Z" fill="#888888"/>
                  </svg>
                </span>
              <span className="product_text"> Variant </span>
            </a>
          </li>
        )}

        {false && subVariants.length > 0 && (
          <li className="nav-item">
            <a
              className="tablnk nav-link "
              data-tabid={11}
              data-toggle="tab"
              href="#kt_tab_pane_11"
            >
              <span className="product_icon"> 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.97192 20.6224C7.62667 20.1913 7.69624 19.562 8.12731 19.2167C8.55838 18.8715 9.18771 18.9411 9.53296 19.3721C10.8544 21.022 12.8458 22 15 22C18.866 22 22 18.866 22 15C22 12.8458 21.022 10.8544 19.3721 9.53296C18.9411 9.18771 18.8715 8.55838 19.2167 8.12731C19.562 7.69624 20.1913 7.62667 20.6224 7.97192C22.7413 9.66896 24 12.2321 24 15C24 19.9706 19.9706 24 15 24C12.2321 24 9.66896 22.7413 7.97192 20.6224ZM9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16ZM8.10183 13.8027C8.00812 14.347 7.49093 14.7122 6.94665 14.6185C6.40238 14.5248 6.03712 14.0076 6.13083 13.4634C6.77476 9.72328 9.72328 6.77476 13.4634 6.13083C14.0076 6.03712 14.5248 6.40238 14.6185 6.94665C14.7122 7.49093 14.347 8.00812 13.8027 8.10183C10.8971 8.60209 8.60209 10.8971 8.10183 13.8027Z" fill="#888888"/>
                  </svg>
              </span>
              <span className="product_text"> Variant Media </span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};