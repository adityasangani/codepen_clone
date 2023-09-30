import { Circles } from "react-loader-spinner";

const Spinner = () => {
  return (
    <Circles
      height="50"
      width="50"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Spinner;
