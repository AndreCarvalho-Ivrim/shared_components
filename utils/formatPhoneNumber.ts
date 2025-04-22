export const formatPhoneNumber = (phone: string) => {
    if (phone && phone.length === 13 && phone.startsWith("55")) {
      return `(${phone.substring(2, 4)}) ${phone.substring(4, 9)}-${phone.substring(9)}`;
    }
    return phone;
  };