import ImageSlider from "./ImageSlide2";
import "./UserHome.css";

const UserHome = () => {
  const slides = [
    { url: require("../../imgs/7.jpg"), title: "italy" },
    { url: require("../../imgs/6.jpg"), title: "italy" },
    { url: require("../../imgs/9.jpg"), title: "italy" },
    { url: require("../../imgs/11.jpg"), title: "italy" },
    { url: require("../../imgs/12.jpg"), title: "italy" },
  ];   
  const containerStyles = {
    width: "900px",
    height: "500px",
    margin: "0 auto",
  };
  return (
    <div className="body1">
    <div style={containerStyles}>
      <ImageSlider slides={slides} />
    </div>
    </div>
  );
};

export default UserHome;