import React from 'react';
import './UserResearchers.css';
 
  function Researchers() {
    return (
        <div style={{marginTop: "90px"}}>
            <h3 className="Retitle" style={{fontSize: "30px"}}>RESEARCHERS</h3>
            <div className="Recontainer">
                <div className="row">
                    <div className="testimonial">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg" className="image1" />
                        <h4 className="Rename">Anna Deynah</h4>
                        <h6 className="Rename1">Tourist</h6>
                    </div>

                    <div className="testimonial">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(8).jpg" className="image1" />
                        <h4 className="Rename">John Doe</h4>
                        <h6 className="Rename1">Tourist</h6>
                    </div>

                    <div className="testimonial">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(8).jpg" className="image1" />
                        <h4 className="Rename">Jane Smith</h4>
                        <h6 className="Rename1">Tourist</h6>
                    </div>

                    <div className="testimonial">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(8).jpg" className="image1" />
                        <h4 className="Rename">Bob Johnson</h4>
                        <h6 className="Rename1">Tourist</h6>
                    </div>

                    <div className="testimonial" style={{display: "center", alignItems: "center"}}>
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(8).jpg" className="image1" />
                        <h4 className="Rename">David Lee</h4>
                        <h6 className="Rename1">Tourist</h6>
                    </div>

            </div> 
        </div>
    </div>
    );
  }
   
  export default Researchers;