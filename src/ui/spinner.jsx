import { ClipLoader } from "react-spinners";
const override={
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    
};
function Spinner({loading}){
    
    return(
        <>
            <ClipLoader
                color="#ff0000"
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </>
    )
}
export default Spinner