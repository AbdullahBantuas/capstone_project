import React from 'react';
import './UserResearchers.css';
 
  function UserResearchers() {
    return (
        <div style={{marginTop: "90px"}}>
            {/* <h2 className="Retitle1">RESEARCHERS</h2> */}
            <h3 className="Retitle">PANEL MEMBERS</h3>
            <div className="Recontainer">
                <div className="row">
                    <div className="testimonial">
                        <img src={require("../../imgs/Jogie A. Vistal.jpg")} className="image1" alt="Jogie A. Vistal" style={{ objectFit: 'cover', objectPosition: 'top' }}/>
                        <h4 className="Rename">JOGIE A. VISTAL, MSIT</h4>
                        <h6 className="Rename1">PANEL 1</h6>
                    </div>

                    <div className="testimonial">
                        <img src={require("../../imgs/Lucman Abdulrachman.png")} className="image1"alt="Lucman Abdulrachman" style={{ objectFit: 'cover', objectPosition: 'top' }}/>
                        <h4 className="Rename">LUCMAN M. ABDULRAHMAN</h4>
                        <h6 className="Rename1">PANEL 2</h6>
                    </div>
            </div> 
        </div>
        <h3 className="Retitle">CAPSTONE ADVISER</h3>
        <div className="Recontainer">
                <div className="row2">
                    <div className="testimonial">
                        <img src={require("../../imgs/Jasmin Jeanette C. Mama.jpg")} className="image1" alt="Jasmin Jeanette C. Mama" style={{ objectFit: 'cover', objectPosition: 'top' }}/>
                        <h4 className="Rename">JASMIN JEANETTE C. MAMA, MIT</h4>
                        <h6 class   Name="Rename1">ADVISER</h6>
                    </div>

            </div> 
        </div>
        <h3 className="Retitle">RESEARCHERS</h3>
        <div className="Recontainer">
                <div className="row1">
                    <div className="testimonial">
                        <img src={require("../../imgs/1690772813484.jpg")} className="image1"alt="Abdullah G. Bantuas" style={{ objectFit: 'cover', objectPosition: 'center' }}/>
                        <h4 className="Rename">ABDULLAH G. BANTUAS</h4>
                        <h6 className="Rename1">DEVELOPER</h6>
                    </div>

                    <div className="testimonial1">
                        <img src={require("../../imgs/Hanif K. Agakhan.PNG")} className="image1"alt="Hanif K. Agakhan" style={{ objectFit: 'cover', objectPosition: 'top' }}/>
                        <h4 className="Rename">HANIF K. AGAKHAN</h4>
                        <h6 className="Rename1">DEVELOPER</h6>
                    </div>

            </div> 
        </div>
        <h3 className="Retitle">SPECIALIST</h3>
        <div className="Recontainer">
                <div className="row2">
                    <div className="testimonial">
                        <img src={require("../../imgs/348384254_1417418435710296_5076407266923535390_n.jpg")} className="image1"alt="Hanif K. Agakhan" style={{ objectFit: 'cover', objectPosition: 'middle' }}/>
                        <h4 className="Rename">EDGEL O. ESCOMEN</h4>
                        <h6 className="Rename1">SOIL SPECIALIST</h6>
                    </div>

            </div> 
        </div>
    </div>
    );
  }
   
  export default UserResearchers;