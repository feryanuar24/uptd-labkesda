import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/index";
import Button from "../UI/Button";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const { name, email, password, password_confirmation } = formData;

  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setProcessing(true);

    if (!name || !email || !password || !password_confirmation) {
      alert("All fields are required.");
      setProcessing(false);
      return;
    }

    if (password !== password_confirmation) {
      alert("Passwords do not match.");
      setProcessing(false);
      return;
    }

    try {
      const response = await register(formData);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setProcessing(false);
        return;
      }

      alert(data.message);
      navigate("/login");
      window.open("https://mail.google.com", "_blank");
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error("Error during registration:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      action="two-step.html"
      className="leading-none mt-8"
      onSubmit={handleRegister}
    >
      <div className="mb-2.5 flex flex-col gap-y-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Fery Anuar"
          required
          className="form-input px-4 py-3.5 rounded-lg border-2"
          onChange={handleChange}
        />
      </div>
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
        <div className="mt-5 flex flex-col gap-y-3 mb-5">
          <label htmlFor="password" className="form-label">
            Password Confirmation
          </label>
          <input
            type="password"
            id="password_confirmation"
            placeholder="Password Confirmation"
            required
            className="form-input px-4 py-3.5 rounded-lg border-2"
            onChange={handleChange}
          />
        </div>
      </div>
      <Button
        processing={processing}
        text={processing ? "Processing..." : "Sign Up"}
        size="w-full h-10"
      />
    </form>
  );
};

export default Register;
