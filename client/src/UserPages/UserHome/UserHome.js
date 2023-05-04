import ImageSlider from "./ImageSlide2";

const UserHome = () => {
  const slides = [
    { url: require("../../imgs/c1_1267559_170613045538.jpg"), title: "beach" },
    { url: require("../../imgs/images.jpg"), title: "boat" },
    { url: require("../../imgs/fsufs-05-706142-g001.jpg"), title: "forest" },
    { url: require("../../imgs/lanao-del-norte-demo-farm_2021-12-15_11-24-57.jpg"), title: "city" },
    { url: require("../../imgs/Login_Background.jpg"), title: "italy" },
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