import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/index";
import Button from "../UI/Button";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setProcessing(true);

    if (!email || !password) {
      alert("All fields are required.");
      setProcessing(false);
      return;
    }

    try {
      const response = await login(formData);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setProcessing(false);
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login successful.");
      navigate("/");
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error("Error during login:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      action="two-step.html"
      className="leading-none mt-8"
      onSubmit={handleLogin}
    >
      <div className="mt-5 flex flex-col gap-y-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="fery.anuar@example.com"
          required
          className="form-input px-4 py-3.5 rounded-lg border-2"
          onChange={handleChange}
        />
      </div>
      <div className="md:flex justify-between ">
        <div className="mt-5 flex flex-col gap-y-3 mb-5">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            className="form-input px-4 py-3.5 rounded-lg border-2"
            onChange={handleChange}
          />
        </div>
      </div>
      <Button
        processing={processing}
        text={processing ? "Processing..." : "Sign In"}
        size="w-full h-10"
      />
    </form>
  );
};

export default Login;
