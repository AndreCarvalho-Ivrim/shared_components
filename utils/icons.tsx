import { ReactNode } from "react";
import { AvailableIcons } from "../../shared-types/icon.type";
import isac from "../assets/IconsGeo_Prancheta 2.svg"
import vision from "../assets/IconsGeo_Prancheta 3.svg"
import report from "../assets/IconsGeo_Prancheta 1.svg"
import dashboard from "../assets/IconsGeo_Prancheta 4.svg"

export interface IconProps { w?: string | number, h?: string | number, className?: string, color?: string }
export const ChevronDownIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className}
    viewBox="0 0 24 24" style={{
      fill: props.color ?? 'currentColor'
    }}
  ><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
);
export const ChevronUpDownIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x-description="Heroicon name: mini/chevron-up-down"
    width={props.w ?? "20"} height={props.h ?? "20"}
    className={props.className ?? ''}
    viewBox="0 0 20 20" style={{
      fill: props.color ?? 'currentColor'
    }}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
      clipRule="evenodd"
    ></path>
  </svg>
);
export const ChevronsRightIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "20"} height={props.h ?? "20"}
    className={props.className ?? ''}
    viewBox="0 0 24 24"
    style={{
      fill: props.color ?? 'currentColor'
    }}
  >
    <path d="M10.296 7.71 14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z"></path>
    <path d="M6.704 6.29 5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z"></path>
  </svg>
);
export const ArrowRightIcon = (props: IconProps) => (
  <svg
    width={props.w ?? '6'}
    height={props.h ?? '9'}
    className={props.className}
    viewBox="0 0 6 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.51133 5.13565C5.82872 4.78408 5.82872 4.21315 5.51133 3.86158L2.26133 0.261584C2.02774 0.00283432 1.67989 -0.073103 1.3752 0.067522C1.07051 0.208147 0.872467 0.534397 0.872467 0.900023L0.875006 8.10002C0.875006 8.46283 1.07305 8.7919 1.37774 8.93252C1.68243 9.07315 2.03028 8.9944 2.26387 8.73846L5.51387 5.13846L5.51133 5.13565Z" fill={props.color ?? "currentColor"} />
  </svg>
);
export const ArrowDownCircleIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className}
    style={{ fill: props.color ?? 'currentColor' }}
  ><path d="M12 1.993C6.486 1.994 2 6.48 2 11.994c0 5.513 4.486 9.999 10 10 5.514 0 10-4.486 10-10s-4.485-10-10-10.001zm0 18.001c-4.411-.001-8-3.59-8-8 0-4.411 3.589-8 8-8.001 4.411.001 8 3.59 8 8.001s-3.589 8-8 8z"></path><path d="M13 8h-2v4H7.991l4.005 4.005L16 12h-3z"></path></svg>
);
export const CloseIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className}
    viewBox="0 0 24 24" style={{
      fill: 'currentColor'
    }}
  >
    <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
  </svg>
);
export const TrashIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className}
    viewBox="0 0 24 24" style={{
      fill: 'currentColor'
    }}
  >
    <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
  </svg>
);
export const PlusIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className}
    viewBox="0 0 24 24" style={{
      fill: 'currentColor'
    }}
  ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
);
export const CheckedIcon = (props: IconProps) => (
  <svg
    width={props.w ?? '25'}
    height={props.h ?? '19'}
    viewBox="0 0 25 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className ?? ''}
  >
    <path
      d="M8.78117 18.0313L0.614502 9.86462L2.18221 8.29692L8.78117 14.8959L22.7812 0.895874L24.3489 2.46358L8.78117 18.0313Z"
      fill={props.color ?? 'currentColor'}
    />
  </svg>
);
export const FileIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M19.903 8.586a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.952.952 0 0 0-.051-.259c-.01-.032-.019-.063-.033-.093zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path>
    <path d="M8 12h8v2H8zm0 4h8v2H8zm0-8h2v2H8z"></path>
  </svg>
);
export const UploadIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M11 15h2V9h3l-4-5-4 5h3z"></path><path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
  </svg>
);
export const ChatIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M16 14h.5c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5h-13C2.673 2 2 2.673 2 3.5V18l5.333-4H16zm-9.333-2L4 14V4h12v8H6.667z"></path>
    <path d="M20.5 8H20v6.001c0 1.1-.893 1.993-1.99 1.999H8v.5c0 .827.673 1.5 1.5 1.5h7.167L22 22V9.5c0-.827-.673-1.5-1.5-1.5z"></path>
  </svg>
);
export const DashboardIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 18"
    fill="none"
    width={props.w ?? '17'}
    height={props.h ?? '18'}
    className={props.className ?? ''}
  >
    <path
      d="M3.25 7.5H4.75C6.25 7.5 7 6.75 7 5.25V3.75C7 2.25 6.25 1.5 4.75 1.5H3.25C1.75 1.5 1 2.25 1 3.75V5.25C1 6.75 1.75 7.5 3.25 7.5ZM12.25 7.5H13.75C15.25 7.5 16 6.75 16 5.25V3.75C16 2.25 15.25 1.5 13.75 1.5H12.25C10.75 1.5 10 2.25 10 3.75V5.25C10 6.75 10.75 7.5 12.25 7.5ZM12.25 16.5H13.75C15.25 16.5 16 15.75 16 14.25V12.75C16 11.25 15.25 10.5 13.75 10.5H12.25C10.75 10.5 10 11.25 10 12.75V14.25C10 15.75 10.75 16.5 12.25 16.5ZM3.25 16.5H4.75C6.25 16.5 7 15.75 7 14.25V12.75C7 11.25 6.25 10.5 4.75 10.5H3.25C1.75 10.5 1 11.25 1 12.75V14.25C1 15.75 1.75 16.5 3.25 16.5Z"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const MoneyIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
  >
    <path
      d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51 10.94 9.51 10.02C9.51 9.18 10.16 8.49 10.96 8.49H12.84C13.76 8.49 14.51 9.27 14.51 10.24M12 7.5V16.5"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 3V7M17 7H21M17 7L22 2"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const CobrancaIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={props.color ?? 'currentColor'}
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
  >
    <path d="M8.89289 16.3208H9.80102V15.0774C10.605 15.0378 11.3446 14.7781 12.0199 14.2982C12.6952 13.8183 13.0329 13.0992 13.0329 12.1408C13.0329 11.3608 12.7978 10.7223 12.3277 10.225C11.8576 9.72779 11.0061 9.24502 9.77297 8.77672C8.62981 8.35648 7.89018 7.993 7.55409 7.6863C7.21799 7.37958 7.04995 6.94355 7.04995 6.3782C7.04995 5.82443 7.2693 5.36214 7.70799 4.99133C8.14669 4.62051 8.71972 4.4351 9.42708 4.4351C9.95059 4.4351 10.3984 4.55207 10.7706 4.78599C11.1427 5.01991 11.4566 5.33431 11.7121 5.72917L12.4866 5.39797C12.2084 4.89717 11.8375 4.49253 11.3739 4.18404C10.9102 3.87553 10.4033 3.70058 9.8531 3.65919V2.43323H8.94497V3.65919C8.03419 3.79051 7.34153 4.11369 6.86698 4.62872C6.39245 5.14378 6.15518 5.72693 6.15518 6.3782C6.15518 7.14164 6.39612 7.74839 6.87799 8.19844C7.35989 8.64851 8.16551 9.08566 9.29487 9.5099C10.4349 9.95372 11.1983 10.3524 11.5849 10.7058C11.9715 11.0593 12.1648 11.5376 12.1648 12.1408C12.1648 12.8713 11.8911 13.4076 11.3438 13.7497C10.7965 14.0918 10.1936 14.2628 9.53526 14.2628C8.91069 14.2628 8.34367 14.0862 7.83419 13.733C7.32471 13.3797 6.92575 12.8846 6.63729 12.2476L5.83333 12.5815C6.1663 13.2804 6.58575 13.8207 7.09167 14.2024C7.5976 14.5841 8.19801 14.8584 8.89289 15.0254V16.3208ZM9.375 18.75C8.08359 18.75 6.86987 18.5033 5.73383 18.0098C4.59779 17.5164 3.60487 16.8447 2.75508 15.9949C1.90527 15.1451 1.23364 14.1522 0.740182 13.0162C0.246728 11.8801 0 10.6664 0 9.375C0 8.08092 0.246728 6.86364 0.740182 5.72315C1.23364 4.58266 1.90527 3.59041 2.75508 2.74638C3.60487 1.90237 4.59779 1.23364 5.73383 0.740182C6.86987 0.246727 8.08359 0 9.375 0C10.6691 0 11.8864 0.246727 13.0268 0.740182C14.1673 1.23364 15.1596 1.90237 16.0036 2.74638C16.8476 3.59041 17.5164 4.58266 18.0098 5.72315C18.5033 6.86364 18.75 8.08092 18.75 9.375C18.75 10.6664 18.5033 11.8801 18.0098 13.0162C17.5164 14.1522 16.8476 15.1451 16.0036 15.9949C15.1596 16.8447 14.1673 17.5164 13.0268 18.0098C11.8864 18.5033 10.6691 18.75 9.375 18.75ZM9.375 17.8686C11.7406 17.8686 13.7475 17.0437 15.396 15.394C17.0444 13.7442 17.8686 11.7379 17.8686 9.375C17.8686 7.00944 17.0444 5.00246 15.396 3.35404C13.7475 1.70562 11.7406 0.881406 9.375 0.881406C7.0121 0.881406 5.00578 1.70562 3.35604 3.35404C1.70628 5.00246 0.881406 7.00944 0.881406 9.375C0.881406 11.7379 1.70628 13.7442 3.35604 15.394C5.00578 17.0437 7.0121 17.8686 9.375 17.8686Z" fill="black" />
  </svg>
);
export const NotificationIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
  >
    <path
      d="M12.02 2.90997C8.71 2.90997 6.02 5.59997 6.02 8.90997V11.8C6.02 12.41 5.76 13.34 5.45 13.86L4.3 15.77C3.59 16.95 4.08 18.26 5.38 18.7C9.69 20.14 14.34 20.14 18.65 18.7C19.86 18.3 20.39 16.87 19.73 15.77L18.58 13.86C18.28 13.34 18.02 12.41 18.02 11.8V8.90997C18.02 5.60997 15.32 2.90997 12.02 2.90997Z"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M13.87 3.2C12.6607 2.85559 11.3793 2.85559 10.17 3.2C10.46 2.46 11.18 1.94 12.02 1.94C12.86 1.94 13.58 2.46 13.87 3.2Z"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.9 21.18C9.33816 20.6173 9.0218 19.8552 9.02 19.06"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />
  </svg>
);
export const WorkflowIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
  >
    <path
      d="M5 7C5 7.53043 4.78929 8.03914 4.41421 8.41421C4.03914 8.78929 3.53043 9 3 9C2.46957 9 1.96086 8.78929 1.58579 8.41421C1.21071 8.03914 1 7.53043 1 7C1 6.46957 1.21071 5.96086 1.58579 5.58579C1.96086 5.21071 2.46957 5 3 5C3.53043 5 4.03914 5.21071 4.41421 5.58579C4.78929 5.96086 5 6.46957 5 7ZM5 7H9M19 7C19 6.46957 19.2107 5.96086 19.5858 5.58579C19.9609 5.21071 20.4696 5 21 5C21.5304 5 22.0391 5.21071 22.4142 5.58579C22.7893 5.96086 23 6.46957 23 7C23 7.53043 22.7893 8.03914 22.4142 8.41421C22.0391 8.78929 21.5304 9 21 9C20.4696 9 19.9609 8.78929 19.5858 8.41421C19.2107 8.03914 19 7.53043 19 7ZM19 7H15M7.5 16.5V18.5C7.5 19.11 7.13 19.64 6.61 19.86C6.41984 19.9521 6.21129 20 6 20H4C3.17 20 2.5 19.33 2.5 18.5V16.5C2.5 15.67 3.17 15 4 15H6C6.83 15 7.5 15.67 7.5 16.5ZM21.5 16.5V18.5C21.5 19.33 20.83 20 20 20H18C17.7887 20 17.5802 19.9521 17.39 19.86C16.87 19.64 16.5 19.11 16.5 18.5V16.5C16.5 15.67 17.17 15 18 15H20C20.83 15 21.5 15.67 21.5 16.5ZM15 5.5V8.5C15 9.32 14.32 10 13.5 10H10.5C9.68 10 9 9.32 9 8.5V5.5C9 4.68 9.68 4 10.5 4H13.5C14.32 4 15 4.68 15 5.5Z"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 7.72998C17.37 8.92998 19 11.51 19 14.5C19 14.67 18.99 14.83 18.97 15M5.03 15C5.01 14.83 5 14.67 5 14.5C5 11.51 6.63 8.92998 9 7.72998"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const SettingIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
  >
    <path
      d="M12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15Z"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.8041 19.969 5.48558 19.5553 5.35435 19.0698C5.22311 18.5842 5.28988 18.0664 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const ArrowBackCircleIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 30"
    fill="none"
    width={props.w ?? '29'}
    height={props.h ?? '30'}
    className={props.className ?? ''}
  >
    <circle cx="14.5" cy="15" r="14" stroke={props.color ?? 'currentColor'} />
    <path
      d="M16.6251 20.61L12.0067 15.9917C11.4613 15.4463 11.4613 14.5538 12.0067 14.0083L16.6251 9.39001"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const FlowIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    fill="none"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
  >
    <path
      d="M8.75 10H5C3.625 10 2.5 8.875 2.5 7.5V5C2.5 3.625 3.625 2.5 5 2.5H8.75C10.125 2.5 11.25 3.625 11.25 5V7.5C11.25 8.875 10.125 10 8.75 10ZM26 8.75H21.5C20.675 8.75 20 8.075 20 7.25V5.25C20 4.425 20.675 3.75 21.5 3.75H26C26.825 3.75 27.5 4.425 27.5 5.25V7.25C27.5 8.075 26.825 8.75 26 8.75ZM26 18.125H21.5C20.675 18.125 20 17.45 20 16.625V14.625C20 13.8 20.675 13.125 21.5 13.125H26C26.825 13.125 27.5 13.8 27.5 14.625V16.625C27.5 17.45 26.825 18.125 26 18.125Z"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.25 6.25H20"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.625 6.25V22.5C15.625 23.875 16.75 25 18.125 25H20M15.625 15.625H20"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26 27.5H21.5C20.675 27.5 20 26.825 20 26V24C20 23.175 20.675 22.5 21.5 22.5H26C26.825 22.5 27.5 23.175 27.5 24V26C27.5 26.825 26.825 27.5 26 27.5Z"
      stroke={props.color ?? 'currentColor'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const SaveIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29 31"
    fill="none"
    width={props.w ?? '29'}
    height={props.h ?? '31'}
    className={props.className ?? ''}
  >
    <rect
      x="7.5"
      y="5.5"
      width="11"
      height="3"
      stroke={props.color ?? 'currentColor'}
    />
    <circle
      cx="15.5"
      cy="19.5"
      r="3"
      stroke={props.color ?? 'currentColor'}
    />
    <path
      d="M15.8649 28H6C3.23858 28 1 25.7614 1 23V6C1 3.23858 3.23858 1 6 1H21.9459L26 5.37838V17.7838"
      stroke={props.color ?? 'currentColor'}
    />
    <path
      d="M26.9581 19.3536C26.7628 19.1583 26.4462 19.1583 26.2509 19.3536L16.8484 28.7561L16.8484 30.4528H18.5451L26.1803 22.8176L24.4836 21.1209L25.332 20.2726L27.0287 21.9693L27.9477 21.0503C28.1429 20.855 28.1429 20.5384 27.9477 20.3432L26.9581 19.3536Z"
      fill={props.color ?? 'currentColor'}
    />
  </svg>
);
export const FlowColorful = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
  >
    <path
      d="M5 9V16M5 16C5.79565 16 6.55871 16.3161 7.12132 16.8787C7.68393 17.4413 8 18.2044 8 19C8 19.7956 7.68393 20.5587 7.12132 21.1213C6.55871 21.6839 5.79565 22 5 22C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19C2 18.2044 2.31607 17.4413 2.87868 16.8787C3.44129 16.3161 4.20435 16 5 16ZM5.25 8.5C6.11195 8.5 6.9386 8.15759 7.5481 7.5481C8.15759 6.9386 8.5 6.11195 8.5 5.25C8.5 4.38805 8.15759 3.5614 7.5481 2.9519C6.9386 2.34241 6.11195 2 5.25 2C4.38805 2 3.5614 2.34241 2.9519 2.9519C2.34241 3.5614 2 4.38805 2 5.25C2 6.11195 2.34241 6.9386 2.9519 7.5481C3.5614 8.15759 4.38805 8.5 5.25 8.5ZM19 22C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19C22 18.2044 21.6839 17.4413 21.1213 16.8787C20.5587 16.3161 19.7956 16 19 16C18.2044 16 17.4413 16.3161 16.8787 16.8787C16.3161 17.4413 16 18.2044 16 19C16 19.7956 16.3161 20.5587 16.8787 21.1213C17.4413 21.6839 18.2044 22 19 22Z"
      stroke={props.color ?? "#0190EB"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.13 9C5.35604 9.87223 5.86594 10.6444 6.57931 11.1948C7.29269 11.7453 8.16897 12.0426 9.07 12.04L12.5 12.03C13.7446 12.0264 14.9594 12.4106 15.9756 13.1293C16.9917 13.8479 17.7587 14.8653 18.17 16.04"
      stroke={props.color ?? "#0190EB"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const CheckedCircleIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    width={props.w ?? '20'}
    height={props.h ?? '20'}
    className={props.className ?? ''}
  >
    <circle cx="10" cy="10" r="10" fill={props.color ?? "#40FF2F"} />
    <path d="M6.45833 10L8.81667 12.3583L13.5417 7.64167" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const EditIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
    style={{ fill: props.color ?? "currentColor" }}
  >
    <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path>
  </svg>
);
export const TableIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
    style={{ fill: props.color ?? "currentColor" }}
  >
    <path d="M4 21h15.893c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm0-2v-5h4v5H4zM14 7v5h-4V7h4zM8 7v5H4V7h4zm2 12v-5h4v5h-4zm6 0v-5h3.894v5H16zm3.893-7H16V7h3.893v5z"></path>
  </svg>
);
export const ListIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
    style={{ fill: props.color ?? "currentColor" }}
  ><path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"></path></svg>
);
export const DownloadAltIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? "24"}
    height={props.h ?? "24"}
    className={props.className ?? ''}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
    <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
  </svg>
);
export const ThunderIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? "24"}
    height={props.h ?? "24"}
    className={props.className ?? ''}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M20.98 11.802a.995.995 0 0 0-.738-.771l-6.86-1.716 2.537-5.921a.998.998 0 0 0-.317-1.192.996.996 0 0 0-1.234.024l-11 9a1 1 0 0 0 .39 1.744l6.719 1.681-3.345 5.854A1.001 1.001 0 0 0 8 22a.995.995 0 0 0 .6-.2l12-9a1 1 0 0 0 .38-.998z"></path>
  </svg>
);
export const MoreVerticalIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className ?? ''}
    viewBox="0 0 24 24" style={{
      fill: props.color ?? 'currentColor'
    }}
  >
    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
  </svg>
)
export const WindowsIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className ?? ''}
    viewBox="0 0 24 24" style={{
      fill: props.color ?? 'currentColor'
    }}
  >
    <path d="M16 7H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM4 19v-8h12V9l.002 10H4z"></path><path d="M22 5c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2h13.001c1.101 0 1.996.895 1.999 1.994L20.002 15H20v2c1.103 0 2-.897 2-2V8.007L22.001 8V6L22 5.99V5z"></path>
  </svg>
)
export const GitIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={props.className ?? ''}
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z"></path>
  </svg>
)
export const GitCompareIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={props.className ?? ''}
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M6.01 2c-1.93 0-3.5 1.57-3.5 3.5 0 1.58 1.06 2.903 2.5 3.337v7.16c-.001.179.027 1.781 1.174 2.931C6.892 19.64 7.84 20 9 20v2l4-3-4-3v2c-1.823 0-1.984-1.534-1.99-2V8.837c1.44-.434 2.5-1.757 2.5-3.337 0-1.93-1.571-3.5-3.5-3.5zm0 5c-.827 0-1.5-.673-1.5-1.5S5.183 4 6.01 4s1.5.673 1.5 1.5S6.837 7 6.01 7zm13 8.163V7.997C19.005 6.391 17.933 4 15 4V2l-4 3 4 3V6c1.829 0 2.001 1.539 2.01 2v7.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337zm-1 4.837c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5z"></path>
  </svg>
)
export const WidgetIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className ?? ''}
    viewBox="0 0 24 24" style={{
      fill: props.color ?? 'currentColor'
    }}
  >
    <path d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm0 10h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm7.293-14.707-3.586-3.586a.999.999 0 0 0-1.414 0l-3.586 3.586a.999.999 0 0 0 0 1.414l3.586 3.586a.999.999 0 0 0 1.414 0l3.586-3.586a.999.999 0 0 0 0-1.414z"></path>
  </svg>
)
export const FormIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className ?? ''}
    viewBox="0 0 24 24" style={{
      fill: props.color ?? 'currentColor'
    }}
  >
    <path d="M19 3h-2.25a1 1 0 0 0-1-1h-7.5a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 17H5V5h2v2h10V5h2v15z"></path>
  </svg>
)
export const DetalistIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className ?? ''}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z"></path>
    <path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z"></path>
  </svg>
);
export const EnvelopeIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={props.className ?? ''}
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  ><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path></svg>
);
export const EnvelopeOpenIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className ?? ''}
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    viewBox="0 0 24 24"
  >
    <path d="m21.555 8.168-9-6a1 1 0 0 0-1.109 0l-9 6A1 1 0 0 0 2 9v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V9c0-.334-.167-.646-.445-.832zM12 4.202 19.197 9 12 13.798 4.803 9 12 4.202zM4 20v-9.131l7.445 4.963a1 1 0 0 0 1.11 0L20 10.869 19.997 20H4z"></path>
  </svg>
)
export const SearchIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    className={props.className}
    fill={props.color ?? 'currentColor'}
    width={props.w ?? "20"} height={props.h ?? "20"}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
  </svg>
);
export const MenuIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={props.className ?? ''}
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  ><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
);
export const MenuCollapsedIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={props.className ?? ''}
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  ><path d="M4 11h12v2H4zm0-5h16v2H4zm0 12h7.235v-2H4z"></path></svg>
);
export const HomeIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={props.className ?? ''}
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path>
  </svg>
);
export const ProjectIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 20h20v2H2zM4 3v14a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1zm2 1h3v12H6zM13 17a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1zm2-9h3v8h-3z"></path>
  </svg>
);
export const UsersIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"></path>
    <path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm1.5 7H8c-3.309 0-6 2.691-6 6v1h2v-1c0-2.206 1.794-4 4-4h3c2.206 0 4 1.794 4 4v1h2v-1c0-3.309-2.691-6-6-6z"></path>
  </svg>

);
export const UserIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z"></path><path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z"></path>
  </svg>
)
export const ErrorCircleIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    viewBox="0 0 24 24"
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
  ><path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
);
export const LockIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
  >
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
  </svg>
);
export const RefreshIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
  >
    <path d="M10 11H7.101l.001-.009a4.956 4.956 0 0 1 .752-1.787 5.054 5.054 0 0 1 2.2-1.811c.302-.128.617-.226.938-.291a5.078 5.078 0 0 1 2.018 0 4.978 4.978 0 0 1 2.525 1.361l1.416-1.412a7.036 7.036 0 0 0-2.224-1.501 6.921 6.921 0 0 0-1.315-.408 7.079 7.079 0 0 0-2.819 0 6.94 6.94 0 0 0-1.316.409 7.04 7.04 0 0 0-3.08 2.534 6.978 6.978 0 0 0-1.054 2.505c-.028.135-.043.273-.063.41H2l4 4 4-4zm4 2h2.899l-.001.008a4.976 4.976 0 0 1-2.103 3.138 4.943 4.943 0 0 1-1.787.752 5.073 5.073 0 0 1-2.017 0 4.956 4.956 0 0 1-1.787-.752 5.072 5.072 0 0 1-.74-.61L7.05 16.95a7.032 7.032 0 0 0 2.225 1.5c.424.18.867.317 1.315.408a7.07 7.07 0 0 0 2.818 0 7.031 7.031 0 0 0 4.395-2.945 6.974 6.974 0 0 0 1.053-2.503c.027-.135.043-.273.063-.41H22l-4-4-4 4z"></path>
  </svg>
);
export const CloudIcon = (props: IconProps) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke={props.color ?? "currentColor"}
    width={props.w ?? "20px"} height={props.h ?? "20px"}
    className={props.className}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier">
      <path d="M16.2857 20C19.4416 20 22 17.4717 22 14.3529C22 11.8811 20.393 9.78024 18.1551 9.01498C17.8371 6.19371 15.4159 4 12.4762 4C9.32028 4 6.7619 6.52827 6.7619 9.64706C6.7619 10.3369 6.88706 10.9978 7.11616 11.6089C6.8475 11.5567 6.56983 11.5294 6.28571 11.5294C3.91878 11.5294 2 13.4256 2 15.7647C2 18.1038 3.91878 20 6.28571 20H16.2857Z" fill={props.color ?? 'currentColor'} />
    </g>
  </svg>
)
export const InfoIcon = (props: IconProps) => (
  <svg
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className}
    style={{ fill: props.color ?? 'currentColor' }}
    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
      <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z">
      </path>
    </g>
  </svg>
)
export const CalendarIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className}
    style={{ fill: props.color ?? 'currentColor' }}
    viewBox="0 0 24 24"
  ><path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path><path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path></svg>
)
export const CompanyIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className}
    style={{ fill: props.color ?? 'currentColor' }}
    viewBox="0 0 24 24"
  >
    <path d="M19 2H9c-1.103 0-2 .897-2 2v6H5c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zM5 12h6v8H5v-8zm14 8h-6v-8c0-1.103-.897-2-2-2H9V4h10v16z"></path><path d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 .001h2v2H7z"></path>
  </svg>
)
export const PencilIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className}
    style={{ fill: props.color ?? 'currentColor' }}
    viewBox="0 0 24 24"
  >
    <path d="M7.061 22c1.523 0 2.84-.543 3.91-1.613 1.123-1.123 1.707-2.854 1.551-4.494l8.564-8.564a3.123 3.123 0 0 0-.002-4.414c-1.178-1.18-3.234-1.18-4.412 0l-8.884 8.884c-1.913.169-3.807 1.521-3.807 3.919 0 .303.021.588.042.86.08 1.031.109 1.418-1.471 2.208a1.001 1.001 0 0 0-.122 1.717C2.52 20.563 4.623 22 7.061 22c-.001 0-.001 0 0 0zM18.086 4.328a1.144 1.144 0 0 1 1.586.002 1.12 1.12 0 0 1 0 1.584L12 13.586 10.414 12l7.672-7.672zM6.018 16.423c-.018-.224-.037-.458-.037-.706 0-1.545 1.445-1.953 2.21-1.953.356 0 .699.073.964.206.945.475 1.26 1.293 1.357 1.896.177 1.09-.217 2.368-.956 3.107C8.865 19.664 8.049 20 7.061 20H7.06c-.75 0-1.479-.196-2.074-.427 1.082-.973 1.121-1.989 1.032-3.15z">
    </path>
  </svg>
)
export const MagicWandIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className}
    style={{ fill: props.color ?? 'currentColor' }}
    viewBox="0 0 24 24"
  >
    <path d="m11 4-.5-1-.5 1-1 .125.834.708L9.5 6l1-.666 1 .666-.334-1.167.834-.708zm8.334 10.666L18.5 13l-.834 1.666-1.666.209 1.389 1.181L16.834 18l1.666-1.111L20.166 18l-.555-1.944L21 14.875zM6.667 6.333 6 5l-.667 1.333L4 6.5l1.111.944L4.667 9 6 8.111 7.333 9l-.444-1.556L8 6.5zM3.414 17c0 .534.208 1.036.586 1.414L5.586 20c.378.378.88.586 1.414.586s1.036-.208 1.414-.586L20 8.414c.378-.378.586-.88.586-1.414S20.378 5.964 20 5.586L18.414 4c-.756-.756-2.072-.756-2.828 0L4 15.586c-.378.378-.586.88-.586 1.414zM17 5.414 18.586 7 15 10.586 13.414 9 17 5.414z"></path>
  </svg>
)
export const SquareCheckedIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M7 5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2H7zm0 12V7h10l.002 10H7z"></path><path d="M10.996 12.556 9.7 11.285l-1.4 1.43 2.704 2.647 4.699-4.651-1.406-1.422z"></path>
  </svg>
)
export const PackageIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"></path>
  </svg>
)
export const ReceiptIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M21 11h-3V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6a1 1 0 0 0-1-1zM5 19a1 1 0 0 1-1-1V5h12v13c0 .351.061.688.171 1H5zm15-1a1 1 0 0 1-2 0v-5h2v5z"></path>
    <path d="M6 7h8v2H6zm0 4h8v2H6zm5 4h3v2h-3z"></path>
  </svg>
)
export const MyDocsIcon = (props: IconProps) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className}
    stroke={props.color ?? 'currentColor'}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier"> <path d="M16 19C15.6218 17.2883 13.9747 16 12 16C10.0253 16 8.37818 17.2883 8 19M12 12H12.01M12.0627 6.06274L11.9373 5.93726C11.5914 5.59135 11.4184 5.4184 11.2166 5.29472C11.0376 5.18506 10.8425 5.10425 10.6385 5.05526C10.4083 5 10.1637 5 9.67452 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V10.2C21 9.0799 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H14.3255C13.8363 7 13.5917 7 13.3615 6.94474C13.1575 6.89575 12.9624 6.81494 12.7834 6.70528C12.5816 6.5816 12.4086 6.40865 12.0627 6.06274ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" stroke={props.color ?? 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </g>
  </svg>
)
export const MyFinanceIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M21 11h-3V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6a1 1 0 0 0-1-1zM5 19a1 1 0 0 1-1-1V5h12v13c0 .351.061.688.171 1H5zm15-1a1 1 0 0 1-2 0v-5h2v5z"></path>
    <path d="M6 7h8v2H6zm0 4h8v2H6zm5 4h3v2h-3z"></path>
  </svg>
)
export const UserVoiceIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
  >
    <path d="M8 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0-6c1.178 0 2 .822 2 2s-.822 2-2 2-2-.822-2-2 .822-2 2-2zm1 7H7c-2.757 0-5 2.243-5 5v1h2v-1c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v1h2v-1c0-2.757-2.243-5-5-5zm9.364-10.364L16.95 4.05C18.271 5.373 19 7.131 19 9s-.729 3.627-2.05 4.95l1.414 1.414C20.064 13.663 21 11.403 21 9s-.936-4.663-2.636-6.364z"></path>
    <path d="M15.535 5.464 14.121 6.88C14.688 7.445 15 8.198 15 9s-.312 1.555-.879 2.12l1.414 1.416C16.479 11.592 17 10.337 17 9s-.521-2.592-1.465-3.536z"></path>
  </svg>

)
export const StopWatchIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
  >
    <path d="M12 5c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
    <path d="M11 9h2v5h-2zM9 2h6v2H9zm10.293 5.707-2-2 1.414-1.414 2 2z"></path>
  </svg>
)
export const MentionIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
  >
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c1.466 0 2.961-.371 4.442-1.104l-.885-1.793C14.353 19.698 13.156 20 12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8v1c0 .692-.313 2-1.5 2-1.396 0-1.494-1.819-1.5-2V8h-2v.025A4.954 4.954 0 0 0 12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5c1.45 0 2.748-.631 3.662-1.621.524.89 1.408 1.621 2.838 1.621 2.273 0 3.5-2.061 3.5-4v-1c0-5.514-4.486-10-10-10zm0 13c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z"></path>
  </svg>
)
export const ArchiveIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
  >
    <path d="m21.706 5.291-2.999-2.998A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.291A.994.994 0 0 0 2 5.999V19c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5.999a.994.994 0 0 0-.294-.708zM6.414 4h11.172l.999.999H5.415L6.414 4zM4 19V6.999h16L20.002 19H4z"></path>
    <path d="M15 12H9v-2H7v4h10v-4h-2z"></path>
  </svg>
)
export const DropboxIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M7.004 3.5 2 6.689l5.004 3.186 5.002-3.186zm10.005 0-5.003 3.189 5.003 3.186 5.003-3.186zM2 13.062l5.004 3.187 5.002-3.187-5.002-3.187zm15.009-3.187-5.003 3.187 5.003 3.187 5.003-3.187zM7.004 17.311l5.002 3.189 5.003-3.189-5.003-3.186z"></path>
  </svg>
)
export const TrophyIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M21 4h-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v3c0 4.31 1.799 6.91 4.819 7.012A6.001 6.001 0 0 0 11 17.91V20H9v2h6v-2h-2v-2.09a6.01 6.01 0 0 0 4.181-2.898C20.201 14.91 22 12.31 22 8V5a1 1 0 0 0-1-1zM4 8V6h2v6.83C4.216 12.078 4 9.299 4 8zm8 8c-2.206 0-4-1.794-4-4V4h8v8c0 2.206-1.794 4-4 4zm6-3.17V6h2v2c0 1.299-.216 4.078-2 4.83z"></path>
  </svg>
)
export const GameIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <circle cx="15" cy="13" r="1"></circle>
    <circle cx="17" cy="11" r="1"></circle>
    <path d="M10 9H8v2H6v2h2v2h2v-2h2v-2h-2z"></path>
    <path d="M15 5H9a7 7 0 0 0-7 7 7 7 0 0 0 7 7h6a7 7 0 0 0 7-7 7 7 0 0 0-7-7zm0 12H9A5 5 0 1 1 9 7h6a5 5 0 1 1 0 10z"></path>
  </svg>
)
export const GameIconNew = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M5.03312 10.7257V5.00453H6.47541V10.7257L5.76093 9.95247L5.03312 10.7257ZM9.52296 13.2938V0.804474H10.9653V11.8515L9.52296 13.2938ZM0.516557 15.2262V9.22195H1.95885V13.7839L0.516557 15.2262ZM0.366974 19.4062L5.78231 13.9909L9.54833 17.2481L16.8828 9.90036H14.3053V9.01895H18.3958V13.1055H17.5144V10.528L9.55101 18.4915L5.79833 15.2382L1.63033 19.4062H0.366974Z" fill="black" />
  </svg>
)
export const TriangleUpIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19zm9-12.243L19.092 17H4.908L12 6.757z"></path>
  </svg>
)
export const EquilizerIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M13 5h9v2h-9zM2 7h7v2h2V3H9v2H2zm7 10h13v2H9zm10-6h3v2h-3zm-2 4V9.012h-2V11H2v2h13v2zM7 21v-6H5v2H2v2h3v2z"></path>
  </svg>
)
export const TargetLockIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M13 4.069V2h-2v2.069A8.008 8.008 0 0 0 4.069 11H2v2h2.069A8.007 8.007 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
  </svg>
)
export const HourglassIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M15.566 11.021A7.016 7.016 0 0 0 19 5V4h1V2H4v2h1v1a7.016 7.016 0 0 0 3.434 6.021c.354.208.566.545.566.9v.158c0 .354-.212.69-.566.9A7.016 7.016 0 0 0 5 19v1H4v2h16v-2h-1v-1a7.014 7.014 0 0 0-3.433-6.02c-.355-.21-.567-.547-.567-.901v-.158c0-.355.212-.692.566-.9zM17 19v1H7v-1a5.01 5.01 0 0 1 2.45-4.299A3.111 3.111 0 0 0 10.834 13h2.332c.23.691.704 1.3 1.385 1.702A5.008 5.008 0 0 1 17 19z"></path>
  </svg>
)

export const CompassIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
    <path d="m8 16 5.991-2L16 8l-6 2z"></path>
  </svg>
)
export const TripIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    viewBox="0 0 24 24"
  >
    <path d="M14.844 20H6.5C5.121 20 4 18.879 4 17.5S5.121 15 6.5 15h7c1.93 0 3.5-1.57 3.5-3.5S15.43 8 13.5 8H8.639a9.812 9.812 0 0 1-1.354 2H13.5c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-7C4.019 13 2 15.019 2 17.5S4.019 22 6.5 22h9.593a10.415 10.415 0 0 1-1.249-2zM5 2C3.346 2 2 3.346 2 5c0 3.188 3 5 3 5s3-1.813 3-5c0-1.654-1.346-3-3-3zm0 4.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5 6.5z"></path>
    <path d="M19 14c-1.654 0-3 1.346-3 3 0 3.188 3 5 3 5s3-1.813 3-5c0-1.654-1.346-3-3-3zm0 4.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 19 18.5z"></path>
  </svg>
)
export const ConnectionIcon = (props: IconProps) => (
  <svg
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
    className={props.className}
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 511.997 511.997"
    xmlSpace="preserve"
    stroke="#ffffff"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier"><g><g><g>
      <path d="M212.26,390.24l-60.331,60.331c-25.012,25.012-65.517,25.012-90.508,0.005c-24.996-24.996-24.996-65.505-0.005-90.496 l120.683-120.683c24.991-24.992,65.5-24.992,90.491,0c8.331,8.331,21.839,8.331,30.17,0c8.331-8.331,8.331-21.839,0-30.17 c-41.654-41.654-109.177-41.654-150.831,0L31.247,329.909c-41.654,41.654-41.654,109.177,0,150.831 c41.649,41.676,109.177,41.676,150.853,0l60.331-60.331c8.331-8.331,8.331-21.839,0-30.17S220.591,381.909,212.26,390.24z"></path>
      <path d="M480.751,31.24c-41.654-41.654-109.199-41.654-150.853,0l-72.384,72.384c-8.331,8.331-8.331,21.839,0,30.17 c8.331,8.331,21.839,8.331,30.17,0l72.384-72.384c24.991-24.992,65.521-24.992,90.513,0c24.991,24.991,24.991,65.5,0,90.491 L317.845,284.638c-24.992,24.992-65.5,24.992-90.491,0c-8.331-8.331-21.839-8.331-30.17,0s-8.331,21.839,0,30.17 c41.654,41.654,109.177,41.654,150.831,0l132.736-132.736C522.405,140.418,522.405,72.894,480.751,31.24z"></path>
    </g></g></g></g>
  </svg>
);
export const CarouselIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M16 3H8c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h8c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM2 7v10c0 1.103.897 2 2 2V5c-1.103 0-2 .897-2 2zm18-2v14c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
  </svg>
)
export const TimeIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  ><path d="M12.25 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zM18 13h-6.75V6h2v5H18v2z"></path></svg>
)
export const CodeIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M8.293 6.293 2.586 12l5.707 5.707 1.414-1.414L5.414 12l4.293-4.293zm7.414 11.414L21.414 12l-5.707-5.707-1.414 1.414L18.586 12l-4.293 4.293z"></path>
  </svg>
)
export const PlusCircleIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={props.className}
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z"></path><path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z"></path>
  </svg>
)

export const XCircleIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={props.className}
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
  </svg>
)
export const StatsIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={props.className}
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M20 12a2 2 0 0 0-.703.133l-2.398-1.963c.059-.214.101-.436.101-.67C17 8.114 15.886 7 14.5 7S12 8.114 12 9.5c0 .396.1.765.262 1.097l-2.909 3.438A2.06 2.06 0 0 0 9 14c-.179 0-.348.03-.512.074l-2.563-2.563C5.97 11.348 6 11.179 6 11c0-1.108-.892-2-2-2s-2 .892-2 2 .892 2 2 2c.179 0 .348-.03.512-.074l2.563 2.563A1.906 1.906 0 0 0 7 16c0 1.108.892 2 2 2s2-.892 2-2c0-.237-.048-.46-.123-.671l2.913-3.442c.227.066.462.113.71.113a2.48 2.48 0 0 0 1.133-.281l2.399 1.963A2.077 2.077 0 0 0 18 14c0 1.108.892 2 2 2s2-.892 2-2-.892-2-2-2z"></path>
  </svg>
)
export const HomeSaleIcon = (props: IconProps) => (
  <svg
    className={props.className}
    width={props.w ?? "24"} height={props.h ?? "24"}
    viewBox="0 0 54 49" fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="&#240;&#159;&#166;&#134; icon &#34;home sale&#34;">
      <path id="Vector" d="M2 17.2778L27 2L52 17.2778" stroke={props.color ?? 'currentColor'} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path id="Vector_2" d="M46.4444 27V44.7778C46.4444 45.6983 45.6983 46.4444 44.7778 46.4444H9.22221C8.30174 46.4444 7.55554 45.6983 7.55554 44.7778V27" stroke={props.color ?? 'currentColor'} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path id="Vector_3" d="M32.5556 18.2395C29.7778 15.6754 22.3703 14.8207 22.3703 19.9489C22.3703 25.077 32.5556 22.5131 32.5556 27.6412C32.5556 32.7695 24.2222 32.7695 21.4445 29.3506" stroke={props.color ?? 'currentColor'} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path id="Vector_4" d="M27 31.7281V35.3334" stroke={props.color ?? 'currentColor'} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path id="Vector_5" d="M27 16.2029V13.1111" stroke={props.color ?? 'currentColor'} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </svg>
)
export const CartIcon = (props: IconProps) => (
  <svg
    className={props.className}
    width={props.w ?? "24"} height={props.h ?? "24"}
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="&#240;&#159;&#166;&#134; icon &#34;cart&#34;">
      <path id="Vector" d="M45.75 52C47.821 52 49.5 50.321 49.5 48.25C49.5 46.179 47.821 44.5 45.75 44.5C43.679 44.5 42 46.179 42 48.25C42 50.321 43.679 52 45.75 52Z" stroke={props.color ?? 'currentColor'} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path id="Vector_2" d="M20.75 52C22.821 52 24.5 50.321 24.5 48.25C24.5 46.179 22.821 44.5 20.75 44.5C18.6789 44.5 17 46.179 17 48.25C17 50.321 18.6789 52 20.75 52Z" stroke={props.color ?? 'currentColor'} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path id="Vector_3" d="M9.5 7H52L47 34.5H14.5L9.5 7ZM9.5 7C9.08333 5.33332 7 2 2 2" stroke={props.color ?? 'currentColor'} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path id="Vector_4" d="M47 34.5H14.5H10.0769C5.61615 34.5 3.25 36.453 3.25 39.5C3.25 42.547 5.61615 44.5 10.0769 44.5H45.75" stroke={props.color ?? 'currentColor'} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </svg>
)
export const CartIconNew = (props: IconProps) => (
  <svg
    className={props.className}
    width={props.w ?? "24"} height={props.h ?? "24"}
    viewBox="0 0 24 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.05047 11.6987H15.9415V11.5518C15.9415 10.9611 15.6384 10.4991 15.0321 10.1659C14.4258 9.83273 13.5782 9.66612 12.4893 9.66612C11.4005 9.66612 10.5551 9.83273 9.95325 10.1659C9.3514 10.4991 9.05047 10.9611 9.05047 11.5518V11.6987ZM12.4946 7.82318C12.9091 7.82318 13.2642 7.67816 13.56 7.38813C13.8558 7.09807 14.0037 6.74116 14.0037 6.3174C14.0037 5.89363 13.8563 5.53607 13.5614 5.24471C13.2665 4.95336 12.9096 4.80768 12.4907 4.80768C12.0718 4.80768 11.7166 4.9527 11.4253 5.24273C11.1339 5.53279 10.9883 5.8897 10.9883 6.31346C10.9883 6.73723 11.1333 7.09479 11.4235 7.38615C11.7136 7.6775 12.0707 7.82318 12.4946 7.82318ZM1.52242 14.5833C1.09574 14.5833 0.73533 14.4361 0.441198 14.1416C0.147066 13.8472 0 13.4869 0 13.0609V1.52242C0 1.09641 0.147066 0.736172 0.441198 0.441693C0.73533 0.147231 1.09574 0 1.52242 0H7.03526L8.95833 1.92307H17.2276C17.6536 1.92307 18.0138 2.0703 18.3083 2.36477C18.6028 2.65925 18.75 3.01949 18.75 3.4455V13.0609C18.75 13.4869 18.6028 13.8472 18.3083 14.1416C18.0138 14.4361 17.6536 14.5833 17.2276 14.5833H1.52242ZM1.52242 13.7019H17.2276C17.4145 13.7019 17.5681 13.6418 17.6883 13.5216C17.8085 13.4015 17.8686 13.2479 17.8686 13.0609V3.4455C17.8686 3.25853 17.8085 3.10496 17.6883 2.98477C17.5681 2.86457 17.4145 2.80448 17.2276 2.80448H8.61177L6.6887 0.881406H1.52242C1.33546 0.881406 1.18188 0.941501 1.06169 1.06169C0.941502 1.18188 0.881406 1.33546 0.881406 1.52242V13.0609C0.881406 13.2479 0.941502 13.4015 1.06169 13.5216C1.18188 13.6418 1.33546 13.7019 1.52242 13.7019Z" fill={props.color ?? 'currentColor'} />
  </svg>
)
export const PieChartIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    viewBox="0 0 24 24"
    width={props.w ?? "24"} height={props.h ?? "24"}
    style={{ fill: props.color ?? 'currentColor' }}
  >
    <path d="M13 2.051V11h8.949c-.47-4.717-4.232-8.479-8.949-8.949zm4.969 17.953c2.189-1.637 3.694-4.14 3.98-7.004h-8.183l4.203 7.004z"></path><path d="M11 12V2.051C5.954 2.555 2 6.824 2 12c0 5.514 4.486 10 10 10a9.93 9.93 0 0 0 4.255-.964s-5.253-8.915-5.254-9.031A.02.02 0 0 0 11 12z"></path>
  </svg>
)
//#region IMAGEM ICONS
export const IsacImageIcon = (props: IconProps) => (
  <img
    src={isac}
    alt="imagem geometrica isac"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className}
  />
)
export const VisionImageIcon = (props: IconProps) => (
  <img
    src={vision}
    alt="imagem geometrica vision"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className}
  />
)
export const ReportImageIcon = (props: IconProps) => (
  <img
    src={report}
    alt="imagem geometrica report"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className}
  />
)
export const DashboardImageIcon = (props: IconProps) => (
  <img
    src={dashboard}
    alt="imagem geometrica dashboard"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className}
  />
)
//#endregion IMAGEM ICONS
export const listAvailableIcons: { component: (props?: IconProps) => ReactNode, title: AvailableIcons }[] = [
  { component: (props?: IconProps) => <ChevronDownIcon {...props} />, title: 'ChevronDownIcon' },
  { component: (props?: IconProps) => <ChevronUpDownIcon {...props} />, title: 'ChevronUpDownIcon' },
  { component: (props?: IconProps) => <ChevronsRightIcon {...props} />, title: 'ChevronsRightIcon' },
  { component: (props?: IconProps) => <ArrowRightIcon {...props} />, title: 'ArrowRightIcon' },
  { component: (props?: IconProps) => <ArrowDownCircleIcon {...props} />, title: 'ArrowDownCircleIcon' },
  { component: (props?: IconProps) => <CloseIcon {...props} />, title: 'CloseIcon' },
  { component: (props?: IconProps) => <TrashIcon {...props} />, title: 'TrashIcon' },
  { component: (props?: IconProps) => <PlusIcon {...props} />, title: 'PlusIcon' },
  { component: (props?: IconProps) => <CheckedIcon {...props} />, title: 'CheckedIcon' },
  { component: (props?: IconProps) => <FileIcon {...props} />, title: 'FileIcon' },
  { component: (props?: IconProps) => <UploadIcon {...props} />, title: 'UploadIcon' },
  { component: (props?: IconProps) => <ChatIcon {...props} />, title: 'ChatIcon' },
  { component: (props?: IconProps) => <DashboardIcon {...props} />, title: 'DashboardIcon' },
  { component: (props?: IconProps) => <MoneyIcon {...props} />, title: 'MoneyIcon' },
  { component: (props?: IconProps) => <NotificationIcon {...props} />, title: 'NotificationIcon' },
  { component: (props?: IconProps) => <WorkflowIcon {...props} />, title: 'WorkflowIcon' },
  { component: (props?: IconProps) => <SettingIcon {...props} />, title: 'SettingIcon' },
  { component: (props?: IconProps) => <ArrowBackCircleIcon {...props} />, title: 'ArrowBackCircleIcon' },
  { component: (props?: IconProps) => <FlowIcon {...props} />, title: 'FlowIcon' },
  { component: (props?: IconProps) => <SaveIcon {...props} />, title: 'SaveIcon' },
  { component: (props?: IconProps) => <FlowColorful {...props} />, title: 'FlowColorful' },
  { component: (props?: IconProps) => <CheckedCircleIcon {...props} />, title: 'CheckedCircleIcon' },
  { component: (props?: IconProps) => <EditIcon {...props} />, title: 'EditIcon' },
  { component: (props?: IconProps) => <TableIcon {...props} />, title: 'TableIcon' },
  { component: (props?: IconProps) => <ListIcon {...props} />, title: 'ListIcon' },
  { component: (props?: IconProps) => <DownloadAltIcon {...props} />, title: 'DownloadAltIcon' },
  { component: (props?: IconProps) => <ThunderIcon {...props} />, title: 'ThunderIcon' },
  { component: (props?: IconProps) => <MoreVerticalIcon {...props} />, title: 'MoreVerticalIcon' },
  { component: (props?: IconProps) => <WindowsIcon {...props} />, title: 'WindowsIcon' },
  { component: (props?: IconProps) => <GitIcon {...props} />, title: 'GitIcon' },
  { component: (props?: IconProps) => <GitCompareIcon {...props} />, title: 'GitCompareIcon' },
  { component: (props?: IconProps) => <WidgetIcon {...props} />, title: 'WidgetIcon' },
  { component: (props?: IconProps) => <FormIcon {...props} />, title: 'FormIcon' },
  { component: (props?: IconProps) => <DetalistIcon {...props} />, title: 'DetalistIcon' },
  { component: (props?: IconProps) => <EnvelopeIcon {...props} />, title: 'EnvelopeIcon' },
  { component: (props?: IconProps) => <EnvelopeOpenIcon {...props} />, title: 'EnvelopeOpenIcon' },
  { component: (props?: IconProps) => <SearchIcon {...props} />, title: 'SearchIcon' },
  { component: (props?: IconProps) => <MenuIcon {...props} />, title: 'MenuIcon' },
  { component: (props?: IconProps) => <MenuCollapsedIcon {...props} />, title: 'MenuCollapsedIcon' },
  { component: (props?: IconProps) => <HomeIcon {...props} />, title: 'HomeIcon' },
  { component: (props?: IconProps) => <ProjectIcon {...props} />, title: 'ProjectIcon' },
  { component: (props?: IconProps) => <UsersIcon {...props} />, title: 'UsersIcon' },
  { component: (props?: IconProps) => <UserIcon {...props} />, title: 'UserIcon' },
  { component: (props?: IconProps) => <ErrorCircleIcon {...props} />, title: 'ErrorCircleIcon' },
  { component: (props?: IconProps) => <LockIcon {...props} />, title: 'LockIcon' },
  { component: (props?: IconProps) => <RefreshIcon {...props} />, title: 'RefreshIcon' },
  { component: (props?: IconProps) => <CloudIcon {...props} />, title: 'CloudIcon' },
  { component: (props?: IconProps) => <InfoIcon {...props} />, title: 'InfoIcon' },
  { component: (props?: IconProps) => <CalendarIcon {...props} />, title: 'CalendarIcon' },
  { component: (props?: IconProps) => <CompanyIcon {...props} />, title: 'CompanyIcon' },
  { component: (props?: IconProps) => <PencilIcon {...props} />, title: 'PencilIcon' },
  { component: (props?: IconProps) => <MagicWandIcon {...props} />, title: 'MagicWandIcon' },
  { component: (props?: IconProps) => <SquareCheckedIcon {...props} />, title: 'SquareCheckedIcon' },
  { component: (props?: IconProps) => <PackageIcon {...props} />, title: 'PackageIcon' },
  { component: (props?: IconProps) => <ReceiptIcon {...props} />, title: 'ReceiptIcon' },
  { component: (props?: IconProps) => <MyDocsIcon {...props} />, title: 'MyDocsIcon' },
  { component: (props?: IconProps) => <MyFinanceIcon {...props} />, title: 'MyFinanceIcon' },
  { component: (props?: IconProps) => <UserVoiceIcon {...props} />, title: 'UserVoiceIcon' },
  { component: (props?: IconProps) => <StopWatchIcon {...props} />, title: 'StopWatchIcon' },
  { component: (props?: IconProps) => <MentionIcon {...props} />, title: 'MentionIcon' },
  { component: (props?: IconProps) => <ArchiveIcon {...props} />, title: 'ArchiveIcon' },
  { component: (props?: IconProps) => <DropboxIcon {...props} />, title: 'DropboxIcon' },
  { component: (props?: IconProps) => <TrophyIcon {...props} />, title: 'TrophyIcon' },
  { component: (props?: IconProps) => <GameIcon {...props} />, title: 'GameIcon' },
  { component: (props?: IconProps) => <TriangleUpIcon {...props} />, title: 'TriangleUpIcon' },
  { component: (props?: IconProps) => <EquilizerIcon {...props} />, title: 'EquilizerIcon' },
  { component: (props?: IconProps) => <TargetLockIcon {...props} />, title: 'TargetLockIcon' },
  { component: (props?: IconProps) => <HourglassIcon {...props} />, title: 'HourglassIcon' },
  { component: (props?: IconProps) => <CompassIcon {...props} />, title: 'CompassIcon' },
  { component: (props?: IconProps) => <TripIcon {...props} />, title: 'TripIcon' },
  { component: (props?: IconProps) => <ConnectionIcon {...props} />, title: 'ConnectionIcon' },
  { component: (props?: IconProps) => <CarouselIcon {...props} />, title: 'CarouselIcon' },
  { component: (props?: IconProps) => <TimeIcon {...props} />, title: 'TimeIcon' },
  { component: (props?: IconProps) => <CodeIcon {...props} />, title: 'CodeIcon' },
  { component: (props?: IconProps) => <IsacImageIcon {...props} />, title: 'IsacImageIcon' },
  { component: (props?: IconProps) => <VisionImageIcon {...props} />, title: 'VisionImageIcon' },
  { component: (props?: IconProps) => <PlusCircleIcon {...props} />, title: 'PlusCircleIcon' },
  { component: (props?: IconProps) => <XCircleIcon {...props} />, title: 'XCircleIcon' },
  { component: (props?: IconProps) => <ReportImageIcon {...props} />, title: 'ReportImageIcon' },
  { component: (props?: IconProps) => <DashboardImageIcon {...props} />, title: 'DashboardImageIcon' },
  { component: (props?: IconProps) => <StatsIcon {...props} />, title: 'StatsIcon' },
  { component: (props?: IconProps) => <HomeSaleIcon {...props} />, title: 'HomeSaleIcon' },
  { component: (props?: IconProps) => <CartIcon {...props} />, title: 'CartIcon' },
  { component: (props?: IconProps) => <PieChartIcon {...props} />, title: 'PieChartIcon' }
];
export const getIconByName = (title: AvailableIcons, props?: IconProps): ReactNode => {
  const findedIcon = listAvailableIcons.find(icon => icon.title === title);
  if (findedIcon) return findedIcon.component(props);
  return <></>;
}