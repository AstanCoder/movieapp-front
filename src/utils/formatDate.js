import moment from "moment";

export const formatDate = (
  date,
  format = "DD MMMM yyyy HH:mm",
  castFormat = "YYYY-MM-DD HH:mm Z"
) => moment(date, castFormat).format(format);
