import React from "react";
import {Routes,Route} from 'react-router-dom';
import FullWidthBanners from "./FullWidthBanners";
import SmallBanners from "./SmallBanners";

function HomePage(){
    return(
        <>
            <Routes>
                <Route path="/full-width-banners" element={<FullWidthBanners />}></Route>
                <Route path="/small-banners" element={<SmallBanners />}></Route>
            </Routes>
        </>
    )
}

export default HomePage;