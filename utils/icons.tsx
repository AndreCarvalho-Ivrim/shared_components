interface IconProps{ w?: string | number, h?: string | number, className?: string, color?: string }
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
    width={ props.w ?? "20"} height={ props.h ?? "20"}
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
    width={ props.w ?? "20"} height={ props.h ?? "20"}
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
    <path d="M5.51133 5.13565C5.82872 4.78408 5.82872 4.21315 5.51133 3.86158L2.26133 0.261584C2.02774 0.00283432 1.67989 -0.073103 1.3752 0.067522C1.07051 0.208147 0.872467 0.534397 0.872467 0.900023L0.875006 8.10002C0.875006 8.46283 1.07305 8.7919 1.37774 8.93252C1.68243 9.07315 2.03028 8.9944 2.26387 8.73846L5.51387 5.13846L5.51133 5.13565Z" fill={props.color ?? "currentColor"}/>
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
      stroke={ props.color ?? 'currentColor' }
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
      stroke={ props.color ?? 'currentColor' }
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
      stroke={ props.color ?? 'currentColor' }
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 3V7M17 7H21M17 7L22 2"
      stroke={ props.color ?? 'currentColor' }
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
      stroke={ props.color ?? 'currentColor' }
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M13.87 3.2C12.6607 2.85559 11.3793 2.85559 10.17 3.2C10.46 2.46 11.18 1.94 12.02 1.94C12.86 1.94 13.58 2.46 13.87 3.2Z"
      stroke={ props.color ?? 'currentColor' }
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.9 21.18C9.33816 20.6173 9.0218 19.8552 9.02 19.06"
      stroke={ props.color ?? 'currentColor' }
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
      stroke={ props.color ?? 'currentColor' }
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 7.72998C17.37 8.92998 19 11.51 19 14.5C19 14.67 18.99 14.83 18.97 15M5.03 15C5.01 14.83 5 14.67 5 14.5C5 11.51 6.63 8.92998 9 7.72998"
      stroke={ props.color ?? 'currentColor' }
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
    <circle cx="14.5" cy="15" r="14" stroke={props.color ?? 'currentColor'}/>
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
    <circle cx="10" cy="10" r="10" fill={props.color ?? "#40FF2F"}/>
    <path d="M6.45833 10L8.81667 12.3583L13.5417 7.64167" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const EditIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props.w ?? '24'}
    height={props.h ?? '24'}
    className={props.className ?? ''}
    style={{ fill: props.color ?? "currentColor"}}
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
    style={{ fill: props.color ?? "currentColor"}}
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
    style={{ fill: props.color ?? "currentColor"}}
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
// MAPED TO HERE
export const GitIcon = (props: IconProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    width={props.w ?? "24"} height={props.h ?? "24"}
    className={props.className ?? ''}
    viewBox="0 0 24 24" style={{
      fill: props.color ?? 'currentColor'
    }}
  >
    <path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 1.552 1.022 2.855 2.424 3.313-.146.735-.565 1.791-1.778 2.252-1.192.452-2.053.953-2.646 1.536-.593-.583-1.453-1.084-2.646-1.536-1.213-.461-1.633-1.517-1.778-2.252C8.978 8.355 10 7.052 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355zM17.5 4c.827 0 1.5.673 1.5 1.5S18.327 7 17.5 7 16 6.327 16 5.5 16.673 4 17.5 4zm-4 14.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM6.5 4C7.327 4 8 4.673 8 5.5S7.327 7 6.5 7 5 6.327 5 5.5 5.673 4 6.5 4z"></path>
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
export const HomeIcon = (props : IconProps) => (
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
    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
    <g id="SVGRepo_iconCarrier">
      <path d="M16.2857 20C19.4416 20 22 17.4717 22 14.3529C22 11.8811 20.393 9.78024 18.1551 9.01498C17.8371 6.19371 15.4159 4 12.4762 4C9.32028 4 6.7619 6.52827 6.7619 9.64706C6.7619 10.3369 6.88706 10.9978 7.11616 11.6089C6.8475 11.5567 6.56983 11.5294 6.28571 11.5294C3.91878 11.5294 2 13.4256 2 15.7647C2 18.1038 3.91878 20 6.28571 20H16.2857Z" fill={props.color ?? 'currentColor'}/>
    </g>
  </svg>
)
export const listAvailableIcons = [
  {component: <ChevronDownIcon/>,     title: 'ChevronDownIcon'      },
  {component: <ChevronUpDownIcon/>,   title: 'ChevronUpDownIcon'    },
  {component: <ChevronsRightIcon/>,   title: 'ChevronsRightIcon'    },
  {component: <ArrowRightIcon/>,      title: 'ArrowRightIcon'       },
  {component: <ArrowDownCircleIcon/>, title: 'ArrowDownCircleIcon'  },
  {component: <CloseIcon/>,           title: 'CloseIcon'            },
  {component: <TrashIcon/>,           title: 'TrashIcon'            },
  {component: <PlusIcon/>,            title: 'PlusIcon'             },
  {component: <CheckedIcon/>,         title: 'CheckedIcon'          },
  {component: <FileIcon/>,            title: 'FileIcon'             },
  {component: <UploadIcon/>,          title: 'UploadIcon'           },
  {component: <ChatIcon/>,            title: 'ChatIcon'             },
  {component: <DashboardIcon/>,       title: 'DashboardIcon'        },
  {component: <MoneyIcon/>,           title: 'MoneyIcon'            },
  {component: <NotificationIcon/>,    title: 'NotificationIcon'     },
  {component: <WorkflowIcon/>,        title: 'WorkflowIcon'         },
  {component: <SettingIcon/>,         title: 'SettingIcon'          },
  {component: <ArrowBackCircleIcon/>, title: 'ArrowBackCircleIcon'  },
  {component: <FlowIcon/>,            title: 'FlowIcon'             },
  {component: <SaveIcon/>,            title: 'SaveIcon'             },
  {component: <FlowColorful/>,        title: 'FlowColorful'         },
  {component: <CheckedCircleIcon/>,   title: 'CheckedCircleIcon'    },
  {component: <EditIcon/>,            title: 'EditIcon'             },
  {component: <TableIcon/>,           title: 'TableIcon'            },
  {component: <ListIcon/>,            title: 'ListIcon'             },
  {component: <DownloadAltIcon/>,     title: 'DownloadAltIcon'      },
  {component: <ThunderIcon/>,         title: 'ThunderIcon'          },
  {component: <MoreVerticalIcon/>,    title: 'MoreVerticalIcon'     },
  {component: <WindowsIcon/>,         title: 'WindowsIcon'          },
  {component: <GitIcon/>,             title: 'GitIcon'              },
  {component: <WidgetIcon/>,          title: 'WidgetIcon'           },
  {component: <FormIcon/>,            title: 'FormIcon'             },
  {component: <DetalistIcon/>,        title: 'DetalistIcon'         },
  {component: <EnvelopeIcon/>,        title: 'EnvelopeIcon'         },
  {component: <SearchIcon/>,          title: 'SearchIcon'           },
  {component: <MenuIcon/>,            title: 'MenuIcon'             },
  {component: <MenuCollapsedIcon/>,   title: 'MenuCollapsedIcon'    },
  {component: <HomeIcon/>,            title: 'HomeIcon'             },
  {component: <ProjectIcon/>,         title: 'ProjectIcon'          },
  {component: <UsersIcon/>,           title: 'UsersIcon'            },
  {component: <ErrorCircleIcon/>,     title: 'ErrorCircleIcon'      },
  {component: <LockIcon/>,            title: 'LockIcon'             },
  {component: <RefreshIcon/>,         title: 'RefreshIcon'          },
];
export const getIconByName = (title: string) => {
  const findedIcon = listAvailableIcons.find(icon => icon.title === title);
  if(findedIcon) return findedIcon.component;
  return <></>;
}