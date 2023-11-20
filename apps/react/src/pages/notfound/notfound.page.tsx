import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      not found <button type="button" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default NotFound;