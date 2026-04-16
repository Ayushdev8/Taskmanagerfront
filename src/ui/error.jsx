import { useState } from "react";

function ErrorCom({error,fetcherror,deleteerror,statuserror,registererror}) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="flex justify-between items-center bg-red-100 text-red-800 px-4 py-3 rounded">
        <span>{error}</span>
      
      <span>{fetcherror}</span>
      <span>{deleteerror}</span>
      <span>{statuserror}</span>
      <span>{registererror}</span>
      
      
      <button
        onClick={() => setShow(false)}
        className="text-xl font-bold hover:text-red-600"
      >
        x
      </button>
    </div>
  );
}
export default ErrorCom