import React from "react";
import { ColorRing } from "react-loader-spinner";

const LoadingPage: React.FC = () => {
    return (
        <>
            <div className="flex flex-row min-h-screen justify-center items-center">
                <div className="grid grid-flow-row auto-rows-max">
                    <div className="flex justify-center content-center text-center">
                        <h1>WAIT UNTIL WE ARE LOADING YOUR INFORMATION...</h1>
                    </div>
                        <div className="flex justify-center content-center">
                        
                            <ColorRing
                                visible={true}
                                height="100"
                                width="100"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                />
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadingPage;