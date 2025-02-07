export function classNames(obj: any) : string{
  var classes = [];
  let hasOwn = {}.hasOwnProperty;

  for(var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      // @ts-ignore
      classes.push(this && this[arg] || arg);
    } else if (Array.isArray(arg)) {
      // @ts-ignore
      classes.push(classNames.apply(this, arg));
    } else if (argType === 'object') {
      if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
        classes.push(arg.toString());
        continue;
      }

      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          // @ts-ignore
          classes.push(this && this[key] || key);
        }
      }
    }
  }
  return classes.join(' ');
}

let input_normal = `
  relative
  block w-full
  appearance-none
  border border-gray-300
  px-3 py-2
  text-gray-900 placeholder-gray-500
  focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500
  sm:text-sm
  autofill:bg-gray-100
  autofill:text-inherit
`;
let button_normal = `
  flex justify-center 
  rounded-md border border-transparent 
  py-2 px-4
  text-sm font-medium 
  focus:outline-none focus:ring-2 focus:ring-offset-2
`;
export const shortclass = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading2: "font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraph: "font-normal text-dimWhite text-[18px] leading-[30.8px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",

  checkbox: {
    primary: `h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500`
  },
  button: {
    normal: button_normal,
    primary:  `${button_normal} text-white focus:ring-primary-500 bg-primary-600 hover:bg-primary-700`,
    secondary:  `${button_normal} text-white focus:ring-gray-300 bg-gray-400 hover:bg-gray-500`,
    danger:  `${button_normal} text-white focus:ring-red-300 bg-red-700 hover:bg-red-800`,
    success:  `${button_normal} text-white focus:ring-emerald-300 bg-emerald-700 hover:bg-emerald-800`,
  },
  input: {
    normal: input_normal,
    roundedTop: `${input_normal} rounded-t`,
    roundedBottom: `${input_normal} rounded-b`
  },
  dropdownItem: `
    rounded-lg bg-gray-50 p-3 
    text-sm font-semibold text-start text-gray-900 
    enabled:hover:bg-gray-100 enabled:hover:shadow enabled:cursor-pointer
    block w-full
    disabled:opacity-70
  `,
  dropdownItemTranslucent: `
    rounded-lg bg-gray-50/50 p-3 
    text-sm font-semibold text-start text-gray-900 
    enabled:hover:bg-gray-100 enabled:hover:shadow enabled:cursor-pointer
    block w-full
    disabled:opacity-70
  `
};
export const layout = {
  section: `flex md:flex-row flex-col ${shortclass.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${shortclass.paddingY}`,

  sectionImgReverse: `flex-1 flex ${shortclass.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${shortclass.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${shortclass.flexStart} flex-col`,
};