const getErrorDescription = (status: number): string => {
  if (status === 403) {
    return "Invalid token";
  }

  if (status === 500) {
    return "There was a problem and checkout could not be completed";
  }

  return "Something went wrong";
};

export default getErrorDescription;
