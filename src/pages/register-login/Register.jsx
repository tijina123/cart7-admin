import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaChevronDown } from "react-icons/fa";
import AdminService from "../../services/admin-api-service/AdminService";
import toast, { Toaster } from "react-hot-toast";


const planOptions = [
  { name: "Free plan", amount: 0, percentage: 25 },
  { name: "plan 1", amount: 999, percentage: 22 },
  { name: "plan 2", amount: 1499, percentage: 20 },
  { name: "plan 3", amount: 1999, percentage: 18 },
  { name: "plan 4", amount: 2499, percentage: 16 },
  { name: "plan 5", amount: 2999, percentage: 14 },
  { name: "plan 6", amount: 3499, percentage: 12 },
  { name: "plan 7", amount: 3999, percentage: 10 }
];

const Register = () => {

  // const [selected, setSelected] = useState("basic");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(planOptions[0].name);

  const [userData, setUserData] = useState({
  name: "",
  email: "",
  password: "",
  phone: "",
  companyname: "",
  plan: selected,
  role: "admin",
  beneficiaryName: "",
  accountNumber: "",
  reAccountNumber: "",
  ifscCode: "",
});


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { postRegister } = AdminService();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userData.accountNumber !== userData.reAccountNumber) {
  setError("Account numbers do not match.");
  return;
}

    console.log(selected, "===selected");
    console.log(userData, "===userData");
    const response = await postRegister(userData);
    
    if (response?.data?.success) {
      // setLoading(true);
      // setError("");
      toast.success(response?.data?.message);
              setTimeout(() => {
                navigate("/login");
              }, 1000);

    } else {
      // setLoading(false);
      toast.error(response?.data?.message);
    }
    console.log("Registering user:", userData);
  };

  return (
   <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh", overflow: "auto" }}>
  <div className="card p-4 shadow" style={{ width: "500px", maxHeight: "95vh", overflowY: "auto" }}>
        <h2 className="text-center">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Name</label>
           <input
  type="text"
  name="name"
  className="form-control !border-green-600 !text-green-700 !focus:ring-green-500"
  value={userData.name}
  onChange={handleChange}
  required
/>

          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control !border-green-600 !text-green-700 !focus:ring-green-500"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="phone"
              name="phone"
              className="form-control !border-green-600 !text-green-700 !focus:ring-green-500"
              value={userData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="companyname"
              className="form-control !border-green-600 !text-green-700 !focus:ring-green-500"
              value={userData.companyname}
              onChange={handleChange}
              required
            />
          </div>
          <h5 className="mt-4 mb-3 border-bottom pb-2">Bank Details</h5>

<div className="mb-3">
  <label className="form-label">Beneficiary Name</label>
  <input
    type="text"
    name="beneficiaryName"
    className="form-control !border-green-600 !text-green-700 !focus:ring-green-500"
    value={userData.beneficiaryName}
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label className="form-label">Account Number</label>
  <input
    type="text"
    name="accountNumber"
    className="form-control !border-green-600 !text-green-700 !focus:ring-green-500"
    value={userData.accountNumber}
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label className="form-label">Re-enter Account Number</label>
  <input
    type="text"
    name="reAccountNumber"
    className="form-control !border-green-600 !text-green-700 !focus:ring-green-500"
    value={userData.reAccountNumber}
    onChange={handleChange}
    required
  />
</div>

<div className="mb-3">
  <label className="form-label">IFSC Code</label>
  <input
    type="text"
    name="ifscCode"
    className="form-control !border-green-600 !text-green-700 !focus:ring-green-500"
    value={userData.ifscCode}
    onChange={handleChange}
    required
  />
</div>


          <div className="mb-3 position-relative">
      <label className="form-label">Plan</label>
      <div className="position-relative">
        <div
          className="input-group"
          onClick={() => setShowDropdown(!showDropdown)}
          style={{ cursor: "pointer" }}
        >
          <div className="form-control !border-green-600 !text-green-700 !focus:ring-green-500">{selected}</div>
          <span className="input-group-text">
            <FaChevronDown />
          </span>
        </div>

              {showDropdown && (
                <ul
                  className="dropdown-menu show w-100"
                  style={{ position: "absolute", top: "100%", zIndex: 1000 }}
                >
                  {planOptions.map((option, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        className="dropdown-item d-flex justify-content-between align-items-center"
                        onClick={() => {
                          setSelected(option.name);
                          setShowDropdown(false);
                          handleChange({
                            target: {
                              name: "plan",
                              value: option.name, // or JSON.stringify(option) if needed
                            },
                          });
                        }}
                      >
                        <div className="w-full d-flex justify-content-between">
                          <div className="fw-bold">{option.name}</div>
                          <small>₹{option.amount} - {option.percentage}% fee</small>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control !border-green-600 !text-green-700 !focus:ring-green-500"
                value={userData.password}
                onChange={handleChange}
                required
              />
              <span
                className="input-group-text"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-danger w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
